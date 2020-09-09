class AddPrescriptionTakenPrescriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :prescriptions, :prescription_taken, :boolean, default: false
  end
end
