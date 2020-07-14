class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
        render json: @users
    end

    def create
        @user = User.new(user_params) 
        if params[:user][:password] == params[:user][:password_confirmation] && @user.save
            login!
            render json: {
                status: 'created',
                user: @user
            }
        else
            render json: {
                status: 505,
                errors: @user.errors.full_messages 
            }
        end  
    end

private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end
    
end
