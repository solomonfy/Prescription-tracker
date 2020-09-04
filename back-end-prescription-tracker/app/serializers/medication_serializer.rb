class MedicationSerializer < ActiveModel::Serializer
  attributes :id, :name, :strength, :imprint, :precaution

  has_many :prescriptions
end
