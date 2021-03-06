/*
 * CubesViewer
 * Copyright (c) 2012-2013 Jose Juan Montes, see AUTHORS for more details
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * If your version of the Software supports interaction with it remotely through
 * a computer network, the above copyright notice and this permission notice
 * shall be accessible to all users.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

cubesviewer.buildWorkspace = function(data) {
	
    workspace = cubesWorkspace.prototype;
    workspace.cubes = data;
    workspace.promises = [];
    $(workspace.cubes).each(function(idx, cube) {
        workspace.loadCube(idx, cube.name);
        $.extend(cube, cubesCube.prototype);
        cube.buildModel();
    });

	return workspace;
	
};

cubesWorkspace = function() {};
$.extend (cubesWorkspace.prototype, {

    loadCube: function(idx, cubename) {
		var cr = cubesviewer.cubesRequest ("/cube/" + cubename + "/model", { "lang": cubesviewer.options.cubesLang }, this._loadCubeCallback(idx), function() {}, function (xhr, textStatus, errorThrown) {
			cube.state = "Failed to load cube";
			cubesviewer.showInfoMessage ('CubesViewer could not load cube from Cubes server. CubesViewer will not work. Try reloading.<br /><br>Status: ' + xhr.status);
			$(document).trigger("cubesviewerCubeLoaded", null );
		});

        // TODO: DEBUG
        this.promises.push(cr);
    },

	_loadCubeCallback: function(idx) {
        var workspace = this;
		return function(data) {
			// Set new model
            cube = workspace.cubes[idx];
            $.extend(cube, data);
			cube.buildModel();

            // ???
            $.extend(cube, cubesModel.prototype);
            cube.removeIgnoredDimensions();
			
			cube.state = "Initialized";
			$(document).trigger("cubesviewerCubeLoaded", [ workspace.cubes[idx] ] )
		}
	},
	/*
	 * Return a cube by name.
	 */
	getCube: function(cubename) {
		var cube = $.grep(this.cubes, function(ed) {
			return ed.name == cubename;
		})[0];
		
		return cube;
	},
});

cubesBase = function() {};
$.extend (cubesBase.prototype, {

	getName: function() {
		return this.name;
	},
	
	getLabel: function() {
		return this.label;
	},
	
	getInfo: function(key) {
		var result = null;
		if ("info" in this) {
			if (key in this.info) {
				result = this.info[key];
			}
		}
		return result;
	}
	
});

// TODO: Refactor this
cubesModel = function() {};
$.extend (cubesModel.prototype, cubesBase.prototype);
$.extend (cubesModel.prototype, {
	
	/*
	 * Get a dimension by name.
	 * Accepts dimension level in the input string.
	 */ 
	getDimension: function(dimension) {
		var dimname = dimension;
		if (dimension.indexOf('@') > 0) {
			dimname = dimension.split("@")[0];
		} else if (dimension.indexOf(':') > 0) {
			dimname = dimension.split(":")[0];
		}
		var dim = $.grep(this.dimensions, function(ed) {
			return ed.name == dimname;
		})[0];
		
		return dim;
	},	

	/*
	 * Checks the cv-ignore metadata and ignores dimensions accordingly.
	 * This can be used when a dimension must not be published  
	 * in the interface.
	 */
	removeIgnoredDimensions: function() {
		var ignoredDimensions = [];
		$(this.dimensions).each(function(idx, dimension) {
			if (dimension.getInfo("cv-ignore") == true) ignoredDimensions.push(dimension.name);
		});
		
		// Remove from cube dimensions
        cube = this;
        cube.dimensions = $.grep(cube.dimensions, function (e, idx) {
            return $.inArray(e, ignoredDimensions) == -1;
        });
		
		// Remove from dimensions
		this.dimensions = $.grep(this.dimensions, function (e, idx) {
			return $.inArray(e.name, ignoredDimensions) == -1;
		});
		
	},
	
	/*
	 * Find level by name. Accept it prefixed with the dimension name:.
	 */
	getDimensionParts: function(dimensionString) {
		
		var dim = this.getDimension(dimensionString);
		
		var hie = dim.hierarchies[0];
		if (dimensionString.indexOf("@") > 0) {
			var hierarchyName = dimensionString.split("@")[1].split(":")[0];
			hie = dim.getHierarchy(hierarchyName);
		} 

		var lev = null;
		if (dimensionString.indexOf(":") > 0) {
			var levelname = dimensionString.split(":")[1];
			lev = dim.getLevel(levelname);
		} else {
			lev = dim.getLevel(hie.levels[0]);
		}
		
		var depth = null;
		for (var i = 0; i < hie.levels.length; i++) {
			if (lev.getName() == hie.levels[i]) {
				depth = i + 1;
				break;
			}
		}
			
		
		return {
			dimension: dim,
			level: lev,
			depth: depth,
			hierarchy: hie,
			label: dim.label + ( hie.name != "default" ? (" / " + hie.label) : "" ) + ( hie.levels.length > 1 ? (": " + lev.label) : "" ),
			labelNoLevel: dim.label + ( hie.name != "default" ? (" / " + hie.label) : "" ),
			fullDrilldownValue: dim.name + ( hie.name != "default" ? ("@" + hie.name) : "" ) + ":" + lev.name
		};
		
	},		
	
	
});
	

