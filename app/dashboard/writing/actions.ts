"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dashboard_token")?.value;
  if (token !== process.env.DASHBOARD_SECRET) {
    redirect("/dashboard/login");
  }
}

/** Before migration, PostgREST rejects unknown columns — retry without them. */
function isMissingBylineOrCoverColumnError(err: { message?: string } | null): boolean {
  const m = (err?.message ?? "").toLowerCase();
  if (!m.includes("written_by") && !m.includes("cover_image_url")) return false;
  return (
    m.includes("schema cache") ||
    m.includes("does not exist") ||
    m.includes("unknown") ||
    m.includes("column")
  );
}

export async function saveDraft(data: {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  writtenBy: string;
  coverImageUrl: string;
}): Promise<string | null> {
  await requireAuth();
  const supabase = createServiceClient();
  const now = new Date().toISOString();

  const byline = {
    written_by: data.writtenBy.trim() || null,
    cover_image_url: data.coverImageUrl.trim() || null,
  };

  if (data.id) {
    const core = {
      title: data.title,
      subtitle: data.subtitle || null,
      content: data.content,
      slug: data.slug,
      published_at: null,
      updated_at: now,
    };
    let { error } = await supabase.from("articles").update({ ...core, ...byline }).eq("id", data.id);
    if (error && isMissingBylineOrCoverColumnError(error)) {
      ({ error } = await supabase.from("articles").update(core).eq("id", data.id));
    }
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/writing");
    return data.id;
  }

  const coreInsert = {
    title: data.title,
    subtitle: data.subtitle || null,
    content: data.content,
    slug: data.slug,
    published_at: null as string | null,
  };
  let { data: inserted, error } = await supabase
    .from("articles")
    .insert({ ...coreInsert, ...byline })
    .select("id")
    .single();
  if (error && isMissingBylineOrCoverColumnError(error)) {
    ({ data: inserted, error } = await supabase
      .from("articles")
      .insert(coreInsert)
      .select("id")
      .single());
  }
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/writing");
  return (inserted as { id: string } | null)?.id ?? null;
}

export async function publishArticle(data: {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  writtenBy: string;
  coverImageUrl: string;
}): Promise<{ redirectTo: string }> {
  await requireAuth();
  const supabase = createServiceClient();
  const now = new Date().toISOString();

  const byline = {
    written_by: data.writtenBy.trim() || null,
    cover_image_url: data.coverImageUrl.trim() || null,
  };

  let id = data.id;

  if (id) {
    const core = {
      title: data.title,
      subtitle: data.subtitle || null,
      content: data.content,
      slug: data.slug,
      published_at: now,
      updated_at: now,
    };
    let { error } = await supabase.from("articles").update({ ...core, ...byline }).eq("id", id);
    if (error && isMissingBylineOrCoverColumnError(error)) {
      ({ error } = await supabase.from("articles").update(core).eq("id", id));
    }
    if (error) throw new Error(error.message);
  } else {
    const coreInsert = {
      title: data.title,
      subtitle: data.subtitle || null,
      content: data.content,
      slug: data.slug,
      published_at: now,
    };
    let { data: inserted, error } = await supabase
      .from("articles")
      .insert({ ...coreInsert, ...byline })
      .select("id")
      .single();
    if (error && isMissingBylineOrCoverColumnError(error)) {
      ({ data: inserted, error } = await supabase
        .from("articles")
        .insert(coreInsert)
        .select("id")
        .single());
    }
    if (error) throw new Error(error.message);
    id = (inserted as { id: string } | null)?.id;
  }

  if (!id) {
    throw new Error("Publish failed: no article id returned.");
  }

  revalidatePath("/writing");
  revalidatePath("/dashboard/writing");
  return { redirectTo: `/dashboard/writing/${id}/publish-success` };
}

export async function deleteArticle(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  if (!id) return;
  const supabase = createServiceClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/dashboard/writing");
  revalidatePath("/writing");
}
