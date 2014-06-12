$(function() {
  var onWorkspaceLoaded = function() {
    var text = $('.b-report .json').text();

    var serialized = JSON.parse(text);

    var view = cubesviewer.gui.addViewObject(serialized);

    cubesviewer.views.redrawView(view);

    $('.ui-widget-overlay').hide();
  }

  $(document).bind('cubesviewerWorkspaceLoaded', {}, onWorkspaceLoaded);
});
