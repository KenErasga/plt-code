import stocks from './data/stock.json';
import transactions from './data/transactions.json';

import { Stock, Transaction } from './types/data';

const getStock = (sku: string): Stock => {
  // get stock quantity in stock.json
  const skuStock = stocks.find((stock: Stock) => stock.sku === sku);

  if (!skuStock) {
    throw new Error("SKU not found in stocks")
  }

  return skuStock;
}

const getTransactions = (sku: string): Array<Transaction> => {
  // get all object containing the given sku in transactions
  const allTransactionsSku = transactions.filter((transaction: Transaction) => transaction.sku === sku);

  if (allTransactionsSku.length === 0) {
    throw new Error("SKU not found in transactions")
  }

  return allTransactionsSku;
}

const getTotalStock = (skuStock: Stock, transactions: Array<Transaction>) => {
  let totalSkuStock = skuStock.stock;

  transactions.forEach((transaction: Transaction) => {
    // if refund add quantity else if order subtract quantity
    if (transaction.type === 'order') {
      totalSkuStock = totalSkuStock - transaction.qty
    }

    if (transaction.type === 'refund') {
      totalSkuStock = totalSkuStock + transaction.qty
    }
  });

  return totalSkuStock
}

export { getStock, getTransactions, getTotalStock }