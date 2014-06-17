class Report < ActiveRecord::Base
<<<<<<< HEAD
  self.table_name =  "cube_reports"
=======
  self.table_name = "cube_reports"
>>>>>>> a12667d23dcd3a7b4bba0f509cf63216ee6b896f
  validates :name, :json, presence: true
end
