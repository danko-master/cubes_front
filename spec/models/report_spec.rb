require 'rails_helper'

RSpec.describe Report, :type => :model do
  it { should validate_presence_of :name }

  it { should validate_presence_of :json }
end
