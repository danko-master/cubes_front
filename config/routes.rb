Rails.application.routes.draw do
	root 'home#show'

	get '/cubes' => 'cubes_server_proxy#index'

	get '/cube/:id/model' => 'cubes_server_proxy#index'

	get '/cube/:id/aggregate' => 'cubes_server_proxy#index'

	get '/cube/:id/facts' => 'cubes_server_proxy#index'

	get '/cube/:id/members/:id' => 'cubes_server_proxy#index'

  resources :reports, only: [:index, :show, :new, :create]
end
