import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../dataTable/DataTable";
import { columns } from "./Columns";
import GetByParameter from "../apiRequests/GetByParameter";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./TableStyles.js";
import MsgBoxContext from "../../../store/MsgBoxContext";
import MsgBox from "../../msgBox/MsgBox";
import { useTranslation } from "react-i18next";
import DeleteClassroom from "../apiRequests/DeleteClassroom";
import TemplateForm from "../../UI/TemplateForm/TemplateForm";
import SelectField from "../../UI/SelectField";
import useFormValidation from "../../../hooks/use-formValidation";
import useInputFormValidation from "../../../hooks/use-inputFormValidation";
import fetchSelectFieldMenuItems from "../../../api/fetchSelectFieldMenuItems";

/**
 *
 * @returns Either Data grid table of Users or modal form for confirming item deletion,
 * depends on given context (isModalOn)
 */

const initialState = {
	institutionFK: "",
};
function TableOfClassrooms() {
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
		fetchSelectFieldMenuItems(["institutions"]).then((data) =>
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
			const data = await DeleteClassroom(model);

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
			<TemplateForm title={t("classroomManagement")} size="large">
				<DataTable
					columns={newColumns}
					getByParameter={GetByParameter}
					pageSizeOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
					initialPageSize={10}
					dataGridClasses={classes.dataGrid}
					tableName={"Classrooms"}
					refreshState={refreshState}
				/>
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

export default TableOfClassrooms;