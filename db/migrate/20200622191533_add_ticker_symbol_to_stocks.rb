class AddTickerSymbolToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :ticker_symbol, :string
  end
end
