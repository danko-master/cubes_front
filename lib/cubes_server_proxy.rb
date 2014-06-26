require 'open-uri'

class CubesServerProxy
	# HOST = '54.203.57.58:5000'
<<<<<<< HEAD
        HOST = '10.234.57.73:5000'
=======
  HOST = SETTINGS_CONFIG['slicer_host']
>>>>>>> 9ebbcd3b19a93992481f3bfe07abdfa61d7d61f1
	class << self
		def request query
			open("http://#{ HOST }#{ query }").read
		end
	end
end
