import React from 'react';
import { connect } from 'react-redux';
import { Button, Avatar, List, Modal, Slider, Popconfirm, Dropdown, Menu } from 'antd';

import { ADD_COLOR, REMOVE_COLOR, PREVIEW_COLOR } from './actions';
import ColorPickerModal from './ColorpickerModal';
import ColorAvatar from './ColorAvatar';

class Colors extends React.Component {
	state = {
		isColorPickerVisible: false,
		currentColor: {
			r: 50,
			g: 50,
			b: 50,
		},
		colors: [],
	};

	_handlePreviewClick = ({ r, g, b }) => {
	}
	
	_handleColorSelected = ({ r, g, b }) => {
		this._toggleColorPickerVisibility();
		
		this.props.dispatch({ type: ADD_COLOR, r, g, b });
	}
	
	_handleRemoveColor = (id) => {
		this.props.dispatch({ type: REMOVE_COLOR, id });
	}
	
	_handleUseClick = ({ r, g, b }) => {
		console.log('r', r, g, b);
		this.props.dispatch({ type: PREVIEW_COLOR, r, g, b });
	}

	_renderItem = (item) => {
		const { r, g, b } = item;

		const menu = (
			<Menu>
				<Menu.Item key="1">Edit</Menu.Item>
				<Menu.Item key="2">
					<Popconfirm
							placement="topLeft"
							title="Are you sure?"
							onConfirm={() => this._handleRemoveColor(item.id)}
							okText="Yes"
							cancelText="No"
						>
							Delete
						</Popconfirm>
					</Menu.Item>
			</Menu>
		);

		return (
			<List.Item
				actions={[
					<Dropdown.Button onClick={() => this._handleUseClick(item)} overlay={menu}>
						Use
					</Dropdown.Button>
					// <Button>use</Button>,
					// <Dropdown overlay={menu} trigger={['click']}>
					// 	<a className="ant-dropdown-link" href="#">
					// 		Click me <Icon type="down" />
					// 	</a>
					// </Dropdown>
					// <Popconfirm
					// 	placement="topLeft"
					// 	title="Are you sure?"
					// 	onConfirm={() => this._handleRemoveColor(item.id)}
					// 	okText="Yes"
					// 	cancelText="No"
					// >
					// 	<Button>remove</Button>
					// </Popconfirm>
				]}
			>
				<List.Item.Meta
					avatar={<ColorAvatar r={r} g={g} b={b} />}
					title={item.id}
					description={`R: ${r}% G: ${g}% B: ${b}%`}
				/>
				<div></div>
			</List.Item>
		);
	}

	_toggleColorPickerVisibility = () => {
		this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
	}

	render () {
		return (
			<div>
				<Button onClick={this._toggleColorPickerVisibility}>Create new color preset</Button>
				<ColorPickerModal
					defaultColor={this.state.currentColor}
					isVisible={this.state.isColorPickerVisible}
					onColorSelected={this._handleColorSelected}
					onPreviewClick={this._handlePreviewClick}
					onCancelClick={this._toggleColorPickerVisibility}
				/>
				<List
					itemLayout="horizontal"
					dataSource={this.props.colors}
					renderItem={this._renderItem}
				/>
			</div>
		);
	}
}

export default connect((state) => state)(Colors);
