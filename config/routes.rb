AndrewmaddenCom::Application.routes.draw do

  

  root to: 'projects#index'
  # The priority is based upon order of creation:
  # first created -> highest priority.
  devise_for :users




end
