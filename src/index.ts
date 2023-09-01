import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';
import ProductController from './resources/product/product.controller';
validateEnv();

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit the process, or you can choose to do something else
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You can also log this error to a logging service or file if needed
});
const app = new App(
    [new PostController(), new UserController(), new ProductController()],
    Number(process.env.PORT)
);

app.listen();
