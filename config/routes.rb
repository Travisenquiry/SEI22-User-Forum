Rails.application.routes.draw do
  get 'index' => 'onepage#index'
  root 'onepage#index'
  resources :communities
  devise_for :users, :controllers => { registrations: 'registrations' }
  match ':not_found' => redirect('/'), :via => [:get],
  :constraints => { :not_found => /.*/ }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end