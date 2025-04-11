# frozen_string_literal: true

class FetchRankJob < ApplicationJob
  queue_as :default

  def perform(periods_ago)
    client = Warpcast::Client.new
    25.times do |i|
      new_result = Ranks::Get.execute(client:, page: i + 1, periods_ago:)
      sleep 1
      break if !new_result.success? || new_result.next_page.blank?
    end
  end
end
