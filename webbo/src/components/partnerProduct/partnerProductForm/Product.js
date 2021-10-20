import React, {useState, useEffect} from "react";
import CustomCheckbox from "../../claimMapperComponents/CustomCheckbox";
import { FormControlLabel } from "@material-ui/core";
import useStyles from "./Styles";
import PostPartnerProduct from "../apiRequests/PostPartnerProduct";
import DeletePartnerProduct from "../apiRequests/DeletePartnerProduct";

/**
 * 
 * @param {int} id - product id
 * @param {string} name - product name
 * @param {int} partnerId - partner id
 * @param {array} existingProducts
 * @returns 
 */
const Product=(props)=>{
	
	const [checked, setChecked]=useState(false);
	const [idPartnerProduct, setIdPartnerProduct]=useState(0);
	const [disabled, setDisabled] = useState(true);
	
	const classes=useStyles();
	
	useEffect(()=>{
		setDisabled(true);
		setChecked(false);
		setIdPartnerProduct(0);
		// provjerit za svaki dobavljeni PartnerProduct provjerit je li product id jednak ovom tu, ako je chekiraj
		// i stavi taj partnerproduct ID u state
		props.existingProducts.forEach((element)=>{
			if(props.id===element.productId){
				setChecked(true);
				setIdPartnerProduct(element.id);
			}
		});
		setDisabled(false);
	}, [props.existingProducts]);
	
	const checkHandler=()=>{
		setDisabled(true);
		let model={};
		if(checked){
			model={
				"idPartnerProduct": idPartnerProduct
			};
			DeletePartnerProduct(model);
		}else{
			model={
				"partnerID" : props.partnerId,
       			"productID" : props.id
			};
			PostPartnerProduct(model);
		}
		setChecked(!checked);
		setDisabled(false);
	}
	
	return(
		<FormControlLabel
            classes={{
                label: classes.label,
            }}
            control={
                <CustomCheckbox
                    checked={checked}
                    onChange={checkHandler}
                    name="create"
                    color="primary"
                    disabled={false}
                />
            }
            label={props.name}
        />
	);
}

export default Product;