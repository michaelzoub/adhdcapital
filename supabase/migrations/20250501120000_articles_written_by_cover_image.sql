-- Author display name (shown as "Written by …" on published articles).
alter table public.articles
  add column if not exists written_by text;

-- Hero / social preview image URL (same storage bucket as inline images is fine).
alter table public.articles
  add column if not exists cover_image_url text;

comment on column public.articles.written_by is 'Display name for article byline; optional.';
comment on column public.articles.cover_image_url is 'Public URL for cover / hero image; optional.';
