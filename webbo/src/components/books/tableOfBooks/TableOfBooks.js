import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import DeleteBook from "../apiRequests/DeleteBook";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import SelectField from "../../UI/SelectField";
import useFormValidation from "../../../hooks/use-formValidation";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";
import { useHistory } from "react-router-dom";
import FloatingButton from "../../UI/FloatingButton/FloatingButton";
import ButtonContainer from "../../UI/Buttons/ButtonContainer";
import ActionValidator from "../../../validators/ActionValidator";

/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */

const initialState = {
	categoryFK: "",
};
function TableOfBooks() {
	let history = useHistory();
	//other hooks
	const { t } = useTranslation();
	const ctx = useContext(MsgBoxContext);
	const classes = useStyles();
	//nesto
	const [refreshState, setRefreshState] = useState("1518");
	//state for modal window
	const [type, setType] = useState("delete");
	const [title, setTitle] = useState("deleteTitle");
	const [content, setContent] = useState("deleteContent");
	// state for select field menu items
	const [menuItemsObject, setMenuItemsObject] = useState();
	//state for select field value
	const [inputFieldValuesObject, setInputFieldValuesObject] =
		useState(initialState);

	const newColumns = columns.map((column) => {
		return { ...column, headerName: t(column.headerName) };
	});
	useEffect(() => {
		fetchSelectFieldMenuItems(["categories"]).then((data) =>
				setMenuItemsObject(data)
			);
	}, [])

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setInputFieldValuesObject({ ...inputFieldValuesObject, [name]: value });
	};

	async function handleDelete() {
		if (type === "delete") {
			const model = {
				id: ctx.itemId,
			};
			const data = await DeleteBook(model);

			if (data === undefined || data.status !== 101) {
				setType("error");
				setTitle("errorTitle");
				setContent("errorContent");
			} else {
				setType("done");
				setTitle("successTitle");
				setContent("successContentDelete");
			}
		} else {
			ctx.setItemId(0);
			ctx.setIsModalOn(false);
			setRefreshState(Math.random());
			setType("delete");
			setTitle("deleteTitle");
			setContent("deleteContent");
		}
	}
	return (
		<React.Fragment>
			<CssBaseline />
			<TemplateForm title={t("booksManagement")} size="large">
				<h3>{t("selectCategory")}</h3>
				<SelectField
					id={"categories"}
					name={"categoryFK"}
					menuItemsData={menuItemsObject}
					value={inputFieldValuesObject}
					valueHandler={handleChange}
					readonly={true}
				/>

				<DataTable
					columns={newColumns}
					getByParameter={GetByParameter}
					pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
					initialPageSize={10}
					dataGridClasses={classes.dataGrid}
					tableName={"Books"}
					refreshState={refreshState}
					specialFilter={inputFieldValuesObject["categoryFK"]}
				/>
				<ButtonContainer>
                {ActionValidator("books.create") && <FloatingButton elevation={5}
                        onClick={() => history.push("/library/books/addBooks")}
                        >
                        {t("addBook")}
                    </FloatingButton>
                }
                </ButtonContainer>
			</TemplateForm>{" "}
			{ctx.isModalOn && (
				<MsgBox
					type={type}
					title={title}
					content={content}
					handleOK={handleDelete}
					handleError={handleDelete}
					handleBackdropClick={
						type === "done" ? handleDelete : () => {}
					}
				/>
			)}
		</React.Fragment>
	);
}

export default TableOfBooks;
