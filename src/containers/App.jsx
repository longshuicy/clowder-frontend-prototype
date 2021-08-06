import {connect} from "react-redux";
import AppComponent from "../components/App";
import {
	fetchFileExtractedMetadata,
	fetchFileMetadata,
	fetchFileMetadataJsonld,
	fetchFilePreviews
} from "../actions/file";

import {
	fetchFilesInDataset
} from "../actions/dataset";

const mapStateToProps = (state) => {
	return {
		fileMetadata: state.file.metadata,
		fileExtractedMetadata: state.file.extractedMetadata,
		fileMetadataJsonld: state.file.metadataJsonld,
		filePreviews: state.file.previews,
		filesInDataset: state.dataset.files
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listFileMetadata: (id) => {
			dispatch(fetchFileMetadata(id));
		},
		listFileExtractedMetadata: (id) => {
			dispatch(fetchFileExtractedMetadata(id));
		},
		listFileMetadataJsonld: (id) => {
			dispatch(fetchFileMetadataJsonld(id));
		},
		listFilePreviews: (fileId) => {
			dispatch(fetchFilePreviews(fileId));
		},
		listFilesInDataset: (datasetId) => {
			dispatch(fetchFilesInDataset(datasetId));
		}
	};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
