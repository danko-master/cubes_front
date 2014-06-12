class Report < ActiveRecord::Base
  validates :name, :json, presence: true
end
