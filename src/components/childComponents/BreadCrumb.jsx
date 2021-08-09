import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	breadCrumb:{
		padding:"28px"
	},
	breadCrumbText:{
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: "24px",
		color: "#343A40"
	},
	breadCrumbLink:{
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: "24px",
		color: "#6C757D",
		textTransform: "capitalize"
	}
}));

export default function Breadcrumbs(props) {
	const classes = useStyles();

	const { paths, goToPath, ...other} = props;
	return (
		<div>
			<MuiBreadcrumbs className={classes.breadCrumb} aria-label="breadcrumb">
				{
					paths.map((path, index) => {
						if (index !== paths.length -1){
							return (<Button color="inherit" className={classes.breadCrumbLink}
										  onClick={() => goToPath(path["type"], path["id"])}
							>{path["name"]}</Button>);
						}
						else{
							return (<Button color="inherit" className={classes.breadCrumbText}
										  onClick={() => goToPath(path["type"], path["id"])}>
								{path["name"]}</Button>);
						}
					})
				}
			</MuiBreadcrumbs>
			<Divider light />
		</div>

	);
}
