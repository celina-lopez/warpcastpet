# frozen_string_literal: true

class Warpcast::Client < Client
  base_uri 'https://api.warpcast.com'

  API_KEY = ENV.fetch('WARPCAST_API_KEY', nil)
  BEARER_TOKEN = "Bearer #{API_KEY}"

  HEADERS = {
    'accept' => 'application/json',
    'authorization' => BEARER_TOKEN,
    'content-type' => 'application/json'
  }.freeze

  def put(path, params)
    with_json_response(path) do
      self.class.put(
        path,
        body: params.to_json,
        headers: HEADERS
      )
    end
  end

  def post(path, params)
    with_json_response(path) do
      self.class.post(
        path,
        body: params.to_json,
        headers: HEADERS
      )
    end
  end

  def get(path)
    with_json_response(path) do
      self.class.get(path)
    end
  end
end
