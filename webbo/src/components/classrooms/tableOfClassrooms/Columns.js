import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "numberOfClassroom",
        headerName: "numberOfClassroom",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "numberOfSeats",
        headerName: "numberOfSeats",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "floor",
        headerName: "floor",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "free",
        headerName: "free",
        width: 200,
        filterOperators: stringOperators,
        renderCell: (params) => {
            if (params.row.free === true) {
                return <CheckIcon style={{ color: "green" }} />;
            } else {
                return <CloseIcon style={{ color: "red" }} />;
            }
        },
    },
    {
        field: "institutionName",
        headerName: "institutions",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "editDelete",
        headerName: "edit/delete",
        width: 200,
        filterable: false,
        sortable: false,
        editable: false,
        renderCell: (params) => {
            return (
                <EditDeleteColumn
                    id={params.id}
                    row={params.row}
                    link="/administration/classrooms/classroomForm"
                    claimType="Books.Permission"
                />
            );
        },
    },
];
