-- ARCHIVE BMSIT SUPABASE SCHEMA & STORAGE SETUP
-- Run this in your Supabase SQL Editor (1 click)

-- 1. Create Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department_id TEXT NOT NULL,
  semester INTEGER NOT NULL,
  allowed_categories TEXT[] NOT NULL DEFAULT '{}',
  resource_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL,
  type TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  semester INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  file_size_mb NUMERIC NOT NULL DEFAULT 0,
  file_url TEXT,
  contributor TEXT NOT NULL,
  usn TEXT,
  upload_date TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD'),
  upvotes INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If constraint already exists from previous run, drop it so any course folder can receive files:
ALTER TABLE resources DROP CONSTRAINT IF EXISTS resources_course_id_fkey;

-- 3. Row Level Security Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read courses" ON courses;
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert courses" ON courses;
CREATE POLICY "Public insert courses" ON courses FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update courses" ON courses;
CREATE POLICY "Public update courses" ON courses FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete courses" ON courses;
CREATE POLICY "Public delete courses" ON courses FOR DELETE USING (true);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read resources" ON resources;
CREATE POLICY "Public read resources" ON resources FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert resources" ON resources;
CREATE POLICY "Public insert resources" ON resources FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update resources" ON resources;
CREATE POLICY "Public update resources" ON resources FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete resources" ON resources;
CREATE POLICY "Public delete resources" ON resources FOR DELETE USING (true);

-- 4. Create Public Storage Bucket for Notes/PDFs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('archive-files', 'archive-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read archive files" ON storage.objects;
CREATE POLICY "Public read archive files" ON storage.objects FOR SELECT USING (bucket_id = 'archive-files');

DROP POLICY IF EXISTS "Public upload archive files" ON storage.objects;
CREATE POLICY "Public upload archive files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'archive-files');

DROP POLICY IF EXISTS "Public update archive files" ON storage.objects;
CREATE POLICY "Public update archive files" ON storage.objects FOR UPDATE USING (bucket_id = 'archive-files');

DROP POLICY IF EXISTS "Public delete archive files" ON storage.objects;
CREATE POLICY "Public delete archive files" ON storage.objects FOR DELETE USING (bucket_id = 'archive-files');
