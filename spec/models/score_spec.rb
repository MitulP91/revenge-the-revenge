require 'spec_helper'

describe Score do
	before :each do
		@the_score = 5000
		@user_id = 22
		@score = Score.create(the_score: @the_score, user_id: @user_id)
	end

	describe '#the_score' do
		it 'should return the score' do
			@score.the_score.should eq(@the_score);
		end
	end

	describe '#user_id' do
		it 'should return the user_id of the score' do
			@score.user_id.should eq(@user_id);
		end
	end
end
