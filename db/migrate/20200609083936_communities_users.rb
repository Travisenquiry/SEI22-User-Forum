class CommunitiesUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :communities_users do |t|
      t.references :community
      t.references :user
      t.timestamps
    end
  end
end