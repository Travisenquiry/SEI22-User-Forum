class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :title
      t.text :content
      t.string :url
      t.belongs_to :community
      t.belongs_to :user

      t.timestamps
    end
  end
end