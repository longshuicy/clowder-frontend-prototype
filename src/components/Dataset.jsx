import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Box, Button, Divider, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {ClowderInput} from "./styledComponents/ClowderInput";
import {ClowderButton} from "./styledComponents/ClowderButton";

const useStyles = makeStyles((theme) => ({
	appBar: {
		background: "#FFFFFF",
		boxShadow: "none",
	},
	tab: {
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "16px",
		color: "#495057",
		textTransform: "capitalize",
	}
}));

export default function Dataset(props) {
	const classes = useStyles();

	const {files, about, selectFile,	...other} = props;

	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const handleTabChange = (event, newTabIndex) => {
		setSelectedTabIndex(newTabIndex);
	};

	return (
		<div className="inner-container">
			<Grid container spacing={4}>
				<Grid item lg={8} sm={8} xl={8} xs={12}>
					<AppBar className={classes.appBar} position="static">
						<Tabs value={selectedTabIndex} onChange={handleTabChange} aria-label="file tabs">
							<Tab className={classes.tab} label="Files" {...a11yProps(0)} />
							<Tab className={classes.tab} label="Metadata" {...a11yProps(1)} />
							<Tab className={classes.tab} label="Extractions" {...a11yProps(2)} />
							<Tab className={classes.tab} label="Visualizations" {...a11yProps(3)} />
							<Tab className={classes.tab} label="Comments" {...a11yProps(4)} />
						</Tabs>
					</AppBar>
					<TabPanel value={selectedTabIndex} index={0}>
						{
							files !== undefined && files.length > 0 ?
								files.map((file) => {
									return (
										<Box className={"fileCard"}>
											{ file["thumbnail"] !== null  && file["thumbnail"] !== undefined ?
												<img src={file["thumbnail"]} alt="thumbnail"/>
												:
												<></>
											}
											<Button color="inherit"
													onClick={() => selectFile(file["id"])}>
												{file["filename"]}</Button>
											<Typography>{file["size"]}</Typography>
											<Typography>{file["data-created"]}</Typography>
											<Typography>{file["filePath"]}</Typography>
											<Typography>{file["contentType"]}</Typography>
										</Box>
									)
								})
								:
								<></>
						}
					</TabPanel>
					<TabPanel value={selectedTabIndex} index={1}></TabPanel>
					<TabPanel value={selectedTabIndex} index={2}></TabPanel>
					<TabPanel value={selectedTabIndex} index={3}></TabPanel>
					<TabPanel value={selectedTabIndex} index={4}></TabPanel>
				</Grid>
				<Grid item lg={4} sm={4} xl={4} xs={12}>
					{
						about !== undefined ?
							<Box className="infoCard">
								<Typography className="title">About</Typography>
								<Typography className="content">Owner: {about["authorId"]}</Typography>
								<Typography className="content">Description: {about["description"]}</Typography>
								<Typography className="content">Created on: {about["created"]}</Typography>
								{/*/!*TODO use this to get thumbnail*!/*/}
								<Typography className="content">Thumbnail: {about["thumbnail"]}</Typography>
								{/*<Typography className="content">Belongs to spaces: {about["authorId"]}</Typography>*/}
								{/*/!*TODO not sure how to use this info*!/*/}
								{/*<Typography className="content">Resource type: {about["resource_type"]}</Typography>*/}
							</Box> : <></>
					}
					<Divider light/>
					<Box className="infoCard">
						<Typography className="title">Statistics</Typography>
						<Typography className="content">Views: 10</Typography>
						<Typography className="content">Last viewed: Jun 07, 2021 21:49:09</Typography>
						<Typography className="content">Downloads: 0</Typography>
						<Typography className="content">Last downloaded: Never</Typography>
					</Box>
					<Divider light/>
					<Box className="infoCard">
						<Typography className="title">Tags</Typography>
						<Grid container spacing={4}>
							<Grid item lg={8} sm={8} xl={8} xs={12}>
								<ClowderInput defaultValue="Tag"/>
							</Grid>
							<Grid item lg={4} sm={4} xl={4} xs={12}>
								<ClowderButton>Search</ClowderButton>
							</Grid>
						</Grid>
					</Box>
					<Divider light/>
				</Grid>
			</Grid>
		</div>
	);
}

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`dataset-tabpanel-${index}`}
			aria-labelledby={`dataset-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `dataset-tab-${index}`,
		"aria-controls": `dataset-tabpanel-${index}`,
	};
}
