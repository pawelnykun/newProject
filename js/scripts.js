$(function() {
	var url = 'http://rt.ex7.pl/';
	var test = 'ping';
	var testing = $('.testing');
	var start = $('.start');
	start.click(search);

	function search() {
		$.ajax({
			url: url + test,
			method: 'GET',
			success: showAnswer
		});
	}

	function showAnswer(resp) {
		testing.find('p').text(resp.response);
	}
});