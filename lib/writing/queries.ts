import "server-only";
import { createAnonClient } from "@/lib/supabase";

export type WritingPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  /** Same as subtitle — kept for backwards compat with existing writing page */
  excerpt: string;
  content: string;
  /** Formatted date string for display */
  publishedAt: string;
  writtenBy: string | null;
  coverImageUrl: string | null;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getWritingPosts(): Promise<WritingPost[]> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: r.id as string,
      slug: r.slug as string,
      title: r.title as string,
      subtitle: (r.subtitle as string | null) ?? null,
      excerpt: (r.subtitle as string) ?? "",
      content: (r.content as string) ?? "",
      publishedAt: formatDate(r.published_at as string),
      writtenBy: typeof r.written_by === "string" ? r.written_by : null,
      coverImageUrl: typeof r.cover_image_url === "string" ? r.cover_image_url : null,
    };
  });
}

export async function getWritingPostBySlug(slug: string): Promise<WritingPost | null> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .maybeSingle();

  if (error || !data) return null;

  const r = data as Record<string, unknown>;
  return {
    id: r.id as string,
    slug: r.slug as string,
    title: r.title as string,
    subtitle: (r.subtitle as string | null) ?? null,
    excerpt: (r.subtitle as string) ?? "",
    content: (r.content as string) ?? "",
    publishedAt: formatDate(r.published_at as string),
    writtenBy: typeof r.written_by === "string" ? r.written_by : null,
    coverImageUrl: typeof r.cover_image_url === "string" ? r.cover_image_url : null,
  };
}
