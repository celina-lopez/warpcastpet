class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  BOT_FID = ENV.fetch('BOT_FID', 1010064).to_i
  def create
    result = Webhooks::IncomingWebhook.call(params[:data][:author])
    if result.success?
      render status: :ok
    else
      render status: :unprocessable_entity
    end
  end
end
