class ApplicationController < ActionController::Base

  def verify_authorized
    if current_account.blank?
      redirect_to root_path, alert: 'Please Sign In.'
    end
  end

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
