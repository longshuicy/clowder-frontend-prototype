import { RECEIVE_FILES_IN_DATASET } from "../actions/dataset";

const defaultState = {files: []};

const dataset = (state=defaultState, action) => {
	switch(action.type) {
		case RECEIVE_FILES_IN_DATASET:
			return Object.assign({}, state, {files: action.files});
		default:
			return state;
	}
};

export default dataset;
