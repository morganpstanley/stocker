# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([ name: 'Star Wars' ,  name: 'Lord of the Rings' ])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Stock.delete_all

morgan = User.create(username: 'Morgan', password: 'password')
john = User.create(username: 'John', password: '123')

Stock.create(ticker_symbol: 'NKE', name: 'Nike', user_id: morgan.id, purchase_price: 90, purchase_amount: 10)
Stock.create(ticker_symbol: 'AAPL', name: 'Apple', user_id: morgan.id, purchase_price: 350, purchase_amount: 5)
Stock.create(ticker_symbol: 'AMZN', name: 'Amazon.com', user_id: morgan.id, purchase_price: 2500, purchase_amount: 1)

Stock.create(ticker_symbol: 'TSLA', name: 'Tesla', user_id: john.id, purchase_price: 300, purchase_amount: 15)
Stock.create(ticker_symbol: 'F', name: 'Ford Motor Company', user_id: john.id, purchase_price: 6, purchase_amount: 20)
Stock.create(ticker_symbol: 'DIS', name: 'Walt Disney Company', user_id: john.id, purchase_price: 100, purchase_amount: 4)
Stock.create(ticker_symbol: 'UAL', name: 'United Airlines', user_id: john.id, purchase_price: 33, purchase_amount: 80)
