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
    },
    {
        sku: "test3",
        type: "refund",
        qty: 2
    }
]);

describe('getStock()', () => {
    it('should return a {sku, stock} when sku is in stock.json', async () => {
        expect(getStock('test')).toEqual({ sku: 'test', stock: 10 });
    })

    it('should return a {sku, stock} when its not in stock.json', async () => {
        expect(getStock('test3')).toEqual({ sku: 'test3', stock: 0 });
    })
});

describe('getTransactions()', () => {
    it('should return all transactions related to the SKU', async () => {
        const expectedTransactions = [
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
        ];

        expect(getTransactions('test')).toEqual(expectedTransactions);
    })
});

describe('getTotalStock()', () => {
    it('should return the calculated SKU stock', async () => {
        const stockTestData = {
            sku: 'test',
            stock: 10
        };
        const transactionsTestData = [
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
        ];

        expect(getTotalStock(stockTestData, transactionsTestData)).toEqual(9);
    })
});


