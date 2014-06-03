require 'rails_helper'

RSpec.describe CubesController, :type => :controller do
	it { should route(:get, '/cubes').to(action: :index) }

	describe '#index' do
		before { get :index, format: :json }

		it { should render_template :index }
	end
end
