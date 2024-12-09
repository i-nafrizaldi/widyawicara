import { Transaction } from "./transaction.type";
import { TransactionItem } from "./transactionItem.type";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
  Transaction: Transaction[];
  TransactionItem: TransactionItem[];
}
