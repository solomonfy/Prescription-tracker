class CreateMedications < ActiveRecord::Migration[6.0]
  def change
    create_table :medications do |t|
      t.string :name
      t.string :imprint
      t.string :strength
      t.string :category
      t.text :precaution
      t.string :image

      t.timestamps
    end
  end
end
