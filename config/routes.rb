AndrewmaddenCom::Application.routes.draw do

  # The priority is based upon order of creation:
  # first created -> highest priority.
  devise_for :users
  root to: 'projects#index'

end
