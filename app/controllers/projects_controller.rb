class ProjectsController < ApplicationController

	 def index

	 	@comments = Comment.all
	 	@comment = Comment.new
	 end

	 def create
	 	

	end


end	