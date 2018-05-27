import Product from "./product";
import Customer from "./customer";

export default interface Order{
    id: number;
    orderNumber: number;
    customerId: number;
    customer: Customer;
    productId: number;
    product: Product;
    username: string;
    quantity: number;
    orderDate: string;
    ordertime: string;
    total: number;
    orderStatus: string;
    paymentMethod: string;
}