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
  
  test('Portfolio should not include tickers with zero shares after sale', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add Game Stop
    portfolio.sell('GMR', 5); // Sell all shares of GMR
    expect(portfolio.getStocks()).toEqual([]); // GMR should be removed
  });
  
  test('Portfolio should not include tickers with zero shares after multiple updates', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add Game Stop
    portfolio.sell('GMR', 3); // Sell some shares of GMR
    portfolio.sell('GMR', 2); // Sell remaining shares of GMR
    expect(portfolio.getStocks()).toEqual([]); // GMR should be removed
  });
  
  test('Portfolio should not include tickers with zero shares if tickers are added and removed repeatedly', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add Game Stop
    portfolio.sell('GMR', 5); // Remove GMR
    portfolio.makePurchase('GMR', 10); // Add GMR back
    portfolio.sell('GMR', 10); // Remove GMR again
    expect(portfolio.getStocks()).toEqual([]); // GMR should be removed
  });

  test('Portfolio should return 0 shares for a non-existent symbol', () => {
    const portfolio = new Portfolio();
    expect(portfolio.getShares('GMR')).toBe(0); // GMR is not in the portfolio
  });
  
  test('Portfolio should return the correct number of shares for an existing symbol', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add 5 shares of GMR
    expect(portfolio.getShares('GMR')).toBe(5);
  });
  
  test('Portfolio should return updated shares after multiple purchases of the same symbol', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add 5 shares of GMR
    portfolio.makePurchase('GMR', 10); // Add 10 more shares of GMR
    expect(portfolio.getShares('GMR')).toBe(15); // Total shares should be 15
  });
  
  test('Portfolio should return 0 after selling all shares of a symbol', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add 5 shares of GMR
    portfolio.sell('GMR', 5); // Sell all shares of GMR
    expect(portfolio.getShares('GMR')).toBe(0); // GMR is no longer in the portfolio
  });

  test('Portfolio should not allow selling more shares than owned', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add 5 shares of GMR
    expect(() => portfolio.sell('GMR', 10)).toThrow('Cannot sell: Not enough shares of GMR.');
  });
  
  test('Portfolio should allow selling exact number of shares owned', () => {
    const portfolio = new Portfolio();
    portfolio.makePurchase('GMR', 5); // Add 5 shares of GMR
    expect(() => portfolio.sell('GMR', 5)).not.toThrow(); // Selling all shares should be valid
    expect(portfolio.getShares('GMR')).toBe(0); // GMR should no longer exist in the portfolio
  });
  
  