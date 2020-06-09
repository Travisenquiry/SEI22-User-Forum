class OnepageController < ApplicationController
  before_action :authenticate_user!

  def index
    @current_page = "index"
  end
end