# frozen_string_literal: true

module Webhooks
  class IncomingWebhook
    extend LightService::Organizer

    def self.call(author)
      with(author: author).reduce(
        Webhooks::Parse,
        Webhooks::Cast
      )
    end
  end
end
