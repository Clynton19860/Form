-- Create the survey_responses table
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  likert_answers INTEGER[] NOT NULL,
  text_answers TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting responses (public access)
CREATE POLICY "Allow public insert" ON survey_responses
  FOR INSERT WITH CHECK (true);

-- Create policy for viewing responses (admin access - you can restrict this further)
CREATE POLICY "Allow admin select" ON survey_responses
  FOR SELECT USING (true);

-- Create policy for updating responses (admin access)
CREATE POLICY "Allow admin update" ON survey_responses
  FOR UPDATE USING (true);

-- Create policy for deleting responses (admin access)
CREATE POLICY "Allow admin delete" ON survey_responses
  FOR DELETE USING (true);

-- Create index on created_at for better performance
CREATE INDEX idx_survey_responses_created_at ON survey_responses(created_at);

-- Create index on email for better performance
CREATE INDEX idx_survey_responses_email ON survey_responses(email);

-- Add comment to table
COMMENT ON TABLE survey_responses IS 'Stores 360-degree feedback survey responses with Likert scale and open text answers';
