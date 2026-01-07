-- Create a table for public profiles, linked to the auth.users table
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  xp integer default 0,
  level integer default 1,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Puzzles Table
create type difficulty_level as enum ('Easy', 'Medium', 'Hard');

create table puzzles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  description text not null,
  difficulty difficulty_level default 'Medium',
  category text not null,
  starter_code text,
  test_cases jsonb, -- Array of {input: "", output: ""}
  xp_reward integer default 10,
  is_ai_generated boolean default false
);

alter table puzzles enable row level security;

create policy "Puzzles are viewable by everyone."
  on puzzles for select
  using ( true );

-- Submissions Table
create type submission_status as enum ('Pending', 'Passed', 'Failed');

create table submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) not null,
  puzzle_id uuid references puzzles(id) not null,
  code_submitted text,
  status submission_status default 'Pending',
  execution_time_ms integer
);

alter table submissions enable row level security;

create policy "Users can view their own submissions."
  on submissions for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own submissions."
  on submissions for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
