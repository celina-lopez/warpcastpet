# frozen_string_literal: true

module Ranks
  class Get
    extend LightService::Action

    expects :client
    expects :page, default: 1
    expects :winners, default: []

    executed do |context|
      cursor = self.cursor(context.page)
      url = "/v1/creator-rewards-winner-history?cursor=#{cursor}"
      response = context.client.get(url)
      response['result']['history']['winners'].each do |winner|
        if Player.exists?(uid: winner['fid'].to_i)
          player = Player.find_by(uid: winner['fid'].to_i)
          player.metadata['score'] ||= []
          player.metadata['score'] << winner['score']
          player.metadata['rank'] ||= []
          player.metadata['rank'] << winner['rank']
          player.save!
          context.winners << player
        end
      end
    end

    def self.cursor(page)
      params = { page:, limit: 100 }
      Base64.strict_encode64(params.to_json).chomp('=')
    end
  end
end
