class UsersController < ApplicationController
  before_action :verify_authorized

  def index
    @users = current_account.users.order('updated_at DESC', :name, :email, :title, :phone, :active)
    @users = @users.page(params[:page]).per(25)
    @total_pages = @users.total_pages
  end

  private

  def users_params

  end
end
