json.extract! topic, :id, :title, :content, :image_url, :community, :user, :created_at, :updated_at
json.url topic_url(topic, format: :json)