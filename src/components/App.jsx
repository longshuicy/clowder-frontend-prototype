import React, {useEffect, useState} from "react";
import TopBar from "./childComponents/TopBar";
import Breadcrumbs from "./childComponents/BreadCrumb";
import {makeStyles} from "@material-ui/core/styles";
import {fetchFileMetadata} from "../utils/file";
import {downloadThumbnail} from "../utils/thumbnail";
import Dashboard from "./Dashbard";
import Dataset from "./Dataset";
import File from "./File";


const useStyles = makeStyles((theme) => ({}));

export default function App(props) {
	const classes = useStyles();

	const [selectedFileId, setSelectedFileId] = useState("");
	const [selectedDatasetId, setSelectedDatasetId] = useState("");
	const [fileMetadataList, setFileMetadataList] = useState([]);
	const [fileThumbnailList, setFileThumbnailList] = useState([]);
	const [datasetThumbnailList, setDatasetThumbnailList] = useState([]);

	const [paths, setPaths] = useState(["explore", "collection", "dataset", ""]);

	const {
		// files
		listFileExtractedMetadata, fileExtractedMetadata,
		listFileMetadataJsonld, fileMetadataJsonld,
		listFilePreviews, filePreviews,

		//dataset
		listFilesInDataset, filesInDataset,
		listDatasetAbout, datasetAbout,

		//dashboard
		listDatasets, datasets,

		...other
	} = props;

	// component did mount
	useEffect(() => {
		listDatasets();
	}, []);

	// // set breadcrumbs
	// useEffect(() => {
	// 	setPaths(paths => [...paths.slice(0, paths.length - 1), fileMetadata["filename"]]);
	// }, [fileMetadata]);

	useEffect(() => {

		(async () => {
			if (datasets !== undefined && datasets.length > 0) {

				let datasetThumbnailListTemp = [];
				await Promise.all(datasets.map(async (dataset) => {
					// add thumbnails
					if (dataset["thumbnail"] !== null && dataset["thumbnail"] !== undefined) {
						let thumbnailURL = await downloadThumbnail(dataset["thumbnail"]);
						datasetThumbnailListTemp.push({"id": dataset["id"], "thumbnail": thumbnailURL})
					}
				}));
				setDatasetThumbnailList(datasetThumbnailListTemp);
			}
		})();
	}, [datasets])

	// get metadata of each files; because we need the thumbnail of each file!!!
	useEffect(() => {

		(async () => {
			if (filesInDataset !== undefined && filesInDataset.length > 0) {

				let fileMetadataListTemp = [];
				let fileThumbnailListTemp = [];
				await Promise.all(filesInDataset.map(async (fileInDataset) => {

					let fileMetadata = await fetchFileMetadata(fileInDataset["id"]);

					// add thumbnails
					if (fileMetadata["thumbnail"] !== null && fileMetadata["thumbnail"] !== undefined) {
						let thumbnailURL = await downloadThumbnail(fileMetadata["thumbnail"]);
						fileMetadataListTemp.push({
							"id": fileInDataset["id"],
							"metadata": fileMetadata,
							"thumbnail": thumbnailURL
						});
						fileThumbnailListTemp.push({"id": fileInDataset["id"], "thumbnail": thumbnailURL})
					}
				}));

				setFileMetadataList(fileMetadataListTemp);
				setFileThumbnailList(fileThumbnailListTemp);
			}
		})();
	}, [filesInDataset])

	const selectDataset = (selectedDatasetId) => {
		// pass that id to dataset component
		setSelectedDatasetId(selectedDatasetId);

		// load dataset information
		listFilesInDataset(selectedDatasetId);
		listDatasetAbout(selectedDatasetId);
	}

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
					(() => {
						if (selectedDatasetId === "") {
							return <Dashboard datasets={datasets} selectDataset={selectDataset}
											  thumbnails={datasetThumbnailList}/>
						} else if (selectedFileId === "") {
							return <Dataset files={filesInDataset} selectFile={selectFile}
											thumbnails={fileThumbnailList} about={datasetAbout}/>
						} else {
							fileMetadataList.map((fileMetadata) => {
								if (selectedFileId === fileMetadata["id"]) {
									return (
										<File fileMetadata={fileMetadata["metadata"]}
											  fileExtractedMetadata={fileExtractedMetadata}
											  fileMetadataJsonld={fileMetadataJsonld}
											  filePreviews={filePreviews}
											  fileId={selectedFileId}/>
									)
								}
							});
						}
					})()
				}
				</div>
		</div>
	);
}
