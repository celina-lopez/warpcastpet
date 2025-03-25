# frozen_string_literal: true

module Webhooks
  class Cast
    extend LightService::Action

    expects :
    promises :player

    executed do |context|
      player = Player.find_or_initialize_by(uid: context.author[:fid])
      player.update(username: context.author[:username], avatar_url: context.author[:pfp_url])
      context.player = player
    end
  end
end
