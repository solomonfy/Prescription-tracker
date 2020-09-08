class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :unique_id, :frequency, :dose, :time_to_take, :date_prescribed, :doctor_name, :medication, :user
  # attributes :id, :unique_id, :frequency, :dose, :time_to_take, :date_prescribed, :doctor_name, :medication
  belongs_to :user
  belongs_to :medication
end
