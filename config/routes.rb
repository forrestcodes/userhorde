Rails.application.routes.draw do
  root 'sessions#new'
  resources :sessions, only: [:new, :create]
  resources :users
end
