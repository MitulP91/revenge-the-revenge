require 'spec_helper'

describe Comment do
	before :each do
		@the_comment = 'This game is awesome. '
		@user_id = 22
		@comment = Comment.new(the_comment: @the_comment, user_id: @user_id)
	end

	describe '#the_comment' do
		it 'should return the comment string' do
			@comment.the_comment.should eq(@the_comment)
		end
	end

	describe '#user_id' do
		it 'should return the user_id of the comment' do
			@comment.user_id.should eq(@user_id)
		end
	end
end
