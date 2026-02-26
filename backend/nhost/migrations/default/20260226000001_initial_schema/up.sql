-- Brand projects saved by authenticated users
create table "public"."brand_projects" (
  "id" uuid not null default gen_random_uuid(),
  "user_id" uuid not null,
  "name" text not null,
  "state" jsonb not null,
  "thumbnail_color" text,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),
  primary key ("id"),
  foreign key ("user_id") references "auth"."users"("id")
    on update cascade on delete cascade
);

-- Index for fast user project listing
create index "idx_brand_projects_user_id" on "public"."brand_projects"("user_id");

-- Shared links (anyone can create, no auth required)
create table "public"."shared_links" (
  "id" text not null,
  "state" jsonb not null,
  "brand_name" text not null,
  "primary_color" text,
  "created_by" uuid,
  "view_count" integer not null default 0,
  "created_at" timestamptz not null default now(),
  primary key ("id"),
  foreign key ("created_by") references "auth"."users"("id")
    on update cascade on delete set null
);

-- Auto-update updated_at trigger function
create or replace function "public"."set_current_timestamp_updated_at"()
returns trigger as $$
begin
  new."updated_at" = now();
  return new;
end;
$$ language plpgsql;

-- Apply trigger to brand_projects
create trigger "set_public_brand_projects_updated_at"
before update on "public"."brand_projects"
for each row
execute procedure "public"."set_current_timestamp_updated_at"();
