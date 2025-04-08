class FarcasterController < ApplicationController
  def auth
    example = {
  "accountAssociation": {
    "header": 'eyJmaWQiOjk2MTEyMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEE0ZjA1M2Y4MzJkZjY0ZTdDMGZhZjZjMEY5NDA5REVBNUYzODNkQ2YifQ',
    "payload": 'eyJkb21haW4iOiJwZXQucGxheWJvYXJkLmdhbWVzIn0',
    "signature": 'MHg2ZDIxM2U1NDBiM2E4MjFlZGZlNjNlYTQxY2MzNDZmOTZiMjQ0YmM1ZTZlYzRjMTM0NGM4ODZlZGMwYjc1ZGU4NTBkYWVmNWZiYTVlOTY5MjVkNzRiMzViMDRkNjhmOGM3ZmYwNjM2ZTZiYjdhNjk5ZGE4MjExZjdlNjA0ZTI1NTFi'
  },
  "frame": {
    "version": '1',
    "name": 'WarpcastPet',
    "iconUrl": 'https://pet.playboard.games/images/mokumokutchi/dancing-sparklepink.gif',
    "homeUrl": 'https://pet.playboard.games',
    "imageUrl": 'https://pet.playboard.games/images/mokumokutchi/dancing-sparklepink.gif',
    "buttonTitle": 'Get your Pet!',
    "splashImageUrl": 'https://pet.playboard.games/images/mokumokutchi/dancing-sparklepink.gif',
    "splashBackgroundColor": '#eeccff',
    "webhookUrl": 'https://pet.playboard.games/webhooks'
  }
}

    render json: example
  end

  def nonce
    render json: { nonce: request.session[:nonce] }
  end
end
