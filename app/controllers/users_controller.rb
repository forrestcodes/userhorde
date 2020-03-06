class UsersController < ApplicationController
  before_action :verify_authorized

  def index
    @account = current_account
  end
end
