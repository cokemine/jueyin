export namespace Category {

  export interface Child {
    category_id: number;
    category_name: string;
  }

  export interface Category {
    category_id: number;
    category_name: string;
    children: Child[];
  }

  export interface RootObject {
    categories: Category[];
  }

}
