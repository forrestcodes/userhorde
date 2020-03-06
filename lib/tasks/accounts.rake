namespace :accounts do
  desc 'Seed Accounts with API Tokens'
  task seed_api_tokens: :environment do
    Account.where(api_token: nil).find_each do |account|
      token = SecureRandom.urlsafe_base64
      account.update_columns(api_token: token)
    end
  end
end
