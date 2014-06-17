//= require jquery/jquery-1.8.3
//= require jquery/jquery-ui-1.9.2.custom.min
//= require jquery/jquery.cookie
//
//= require jquery_ujs
//
//= require dateformat/dateformat
//
//= require jquery/jquery.blockUI
//
//= require wiky/wiky
//= require wiky/wiky.math
//= require flotr2/flotr2.min
//
//= require d3js/d3.v3
//= require nvd3/nv.d3
//= require qtip/jquery.qtip
//
//= require jqgrid/i18n/grid.locale-ru
//= require jqgrid/jquery.jqGrid.min.js
//
//= require cubesviewer/cubesviewer
//= require cubesviewer/cubesviewer.cache
//= require cubesviewer/cubesviewer.model
//= require cubesviewer/cubesviewer.views
//= require cubesviewer/cubesviewer.views.cube
//= require cubesviewer/cubesviewer.views.cube.explore
//= require cubesviewer/cubesviewer.views.cube.datefilter
//= require cubesviewer/cubesviewer.views.cube.rangefilter
//= require cubesviewer/cubesviewer.views.cube.series
//= require cubesviewer/cubesviewer.views.cube.chart
//= require cubesviewer/cubesviewer.views.cube.facts
//= require cubesviewer/cubesviewer.views.cube.dimensionfilter
//= require cubesviewer/cubesviewer.views.cube.columns
//= require cubesviewer/cubesviewer.views.cube.export
//= require cubesviewer/cubesviewer.views.undo
//= require cubesviewer/cubesviewer.gui
//= require cubesviewer/cubesviewer.gui.serializing
//= require cubesviewer/cubesviewer.gui.localeswitcher.js
//= require cubesviewer/cubesviewer.gui.reports.js
//
//
//= require_tree .

$(function() {
  cubesviewer.init({
    cubesUrl: 'http://10.234.57.73:5000', // использовать текущий hostname
  });

  cubesviewer.gui.init({
    container: $('#cubesviewer').get(0),
    showAbout: false,
  });

  // Start Cubesviewer system
  cubesviewer.refresh();
});
