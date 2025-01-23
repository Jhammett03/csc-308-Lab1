class Portfolio {
    constructor() {
      this.stocks = [];
    }
  
    getStocks() {
      return this.stocks;
    }

    isEmpty() {
        return this.stocks.length === 0;
    }

    makePurchase(tickr, shares) {
        const existingStock = this.stocks.find(stock => stock.tickr === symbol);
        if (existingStock) {
        existingStock.shares += shares; // Update share count for existing symbol
        } else {
        this.stocks.push({ tickr, shares }); // Add new symbol to portfolio
        }
    }
}

  
  module.exports = Portfolio;
  