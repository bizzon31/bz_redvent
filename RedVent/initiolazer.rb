module HvacInitiolizer
  puts "-HvacInitiolizer- Инициализация инструментов"
# #####################  add_tools_into_toolbar  ###########################

  # Тест добавление элемента в палитру
    params_for_red_vent = {   
      name_comd: "RedVent",
      name_bar: "Bizzon RedVent",
      comd: HVAC::HvacTools::RedVent.new,
      logo: "./img/logo.png",
      tooltip: "RedVent",
      status_bar_text: "Подбор щелевых рещёток Redvent",
      menu_text: "RedVent" 
    }
  # Добавить инструмент при подключения класса
    # Выполняется при первой инициализации
  def self.add_tool_into_toolbar(params_for_tool)
    toolbar = UI::Toolbar.new "#{params_for_tool[:name_bar]}"
    cmd = UI::Command.new("#{params_for_tool[:name_comd]}") { 
      
      # Команда для инструмента
      Sketchup.active_model.select_tool(params_for_tool[:comd])
      # Инстанс инструмента
    } 
  # Настройки и добавление инструмента
    cmd.small_icon = "#{params_for_tool[:logo]}" # "/img/icon2.png"
    cmd.large_icon = "#{params_for_tool[:logo]}"
    puts "#{params_for_tool[:logo]}"
    cmd.tooltip = "#{params_for_tool[:tooltip]}"
    cmd.status_bar_text = "#{params_for_tool[:status_bar_text]}"
    cmd.menu_text = "#{params_for_tool[:menu_text]}"
    toolbar = toolbar.add_item cmd
    toolbar.show  
  end

# ######################### Монтаж инструментов ##########################
  unless file_loaded?(__FILE__)
    
  # Добавление в тулбар

    self.add_tool_into_toolbar(params_for_red_vent)

    file_loaded(__FILE__)

  end    
# ################## END  add_tools_into_toolbar  ##########################

end