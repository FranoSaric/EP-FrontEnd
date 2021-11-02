import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
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
        field: "institutionName",
        headerName: "institutionName",
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
                    link="/library/addLibrary"
                    claimType="Library.Permission"
                />
            );
        },
    },
];
