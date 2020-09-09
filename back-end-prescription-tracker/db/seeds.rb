# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Prescription.destroy_all


user1 = User.create(first_name: Faker::Name.unique.first_name, last_name: Faker::Name.unique.last_name, age: Faker::Number.between(from: 45, to: 100), gender: Faker::Gender.binary_type)



medication_name = ["Asprin", "Lisinopril", "Atorvastatin", "Metformin"]
medication_strength = ["81mg", "5mg", "10mg", "1000mg"]
medication_precaution = ["Take it with food", "For your high blood pressure, Take it with food", "This is for your cholestrol, and take it during night time", "This is for your high blood sugar, take it with food"]
medication_category = ["Tablet", "Capsule"]
frequency = ["Once", "Twice", "Three times", "Four times"]
dose = ["Half", "One", "One and half", "Two", "Two and half"]
time_to_take = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"]

4.times do
    Prescription.create(
        user: user1,
        medication_name: medication_name.sample,
        medication_imprint: "",
        medication_strength: medication_strength.sample,
        medication_category: medication_category.sample,
        medication_precaution: medication_precaution.sample,
        medication_image: "",
        unique_id: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3, min_numeric: 7),
        frequency: frequency.sample,
        dose: dose.sample,
        time_to_take: time_to_take.sample,
        date_prescribed: "",
        doctor_name: Faker::Name.name
)

end
