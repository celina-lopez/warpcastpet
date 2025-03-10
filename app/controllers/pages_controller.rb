class PagesController < ApplicationController
  before_action :allow_iframe_requests
  def index
  end

  private

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
