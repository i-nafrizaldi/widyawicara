import { Product } from "./product.type";
import { TransactionItem } from "./transactionItem.type";
import { User } from "./user.type";

export interface Transaction {
  id: number;
  userId: number;
  createdAt: Date;
  total: number;
  type: TransactionType;
  user: User;
  items: TransactionItem[];
  Product: Product[];
}

export enum TransactionType {
  PURCHASE = "PURCHASE",
  SELL = "SELL",
}
