# frozen_string_literal: true

module Webhooks
  class Cast
    extend LightService::Action

    TEXT = <<~TEXT
      @{username} 's warpcast pet is feeling {emotion} this week! 🥚✨ Keep it alive by casting, liking, and replying! 📈💖
    TEXT

    HOST = WarpcastVirtualPet::Environment.app_url

    EMOTION_MAP = {
      happy: 'happy 💖',
      dancing: 'enthusiastic 💃',
      freak: 'stressed 🤬',
      whine: 'sad 💔',
      sleep: 'sleepy 💤'
    }

    expects :player
    promises :player, :cast_text

    executed do |context|
      emotion_key = calculate_emotion(context.player.score)
      context.cast_text = text(context.player, emotion_key)
      Neynar::Cast.new.create(
        text: context.cast_text,
        embeds: pet_image_embed(context.player, emotion_key)
      )
    end

    def self.text(player, emotion_key)
      TEXT.gsub('{username}', player.username).gsub('{emotion}', EMOTION_MAP[emotion_key])
    end

    def self.calculate_emotion(scores)
      return :sleep if scores.size < 2

      trend = scores.each_cons(2).map { |a, b| b <=> a }
      strength = trend.count { |x| x != 0 } # How many changes

      if trend.all? { |x| x > 0 }
        strength >= 2 ? :dancing : :happy
      elsif trend.all? { |x| x < 0 }
        strength >= 2 ? :freak : :whine
      else
        :sleep
      end
    end

    def self.pet_image_embed(player, emotion)
      [
        {
          url: "#{HOST}/images/#{player.pet}/#{emotion}-#{player.color}.gif"
        }
      ]
    end
  end
end
