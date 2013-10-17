AndrewmaddenCom::Application.routes.draw do

  devise_for :users, :controllers => {:sessions => 'sessions'}

  post '/comment/create' => 'projects#create'
  post '/score/create' => 'projects#scores'

  get '/my_scores' => 'projects#profile', as: "my_scores"
  get '/projects/high_scores' => 'projects#high_scores', as: "high_scores"

  root to: 'projects#index'

#         new_user_session GET    /users/sign_in(.:format)        sessions#new
#             user_session POST   /users/sign_in(.:format)        sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)       sessions#destroy
#            user_password POST   /users/password(.:format)       devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)   devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)  devise/passwords#edit
#                          PUT    /users/password(.:format)       devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)         devise/registrations#cancel
#        user_registration POST   /users(.:format)                devise/registrations#create
#    new_user_registration GET    /users/sign_up(.:format)        devise/registrations#new
#   edit_user_registration GET    /users/edit(.:format)           devise/registrations#edit
#                          PUT    /users(.:format)                devise/registrations#update
#                          DELETE /users(.:format)                devise/registrations#destroy
#           comment_create POST   /comment/create(.:format)       projects#create
#             score_create POST   /score/create(.:format)         projects#scores
#                my_scores GET    /my_scores(.:format)            projects#profile
#              high_scores GET    /projects/high_scores(.:format) projects#high_scores
#                     root        /                               projects#index
end
