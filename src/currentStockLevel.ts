import stocks from './data/stock.json';
import transactions from './data/transactions.json';
import { Stock, Transaction } from './types/data';

interface CurrentStockLevels {
  sku: string
  qty: number
}

export const currentStockLevels = async (sku: string): Promise<CurrentStockLevels> => {
  let currentSkuStock: number

  // get stock quantity in stock.json
  const skuStock = stocks.find((stock: Stock) => stock.sku === sku);

  if (!skuStock) {
    throw Error("SKU not found in stocks")
  }

  currentSkuStock = skuStock.stock;

  // get all object containing the given sku in transactions
  const allTransactionsSku = transactions.filter((transaction: Transaction) => transaction.sku === sku);

  if (allTransactionsSku.length === 0) {
    throw Error("SKU not found in transactions")
  }

  allTransactionsSku.forEach((transaction: Transaction) => {
    // if refund add quantity else if order subtract quantity
    if (transaction.type === 'order') {
      currentSkuStock = currentSkuStock - transaction.qty
    }

    if (transaction.type === 'refund') {
      currentSkuStock = currentSkuStock + transaction.qty
    }
  });

  return { sku, qty: currentSkuStock };
};
