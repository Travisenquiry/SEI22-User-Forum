class OnepageController < ApplicationController
  before_action :authenticate_user!

  def index
    @current_page = "index"
  end

  def community
    @current_page = "community"
    if Community.exists?(id: params[:id])
      @community = Community.find(params[:id])
      render 'index'
    else
      redirect_to "/"
    end
  end
end