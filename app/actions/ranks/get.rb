# frozen_string_literal: true

module Ranks
  class Get
    extend LightService::Action

    expects :client, default: Warpcast::Client.new
    expects :periods_ago, default: nil
    expects :page, default: 1
    promises :next_page

    executed do |context|
      cur = cursor(context.page)
      url = "/v1/creator-rewards-winner-history?cursor=#{cur}"
      if context.periods_ago.present?
        url += "&periodsAgo=#{context.periods_ago}"
      end
      response = context.client.get(url)
      response['result']['history']['winners'].each do |winner|
        player = Player.find_or_initialize_by(uid: winner['fid'].to_i).tap do |player|
          player.username = winner['username']
        end
        player.score << winner['score']
        player.save!
      end
      context.next_page = next_page(response.dig('next', 'cursor'))
    end

    def self.cursor(page)
      params = { page:, limit: 100 }
      Base64.strict_encode64(params.to_json).chomp('=')
    end

    def self.next_page(cursor)
      return nil if cursor.blank?

      params = JSON.parse(Base64.decode64(cursor))
      params['page']
    end
  end
end
