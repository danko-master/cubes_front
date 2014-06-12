/*
 * Link to Reports
 */
function cubesviewerGuiReports() {
  this.cubesviewer = cubesviewer;

  this.onGuiDraw = function(event, gui) {
    $(gui.options.container).find('.cv-gui-tools').append( '<div><a href="/reports"><strong>Отчеты</strong></a></div>');
  }

  this.onViewDraw = function(event, view) {
    cubesviewer.gui.reports.drawMenu(view);
  }

  this.drawMenu = function(view) {
		var menu = $(".cv-view-menu-panel", $(view.container));
		var cube = view.cube;
		
		menu.find (".cv-gui-renameview").parent().after(
			'<li><a class="cv-gui-report" href="#"><span class="ui-icon ui-icon-disk"></span>Сохранить отчет</a></li>'
		);
	  		
		$(menu).menu( "refresh" );
		$(menu).addClass("ui-menu-icons");
		
		// Events
		$(view.container).find('.cv-gui-report').click(function(e) {
      e.preventDefault();

			view.cubesviewer.gui.reports.showReportForm(view);
		});
  }

  this.showReportForm = function(view) {
    var serialized = view.cubesviewer.views.serialize(view);

    var $dialog = $('#dialog');

    if($dialog.length == 0) {
      var dialog = document.createElement('div');

      dialog.id = 'dialog';

      $('body').append(dialog);

      $dialog = $(dialog);
    }

    //
    // вводим в форму сериализованый отчет
    //
    var success = function() {
      $('#report_json').val(serialized);
    }

    var openCallback = function() {
      $.get('/reports/new', success, null, 'script');
    }

    $dialog.dialog({
      modal: true,
      draggable: false,
      resizable: false,
      title: 'Сохранить отчет',
      open: openCallback,
      width: 300,
    })
  }
}

cubesviewer.gui.reports = new cubesviewerGuiReports();

$(document).bind('cubesviewerGuiDraw', {}, cubesviewer.gui.reports.onGuiDraw);
$(document).bind('cubesviewerViewDraw', {}, cubesviewer.gui.reports.onViewDraw);
