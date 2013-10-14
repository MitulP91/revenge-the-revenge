class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :the_score
      t.integer :user_id
      t.timestamps
    end
  end
end
