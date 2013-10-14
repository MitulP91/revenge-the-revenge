require 'spec_helper'

describe User do
	before :each do
		# Creating A Score
		@the_score = 5000
		@user_id = 22
		@score = Score.new(the_score: @the_score, user_id: @user_id)

		# Creating A Comment
		@the_comment = 'This game is awesome. '
		@user_id = 22
		@comment = Comment.new(the_comment: @the_comment, user_id: @user_id)

		# Creating the User
		@email = 'andrewmadden@am.com'
		@password = 'isthebest'
		@password_confirmation = 'isthebest'
		@user = User.create(email: @email, password: @password, password_confirmation: @password_confirmation)

		# Place Comment and Scores Into User
		@user.scores << @score
		@user.comments << @comment
	end

	describe '#email' do
		it 'should return user email' do
			@user.email.should eq(@email)
		end

		it 'should return user password' do
			@user.password.should eq(@password)
		end
	end

	describe '#scores' do
		it 'should store score to specific user' do
			@user.scores.length.should eq(1);
		end

		it 'should store the correct score' do
			@user.scores[0].the_score.should eq(@the_score)
		end
	end

	describe '#comments' do
		it 'should store comment to specific user' do
			@user.comments.length.should eq(1);
		end

		it 'should store the correct comment' do
			@user.comments[0].the_comment.should eq(@the_comment)
		end
	end
end

