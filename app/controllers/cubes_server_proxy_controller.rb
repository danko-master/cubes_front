class CubesServerProxyController < ApplicationController
	def index
		@cubes = CubesServerProxy.request request.original_fullpath
	end
end
