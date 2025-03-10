# == Schema Information
#
# Table name: players
#
#  id         :bigint           not null, primary key
#  avatar_url :string
#  metadata   :jsonb            not null
#  uid        :string           not null
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Player < ApplicationRecord
  validates :username, :uid, presence: true
  validates :username, uniqueness: true
  validates :uid, uniqueness: true

  def self.from_context(context)
    player = Player.find_or_initialize_by(uid: context[:fid])
    player.update(username: context[:username], avatar_url: context[:pfp_url])
  end
end
