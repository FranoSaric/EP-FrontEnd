import React from 'react';
import { DataGrid, 
	GridToolbarContainer,
	GridToolbarColumnsButton, 
	GridToolbarFilterButton, 
	GridToolbarExport, 
	GridToolbarDensitySelector} from '@material-ui/data-grid';
import useStyles from "./Styles";

/**
 * custom toolbar component for functionalities in data grid
 * @param {string} tableName - name of table in usage
 * @returns 
 */
function CustomToolbar(props) {
	
	const classes=useStyles();
	
	const date=new Date();
	const month=date.getMonth()+1;
	const dateString=date.getFullYear()+"-"+month+"-"+date.getDate()+"-"+date.getHours()+"-"+date.getMinutes();
	
	const documentName=props.tableName+" - "+dateString;
	
	return (
		<GridToolbarContainer className={classes.toolbar}>
			<div>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</div>
			<div>
				<GridToolbarDensitySelector />
				<GridToolbarExport  csvOptions={{fileName: documentName}}/>
			</div>
		</GridToolbarContainer>
	);
}

export default CustomToolbar;