import React, {useEffect, useState} from "react";
import TopBar from "./childComponents/TopBar";
import Breadcrumbs from "./childComponents/BreadCrumb";
import {makeStyles} from "@material-ui/core/styles";
import File from "./File";
import Dataset from "./Dataset";
import {fetchFileMetadata} from "../utils/file";

const useStyles = makeStyles((theme) => ({

}));

export default function App(props) {
	const classes = useStyles();

	const [datasetId, setDatasetId] = useState("");
	const [allFiles, setAllFiles] = useState([]);
	const [selectedFileId, setSelectedFileId] = useState("");
	const [fileMetadataList, setFileMetadataList] = useState([]);

	const [paths, setPaths] = useState(["explore", "collection", "dataset", ""]);

	const {
		// files
		listFileExtractedMetadata, fileExtractedMetadata,
		listFileMetadataJsonld, fileMetadataJsonld,
		listFilePreviews, filePreviews,

		//dataset
		listFilesInDataset, filesInDataset,
		listDatasetAbout, datasetAbout,
		...other
	} = props;

	// component did mount
	useEffect(() => {
		listFilesInDataset();
		listDatasetAbout();
	}, []);

	// // set breadcrumbs
	// useEffect(() => {
	// 	setPaths(paths => [...paths.slice(0, paths.length - 1), fileMetadata["filename"]]);
	// }, [fileMetadata]);

	// get metadata of each files; because we need the thumbnail of each file!!!
	useEffect(() => {
		if (filesInDataset !== undefined && filesInDataset.length > 0){
			// empty list
			setFileMetadataList([]);
			setAllFiles([]);
			filesInDataset.map(async (fileInDataset) => {
				let fileMetadata = await fetchFileMetadata(fileInDataset["id"]);
				setFileMetadataList(fileMetadataList => [
					...fileMetadataList, {"id":fileInDataset["id"], "metadata": fileMetadata}
				]);

				// add thumbnails to list of files
				let fileInfo = fileInDataset;
				fileInfo["thumbnail"] = fileMetadata["thumbnail"];
				setAllFiles(allFiles => [ ...allFiles, fileInfo]);
			});
		}
	}, [filesInDataset])

	const selectFile = (selectedFileId) => {
		// pass that id to file component
		setSelectedFileId(selectedFileId);

		// load file information
		listFileExtractedMetadata(selectedFileId);
		listFileMetadataJsonld(selectedFileId);
		listFilePreviews(selectedFileId);
	}

	return (
		<div>
			<TopBar/>
			<div className="outer-container">
				<Breadcrumbs paths={paths}/>
				{
					selectedFileId === "" ?
						// Dataset page
						<Dataset selectFile={selectFile}
								 files={allFiles}
								 about={datasetAbout}
						/>
						:
						// file page
						fileMetadataList.map((fileMetadata) =>{
							if (selectedFileId === fileMetadata["id"]){
								return (
									<File fileMetadata={fileMetadata["metadata"]}
										  fileExtractedMetadata={fileExtractedMetadata}
										  fileMetadataJsonld={fileMetadataJsonld}
										  filePreviews={filePreviews}
										  fileId={selectedFileId}/>
								)
							}
						})
				}
			</div>
		</div>
	);
}
