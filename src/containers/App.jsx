import {connect} from "react-redux";
import AppComponent from "../components/App";
import {
	fetchFileExtractedMetadata,
	fetchFileMetadata,
	fetchFileMetadataJsonld,
	fetchFilePreviews
} from "../actions/file";

const mapStateToProps = (state) => {
	return {
		fileMetadata: state.file.metadata,
		fileExtractedMetadata: state.file.extractedMetadata,
		fileMetadataJsonld: state.file.metadataJsonld,
		filePreviews: state.file.previews,
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
		}
	};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
