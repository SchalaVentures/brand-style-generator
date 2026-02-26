alter table "public"."shared_links" drop constraint if exists "shared_links_project_id_key";
alter table "public"."shared_links" drop column if exists "project_id";
