class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :user_id
      t.integer :purchase_price
      t.integer :purchase_amount

      t.timestamps
    end
  end
end
