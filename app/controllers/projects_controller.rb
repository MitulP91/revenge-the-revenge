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
end	