/* global $ */
/* this is an example for validation and change events */
$.fn.numericInputExample = function () {
	'use strict';
	var element = $(this),
		footer = element.find('tfoot tr'),
		dataRows = element.find('tbody tr'),
		form = element.parents('form'),
		initialTotal = function () {
			// var column, total;
			// for (column = 1; column < footer.children().size(); column++) {
			// 	total = 0;
			// 	dataRows.each(function () {
			// 		var row = $(this);
			// 		total += parseFloat(row.children().eq(column).text());
			// 	});
			// 	footer.children().eq(column).text(total);
			// };
		};
	element.find('td').on('change', function (evt) {
		var cell = $(this);
		var row = $(cell.parent('tr'));
        var row_index = row.index();
		var column = cell.index();
        if (column === 0 && cell.text() <= 0) {
            $('.alert').show();
            return false; // changes can be rejected
        } else {
            $('.alert').hide();
        }

		if (column === 1 && cell.text() > 15) {
			$('.alert').show();
			return false; // changes can be rejected
		} else {
			$('.alert').hide();
		}
        $(form).append('<input type="hidden" name="column['+row_index+']['+column+']" value="'+cell.text()+'" />');
	}).on('validate', function (evt, value) {
		var cell = $(this),
			column = cell.index();
		if (column === 0) {
			return !isNaN(parseFloat(value)) && isFinite(value);
		} else {
			return !isNaN(parseFloat(value)) && isFinite(value);
		}
	});
	initialTotal();
	return this;
};
