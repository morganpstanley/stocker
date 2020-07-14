class StocksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        if session[:user_id]
            @stocks = Stock.where("user_id = ?", session[:user_id])
        else
            @stocks = Stock.all
        end
        render json: @stocks
    end

    def create
        stock = Stock.new(stock_params)
        stock.user_id = current_user.id
        stock.save
        render json: stock
    end

    def update
        stock = Stock.find_by_id(params[:id])
        stock.update(stock_params)
        render json: stock
    end

    def destroy
        stock = Stock.find_by_id(params.require(:id))
        Stock.destroy(params[:id])
    end
    
    
private

    def stock_params
        params.require(:stock).permit(:name, :user_id, :purchase_amount, :purchase_price, :ticker_symbol)
    end

end
