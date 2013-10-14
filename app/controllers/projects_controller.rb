class ProjectsController < ApplicationController
	 def index
	 	@user = User.all
	 end

end