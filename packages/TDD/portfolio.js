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

    sell(tickr, shares) {
        const existingStock = this.stocks.find(stock => stock.tickr === tickr);
        if (!existingStock) { // You don't own the stock
          throw new Error(`Cannot sell: ${tickr} not found in portfolio.`);
        } 
        if (shares > existingStock.shares) { // trying to sell more share than you own
          throw new Error(`Cannot sell: Not enough shares of ${tickr}.`);
        }
        existingStock.shares -= shares;
        if (existingStock.shares === 0) { // if all shares are sold remove the stock
          this.stocks = this.stocks.filter(stock => stock.tickr !== tickr);
        }
      }
      
}

module.exports = Portfolio;
  