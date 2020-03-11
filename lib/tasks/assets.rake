Rake::Task["assets:precompile"].clear
namespace :assets do
  task 'precompile' do
    puts "Running cd client && yarn run build:production..."
    `cd client && yarn run build:production`
  end
end