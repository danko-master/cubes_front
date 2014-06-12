class ReportsController < ApplicationController
  respond_to :js, only: :create

  def index
    @reports = Report.page params[:page]
  end

  def new
    @report = Report.new
  end

  def create
    Report.create! _params
  end

  private
  def _params
    params.require(:report).permit(:name, :json)
  end
end
