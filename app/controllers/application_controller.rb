class ApplicationController < ActionController::Base
  def current_account
    @current_account ||= Account.find_by_id(session[:account_id])
  end

  def render_success(status = 200, meta_data = {})
    render json: {status: status, success: true}.merge!(meta_data)
  end

  def render_error(status = 400, meta_data = {})
    render json: {status: status, success: false}.merge!(meta_data)
  end

end
