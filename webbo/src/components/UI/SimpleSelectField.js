import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FetchRequest from "../../api/FetchRequest";

// const URL = process.env.REACT_APP_API_USER;
const URL="https://services.testnisite.com:8103/Staging/BO01";

/**
 * 
 * @param {string} key - name of property that represents id of extracted data
 * @param {string} menuItemValue - name of property that represents targeted value of extracted data
 * @param {string} menuItemLabel - name of property that should be written as label on menu items
 * @param {string} addOnUrl - api url addOn for fetching specific data
 * @param {state} value - state passed for data binding from parent component
 * @param {function} setValue - state value setter from parent component
 * @param {string} validationObjectName - name of object 
 * @param {function} handleIsValid - form validation handler function
 * @returns 
 */
const SimpleSelectField = (props) => {
	const { t } = useTranslation();
    
    const { menuItemkey, menuItemValue, menuItemLabel, addOnUrl, value, setValue, validationObjectName, handleIsValid } = props;
    const [menuItems, setMenuItems] = useState([]);
    let generatedItems;
    
	async function getData() {
		
		const data = await FetchRequest(URL + addOnUrl, "post", {});
		// console.log("data u select fieldu: ", data);
		return JSON.parse(data.data);
	}
    
    const valueSelectHandler = (event) => {
        setValue(event.target.value);
        handleIsValid(validationObjectName, true);
		
    };
    useEffect(() => {
		getData().then((data) => {
			
			generatedItems = data.map((listItem) => {
				return (
					<MenuItem
						key={listItem[menuItemkey]}
						value={listItem[menuItemValue]}
					>
						{listItem[menuItemLabel]}
					</MenuItem>
				);
			});
			setMenuItems(generatedItems);
		});
        
    }, [props.filterValue]);
    return (
        <FormControl fullWidth margin="dense">
            <InputLabel >{t(validationObjectName)}</InputLabel>
            <Select
                value={value}
                onChange={valueSelectHandler}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
};

export default SimpleSelectField;