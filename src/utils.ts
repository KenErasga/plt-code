import stocks from './data/stock.json';
import transactions from './data/transactions.json';

import { Stock, Transaction } from './types/data';

const getStock = (sku: string): Stock => {
  // get stock quantity in stock.json
  const skuStock = stocks.find((stock: Stock) => stock.sku === sku);

  const stock = skuStock || {
    sku,
    stock: 0
  }

  return stock;
}

const getTransactions = (sku: string): Array<Transaction> => {
  // get all object containing the given sku in transactions
  return transactions.filter((transaction: Transaction) => transaction.sku === sku);
}

const getTotalStock = (skuStock: Stock, transactions: Array<Transaction>) => {
  let totalStock = skuStock.stock;

  transactions.forEach((transaction: Transaction) => {
    // if refund add quantity else if order subtract quantity
    if (transaction.type === 'order') {
      totalStock = totalStock - transaction.qty
    }

    if (transaction.type === 'refund') {
      totalStock = totalStock + transaction.qty
    }
  });

  return totalStock;
}

export { getStock, getTransactions, getTotalStock }