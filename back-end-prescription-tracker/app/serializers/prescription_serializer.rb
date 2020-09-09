class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :medication_name, :medication_imprint, :medication_strength, :medication_category, :medication_precaution, :medication_image, :unique_id, :frequency, :dose, :time_to_take, :date_prescribed, :doctor_name

  belongs_to :user
end
