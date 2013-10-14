class ProjectsController < ApplicationController

	def index
		@comments = Comment.all
	 	@comment = Comment.new
	end

	def create
		comment = Comment.new(params[:comment])

		if comment.save
			render :json => comment.to_json
		else
			render :json => false
		end	
	end
end	