class MedicationSerializer < ActiveModel::Serializer
  attributes :id, :name, :strength, :imprint, :precaution, :image

  has_many :prescriptions
end
