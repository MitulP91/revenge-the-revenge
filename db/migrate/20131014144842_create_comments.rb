class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :the_comment
      t.integer :user_id
      t.timestamps
    end
  end
end
