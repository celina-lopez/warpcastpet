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
require 'rails_helper'

RSpec.describe Player, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
