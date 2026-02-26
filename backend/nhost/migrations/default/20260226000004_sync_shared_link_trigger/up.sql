create or replace function "public"."sync_shared_link_on_project_save"()
returns trigger as $$
begin
  update "public"."shared_links"
  set
    state        = NEW.state,
    brand_name   = NEW.name,
    primary_color = NEW.thumbnail_color
  where project_id = NEW.id;
  return NEW;
end;
$$ language plpgsql;

create trigger "sync_shared_link_after_project_save"
after update on "public"."brand_projects"
for each row
execute function "public"."sync_shared_link_on_project_save"();
