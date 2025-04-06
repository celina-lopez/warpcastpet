# frozen_string_literal: true

module Pet
  class Emotion
    extend LightService::Action

    EMOTION_MAP = {
      happy: 'happy 💖',
      dancing: 'enthusiastic 💃',
      freak: 'stressed 🤬',
      whine: 'sad 💔',
      sleep: 'sleepy 💤'
    }

    expects :player
    promises :emotion

    executed do |context|
      scores = context.player.score
      if scores.size < 2
        context.emotion = :sleep
        next context
      end

      trend = scores.each_cons(2).map { |a, b| b <=> a }
      strength = trend.count { |x| x != 0 } # How many changes

      context.emotion = if trend.all? { |x| x > 0 }
        strength >= 2 ? :dancing : :happy
      elsif trend.all? { |x| x < 0 }
        strength >= 2 ? :freak : :whine
      else
        :sleep
      end
    end
  end
end
