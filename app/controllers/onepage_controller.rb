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

  def topic
    @current_page = "topic"
    if Topic.exists?(id: params[:topic_id])
      @topic = Topic.find(params[:topic_id])
      @community = Community.find(params[:id])
      @user_posted = User.where(id: @topic.user_id).select("id", "username")

      render 'index'
    else
      redirect_to "/"
    end
  end

end