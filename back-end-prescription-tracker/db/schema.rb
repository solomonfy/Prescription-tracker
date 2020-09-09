# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_08_154128) do

  create_table "prescriptions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "medication_name"
    t.string "medication_imprint"
    t.string "medication_strength"
    t.string "medication_category"
    t.text "medication_precaution"
    t.string "medication_image"
    t.string "unique_id"
    t.string "frequency"
    t.string "dose"
    t.string "time_to_take"
    t.date "date_prescribed"
    t.string "doctor_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "prescription_taken", default: false
    t.index ["user_id"], name: "index_prescriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "age"
    t.string "gender"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "prescriptions", "users"
end
