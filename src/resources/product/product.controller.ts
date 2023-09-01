import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ProductService from './product.service';

class ProductController implements Controller {
    public path = '/product';
    public router = Router();
    private productService = new ProductService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            //  validationMiddleware(validate.create),
            this.create
        );
        this.router.post(`${this.path}/getall`, this.getAll);
        this.router.put(`${this.path}/update`, this.update);
        this.router.delete(`${this.path}/delete`, this.delete);
        this.router.get(`${this.path}/getbyid`, this.getById);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            //  const { id, name, price } = req.body;
            const data = req.body;
            const resdata = await this.productService.create(data);
            res.status(201).json({ resdata });
        } catch (error) {
            console.error('Create Product Error:', error); // Log the error for debugging purposes
            next(new HttpException(500, 'Error while creating Product')); // Providing a more descriptive error message
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const data = req.body;
            const resdata = await this.productService.update(data._id, data);
            return res.status(200).json({ resdata });
        } catch (error) {
            console.error('Update Product Error:', error);
            next(new HttpException(500, 'Error while updating Product'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.query.id as string;
            const resdata = await this.productService.delete(id);
            return res.status(200).json();
        } catch (error) {
            console.error('Delete Product Error:', error);
            next(new HttpException(400, 'Cannot Delete Product'));
        }
    };

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { page = 1, limit = 10, search } = req.body;
            const data = await this.productService.getAllPaginated(
                page,
                limit,
                search
            );
            const count = await this.productService.countDocuments();
            return res.status(200).json({
                data,
                totalPages: Math.ceil(count / limit),
                count,
            });
        } catch (error) {
            console.error('Get All Products Error:', error);
            next(new HttpException(500, 'Error while retrieving Products'));
        }
    };

    private getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.query.id as string;
            const data = await this.productService.getById(id);
            return res.status(200).json({ data }); // Using 200 OK status for successful response
        } catch (error) {
            console.error('Get Product by ID Error:', error); // Log the error for debugging purposes
            next(new HttpException(500, 'Error while fetching Product by ID')); // Providing a more descriptive error message
        }
    };
}

export default ProductController;
