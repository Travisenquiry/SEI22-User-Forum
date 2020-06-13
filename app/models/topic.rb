class Topic < ApplicationRecord
  belongs_to :user
  belongs_to :community
  has_many :topic
end