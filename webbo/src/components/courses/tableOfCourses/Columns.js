import { numberOperators } from "./Filters";
import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "name",
        headerName: "name",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "academicYear",
        headerName: "academicYear",
        width: 170,
        filterOperators: stringOperators,
    },
    {
        field: "semester",
        headerName: "semester",
        width: 150,
        filterOperators: stringOperators,
    },
    {
        field: "studyName",
        headerName: "studyName",
        width: 150,
        filterOperators: stringOperators,
    },
    {
        field: "editDelete",
        headerName: "edit/delete",
        width: 100,
        filterable: false,
        sortable: false,
        editable: false,
        renderCell: (params) => {
            return (
                <EditDeleteColumn
                    id={params.id}
                    row={params.row}
                    link="/administration/courses/addCourse"
                    claimType="Courses.Permission"
                    deleteDisabled={true}
                />
            );
        },
    },
];
