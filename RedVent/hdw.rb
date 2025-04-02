module HVAC
  module Hdw
    class HdwRedvent
      attr_accessor :dialog

      def initialize
        @dialog = nil
        set_hdw
      end
      # Сборка ДО
      def set_hdw
        @dialog = UI::HtmlDialog.new({
          dialog_title: "Dialog Window System chanel AC",
          resizable: false,
          style: UI::HtmlDialog::STYLE_UTILITY
        })
        @dialog.set_size(1000,1000)
        path = Sketchup.find_support_file("bz_redvent/UI/index.html","Plugins")
        @dialog.set_file path
        @dialog.show
        
      # Обновить данные системы в ДО  
        @dialog.add_action_callback("updateHdw"){ |_, values|
          puts "#{values}"
          # update
        }
        
      end

    end # << class
    
  end
end
