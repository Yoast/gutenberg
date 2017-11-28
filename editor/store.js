/**
 * External dependencies
 */
import { applyMiddleware, createStore } from 'redux';
import refx from 'refx';
import multi from 'redux-multi';
import { flowRight } from 'lodash';

/**
 * Internal dependencies
 */
import effects from './effects';
import { mobileMiddleware } from './utils/mobile';
import reducer from './reducer';
import storePersist from './store-persist';
import { PREFERENCES_DEFAULTS } from './store-defaults';
import { getEditedPostContent } from "./selectors";

/**
 * Module constants
 */
const GUTENBERG_PREFERENCES_KEY = `GUTENBERG_PREFERENCES_${ window.userSettings.uid }`;

let postContent = null;

function setupDataHandlers( store ) {
	store.subscribe( () => {
		let state = store.getState();

		let editedPostContent = getEditedPostContent( state );

		if ( postContent !== editedPostContent ) {
			postContent = editedPostContent;

			wp.data.emit( "post-updated", {
				content: postContent,
			} );
		}
	} );
}

/**
 * Creates a new instance of a Redux store.
 *
 * @param  {?*}          preloadedState Optional initial state
 * @return {Redux.Store}                Redux store
 */
function createReduxStore( preloadedState ) {
	const enhancers = [
		applyMiddleware( multi, refx( effects ) ),
		storePersist( {
			reducerKey: 'preferences',
			storageKey: GUTENBERG_PREFERENCES_KEY,
			defaults: PREFERENCES_DEFAULTS,
		} ),
		applyMiddleware( mobileMiddleware ),
	];

	if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) {
		enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__() );
	}

	const store = createStore( reducer, preloadedState, flowRight( enhancers ) );

	setupDataHandlers( store );

	return store;
}
export default createReduxStore;
