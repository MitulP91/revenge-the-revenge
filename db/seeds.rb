User.delete_all
Score.delete_all
Comment.delete_all

nastyboy = User.create(email: "nastyboy@andrewmadden.com", password: "password", password_confirmation: "password")
comment1 = Comment.create(the_comment: "This game is ill nasty!")
score1 = Score.create(the_score: 9000)

nastyboy.comments << comment1
nastyboy.scores << score1
