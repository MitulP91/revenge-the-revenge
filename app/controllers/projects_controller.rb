class ProjectsController < ApplicationController

	def index
		@comments = Comment.order('created_at DESC LIMIT 10').all
	 	@comment = Comment.new
	end

	def create
		if current_user
			@comment = Comment.new(params[:comment])

			if @comment.save
				current_user.comments << @comment
				render :json => { comment: @comment.the_comment, email: current_user.email }
			else
				render :json => false
			end	
		end
	end

	def scores
		if current_user
			@score = Score.new(params[:score])
			if @score.save
				current_user.scores << @score
				render :json => true;
			else
				render :json => false;
			end
		end
	end

	def profile
		@my_scores = current_user.scores.order('the_score DESC').all
		@my_comments = current_user.comments.order('created_at DESC').all
	end
end	