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

  test('Portfolio should return 0 tickers when empty', () => {
    const portfolio = new Portfolio();
    expect(portfolio.countTickers()).toBe(0);
  });
  
  test('Portfolio should return the correct count of unique tickers', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add Game Stop
    portfolio.makePurchase('RBLX', 10); // Add Roblox
    expect(portfolio.countTickers()).toBe(2);
  });
  
  test('Portfolio should not double count the same ticker', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5);
    portfolio.makePurchase('GMR', 10); // Add more shares of the same ticker
    expect(portfolio.countTickers()).toBe(1);
  });
  
  