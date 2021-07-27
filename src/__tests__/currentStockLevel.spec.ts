import { currentStockLevels } from '../currentStockLevel';

jest.mock('../data/stock.json', () => [
    {
        sku: 'test1',
        stock: 10
    },
    {
        sku: 'test2',
        stock: 9
    }
]);

jest.mock('../data/transactions.json', () => [
    {
        sku: "test1",
        type: "order",
        qty: 3
    },
    {
        sku: "test1",
        type: "refund",
        qty: 2
    },
    {
        sku: "test3",
        type: "refund",
        qty: 2
    }
]);

describe('currentStockLevel()', () => {
    it('should return the current stock level and the SKU', async () => {
        expect(await currentStockLevels('test1')).toEqual({ sku: 'test1', qty: 9 });
    })

    it('should return the current stock level and the SKU, when not in transactions, but in stock', async () => {
        expect(await currentStockLevels('test2')).toEqual({ sku: 'test2', qty: 9 });
    })

    it('should return the current stock level and the SKU, when in transactions, but not in stock', async () => {
        expect(await currentStockLevels('test3')).toEqual({ sku: 'test3', qty: 2 });
    })

    it('should throw an error when SKU is not in stocks and transactions', async () => {
        await expect(currentStockLevels('tes')).rejects.toThrow('SKU not found in stocks');
    })
});

