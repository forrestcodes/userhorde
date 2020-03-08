class UsersController < ApplicationController
  before_action :verify_authorized

  def index
    @users = current_account.users.search(search_params).page(search_params[:page]).per(25)
    @total_pages = @users.total_pages

    respond_to do |f|
      f.html
      f.json do
        render json: {users: @users, user_page_count: @total_pages}
      end
    end
  end

  private

  def users_params

  end

  def search_params
    params.permit(:sort_attr, :sort_dir, :q, :page)
  end
end
