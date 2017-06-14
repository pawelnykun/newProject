$(function() {
	var url = 'http://rt.ex7.pl/';
	var test = 'ping';
	var connect = 'get-data';
	var table = $('.table-responsive');
	
	function testingConnection() {
		$.ajax({
			url: url + test,
			method: 'GET',
			success: showAnswer
		});
	}

	function showAnswer(resp) {
		console.log("Response is: " + resp.response);
	}

	function getData(data) {
		$.ajax({
			url: url + connect,
			method: 'POST',
			data: data,
			success: showData
		});
	}

	function showData(resp) {
		var tbody = table.find('tbody').last();
		tbody.empty();
		resp.forEach(function(item) {
			var $row = $('<tr>');
			var $itemId = $('<td>').text(item.id);
			var $itemAcronym = $('<td>').text(item.acronym);
			var $itemName = $('<td>').text(item.name);

			$row.append($itemId)
				.append($itemAcronym)
				.append($itemName);

			$row.appendTo(tbody);
		})
	}

	testingConnection();

	var data = {
		sort_column: 'acronym',
		sort_order: 'asc',
		filter: ''
	};

	getData(data);

	//sorting
	function sortColumn() {
		
	}

	$('.firstID').find('.fa-sort-desc').click(function() {
		data = {
			sort_column: 'id',
			sort_order: 'desc',
			filter: ''
		};
		getData(data);
	});

	//scrollTo#
	$('a').click(function() {
		var href = $(this).attr("href");
    	$('html, body').animate({
      		scrollTop: $(href).offset().top
    	}, 500);
    return false;
	});

	//numbersEffect
  	var counterInitialized = false;
  	$(window).scroll(function() {
	  	var pxFromTop = $(".numbers").offset().top;
	  	if ( ($(document).scrollTop() > pxFromTop - 700) && (!counterInitialized) ) {
	  		counterInitialized = true;

            $('.number').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
	});
});