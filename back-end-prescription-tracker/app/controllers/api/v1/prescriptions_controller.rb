class Api::V1::PrescriptionsController < ApplicationController

    before_action :set_prescription, only: [:show, :update, :destroy]

  # GET /prescriptions
  def index
    @prescriptions = Prescription.all

    render json: @prescriptions
  end

  # GET /prescriptions/1
  def show
    render json: @prescription
  end

  # POST /prescriptions
  def create
    @prescription = Prescription.new(prescription_params)

    if @prescription.save
      render json: @prescription, status: :created, location: @prescription
    else
      render json: @prescription.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /prescriptions/1
  def update
    if @prescription.update(prescription_params)
      render json: @prescription
    else
      render json: @prescription.errors, status: :unprocessable_entity
    end
  end

  # DELETE /prescriptions/1
  def destroy
    @prescription.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prescription
      @prescription = Prescription.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def prescription_params
      params.require(:prescription).permit(:user_id, :medication_id, :unique_id, :frequency, :dose, :time_to_take, :for_the_date, :doctor_name)
    end

end
