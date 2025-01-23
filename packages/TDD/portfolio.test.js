const Portfolio = require('./portfolio');

test('Empty portfolio initialization', () => {
    const portfolio = new Portfolio();
    expect(portfolio.getStocks()).toEqual([]);
});

test('Empty portfolio returns bool', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBeTruthy();
});

test('Make stock purchase', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('AMZN', 10)
    expect(portfolio.getStocks()).toEqual([{ tickr: 'AMZN', shares: 10}]);
});