create table if not exists questions (
  unique_id text primary key,
  english_question text,
  hindi_question text,
  english_options jsonb default '[]'::jsonb,
  hindi_options jsonb default '[]'::jsonb,
  english_solution text,
  hindi_solution text,
  correct_answer text,
  video_urls jsonb default '[]'::jsonb,
  category text, subject text, chapter text, topic text, subtopic text,
  class_name text, book text, qcm_tag text, target_exam text,
  target_exam_stages jsonb default '[]'::jsonb,
  question_type text, verification_type text, difficulty text, verification_status text,
  bilingual_content_count integer, bilingual_solution_count integer,
  parent_question_id text, category_configuration_id text, updated_at timestamptz,
  text_solution_available boolean default false, video_solution_available boolean default false,
  bilingual_available boolean default false,
  raw jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_questions_category on questions(category);
create index if not exists idx_questions_subject on questions(subject);
create index if not exists idx_questions_chapter on questions(chapter);
create index if not exists idx_questions_topic on questions(topic);
create index if not exists idx_questions_subtopic on questions(subtopic);
create index if not exists idx_questions_difficulty on questions(difficulty);
create index if not exists idx_questions_verification_status on questions(verification_status);
create index if not exists idx_questions_target_exam on questions(target_exam);
create index if not exists idx_questions_updated_at on questions(updated_at desc);
create index if not exists idx_questions_search on questions using gin (to_tsvector('simple', coalesce(english_question,'') || ' ' || coalesce(hindi_question,'') || ' ' || coalesce(subject,'') || ' ' || coalesce(chapter,'') || ' ' || coalesce(topic,'')));

alter table questions enable row level security;
-- For an internal app, replace these policies with your team's authenticated-user model.
create policy "authenticated users can read questions" on questions for select to authenticated using (true);
create policy "authenticated users can insert questions" on questions for insert to authenticated with check (true);
create policy "authenticated users can update questions" on questions for update to authenticated using (true) with check (true);
