class Api::V1::PrescriptionsController < ApplicationController
    

    def index
        @prescriptions = Prescription.all
        render json: @prescriptions, include: [:user, :medication]
    end

    
end
