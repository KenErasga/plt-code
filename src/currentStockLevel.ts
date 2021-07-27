import { getStock, getTransactions, getTotalStock } from './utils'

interface CurrentStockLevels {
  sku: string
  qty: number
}

export const currentStockLevels = async (sku: string): Promise<CurrentStockLevels> => {
  const skuStock = getStock(sku);

  const allTransactionsSku = getTransactions(sku);

  // check if it's in stock and transactions
  if (skuStock.stock === 0 && allTransactionsSku.length === 0) {
    throw Error("SKU not found in stocks and transactions");
  }

  const totalSkuStock = getTotalStock(skuStock, allTransactionsSku)

  return { sku, qty: totalSkuStock };
};
