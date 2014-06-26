$(function() {
  var onWorkspaceLoaded = function() {
    var text = $('.b-report .json').text();

    if(text.length > 0) {
      var serialized = JSON.parse(text);

      var view = cubesviewer.gui.addViewObjectReport(serialized);

      cubesviewer.views.redrawView(view);

      $('.ui-widget-overlay').hide();
    }
  }

  $(document).bind('cubesviewerWorkspaceLoaded', {}, onWorkspaceLoaded);
});  
