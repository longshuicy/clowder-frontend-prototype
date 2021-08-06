import {getHeader} from "./common";
import config from "../app.config";


export async function downloadThumbnail(thumbnailId, title=null) {
	let url = `${config.hostname}/clowder/api/thumbnails/${thumbnailId}/blob?superAdmin=true`;
	let authHeader = getHeader();
	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		headers: authHeader,
	});

	if (response.status  === 200){
		let blob = await response.blob();
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, thumbnailId);
			return null;
		} else {
			return window.URL.createObjectURL(blob);
		}
	}
	else if  (response.status  === 401){
		// TODO handle error
		return null;
	}
	else {
		// TODO handle error
		return null;
	}
}
