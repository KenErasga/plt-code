
import { getStock, getTransactions, getTotalStock } from './utils'

interface CurrentStockLevels {
  sku: string
  qty: number
}

export const currentStockLevels = async (sku: string): Promise<CurrentStockLevels> => {
  const skuStock = getStock(sku);

  const allTransactionsSku = getTransactions(sku);

  const totalSkuStock = getTotalStock(skuStock, allTransactionsSku)

  return { sku, qty: totalSkuStock };
};
