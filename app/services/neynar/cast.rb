class Neynar::Cast < Neynar::Client
  def create(text:, embeds: nil, reply_to: nil)
    body = {
      signer_uuid: Neynar::Client::SIGNER_UUID,
      text: text
    }
    body[:embeds] = embeds if embeds
    body[:parent] = reply_to if reply_to
    post('/v2/farcaster/cast', body)
  end
end
