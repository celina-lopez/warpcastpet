# frozen_string_literal: true

class Neynar::Client
  include HTTParty
  read_timeout 25 # Heroku times out after 30s
  open_timeout 5
  base_uri 'https://api.neynar.com'
  debug_output $stdout if Rails.env.development?

  API_KEY = ENV.fetch('NEYNAR_API_KEY', nil)
  SIGNER_UUID = ENV.fetch('NEYNAR_SIGNER_UUID', nil)

  HEADERS = {
    'accept' => 'application/json',
    'x-api-key' => API_KEY
  }.freeze

  class ServerError < StandardError; end

  def post(path, params)
    with_json_response(path) do
      self.class.post(
        path,
        body: params.to_json,
        headers: HEADERS.merge('Content-Type': 'application/json')
      )
    end
  end

  def get(path, params)
    with_json_response(path) do
      self.class.get(path, query: params, headers: HEADERS)
    end
  end

  private

    def with_json_response(path, &)
      response = yield
      response.tap do
        raise ServerError, response['message'] unless response.success?
      end
    end
end
