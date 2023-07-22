import Product from '@/resources/product/product.interface';
import ProductModel from '@/resources/product/product.model';

class ProductService {
    private product = ProductModel;

    public async create(data: any): Promise<Product> {
        try {
            const post = await this.product.create(data);
            return post;
        } catch (error) {
            throw new Error('Unable to create Product');
        }
    }

    public async update(id: string, data: any): Promise<Product> {
        try {
            const post = await this.product.findByIdAndUpdate(id, data, {
                new: true,
            });
            if (!post) {
                throw new Error('Product not found');
            }
            return post;
        } catch (error) {
            throw new Error('Unable to update product');
        }
    }
    public async delete(id: string): Promise<string> {
        try {
            const deletedProduct = await this.product.findByIdAndDelete(id);
            if (!deletedProduct) {
                throw new Error('Product not found');
            }
            return id;
        } catch (error) {
            throw new Error('Unable to delete product');
        }
    }

    public async getById(id: string): Promise<Product> {
        try {
            const product = await this.product.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error('Unable to retrieve product');
        }
    }

    public async getAll(): Promise<Product[]> {
        try {
            const products = await this.product.find();
            return products;
        } catch (error) {
            throw new Error('Unable to retrieve products');
        }
    }
}

export default ProductService;
