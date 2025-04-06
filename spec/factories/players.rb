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
FactoryBot.define do
  factory :player do
    
  end
end
