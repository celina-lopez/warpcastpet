Rails.application.routes.draw do
  get '.well-known/farcaster' => 'farcaster#auth'
  get 'up' => 'rails/health#show', as: :rails_health_check

  get 'service-worker' => 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest

  root 'pages#index'

  resources :players, only: [ :create, :update ]
  resources :webhooks, only: [ :create ]
end
