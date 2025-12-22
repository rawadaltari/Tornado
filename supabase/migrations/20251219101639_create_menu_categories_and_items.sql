/*
  # Create Menu Categories and Items Schema

  ## Overview
  This migration creates the database structure for a restaurant menu application with categories and their items.

  ## New Tables
  
  ### categories
  - id (uuid, primary key) - Unique identifier for each category
  - name_en (text) - English name of the category
  - name_ar (text) - Arabic name of the category  
  - icon_type (text) - Type of icon to display
  - item_count (integer) - Number of items in this category
  - sort_order (integer) - Display order
  - created_at (timestamptz) - Timestamp of creation

  ### category_items
  - id (uuid, primary key) - Unique identifier for each item
  - category_id (uuid, foreign key) - References categories table
  - name_en (text) - English name of the item
  - name_ar (text) - Arabic name of the item
  - description_en (text) - English description
  - description_ar (text) - Arabic description
  - price (decimal) - Item price
  - created_at (timestamptz) - Timestamp of creation

  ## Security
  - Enable RLS on both tables
  - Add policies for public read access (menu is public)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  icon_type text NOT NULL,
  item_count integer DEFAULT 0,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name_en text NOT NULL,
  name_ar text NOT NULL,
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  price decimal(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view category items"
  ON category_items
  FOR SELECT
  TO public
  USING (true);