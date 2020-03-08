class Searches::UsersController < ApplicationController
  def index
    users = current_account.users.search(search_params).page(search_params[:page]).per(25)

    render json: {users: users}
  end

  private

  def search_params
    params.permit(:sort_attr, :sort_dir, :q, :page)
  end
end