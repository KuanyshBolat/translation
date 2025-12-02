-- Create table for speakers
CREATE TABLE IF NOT EXISTS speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  linkedin TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for moderators
CREATE TABLE IF NOT EXISTS moderators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for schedule
CREATE TABLE IF NOT EXISTS schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for stream settings
CREATE TABLE IF NOT EXISTS stream_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT UNIQUE NOT NULL,
  video_id TEXT NOT NULL,
  camera_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_speakers_created_at ON speakers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_moderators_created_at ON moderators(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_schedule_start_time ON schedule(start_time);
CREATE INDEX IF NOT EXISTS idx_stream_settings_page_name ON stream_settings(page_name);

-- Insert default stream settings
INSERT INTO stream_settings (page_name, video_id, camera_name) VALUES
  ('speakers', 'jfKfPfyJRdk', 'Main Stage'),
  ('polygon_camera_1', 'jfKfPfyJRdk', 'Camera 1'),
  ('polygon_camera_2', 'jfKfPfyJRdk', 'Camera 2'),
  ('polygon_camera_3', 'jfKfPfyJRdk', 'Camera 3'),
  ('polygon_camera_4', 'jfKfPfyJRdk', 'Camera 4')
ON CONFLICT (page_name) DO NOTHING;
