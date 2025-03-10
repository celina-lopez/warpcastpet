# frozen_string_literal: true

class Client
  include HTTParty
  read_timeout 25 # Heroku times out after 30s
  open_timeout 5
  debug_output $stdout if Rails.env.development?

  class ServerError < StandardError; end

  private

    def with_json_response(path, &)
      response = yield
      response.tap do
        raise ServerError, response.body unless response.success?
      end
    end
end
