-- User profile data (1:1 with auth.users)
create table "public"."user_profiles" (
  "user_id"       uuid        not null,
  "full_name"     text,
  "date_of_birth" date,
  "company"       text,
  "job_title"     text,
  "website"       text,
  "bio"           text,
  "created_at"    timestamptz not null default now(),
  "updated_at"    timestamptz not null default now(),
  primary key ("user_id"),
  foreign key ("user_id") references "auth"."users"("id")
    on update cascade on delete cascade
);

-- Auto-update updated_at trigger
create trigger "set_public_user_profiles_updated_at"
before update on "public"."user_profiles"
for each row
execute procedure "public"."set_current_timestamp_updated_at"();
