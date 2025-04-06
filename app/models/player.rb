# == Schema Information
#
# Table name: players
#
#  id         :bigint           not null, primary key
#  avatar_url :string
#  color      :integer          default("babyblue")
#  pet        :integer          default("hanbunkotchi")
#  score      :string           default([]), is an Array
#  uid        :string           not null
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Player < ApplicationRecord
  validates :username, :uid, presence: true
  validates :username, uniqueness: true
  validates :uid, uniqueness: true

  enum :color, {
    babyblue: 0,
    black: 1,
    blue: 2,
    comic: 3,
    donut: 4,
    flower: 5,
    green: 6,
    love: 7,
    mermaid: 8,
    rainbow: 9,
    sparklegreen: 10,
    sparklepink: 11,
    sparklered: 12,
    white: 13,
    whitepink: 14,
    yellow: 15
  }

  enum :pet, {
    hanbunkotchi: 0,
    kurupoyotchi: 1,
    kurupoyotchi_pink: 2,
    mokumokutchi: 3,
    ripputchi: 4,
    yumehotchi: 5
  }

  def self.from_context(context)
    player = Player.find_or_initialize_by(uid: context[:user][:fid])
    player.update(username: context[:user][:username], avatar_url: context[:user][:pfpUrl])
    player
  end
end
