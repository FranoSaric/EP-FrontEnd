import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import menuItemsArrayGenerator from "./menuItemsArrayGenerator";

// const URL = process.env.REACT_APP_API_USER;

const SelectField = (props) => {
	const { t } = useTranslation();

	const [menuItems, setMenuItems] = useState([
		<MenuItem key={1} value={props.value[props.name]}></MenuItem>,
	]);
	//state for getting derived value
	useEffect(() => {
		if (props.menuItemsData !== undefined) {
			if (props.menuItemsData[props.id] !== undefined) {
				setMenuItems(
					menuItemsArrayGenerator(
						props.id,
						props.menuItemsData[props.id]
					)
				);
			}
		}
	}, [props.menuItemsData]);
	return (
		<FormControl fullWidth margin="dense">
			<InputLabel id={`${props.id}-label`}>{props.label ? t(props.label) : t(props.id)}</InputLabel>
			<Select
				className={props.className}
				name={props.name}
				labelId={`${props.id}-label`}
				id={props.id}
				value={props.value[props.name]}
				onChange={props.valueHandler}
			>
				{menuItems}
			</Select>
		</FormControl>
	);
};

export default SelectField;
