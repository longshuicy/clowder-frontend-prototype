import React, {useEffect, useState} from "react";
import TopBar from "./childComponents/TopBar";
import Breadcrumbs from "./childComponents/BreadCrumb";
import {makeStyles} from "@material-ui/core/styles";
import File from "./File";
import Dataset from "./Dataset";

const useStyles = makeStyles((theme) => ({

}));

export default function App(props) {
	const classes = useStyles();

	const [datasetId, setDatasetId] = useState("");
	const [fileId, setFileId] = useState("");
	const [paths, setPaths] = useState(["explore", "collection", "dataset", ""]);

	const {
		listFileMetadata, fileMetadata,
		listFileExtractedMetadata, fileExtractedMetadata,
		listFileMetadataJsonld, fileMetadataJsonld,
		listFilePreviews, filePreviews,
		...other
	} = props;

	useEffect(() => {
		// set breadcrumbs
		setPaths(paths => [...paths.slice(0, paths.length - 1), fileMetadata["filename"]]);
	}, [fileMetadata]);

	const selectFile = (selectedFileId) => {
		// pass that id to file component
		setFileId(selectedFileId);

		// load file information
		listFileMetadata(selectedFileId);
		listFileExtractedMetadata(selectedFileId);
		listFileMetadataJsonld(selectedFileId);
		listFilePreviews(selectedFileId);
	}

	const handleTabChange = (event, newTabIndex) => {
		setSelectedTabIndex(newTabIndex);
	};

	return (
		<div>
			<TopBar/>
			<div className="outer-container">
				<Breadcrumbs paths={paths}/>
				{
					fileId === "" ?
						// Dataset page
						<Dataset selectFile={selectFile}/>
						:
						// file page
						<File fileMetadata={fileMetadata}
							  fileExtractedMetadata={fileExtractedMetadata}
							  fileMetadataJsonld={fileMetadataJsonld}
							  filePreviews={filePreviews}
							  fileId={fileId}/>

				}
			</div>
		</div>
	);
}
