class Post < ApplicationRecord
  belongs_to :user
  before_validation :default_values
  def default_values
    self.title
    self.subject
    self.content
    self.user ||= User.find_by id: 1
  end

  default_scope ->{ order('created_at') }
  paginates_per 4
end
