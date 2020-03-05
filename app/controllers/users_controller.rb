class UsersController < ApplicationController
  def index
    @account = current_account
  end
end
