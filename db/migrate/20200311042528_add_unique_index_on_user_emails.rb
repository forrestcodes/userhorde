class AddUniqueIndexOnUserEmails < ActiveRecord::Migration[6.0]
  def change
    add_index :users, [:email, :account_id], unique: true
  end
end
