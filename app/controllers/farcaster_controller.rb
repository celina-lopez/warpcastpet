class FarcasterController < ApplicationController
  def auth
    example = {
  "accountAssociation": {
    "header": 'eyJmaWQiOjk2MTEyMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEE0ZjA1M2Y4MzJkZjY0ZTdDMGZhZjZjMEY5NDA5REVBNUYzODNkQ2YifQ',
    "payload": 'eyJkb21haW4iOiJ3YXJwY2FzdC5wbGF5Ym9hcmQuZ2FtZXMifQ',
    "signature": 'MHgyOTY5ZTYxODc0OWRmMTlhZjdmYjdhNTEyYmZhODc3YTY0NTEyMDkzMGVmMDAxNmY2NzVhODdjYTFmMTQ0MmI3Mzk0NTc4NzhmOWM5YjNjYTE3NzZiYTliMjY5NDI4M2MyOWRlNzdmODI3NGZmMGQwODMyYWEyOTU2MTIyZDhhNjFj'
  },
  "frame": {
    "version": '1',
    "name": 'WarpcastPet',
    "iconUrl": 'https://pet.playboard.games/images/mokumokutchi/freak-blue.gif',
    "homeUrl": 'https://pet.playboard.games',
    "imageUrl": 'https://pet.playboard.games/images/mokumokutchi/freak-blue.gif',
    "buttonTitle": 'Get your Pet!',
    "splashImageUrl": 'https://pet.playboard.games/images/mokumokutchi/freak-blue.gif',
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
