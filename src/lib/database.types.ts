export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          created_at: string;
          image?: string | null;
          menu_type: 'kitchen' | 'bar';
        };
        Insert: {
          id?: string;
          name: string;
          display_order?: number;
          created_at?: string;
          image?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          created_at?: string;
          image?: string | null;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string;
          price: number;
          image_url: string | null;
          display_order: number;
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string;
          price: number;
          image_url?: string | null;
          display_order?: number;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string | null;
          display_order?: number;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
export type MenuItem = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  display_order: number;
  available: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = Database['public']['Tables']['categories']['Row'];
// export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
