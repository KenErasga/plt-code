import { currentStockLevels } from '../currentStockLevel';

it('should return a greeting', async () => {
    expect(await currentStockLevels('sku')).toEqual({ sku: 'sku', qty: 1 })
})