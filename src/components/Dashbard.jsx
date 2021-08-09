import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Box, Button, Divider, Grid, ListItem, Tab, Tabs, Typography} from "@material-ui/core";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

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
	},
	fileCard:{
		background: "#FFFFFF",
		border: "1px solid #DFDFDF",
		boxSizing: "border-box",
		borderRadius: "4px",
		margin:"20px auto",
		"& > .MuiGrid-item":{
			padding:0,
			height:"150px",
		}
	},
	fileCardImg:{
		height: "50%",
		margin:"40px auto",
		display:"block"
	},
	fileCardText:{
		padding: "40px 20px",
		fontSize:"16px",
		fontWeight:"normal",
		color:"#212529"
	},
}));

export default function Dashboard(props) {
	const classes = useStyles();

	const {datasets, selectDataset, thumbnails, ...other} = props;

	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const handleTabChange = (event, newTabIndex) => {
		setSelectedTabIndex(newTabIndex);
	};

	return (
		<div className="inner-container">
			<Grid container spacing={4}>
				<Grid item lg={8} xl={8} md={8} sm={8} xs={12}>
					<AppBar className={classes.appBar} position="static">
						<Tabs value={selectedTabIndex} onChange={handleTabChange} aria-label="dashboard tabs">
							<Tab className={classes.tab} label="Datasets" {...a11yProps(0)} />
							<Tab className={classes.tab} label="Activity" {...a11yProps(1)} />
							<Tab className={classes.tab} label="Collections" {...a11yProps(2)} />
							<Tab className={classes.tab} label="Spaces" {...a11yProps(3)} />
							<Tab className={classes.tab} label="API Keys" {...a11yProps(4)} />
						</Tabs>
					</AppBar>
					<TabPanel value={selectedTabIndex} index={0}>

						{
							datasets !== undefined && thumbnails !== undefined ?
								datasets.map((dataset) => {
									let thumbnailComp = <BusinessCenterIcon className={classes.fileCardImg}
																		 style={{fontSize: "5em"}}/>;
									thumbnails.map((thumbnail) => {
										if (dataset["id"] !== undefined && thumbnail["id"] !== undefined &&
											thumbnail["thumbnail"] !== null && thumbnail["thumbnail"] !== undefined &&
											dataset["id"] === thumbnail["id"]) {
											thumbnailComp = <img src={thumbnail["thumbnail"]} alt="thumbnail"
																 className={classes.fileCardImg}/>;
										}
									});
									return (
										<ListItem button className={classes.fileCard} key={dataset["id"]}
												  onClick={() =>selectDataset(dataset["id"])}>
											<Grid item xl={2} lg={2} md={2} sm={2} xs={12}>
												{thumbnailComp}
											</Grid>
											<Grid item xl={10} lg={10} md={10} sm={10} xs={12}>
												<Box className={classes.fileCardText}>
													<Typography>Dataset name: {dataset["name"]}</Typography>
													<Typography>Description: {dataset["description"]}</Typography>
													<Typography>Created on: {dataset["created"]}</Typography>
												</Box>
											</Grid>
										</ListItem>
									);
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
				<Grid item lg={4} md={4} xl={4} sm={4} xs={12}>
				{/*	{*/}
				{/*		about !== undefined ?*/}
				{/*			<Box className="infoCard">*/}
				{/*				<Typography className="title">About</Typography>*/}
				{/*				<Typography className="content">Owner: {about["authorId"]}</Typography>*/}
				{/*				<Typography className="content">Description: {about["description"]}</Typography>*/}
				{/*				<Typography className="content">Created on: {about["created"]}</Typography>*/}
								{/*/!*TODO use this to get thumbnail*!/*/}
				{/*				<Typography className="content">Thumbnail: {about["thumbnail"]}</Typography>*/}
				{/*				/!*<Typography className="content">Belongs to spaces: {about["authorId"]}</Typography>*!/*/}
								{/*/!*TODO not sure how to use this info*!/*/}
				{/*				/!*<Typography className="content">Resource type: {about["resource_type"]}</Typography>*!/*/}
				{/*			</Box> : <></>*/}
				{/*	}*/}
				{/*	<Divider light/>*/}
				{/*	<Box className="infoCard">*/}
				{/*		<Typography className="title">Statistics</Typography>*/}
				{/*		<Typography className="content">Views: 10</Typography>*/}
				{/*		<Typography className="content">Last viewed: Jun 07, 2021 21:49:09</Typography>*/}
				{/*		<Typography className="content">Downloads: 0</Typography>*/}
				{/*		<Typography className="content">Last downloaded: Never</Typography>*/}
				{/*	</Box>*/}
				{/*	<Divider light/>*/}
				{/*	<Box className="infoCard">*/}
				{/*		<Typography className="title">Tags</Typography>*/}
				{/*		<Grid container spacing={4}>*/}
				{/*			<Grid item lg={8} sm={8} xl={8} xs={12}>*/}
				{/*				<ClowderInput defaultValue="Tag"/>*/}
				{/*			</Grid>*/}
				{/*			<Grid item lg={4} sm={4} xl={4} xs={12}>*/}
				{/*				<ClowderButton>Search</ClowderButton>*/}
				{/*			</Grid>*/}
				{/*		</Grid>*/}
				{/*	</Box>*/}
				{/*	<Divider light/>*/}
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
			id={`dashboard-tabpanel-${index}`}
			aria-labelledby={`dashboard-tab-${index}`}
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
		id: `dashboard-tab-${index}`,
		"aria-controls": `dashboard-tabpanel-${index}`,
	};
}
