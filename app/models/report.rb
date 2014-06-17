class Report < ActiveRecord::Base
  self.set_table_name "cube_reports"
  validates :name, :json, presence: true
end
