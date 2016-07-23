class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :subject, :content, :user_id, :created_at
end
