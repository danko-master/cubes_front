class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :get_params

  def get_params
    Report.set_user_id params[:user_id] if params[:user_id].present?
  end
end
