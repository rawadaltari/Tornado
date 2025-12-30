import { getCategoriesByMenuType, getGroupedItemsByMenuType, getMenuItemsByMenuType } from './utils';

export class MenuService {
  // الحصول على منيو المطبخ
  static getKitchenMenu() {
    return {
      categories: getCategoriesByMenuType('kitchen'),
      items: getMenuItemsByMenuType('kitchen'),
      groupedItems: getGroupedItemsByMenuType('kitchen')
    };
  }

  // الحصول على منيو البار
  static getBarMenu() {
    return {
      categories: getCategoriesByMenuType('bar'),
      items: getMenuItemsByMenuType('bar'),
      groupedItems: getGroupedItemsByMenuType('bar')
    };
  }

  // البحث عن صنف بالاسم
  static searchItems(query: string, menuType?: 'kitchen' | 'bar') {
    let items = MENU_ITEMS;
    
    if (menuType) {
      items = getMenuItemsByMenuType(menuType);
    }

    const searchTerm = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  // الحصول على أصناف متاحة فقط
  static getAvailableItems(menuType?: 'kitchen' | 'bar') {
    let items = MENU_ITEMS;
    
    if (menuType) {
      items = getMenuItemsByMenuType(menuType);
    }

    return items.filter(item => item.available);
  }
}