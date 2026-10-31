CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "excerpt" TEXT NOT NULL,
    "preview_content" TEXT NOT NULL DEFAULT '',
    "category" VARCHAR(80) NOT NULL,
    "author_name" VARCHAR(120) NOT NULL,
    "author_designation" VARCHAR(160) NOT NULL,
    "author_photo" TEXT,
    "published_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMPTZ(6),
    "status" VARCHAR(16) NOT NULL,
    "access" VARCHAR(20) NOT NULL,
    "reading_time" VARCHAR(40) NOT NULL DEFAULT '1 min read',
    "featured_image" TEXT,
    "featured_label" VARCHAR(80),
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "blog_posts_slug_check" CHECK ("slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    CONSTRAINT "blog_posts_status_check" CHECK ("status" IN ('draft', 'scheduled', 'published')),
    CONSTRAINT "blog_posts_access_check" CHECK ("access" IN ('public', 'login_required')),
    CONSTRAINT "blog_posts_scheduled_publish_at_check" CHECK ("status" <> 'scheduled' OR "publish_at" IS NOT NULL)
);

CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");
CREATE INDEX "blog_posts_status_publish_at_idx" ON "blog_posts"("status", "publish_at");
CREATE INDEX "blog_posts_access_status_publish_at_idx" ON "blog_posts"("access", "status", "publish_at");

CREATE TABLE "blog_article_content" (
    "post_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "blog_article_content_pkey" PRIMARY KEY ("post_id")
);

ALTER TABLE "blog_article_content"
ADD CONSTRAINT "blog_article_content_post_id_fkey"
FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
