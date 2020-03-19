class UsersController < ApplicationController
  before_action :verify_authorized

  def index
    @users = current_account.users.search(search_params).page(search_params[:page].presence || 1).per(25)
    @total_pages = @users.total_pages

    # If this expands past a one liner we'll use a proper serializer.
    @users = @users.as_json(methods: [:created_at_short, :created_at_long, :updated_at_short, :updated_at_long])

    respond_to do |f|
      f.html
      f.json do
        render json: {users: @users, user_page_count: @total_pages}
      end
    end
  end

  def create
    user = current_account.users.new(users_params)

    if user.save
      render_success(201, user: user)
    else
      render_error(422, errors: user.errors.full_messages.to_sentence)
    end
  end

  def update
    user = current_account.users.find_by_id(params[:id])
    render_error(404, errors: 'Not Found') and return if user.blank?

    if user.update(users_params)
      render_success(201, user: user)
    else
      render_error(422, errors: user.errors.full_messages.to_sentence)
    end
  end

  def destroy
    user = current_account.users.find_by_id(params[:id])
    render_error(404, errors: 'Not Found') and return if user.blank?

    if user.destroy
      render_success(201, user: user)
    else
      render_error(422, errors: user.errors.full_messages.to_sentence)
    end
  end

  private

  def users_params
    params.require(:user).permit(:name, :email, :title, :phone, :active)
  end

  def search_params
    params.permit(:sort_attr, :sort_dir, :q, :page)
  end
end
