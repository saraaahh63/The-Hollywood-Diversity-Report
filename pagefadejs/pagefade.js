$(window).on( 'load', function () {
	setTimeout( function () {
		$( '.pagefade' ).fadeIn( 600 );
	}, 600 );

	$( 'a[href]' ).click( function () {	
		var url = this.href;
		
		$( 'body' ).fadeOut( 600 );		
		setTimeout( function () {
			location.href = url;
		}, 600 );
		return false;
	});
});