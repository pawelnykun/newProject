$(function() {
	var url = 'http://rt.ex7.pl/';
	var test = 'ping';
	var connect = 'get-data';
	var table = $('.table-responsive');
	var prev = $('.js-prev');
	var next = $('.js-next');
	var currentPageNumber = 1;
	var size = $('.page-size').val();
	
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

	testingConnection(); //testing connection:)

	function getData(data, page, size) {
		page = page || 1;
		size = size || 10;
		$.ajax({
			url: url + connect,
			method: 'POST',
			data: $.extend(data, {
				page_size: size,
				page: page
			}),
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
		});
	}

	var data = {
		sort_column: '',
		sort_order: '',
		filter: ''
	};

	getData(data, currentPageNumber); //first getting data

	//pagening
	function checkCurrentDisplaySize() {
		size = $('.page-size').val();
	}

	function checkCurrentPageNumber() {
		if (currentPageNumber > 1) prev.show();
		else prev.hide();
	}

	checkCurrentPageNumber(); //first checking page number

	function updatePageNumber() {
		$('.page-number').html(currentPageNumber);
	}

	prev.click(function() {
		currentPageNumber--;
		console.log(currentPageNumber);
		checkCurrentPageNumber();
		checkCurrentDisplaySize(); //checking size
		getData(data, currentPageNumber, size);
		updatePageNumber();
	});

	next.click(function() {
		currentPageNumber++;
		console.log(currentPageNumber);
		checkCurrentPageNumber();
		checkCurrentDisplaySize(); //checking size
		getData(data, currentPageNumber, size);
		updatePageNumber();
	});

	//sorting descending
	$('.fa-sort-desc').click(function() {
		data = {
			sort_column: $(this).data('column'),
			sort_order: $(this).data('order'),
			filter: ''
		};
		console.log('Current page number before getting data: ' + currentPageNumber);
		currentPageNumber = 1; //resetting page number
		checkCurrentDisplaySize(); //checking size
		getData(data, checkCurrentPageNumber, size);
		console.log('Current page number after getting data: ' + currentPageNumber);
		checkCurrentPageNumber();
		updatePageNumber();
	});

	//sorting ascending
	$('.fa-sort-asc').click(function() {
		data = {
			sort_column: $(this).data('column'),
			sort_order: $(this).data('order'),
			filter: ''
		};
		console.log('Current page number before getting data: ' + currentPageNumber);
		currentPageNumber = 1; //resetting page number
		checkCurrentDisplaySize(); //checking size
		getData(data, checkCurrentPageNumber, size);
		console.log('Current page number after getting data: ' + currentPageNumber);
		checkCurrentPageNumber();
		updatePageNumber();
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