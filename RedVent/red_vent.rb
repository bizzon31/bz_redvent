module HVAC
  module HvacTools
    class RedVent
      def activate
        puts "RedVent activate"
        @dialog = HVAC::Hdw::HdwRedvent.new
      end
    end 
  end 
end
