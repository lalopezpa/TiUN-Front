import {type ProductType} from './ProductSchema';
import {type ProductFormDataType} from './ProductFormSchema';
export type CrudMethods = {
	getProducts: () => Promise<ProductType[]>;
	createProduct: (productData: ProductFormDataType) => Promise<ProductType>;
	updateProduct: (productId: string, productData: ProductFormDataType) => Promise<ProductType>;
	deleteProduct: (productId: string) => Promise<ProductType>;
};
