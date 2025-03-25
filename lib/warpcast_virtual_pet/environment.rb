# frozen_string_literal: true

module WarpcastVirtualPet::Environment
  def self.app_url
    protocol = Rails.env.production? ? 'https://' : 'http://'
    "#{protocol}#{ENV["HOST_DOMAIN"]}"
  end
end
