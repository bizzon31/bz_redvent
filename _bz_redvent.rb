module HVAC
  module RedVent
    unless file_loaded?(__FILE__)
      ex = SketchupExtension.new('Bizzon Hvac BZ-Redvent', 'bz_redvent/main')
      ex.description = 'Bizzon Hvac tools: Tools for HVAC'
      ex.version     = '1.0.0'
      ex.copyright   = 'Bizzon © 2025'
      ex.creator     = 'Bizzon'
      Sketchup.register_extension(ex, true)
      file_loaded(__FILE__)
    end
  end
end