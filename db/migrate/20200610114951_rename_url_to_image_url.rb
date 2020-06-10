class RenameUrlToImageUrl < ActiveRecord::Migration[6.0]
  def change
    rename_column :topics, :url, :image_url
  end
end