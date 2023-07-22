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
        this.router.get(`${this.path}/getall`, this.getAll);
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
            next(new HttpException(400, 'Cannot create Product'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { ...data } = req.body;
            const resdata = await this.productService.update(data._id, data);
            res.status(201).json({ resdata });
        } catch (error) {
            next(new HttpException(400, 'Cannot Update Product'));
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
            res.status(201).json({ resdata });
        } catch (error) {
            next(new HttpException(400, 'Cannot Delete Product'));
        }
    };

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id, name, price } = req.body;
            const data = await this.productService.getAll();
            res.status(201).json({ data });
        } catch (error) {
            next(new HttpException(400, 'Cannot get Products'));
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
            res.status(201).json({ data });
        } catch (error) {
            next(new HttpException(400, 'Cannot get Products'));
        }
    };
}

export default ProductController;
