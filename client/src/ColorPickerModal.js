import React from 'react';
import P from 'prop-types';
import { Modal, Slider, Button, Checkbox } from 'antd';

import ColorAvatar from './ColorAvatar';

export default class ColorpickerModal extends React.Component {
	static propTypes = {
		defaultColor: P.shape({
			r: P.number.isRequired,
			g: P.number.isRequired,
			b: P.number.isRequired,
		}).isRequired,
		isVisible: P.bool,
		onColorSelected: P.func,
		onPreviewClick: P.func,
		onCancelClick: P.func,
	};

	static defaultProps = {
		onColorSelected () {},
		onPreviewClick() {},
		onCancelClick () {}
	};

	constructor (props) {
		super(props);

		const { r, g, b } = props.defaultColor;

		this.state = { r, g, b };
	}

	_handleOkClick = () => {
		const { r, g, b } = this.state;

		this.props.onColorSelected({ r, g, b });
	};

	_handlePreviewChange = () => {
		const { r, g, b } = this.state;

		this.props.onPreviewClick({ r, g, b });
	}

	_handleRedChange = (r) => this.setState({ r });
	_handleGreenChange = (g) => this.setState({ g });
	_handleBlueChange = (b) => this.setState({ b });

	render () {
		const { r, g, b } = this.state;

		return (
			<Modal
				title="Basic Modal"
				visible={this.props.isVisible}
				onOk={this._handleOkClick}
				onCancel={this.props.onCancelClick}
			>
				<ColorAvatar r={r} g={g} b={b} />
				<Slider defaultValue={r} onChange={this._handleRedChange} />
				<Slider defaultValue={g} onChange={this._handleGreenChange} />
				<Slider defaultValue={b} onChange={this._handleBlueChange} />
				<Checkbox onChange={this._handlePreviewChange}>Preview</Checkbox>
			</Modal>
		);
	}
}
