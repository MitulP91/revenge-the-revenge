AndrewmaddenCom::Application.routes.draw do

  devise_for :users
  root to: 'projects#home'



end
