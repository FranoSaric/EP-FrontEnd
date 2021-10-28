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
        field: "year",
        headerName: "year",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "cycle",
        headerName: "cycle",
        width: 200,
        filterOperators: stringOperators,
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
                    link="/administration/studies/studyForm"
                    claimType="Studies.Permission"
                />
            );
        },
    },
];
