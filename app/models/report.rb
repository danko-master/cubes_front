class Report < ActiveRecord::Base
  self.table_name = "cube_reports"
  validates :name, :json, presence: true
end
