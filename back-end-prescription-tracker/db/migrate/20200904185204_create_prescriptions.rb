class CreatePrescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :prescriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :medication, null: false, foreign_key: true
      t.string :unique_id
      t.string :frequency
      t.string :dose
      t.string :time_to_take
      t.date :date_prescribed
      t.string :doctor_name

      t.timestamps
    end
  end
end
