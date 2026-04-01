/** X / Twitter profile for research and updates. */
export const SOCIAL_X_URL = "https://x.com/CapitalADHD" as const;

/**
 * Discord invite URL. Override with `NEXT_PUBLIC_DISCORD_URL` in `.env` for your real invite.
 * Link embeds in Discord use the same Open Graph metadata as other platforms (`layout.tsx`).
 */
export const SOCIAL_DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL ?? "https://discord.gg/adhdcapital";
