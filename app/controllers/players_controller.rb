class PagesController < ApplicationController
  before_action :allow_iframe_requests
  def create
    player = Player.from_context(params[:context])
    render json: player
  end

  def show
    player = Player.find(params[:id])
    render json: player
  end

  def update
    player = Player.find(params[:id])
    player.update(player_params)
    render json: player
  end

  private

  def player_params
    params.require(:player).permit(:username, :avatar_url, :metadata)
  end

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
