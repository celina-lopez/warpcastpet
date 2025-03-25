class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  BOT_FID = ENV.fetch('BOT_FID', 1010064).to_i
  def create
    result = Webhook::Parse.call(
      author: params[:data][:author],
    )
  end
end
