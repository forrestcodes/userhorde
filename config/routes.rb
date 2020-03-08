Rails.application.routes.draw do
  root 'sessions#new'
  resources :sessions, only: [:new, :create, :destroy]
  resources :users

  namespace :searches do
    resources :users, only: :index
  end
end
