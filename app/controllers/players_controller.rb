class PlayersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :allow_iframe_requests
  before_action :set_player

  def create
    player = Player.from_context(params[:context])
    render json: player.metadata
  end

  def update
    @player.update(player_params)
    render json: @player.metadata
  end

  private

  def set_player
    @player = Player.find_by_uid(params[:id])
  end

  def player_params
    params.require(:player).permit(:username, :avatar_url, :metadata)
  end

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
