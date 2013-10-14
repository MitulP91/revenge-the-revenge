class Score < ActiveRecord::Base
  attr_accessible :the_score, :user_id

  belongs_to :user
end