cubesDimension = function() {};
$.extend (cubesDimension.prototype, cubesBase.prototype);
$.extend (cubesDimension.prototype, {
	
	buildModel: function() {
        this.label = this.label||this.name;
		var dim = this;
		$(this.levels).each(function(idx, level) {
			$.extend(level, cubesLevel.prototype);
			level.dimension = dim;
			level.buildModel();
		});
		$(this.hierarchies).each(function(idx, hierarchy) {
			$.extend(hierarchy, cubesHierarchy.prototype);
			hierarchy.dimension = dim;
			hierarchy.buildModel();
		});
	},
	
	/*
	 * Get a level by name.
	 */ 
	getLevel: function(level) {
		var lev = $.grep(this.levels, function(ed) {
			return ed.name == level;
		})[0];
		
		return lev;
	},	

	/*
	 * Get a hierarchy by name.
	 */ 
	getHierarchy: function(hierarchy) {
		var hie = $.grep(this.hierarchies, function(ed) {
			return ed.name == hierarchy;
		})[0];
		
		return hie;
	},		
	
});
	
cubesLevel = function() {};
$.extend (cubesLevel.prototype, cubesBase.prototype);
$.extend (cubesLevel.prototype, {
	
	buildModel: function() {
	},

	/*
	 * Get a attribute by name.
	 * Accepts dimension level in the input string.
	 */ 
	getAttribute: function(attribute) {
		var attr = $.grep(this.attributes, function(el) {
			return el.name == attribute;
		})[0];
		
		return attr;
	},	
	
	/*
	 * Processes a cell and returns an object with a stable information:
	 * o.key
	 * o.label
	 * o.info[]
	 */
	readCell: function(cell) {

		if (!(this.getAttribute(this.key).ref in cell)) return null;
		
		var result = {};
		result.key = cell[this.getAttribute(this.key).ref];
		result.label = cell[this.getAttribute(this.label_attribute).ref];
		result.info = {};
		$(this.attributes).each(function(idx, attribute) {
			result.info[attribute.name] = cell[attribute.ref];
		});		
		return result;
	},
	
});

cubesHierarchy = function() {};
$.extend (cubesHierarchy.prototype, cubesLevel.prototype);
$.extend (cubesHierarchy.prototype, {
	
	buildModel: function() {
        this.label = this.label||this.name;
	},
	
	/*
	 * Processes a cell and returns an array of objects with info and label.
	 */
	readCell: function(cell, level_limit) {
		
		var result = [];
		var hie = this;
		
		for (var i = 0; i < this.levels.length; i ++) {
			var levname = this.levels[i];
			var level = hie.dimension.getLevel(levname);
			info = level.readCell(cell);
			if (info != null) result.push(info);
			
			// Stop if we reach level_limit
			if ((level_limit != undefined) && (level_limit != null)) {
				if (level_limit.name == levname) break;  
			}
		}
		return result;
	},		

});

cubesCube = function() {};
$.extend (cubesCube.prototype, cubesLevel.prototype);
$.extend (cubesCube.prototype, {
	
	buildModel: function() {
		$(this.dimensions).each(function(idx, dimension) {
			$.extend(dimension, cubesDimension.prototype);
			dimension.buildModel();
		});
	},
	
});
