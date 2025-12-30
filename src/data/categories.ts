import type { Category } from '../lib/database.types';

export const CATEGORIES: Category[] = [
  // منيو مطبخ
  { id: 'manakish', name: 'مناقيش', display_order: 1, created_at: '', image: '/assets/manakesh.webp', menu_type: 'kitchen' },
  { id: 'chicken-meals', name: 'وجبات دجاج', display_order: 2, created_at: '', image: '/assets/chken.webp', menu_type: 'kitchen' },
  { id: 'meat-meals', name: 'وجبات اللحمة', display_order: 3, created_at: '', image: '/assets/lahm.webp', menu_type: 'kitchen' },
  { id: 'kids-meals', name: 'وجبات اطفال', display_order: 4, created_at: '', image: '/assets/KHL_4687-webp.webp', menu_type: 'kitchen' },
  { id: 'seafood-meals', name: 'وجبات بحرية', display_order: 5, created_at: '', image: '/assets/feach.png', menu_type: 'kitchen' },
  { id: 'diet-meals', name: 'وجبات دايت', display_order: 6, created_at: '', image: '/assets/daet.png', menu_type: 'kitchen' },
  { id: 'sandwiches', name: 'السندويش', display_order: 7, created_at: '', image: '/assets/sandoeh.png', menu_type: 'kitchen' },
  { id: 'soups', name: 'الشوربات', display_order: 8, created_at: '', image: '/assets/shorba.webp', menu_type: 'kitchen' },
  { id: 'cold-salads', name: 'السلطات', display_order: 9, created_at: '', image: '/assets/salad.png', menu_type: 'kitchen' },
  { id: 'hot-appetizers', name: 'المقبالت الساخنة', display_order: 10, created_at: '', image: '/assets/mokblat.png', menu_type: 'kitchen' },
  { id: 'pasta', name: 'الباستا', display_order: 11, created_at: '', image: '/assets/basta.png', menu_type: 'kitchen' },
  { id: 'breakfast', name: 'الفطور', display_order: 12, created_at: '', image: '/assets/ftoor.webp', menu_type: 'kitchen' },
  { id: 'set-meals', name: 'سيت', display_order: 13, created_at: '', image: '/assets/seat.webp', menu_type: 'kitchen' },
  { id: 'extra-kitchen', name: 'مطبخ اكسترا', display_order: 14, created_at: '', image: '/assets/akstra.png', menu_type: 'kitchen' },
  
  // منيو بار
  { id: 'hookah', name: 'معسل تفاحتين', display_order: 1, created_at: '', image: '/assets/Traditional hookah with blue accents.png', menu_type: 'bar' },
  { id: 'extra-bar', name: 'اكسترا بار', display_order: 2, created_at: '', image: '/assets/extras.png', menu_type: 'bar' },
  { id: 'sweets', name: 'الحلويات', display_order: 3, created_at: '', image: '/assets/sweet.png', menu_type: 'bar' },
  { id: 'cold-coffee', name: 'القهوة الباردة', display_order: 4, created_at: '', image: '/assets/cold-coffee.png', menu_type: 'bar' },
  { id: 'cocktails', name: 'الكوكتيلات', display_order: 5, created_at: '', image: '/assets/cocktail.png', menu_type: 'bar' },
  { id: 'hot-drinks', name: 'المشروبات الساخنة', display_order: 6, created_at: '', image: '/assets/cafe.webp', menu_type: 'bar' },
  { id: 'milkshakes', name: 'الميلك شيك', display_order: 7, created_at: '', image: '/assets/milkshake.png', menu_type: 'bar' },
  { id: 'ice-tea', name: 'ايس تي', display_order: 8, created_at: '', image: '/assets/icetea.png', menu_type: 'bar' },
  { id: 'sports-drink', name: 'سبورت درينك', display_order: 9, created_at: '', image: '/assets/sport-drink.png', menu_type: 'bar' },
  { id: 'sodas', name: 'صودا', display_order: 10, created_at: '', image: '/assets/soda.webp', menu_type: 'bar' },
  { id: 'seasonal-juices', name: 'عصائر موسمية', display_order: 11, created_at: '', image: '/assets/seasonal-juice.png', menu_type: 'bar' },
  { id: 'fresh-juices', name: 'فريش', display_order: 12, created_at: '', image: '/assets/fresh-juice.png', menu_type: 'bar' },
];