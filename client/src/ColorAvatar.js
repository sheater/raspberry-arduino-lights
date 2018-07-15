import React from 'react';
import P from 'prop-types';

import { percentColorToHexa } from './utils';

function ColorAvatar (props) {
	const style = {
		backgroundColor: `#${percentColorToHexa(props)}`
	};

	return <div className="color-avatar" style={style} onClick={props.onClick} />;
}

ColorAvatar.propTypes = {
	r: P.number.isRequired,
	g: P.number.isRequired,
	b: P.number.isRequired,
	onClick: P.func,
};

ColorAvatar.defaultProps = {
	onClick () {}
};

export default ColorAvatar;
