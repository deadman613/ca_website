ALTER TABLE "blog_posts"
ADD COLUMN "canonical_url" TEXT,
ADD COLUMN "schema_json" TEXT,
ADD COLUMN "schema_mode" VARCHAR(8) NOT NULL DEFAULT 'auto';
