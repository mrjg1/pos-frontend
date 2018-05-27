import Product from '../interfaces/product';
import Customer from '../interfaces/customer';
import Employee from '../interfaces/employee';

export default class Cart{
    id: number;
    product: Product;
    quantity: number;
    customerId: number;
    username: string;
}