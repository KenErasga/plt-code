import { currentStockLevels } from '../currentStockLevel';

jest.mock('../data/stock.json', () => [
    {
        sku: 'test',
        stock: 10
    },
    {
        sku: 'test2',
        stock: 9
    }
]);

jest.mock('../data/transactions.json', () => [
    {
        sku: "test",
        type: "order",
        qty: 3
    },
    {
        sku: "test",
        type: "refund",
        qty: 2
    }
]);

describe('currentStockLevel()', () => {
    it('should return the current stock level and the SKU', async () => {
        expect(await currentStockLevels('test')).toEqual({ sku: 'test', qty: 9 });
    })

    it('should throw an error when SKU is not in stocks', async () => {
        await expect(currentStockLevels('tes')).rejects.toThrow('SKU not found in stocks');
    })

    it('should throw an error when SKU is not in transactions', async () => {
        await expect(currentStockLevels('test2')).rejects.toThrow('SKU not found in transactions');
    })
});

