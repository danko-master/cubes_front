ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  config.mock_with :rspec
  
  config.order = :random
  
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# stub database
ActiveRecord::Base.connection.class.send(:define_method, :insert) { |*args| }

ActiveRecord::Base.connection.class.send(:define_method, :update) { |*args| }

ActiveRecord::Base.connection.class.send(:define_method, :select) { |*args| }

ActiveRecord::Base.connection.class.send(:define_method, :delete) { |*args| }
