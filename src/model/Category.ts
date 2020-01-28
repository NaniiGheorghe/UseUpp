import { Product } from "./Product";

export class Category {
    static categories: Category[] = [
        new Category('mobileProducts', 'Mobile Products', 'phone-portrait', 'IMEI'),
        new Category('electronics', 'Electronics', 'desktop', 'Serial Number'),
        new Category('homeAndKitchen', 'Home & Kitchen', 'home', 'Serial Number'),
        new Category('kidsAndBaby', 'Kids and Baby', 'baseball', 'Serial Number'),
        new Category('automotive', 'Automotive', 'car', 'VIN'),
        new Category('beautyAppliances', 'Beauty Appliances', 'cut', 'Serial Number'),
        new Category('healthPersonalCare', 'Health & Personal Care', 'thermometer', 'Serial Number'),
        new Category('patioGarden', 'Patio & Garden', 'flower', 'Serial Number'),
        new Category('jewelry', 'Jewelry', 'trophy', 'Serial Number'),
        new Category('other', 'Other', 'cube', 'Barcode')
    ];

    static categoriesMap: { [id: string]: Category } = Category.initCategogiesMap();
    productsMap = new Map();
    products: Product[] = [];

    private static initCategogiesMap(): { [id: string]: Category } {
        let categoryMap: { [id: string]: Category } = {};
        Category.categories.forEach(category => {
            categoryMap[category.id] = category;
        });

        return categoryMap;
    }

    public static reset() {
        Category.categories.forEach(category => {
            category.productsMap = new Map();
            category.updateProducts();
        });        
    }

    constructor(public id: string, public name: string, public icon: string, public barcodeMeaning: string) {

    }

    static findById(category_id): Category {
        return Category.categoriesMap[category_id];
    }

    static defaultCategory(): Category {
        return Category.categoriesMap['other'];
    }

    addProduct(product: Product) {
        this.productsMap.set(product._id, product);
        product.categoryId = this.id;

        this.updateProducts();
    }

    removeProduct(product: Product) {
        this.productsMap.delete(product._id);

        this.updateProducts();
    }

    private updateProducts() {
        this.products = Array.from(this.productsMap.values());
    }
}