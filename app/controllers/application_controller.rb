class ApplicationController < ActionController::Base
  before_action :login_using_api_token
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  def verify_authorized
    if current_account.blank?
      redirect_to root_path, alert: 'Please Sign In.' and return if request.format.html?
      render_error(401, errors: 'Unauthorized') and return if request.format.json?
    end
  end

  def current_account
    @current_account ||= (Account.find_by_id(session[:account_id]) || Account.find_by_api_token(request.headers['x-api-token']))
  end

  def render_success(status = 200, meta_data = {})
    render json: {status: status, success: true}.merge!(meta_data)
  end

  def render_error(status = 400, meta_data = {})
    render json: {status: status, success: false}.merge!(meta_data)
  end

  def login_using_api_token
    unless current_account.present?
      puts "Login via token"
      account = Account.find_by_api_token(params[:api_token])
      if account
        puts "Logged in via token"
        session[:account_id] = account.id
      end
    end
  end
end
