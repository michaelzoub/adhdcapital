import "server-only";

export type WritingPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO 8601 date string */
  publishedAt: string;
};

/** Seed data until a database is wired in (`getWritingPosts` stays the single call site). */
const seedPosts: WritingPost[] = [
  {
    slug: "example-frontier-diligence",
    title: "Frontier markets and priced risk",
    excerpt:
      "How we think about which risks are in the tape—and which only surface after mainnet.",
    publishedAt: "2026-03-12",
  },
];

/**
 * Server-side data access. The Writing page is an async Server Component that awaits this
 * function, so the first HTML response already includes the list—no client-side fetch waterfall.
 *
 * Swap the body for your database client, for example:
 * `return db.select().from(writing).orderBy(desc(writing.publishedAt))`
 */
export async function getWritingPosts(): Promise<WritingPost[]> {
  return [...seedPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getWritingPostBySlug(slug: string): Promise<WritingPost | null> {
  const post = seedPosts.find((p) => p.slug === slug);
  return post ?? null;
}
