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
			end
		end
	end
end	