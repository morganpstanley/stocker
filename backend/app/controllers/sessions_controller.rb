class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
       @user = User.find_by(username: session_params[:username])
        
       if @user && @user.authenticate(session_params[:password])
            login!
            render json: {
                logged_in: true,
                user: @user
            }
        else
            render json: {
                status: 401,
                error: 'no user found'
            }
        end 
    end

    def is_logged_in?
        if logged_in? && current_user
            render json: {
                logged_in: true,
                user: {id: current_user.id,  username: current_user.username}
            }
        else
            render json: {
                logged_in: false,
                message: 'no user found'
            }
        end
    end

    def destroy
        logout!
        render json: {
            status: 200,
            logged_out: true
        }
    end

private

    def session_params
        params.require(:payload).require(:user).permit(:username, :password)
    end
    
end
