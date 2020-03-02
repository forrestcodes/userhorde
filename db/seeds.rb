require 'faker'

puts "Building seed data..."


Account.transaction do

  User.delete_all
  Account.delete_all

  account = Account.create!(phone: Faker::PhoneNumber.cell_phone, login: "Trainual", password: 'Trainual1')
  users = []

  1000.times do
    users.push(
        {
            name: Faker::Name.name,
            email: Faker::Internet.email,
            title: Faker::Job.title,
            phone: Faker::PhoneNumber.cell_phone,
            active: [true, true, true, false].sample,
            account_id: account.id,
            updated_at: Faker::Date.between(from: 2.years.ago, to: Date.today),
            created_at: Faker::Date.between(from: 2.years.ago, to: Date.today)
        }
    )
    print '.'
  end

  puts ''
  puts 'Inserting seed data into db...'

  User.insert_all(users)

  puts 'Done!'
  puts "#{Account.count} Accounts created."
  puts "#{User.count} Users created."
end
