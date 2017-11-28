const handleRegister = {};
let post = null;

export function getPost() {
	return {
		getContent: () => {
			if ( post === null ) {
				return '';
			}

			return post.content;
		}
	};
}

export function on( name, handler ) {
	if ( ! handleRegister.hasOwnProperty( name ) ) {
		handleRegister[ name ] = [];
	}

	handleRegister[ name ].push( handler );
}

export function emit( name, data ) {
	if ( ! handleRegister.hasOwnProperty( name ) ) {
		return;
	}

	if ( name === 'post-updated' ) {
		console.log( data );
		post = data;
	}

	let handlers = handleRegister[ name ];

	handlers.forEach( handler => {
		handler( data );
	} );
}
