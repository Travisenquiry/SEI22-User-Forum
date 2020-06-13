Rails.application.routes.draw do
  resources :topics
  get 'index' => 'onepage#index'
  get 'community/:id/topics/new' => 'topics#new'
  get 'community/:id/topics/:topic_id' => 'onepage#topic'
  get 'community/:id' => 'onepage#community'
  get 'community/new' => 'communities#new'
  resources :communities
  devise_for :users, :controllers => { registrations: 'registrations' }
  root 'onepage#index'

  match ':not_found' => redirect('/'), :via => [:get],
  :constraints => { :not_found => /.*/ }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end