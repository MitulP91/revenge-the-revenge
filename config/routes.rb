AndrewmaddenCom::Application.routes.draw do

  

  # The priority is based upon order of creation:
  # first created -> highest priority.
  devise_for :users
  post '/comment/create' => 'projects#create'
  root to: 'projects#index'



end
