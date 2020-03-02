class Account < ApplicationRecord
  include BCrypt

  has_many :users, inverse_of: :account

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def valid_password?(password)
    self.password == password
  end
end
