class Comment < ActiveRecord::Base
  attr_accessible :the_comment

  belongs_to :user
end
