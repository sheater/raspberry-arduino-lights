import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Tabs } from 'antd';

import Colors from './Colors';
import store from './store';

const { TabPane } = Tabs;

class Main extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<div className="wrapper">
					<Colors />
				</div>
			</Provider>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
