namespace :fetch do
  desc 'Fetch the rank'
  task rank: :environment do |_t, args|
    periods_ago = args[:periods_ago] || nil
    FetchRankJob.perform_later(periods_ago)
  end
end
