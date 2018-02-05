/**
 * Does a shallow compare on the contents of 2 objects.
 *
 * @param {Object} obj1 The original object.
 * @param {Object} obj2 The object to compare too.
 * @returns {boolean} Whether the object contents differ.
 */
export function shallowObjectContentEquals( obj1, obj2 ) {
	for ( const key in obj1 ) {
		if ( obj1.hasOwnProperty( key ) ) {
			if ( ! obj2.hasOwnProperty( key ) ) {
				return false;
			}
			if ( obj1[ key ] !== obj2[ key ] ) {
				return false;
			}
		}
	}
	return true;
}