import stock from './data/stock.json';
import transactions from './data/transactions.json';

interface CurrentStockLevels {
  sku: string
  qty: number
}

export const currentStockLevels = async (sku: string): Promise<CurrentStockLevels> => {
  console.log(stock);
  console.log(transactions);
  return { sku, qty: 1 };
};
