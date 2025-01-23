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

test('Portfolio should subtract shares when a sale is made', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('AAPL', 10); // Buy 10 shares
    portfolio.sell('AAPL', 5); // Sell 5 shares
    expect(portfolio.getStocks()).toEqual([{ tickr: 'AAPL', shares: 5 }]);
  });
  
  test('Portfolio should remove a symbol if all shares are sold', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('AAPL', 10); // Buy 10 shares
    portfolio.sell('AAPL', 10); // Sell all 10 shares
    expect(portfolio.getStocks()).toEqual([]); // AAPL should be removed
  });
  
  test('Portfolio should throw an error if trying to sell more shares than owned', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('AAPL', 5); // Buy 5 shares
    expect(() => portfolio.sell('AAPL', 10)).toThrow(Error);
  });
  
  test('Portfolio should throw an error if trying to sell a non-existent symbol', () => {
    const portfolio = new Portfolio();
    expect(() => portfolio.sell('GOOG', 5)).toThrow(Error);
  });
  