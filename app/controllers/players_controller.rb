class PlayersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :allow_iframe_requests
  before_action :set_player

  def create
    player = Player.from_context(params[:context])
    emotion = Pet::Emotion.execute(player:).emotion
    render json: {
      color: player.color,
      pet: player.pet,
      score: player.score,
      username: player.username,
      avatar_url: player.avatar_url,
      emotion: emotion
    }
  end

  def update
    @player.update(player_params)
    render json: {
      color: @player.color,
      pet: @player.pet
    }
  end

  private

  def set_player
    @player = Player.find_by_uid(params[:id])
  end

  def player_params
    params.require(:player).permit(:username, :avatar_url, :color, :pet)
  end

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
