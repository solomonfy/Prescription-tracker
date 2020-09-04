# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Medication.destroy_all
Prescription.destroy_all


2.times do
    User.create(first_name: Faker::Name.unique.first_name, last_name: Faker::Name.unique.last_name, age: Faker::Number.between(from: 45, to: 100), gender: Faker::Gender.binary_type)
end

Medication.create(name: "Asprin", imprint: "", strength: "81mg", category: "Tablet", precaution: "Take it with food", image: "")
Medication.create(name: "Lisinopril", imprint: "", strength: "5mg", category: "Tablet", precaution: "For your high blood pressure, Take it with food", image: "")
Medication.create(name: "Atorvastatin", imprint: "", strength: "20mg", category: "Tablet", precaution: "This is for your cholestrol, and take it during night time", image: "")
Medication.create(name: "Metformin", imprint: "", strength: "1000mg", category: "Tablet", precaution: "This is for your high blood sugar, take it with food", image: "")


8.times do
    Prescription.create(user: User.all.sample, medication: Medication.all.sample, unique_id: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3, min_numeric: 7), frequency: ["Once", "Twice", "Three times", "Four times"].sample, dose: ["Half", "One", "One and half", "Two", "Two and half"].sample, time_to_take: "", date_prescribed: "", doctor_name: Faker::Name.name)
end
