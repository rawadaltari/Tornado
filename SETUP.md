# Setup Instructions

Follow these steps to get your restaurant menu website up and running.

## Prerequisites

The following are already set up for you:
- Supabase database with menu tables
- Sample menu data (4 categories with 13 menu items)
- All necessary code files

## Quick Start

1. **Configure Environment Variables**

   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Install Dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**

   Visit the URL shown in your terminal (usually `http://localhost:5173`)

## Customizing Your Menu

### Option 1: Using Supabase Dashboard (Recommended)

1. Log into your Supabase dashboard
2. Go to Table Editor
3. Select the `categories` or `menu_items` table
4. Click "Insert row" to add new items
5. Click on any row to edit existing items

### Option 2: Using SQL

Run SQL queries directly in Supabase SQL Editor:

```sql
-- Add a new category
INSERT INTO categories (name, display_order)
VALUES ('Specials', 5);

-- Add a new menu item
INSERT INTO menu_items (category_id, name, description, price, display_order)
VALUES (
  'category-id-here',
  'Signature Burger',
  'Our famous burger with special sauce',
  15.99,
  1
);

-- Update an item's price
UPDATE menu_items
SET price = 16.99
WHERE name = 'Signature Burger';

-- Mark an item as unavailable
UPDATE menu_items
SET available = false
WHERE name = 'Seasonal Special';
```

## Personalizing the Website

### Change Restaurant Name

Edit `src/App.tsx`:
```tsx
<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
  Your Restaurant Name
</h1>
```

And:
```tsx
<h2 className="text-4xl md:text-5xl font-bold mb-4">
  Welcome to Your Restaurant
</h2>
```

### Update Welcome Message

Edit the hero section in `src/App.tsx`:
```tsx
<p className="text-lg md:text-xl mb-8 text-emerald-50">
  Your custom welcome message here
</p>
```

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist` folder ready for hosting.

## Hosting Options

Popular hosting services for this website:
- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your Git repository
- **GitHub Pages** - Free hosting for static sites
- **Cloudflare Pages** - Fast global CDN

## Creating Your QR Code

1. Deploy your website and get the live URL
2. Visit a QR code generator:
   - qr-code-generator.com
   - qrcode-monkey.com
   - qr.io
3. Enter your website URL
4. Customize the design if desired
5. Download as PNG or SVG
6. Print and display at your restaurant

## Troubleshooting

**Menu not loading?**
- Check that your `.env` file has the correct Supabase credentials
- Verify your database tables exist
- Check browser console for errors

**Images not showing?**
- Ensure image URLs are publicly accessible
- Use HTTPS URLs for images
- Consider using a CDN for better performance

**Need to update menu items?**
- Use the Supabase dashboard - no code changes needed
- Changes appear instantly on the website
- You can update prices, descriptions, and availability anytime

## Next Steps

1. Replace sample menu items with your actual menu
2. Update restaurant name and branding
3. Add your own food photos
4. Test on mobile devices (scan QR code)
5. Deploy to your hosting service
6. Generate and print QR codes

Enjoy your new digital menu!
