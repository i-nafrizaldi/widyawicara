import { Product } from "./product.type";
import { Transaction } from "./transaction.type";

export interface TransactionItem {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  price: number;

  transaction: Transaction;
  product: Product;
}
