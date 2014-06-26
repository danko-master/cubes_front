class Report < ActiveRecord::Base
  self.table_name = "cube_reports"
  validates :name, :json, :user_id, presence: true

  before_validation :add_user_id

  def self.set_user_id user_id
     @user_id = user_id
  end

  def self.get_user_id
     @user_id
  end

  def add_user_id
    self.user_id = Report.get_user_id
  end
end
