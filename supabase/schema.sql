-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pets table
CREATE TYPE pet_breed AS ENUM ('maine_coon', 'cocker_spaniel');
CREATE TYPE pet_gender AS ENUM ('male', 'female');
CREATE TYPE pet_status AS ENUM ('available', 'reserved', 'sold');

CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  breed pet_breed NOT NULL,
  age_weeks INTEGER NOT NULL,
  gender pet_gender NOT NULL,
  color TEXT NOT NULL,
  price_usd NUMERIC NOT NULL,
  status pet_status NOT NULL DEFAULT 'available',
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  breed_interest TEXT NOT NULL,
  pet_name TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Pets RLS policies: read-only for public, all for authenticated
CREATE POLICY "Public profiles are viewable by everyone." 
  ON pets FOR SELECT 
  USING ( true );

CREATE POLICY "Admin can modify pets" 
  ON pets FOR ALL 
  USING ( auth.role() = 'authenticated' );

-- Inquiries RLS policies: insert-only for public, all for authenticated
CREATE POLICY "Public can insert inquiries" 
  ON inquiries FOR INSERT 
  WITH CHECK ( true );

CREATE POLICY "Admin can view and modify inquiries" 
  ON inquiries FOR ALL 
  USING ( auth.role() = 'authenticated' );
