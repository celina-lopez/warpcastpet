class CreatePlayers < ActiveRecord::Migration[7.2]
  def change
    create_table :players do |t|
      t.string :username, null: false
      t.string :uid, null: false
      t.string :avatar_url
      t.jsonb :metadata, null: false, default: {}
      t.timestamps
    end
  end
end
