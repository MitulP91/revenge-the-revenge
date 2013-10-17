class Score < ActiveRecord::Base
  attr_accessible :the_score

  belongs_to :user
end