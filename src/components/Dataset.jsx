import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Box, Button, Grid, Tab, Tabs, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
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
	infoCard: {
		padding: "48px 0",
	},
	title: {
		fontWeight: "600",
		fontSize: "16px",
		color: "#000000",
		marginBottom: "8px"
	},
	content: {
		fontSize: "14px",
		color: "#000000",
	}
}));

export default function Dataset(props) {
	const classes = useStyles();
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const {selectFile,	...other} = props;

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
						<Button color="inherit" onClick={() => selectFile("60ee082d5e0e3ff9d746b5fc")}>Text
							File</Button>
						<Button color="inherit" onClick={() => selectFile("59933ae8e4b04cf488f47aba")}>PDF
							File</Button>
						<Button color="inherit" onClick={() => selectFile("5d974f435e0eb9edf7b3cf00")}>Audio
							File</Button>
						<Button color="inherit" onClick={() => selectFile("59933ae9e4b04cf488f47b48")}>Video
							File</Button>
						<Button color="inherit" onClick={() => selectFile("576b0b1ce4b0e899329e8553")}>Image
							File</Button>
						<Button color="inherit" onClick={() => selectFile("60ee08325e0e3ff9d746bc57")}>Three D
							File</Button>
					</TabPanel>
					<TabPanel value={selectedTabIndex} index={1}></TabPanel>
					<TabPanel value={selectedTabIndex} index={2}></TabPanel>
					<TabPanel value={selectedTabIndex} index={3}></TabPanel>
					<TabPanel value={selectedTabIndex} index={4}></TabPanel>
				</Grid>
				<Grid item lg={4} sm={4} xl={4} xs={12}></Grid>
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
