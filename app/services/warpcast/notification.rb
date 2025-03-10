class Warpcast::Notification < Warpcast::Client
  def create(url:, token:, title: 'testing title', body: 'testing body!')
    path = url.split(Warpcast::Client.base_uri).last
    body = {
      notificationId: SecureRandom.uuid,
      title: title,
      body: body,
      targetUrl: url,
      tokens: [ token ]
    }
    post(path, body)
  end
end
