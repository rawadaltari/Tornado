# Restaurant Digital Menu Website

A professional, mobile-first digital menu website designed for QR code access. Customers can scan a QR code at their table to view your menu on their phones.

## Features

- Clean, professional design optimized for mobile devices
- Database-backed menu system for easy updates
- Organized by categories (Appetizers, Main Courses, Desserts, Beverages)
- Real-time menu availability status
- Responsive design works on all devices
- Fast loading and smooth scrolling
- Sample menu data included

## Customization

### 1. Update Restaurant Information

Edit `src/App.tsx` to change:
- Restaurant name (appears in header and hero section)
- Welcome message and description
- Footer copyright text

### 2. Update Menu Items

Your menu is stored in a Supabase database. To update items:

1. Log into your Supabase dashboard
2. Navigate to the Table Editor
3. Use the `categories` table to add/edit menu categories
4. Use the `menu_items` table to add/edit individual menu items

Each menu item has:
- `name` - Name of the dish
- `description` - Description of the dish
- `price` - Price (e.g., 12.50)
- `category_id` - Links to a category
- `image_url` - URL to a food image (optional)
- `display_order` - Controls the order items appear
- `available` - Set to false to mark items as unavailable

### 3. Add Your Own Food Images

Replace the sample Pexels images with your own:
1. Upload your food photos to an image hosting service
2. Update the `image_url` field in the `menu_items` table
3. For best results, use images that are at least 400x400 pixels

### 4. Customize Colors

The website uses a professional emerald green theme. To change colors, edit the Tailwind CSS classes in:
- `src/App.tsx` - Main layout and hero section
- `src/components/MenuItem.tsx` - Menu item cards
- `src/components/MenuCategory.tsx` - Category headings

Common color classes to replace:
- `emerald-600`, `emerald-700`, `emerald-50` - Main theme colors
- `gray-900`, `gray-100` - Text and background colors

## QR Code Setup

Once your website is hosted:

1. Copy your website URL
2. Use a QR code generator (many free options online):
   - QR Code Generator (qr-code-generator.com)
   - QR Code Monkey (qrcode-monkey.com)
   - Or search "QR code generator"
3. Paste your website URL
4. Download the QR code image
5. Print and place at tables or on menus

## Database Structure

### Categories Table
- `id` - Unique identifier
- `name` - Category name
- `display_order` - Order of appearance
- `created_at` - Creation timestamp

### Menu Items Table
- `id` - Unique identifier
- `category_id` - Links to category
- `name` - Item name
- `description` - Item description
- `price` - Item price
- `image_url` - Optional image URL
- `display_order` - Order within category
- `available` - Availability status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Support

The menu automatically loads from your database and displays items organized by category. No coding knowledge needed to update menu items - just edit the database tables directly in Supabase.
