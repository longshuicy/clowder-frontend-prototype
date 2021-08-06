import config from "../app.config";
import {getHeader} from "../utils/common";

export const RECEIVE_FILES_IN_DATASET= "RECEIVE_FILES_IN_DATASET";
export function receiveFilesInDataset(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			files: json,
			receivedAt: Date.now(),
		});
	};
}
export function fetchFilesInDataset(id="610d54a15e0e9253e65863f8"){
	let url = `${config.hostname}/clowder/api/datasets/${id}/files?superAdmin=true`;
	return (dispatch) => {
		return fetch(url, {mode:"cors", headers: getHeader()})
		.then((response) => {
			if (response.status === 200) {
				response.json().then(json =>{
					dispatch(receiveFilesInDataset(RECEIVE_FILES_IN_DATASET, json));
				});
			}
			else {
				dispatch(receiveFilesInDataset(RECEIVE_FILES_IN_DATASET, []));
			}
		});
	};
}
