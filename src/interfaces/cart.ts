import Product from '../interfaces/product';

export default interface Cart{
    id: number;
    productId: number;
    product: Product;
    quantity: number;
    customerId: number;
    username: string;
}