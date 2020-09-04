class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :user, :medication, :unique_id, :frequency, :dose, :time_to_take, :date_prescribed, :doctor_name
  belongs_to :user
  belongs_to :medication
end
