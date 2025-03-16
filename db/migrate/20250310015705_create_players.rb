class CreatePlayers < ActiveRecord::Migration[7.2]
  def change
    create_table :players do |t|
      t.string :username, null: false
      t.string :uid, null: false
      t.string :avatar_url
      t.string :score, default: [], array: true
      t.integer :pet, default: 0
      t.integer :color, default: 0
      t.timestamps
    end
  end
end
