alter table "public"."shared_links"
  add column "project_id" uuid
  references "public"."brand_projects"("id")
  on update cascade on delete set null;

alter table "public"."shared_links"
  add constraint "shared_links_project_id_key" unique ("project_id");
