# frozen_string_literal: true

RSpec.shared_context 'with stubbed Neynar' do
  before do
    headers = { 'Content-Type' => 'application/json' }
    WebMock.stub_request(:any, %r{api.neynar.com/v2/farcaster/cast}).to_return(
      status: 200, body: File.read(Rails.root.join(*%w[spec fixtures cast.json])), headers:
    )

    WebMock.stub_request(:any, %r{api.neynar.com/v2/farcaster/frame}).to_return(
      status: 200, body: File.read(Rails.root.join(*%w[spec fixtures frame.json])), headers:
    )
  end
end
