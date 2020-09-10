class Api::V1::PrescriptionsController < ApplicationController

  before_action :set_prescription, only: [:show, :update, :destroy]

  def index
    @prescriptions = Prescription.all
    render json: @prescriptions
  end

  def show
    render json: @prescription
  end

  def create
    # byebug
    @prescription = Prescription.create(prescription_params(:user_id, :medication_name, :medication_imprint, :medication_strength, :medication_category, :medication_precaution, :medication_image, :unique_id, :frequency, :dose, :time_to_take, :date_prescribed, :doctor_name, :prescription_taken))
    render json: @prescription
  end

  def update
    # byebug
    @prescription.update(prescription_params(:medication_imprint, :frequency, :dose, :time_to_take, :prescription_taken, :medication_strength, :medication_category, :medication_precaution, :medication_image))
    render json: @prescription
  end

  def destroy
    @prescription.destroy
  end

  private
    def set_prescription
      @prescription = Prescription.find(params[:id])
    end

    def prescription_params(*args)
      params.require(:prescription).permit(*args)
    end

end


