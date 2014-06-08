require 'rails_helper'

RSpec.describe CubesServerProxyController, :type => :controller do
	it { should route(:get, '/cubes').to(action: :index) }

	describe '#index' do
    before { expect(CubesServerProxy).to receive(:request) }

		before { get :index, format: :json }

		it { should render_template :index }
	end
end
