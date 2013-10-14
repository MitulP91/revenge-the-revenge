class Comment < ActiveRecord::Base
  attr_accessible :the_comment, :user_id

  belongs_to :user
end
