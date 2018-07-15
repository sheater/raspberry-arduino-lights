import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import gql from 'graphql-tag';

import {
	LOAD_COLORS, PREVIEW_COLOR, ADD_COLOR, REMOVE_COLOR,
	LOAD_COLORS_SUCCESS, ADD_COLOR_SUCCESS, REMOVE_COLOR_SUCCESS,
} from './actions';

const apollo = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

function* loadColors () {
	try {
		const options = {
			query: gql`
				query {
					colors {
						r, g, b, id
					}
				}
			`
		};

		const { data: { colors } } = yield call(apollo.query, options);

		yield put({ type: LOAD_COLORS_SUCCESS, colors });
	}
	catch (error) {
		console.error(error);
	}
}

function* addColor ({ r, g, b }) {
	try {
		const options = {
			mutation: gql`
				mutation ($r: Int!, $g: Int!, $b: Int!) {
					addColor(r: $r, g: $g, b: $b) {
						r, g, b, id,
					}
				}
			`,
			variables: { r, g, b }
		};

		const response = yield call(apollo.mutate, options);
		// const newColor = response.data.addColor;
		// const colors = [ ...this.state.colors, newColor ];

		yield put({ type: ADD_COLOR_SUCCESS, color: response.data.addColor });
	}
	catch (error) {
		console.error(error)
	}
}

function* removeColor ({ id }) {
	try {
		const options = {
			mutation: gql`
				mutation ($id: String!) {
					removeColor (id: $id) {
						r, g, b, id
					}
				}
			`,
			variables: { id }
		};

		console.log('opts', options);

		// FIXME:
		yield call(apollo.mutate, options);

		// let colors = this.state.colors.slice();
		// const index = colors.findIndex((item) => item.id === id);
		// colors.splice(index, 1);

		// this.setState({ colors });
		yield put({ type: REMOVE_COLOR_SUCCESS, id });
	}
	catch (error) {
		console.error(error);
	}
}

function* previewColor (action) {
	const { r, g, b } = action;

	try {
		const options = {
			mutation: gql`
				mutation ($r: Int!, $g: Int!, $b: Int!) {
					setChannelValue (r: $r, g: $g, b: $b) {
						r, g, b
					}
				}
			`,
			variables: { r, g, b },
		};

		// FIXME:
		yield call(apollo.mutate, options);

		// console.log('response', response);
	}
	catch (error) {
		console.error(error);
	}
}

export default function* rootSaga () {
	yield loadColors();

	return all([
		yield takeLatest(ADD_COLOR, addColor),
		yield takeLatest(REMOVE_COLOR, removeColor),
		yield takeLatest(PREVIEW_COLOR, previewColor),
	]);
}
