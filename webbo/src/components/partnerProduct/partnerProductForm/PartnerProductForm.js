import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import Button from "@material-ui/core/Button";
import useStyles from "../../UI/TemplateForm/TemplateFormStyles";
import MsgBoxContext from "../../../store/MsgBoxContext";
import PostPartnerProduct from "../apiRequests/PostPartnerProduct";
import { useTranslation } from "react-i18next";
import useGlobalState from "../../../store/useGlobalState";
import SelectField from "../../UI/SelectField";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import ProductsMapper from "./ProductsMapper";

/**
 * Add user form with validation for every user input, form validation and connected country and city select input values
 * @returns
 */
const initialState = {
    partnerID: parseInt(localStorage.getItem("partnerId")),
};

function PartnerProductForm() {
    //path handling hooks
    let history = useHistory();
    const params = useParams();
	let temp = {
		partnerID: parseInt(localStorage.getItem("partnerId")),
	}
    //state for differentiating between add and update pages
    const [isUpdate, setIsUpdate] = useState(false);
    //other hooks
    const { t } = useTranslation();
    const ctx = useContext(MsgBoxContext);
    const classes = useStyles();
    const getRow = useGlobalState()[1];
    // state for select field menu items
    const [menuItemsObject, setMenuItemsObject] = useState({});
    //state for response status when data are posted on server
    const [responseStatus, setResponseStatus] = useState();
    //input fields state
    const [inputFieldValuesObject, setInputFieldValuesObject] =
        useState(temp);
    
    // used to check if it's add new or update existing item
    useEffect(() => {
        fetchSelectFieldMenuItems(["partnerID"]).then((data) => {
            setMenuItemsObject(data);
        });
    }, []);
    
    const handleChange = (event) => {console.log(event)
        event.preventDefault();
        const { name, value } = event.target;
        setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value,});
    };
    console.log(inputFieldValuesObject)
    return (
        <TemplateForm title={t("assignProduct")}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SelectField
                        name="partnerID"
                        id="partnerID"
						label="partners"
                        menuItemsData={menuItemsObject}
                        value={inputFieldValuesObject}
                        valueHandler={handleChange}
                        readonly={isUpdate}
                    />
                </Grid>
            </Grid>
            {/* dobavit sve proizvode iz tablice proizvodi 
            kreirat checkboxove od njih i označit one koje ima taj partner_id u tablici 
            partnerProducts */}
            <ProductsMapper partnerId={inputFieldValuesObject["partnerID"]}/>
            <div className={classes.buttons}>
                
                <Button
                    onClick={() => history.goBack()}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    {t("back")}
                </Button>
                
            </div>
        </TemplateForm>
    );
}

export default PartnerProductForm;
