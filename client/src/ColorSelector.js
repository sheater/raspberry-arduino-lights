import React from 'react';
import P from 'prop-types';
import { Tag } from 'antd';

import ColorAvatar from './ColorAvatar';
import { percentColorToHexa } from './utils';

export default class ColorSelector extends React.Component {
	static propTypes = {
		isMulti: P.bool,
		colors: P.array.isRequired,
		onChange: P.func, // onChange(selectedColors[])
	};

	state = {
		selectedIds: [],
	};

	_handleAddClick (id) {
		if (this.props.isMulti) {
			const { selectedIds } = this.state;

			if (selectedIds.includes(id)) {
				return;
			}

			this.setState({
				selectedIds: [ ...selectedIds, id ]
			});
		}
		else {
			this.setState({
				selectedIds: [ id ]
			})
		}
	}

	_handleRemoveClick (id) {
		this.setState({
			selectedIds: this.state.selectedIds.filter((selectedId) => selectedId !== id)
		});
	}

	render () {
		const { colors } = this.props;
		const { selectedIds } = this.state;

		return (
			<div className="color-selector">
				<h4>All</h4>
				<div className="color-selector__list">
					{colors.map((item) => {
						return (
							<ColorAvatar
								r={item.r} g={item.g} b={item.b} key={item.id}
								onClick={() => this._handleAddClick(item.id)}
							/>
						);
					})}
				</div>
				<h4>Selected</h4>
				<div className="color-selector__list">
					{
						selectedIds.length ?
							selectedIds.reduce((acc, id) => {
								const item = colors.find((color) => color.id === id);

								acc.push(
									<ColorAvatar
										r={item.r} g={item.g} b={item.b} key={item.id}
										onClick={() => this._handleRemoveClick(item.id)}
									/>
								);

								return acc;
							}, []) :
							'No color selected'
					}
				</div>
			</div>
		);
	}
}
