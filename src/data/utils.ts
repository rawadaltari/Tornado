import { CATEGORIES } from './categories';
import { MENU_ITEMS } from './menu-items';
import type { Category, MenuItem } from '../lib/database.types';

// تصفية التصنيفات حسب نوع المنيو
export function getCategoriesByMenuType(menuType: 'kitchen' | 'bar'): Category[] {
  return CATEGORIES
    .filter(category => category.menu_type === menuType)
    .sort((a, b) => a.display_order - b.display_order);
}

// تصفية الأصناف حسب نوع المنيو
export function getMenuItemsByMenuType(menuType: 'kitchen' | 'bar'): MenuItem[] {
  // إنشاء خريطة للتصنيفات للبحث السريع
  const categoryMap = new Map<string, Category>();
  CATEGORIES.forEach(category => {
    categoryMap.set(category.id, category);
  });

  return MENU_ITEMS
    .filter(item => {
      const category = categoryMap.get(item.category_id);
      return category?.menu_type === menuType;
    })
    .sort((a, b) => a.display_order - b.display_order);
}

// الحصول على الأصناف حسب التصنيف
export function getItemsByCategory(categoryId: string): MenuItem[] {
  return MENU_ITEMS
    .filter(item => item.category_id === categoryId)
    .sort((a, b) => a.display_order - b.display_order);
}

// الحصول على التصنيف حسب ID
export function getCategoryById(categoryId: string): Category | undefined {
  return CATEGORIES.find(category => category.id === categoryId);
}

// ترتيب الأصناف حسب التصنيف
export function getGroupedItemsByMenuType(menuType: 'kitchen' | 'bar'): Record<string, MenuItem[]> {
  const categories = getCategoriesByMenuType(menuType);
  const groupedItems: Record<string, MenuItem[]> = {};

  categories.forEach(category => {
    const items = getItemsByCategory(category.id);
    if (items.length > 0) {
      groupedItems[category.id] = items;
    }
  });

  return groupedItems;
}