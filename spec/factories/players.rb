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
FactoryBot.define do
  factory :player do
    
  end
end
