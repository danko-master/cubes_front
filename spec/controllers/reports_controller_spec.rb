require 'rails_helper'

RSpec.describe ReportsController, :type => :controller do
  it { should route(:get, '/reports').to(action: :index) }

  it { should route(:get, '/reports/3').to(action: :show, id: 3) }

  it { should route(:get, '/reports/new').to(action: :new) }

  it { should route(:post, '/reports').to(action: :create) }

  describe '#index' do
    before { expect(Report).to receive(:page).with('6') }

    before { get :index, page: 6 }

    it { should render_template :index }
  end

  describe '#new.js' do
    before { xhr :get, :new, format: :js }

    it { should render_template :new }

    it { expect(subject.instance_variable_get :@report).to be_a Report }
  end

  describe '#create.js' do
    before { expect(Report).to receive(:create!).with('name' => 'My First Report', 'json' => '{"one":"two"}') }

    before { post :create, report: { name: 'My First Report', json: '{"one":"two"}' }, format: :js }

    it { should render_template :create }
  end

  describe '#show' do
    before { expect(Report).to receive(:find).with('2') }

    before { get :show, id: 2 }

    it { should render_template :show }
  end
end
