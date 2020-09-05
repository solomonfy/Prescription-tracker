class Api::V1::PrescriptionsController < ApplicationController
    

    def index
        @prescriptions = Prescription.all
        render json: @prescriptions, include: [:user, :medication]
    end

    def show
        # byebug
        @prescription = Prescription.find_by(id: params[:id])
        render json: @prescription, include: [:user, :medication]
    end
    
end
