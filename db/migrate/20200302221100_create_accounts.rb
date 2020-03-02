class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :phone
      t.string :login
      t.string :password_hash

      t.timestamps
    end
  end
end
