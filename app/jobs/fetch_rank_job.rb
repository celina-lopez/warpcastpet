# frozen_string_literal: true

class FetchRankJob < ApplicationJob
  queue_as :default

  def perform
    client = Warpcast::Client.new
    25.times do |i|
      new_result = Ranks::Get.execute(client:, page: i + 1)
      sleep 1
      break if !new_result.success?
    end
  end
end
