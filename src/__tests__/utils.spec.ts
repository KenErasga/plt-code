import { getStock, getTransactions, getTotalStock } from '../utils';

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

describe('getStock()', () => {
    it('should return a stock when it finds one', async () => {
        expect(getStock('test')).toEqual({ sku: 'test', stock: 10 });
    })
});

describe('getTransactions()', () => {
    it('should return all transactions related to the SKU', async () => {
        const transactions = [
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
        ]

        expect(getTransactions('test')).toEqual(transactions);
    })
});

describe('getTotalStock()', () => {
    it('should return the calculated SKU stock', async () => {
        const skuStock = {
            sku: 'test',
            stock: 10
        };
        const transactions = [
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
        ]
        expect(getTotalStock(skuStock, transactions)).toEqual(9);
    })
});


