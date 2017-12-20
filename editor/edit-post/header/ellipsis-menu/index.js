/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton, Dropdown } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import ModeSwitcher from '../mode-switcher';
import FixedToolbarToggle from '../fixed-toolbar-toggle';
import EditorActions from '../editor-actions';
import Plugins from '../plugins';

const element = (
	<Dropdown
		className="editor-ellipsis-menu"
		position="bottom left"
		renderToggle={ ( { isOpen, onToggle } ) => (
			<IconButton
				icon="ellipsis"
				label={ __( 'More' ) }
				onClick={ onToggle }
				aria-expanded={ isOpen }
			/>
		) }
		renderContent={ ( { onClose } ) => (
			<div>
				<ModeSwitcher onSelect={ onClose } />
				<div className="editor-ellipsis-menu__separator" />
				<FixedToolbarToggle onToggle={ onClose } />
				<div className="editor-ellipsis-menu__separator" />
<<<<<<< HEAD
				<EditorActions />
=======
				<Plugins onToggle={ onClose } />
>>>>>>> Add an API to add a plugin sidebar
			</div>
		) }
	/>
);

function EllipsisMenu() {
	return element;
}

export default EllipsisMenu;
