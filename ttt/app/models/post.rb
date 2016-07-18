class Post < ApplicationRecord
  belongs_to :user
  before_save :default_values
  def default_values
    self.title
    self.subject
    self.content
    self.user ||= User.find_by id: 1
  end
end
