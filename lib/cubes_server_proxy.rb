require 'open-uri'

class CubesServerProxy
	# HOST = '54.203.57.58:5000'
        HOST = '10.234.57.73:5000'
	class << self
		def request query
			open("http://#{ HOST }#{ query }").read
		end
	end
end
