import {
	LOAD_COLORS_SUCCESS,
	ADD_COLOR_SUCCESS,
	REMOVE_COLOR_SUCCESS,
} from './actions';

const initialState = {
	colors: [],
	presets: [],
};

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case LOAD_COLORS_SUCCESS: {
			return { ...state, colors: action.colors };
		}

		case ADD_COLOR_SUCCESS: {
			const colors = [ ...state.colors, action.color ];

			return { ...state, colors };
		}

		case REMOVE_COLOR_SUCCESS: {
			let colors = state.colors.slice();
			const index = colors.findIndex((item) => item.id === action.id);
			colors.splice(index, 1);

			return { ...state, colors };
		}
	}

	return state;
}
