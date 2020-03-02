class User < ApplicationRecord
  belongs_to :account, inverse_of: :users
end
