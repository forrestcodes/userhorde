class SessionsController < ApplicationController
  def new
    redirect_to users_path if current_account.present?
  end

  def create
    account = Account.find_by_login(session_params[:login])

    if account && account.valid_password?(session_params[:password])
      session[:account_id] = account.id
      render_success(201, account: account)
    else
      session[:account_id] = nil
      render_error(422, errors: 'Invalid credentials. Please try again.')
    end
  end

  def destroy
    session[:account_id] = nil
    render_success(200)
  end

  private

  def session_params
    params.require(:session).permit(:login, :password)
  end
end