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

    // public async getAllPaginated(
    //     page: number,
    //     limit: number
    // ): Promise<Product[]> {
    //     try {
    //         const products = await this.product
    //             .find()
    //             .limit(limit * 1)
    //             .skip((page - 1) * limit)
    //             .sort({ createdAt: -1 });

    //         return products;
    //     } catch (error) {
    //         throw new Error('Unable to retrieve products');
    //     }
    // }
    public async getAllPaginated(
        page: number,
        limit: number,
        search?: string
    ): Promise<Product[]> {
        try {
            let query = {};
            if (search) {
                query = {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                    ],
                };
            }

            const products = await this.product
                .find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });

            return products;
        } catch (error) {
            throw new Error('Unable to retrieve products');
        }
    }

    public async countDocuments() {
        const count = await this.product.countDocuments();
        return count;
    }
}

export default ProductService;
