import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "nazivMjesta",
        headerName: "nazivMjesta",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "nazivDrzave",
        headerName: "nazivDrzave",
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
                    link="/administration/places/addplace"
                    claimType="Places.Permission"
                />
            );
        },
    },
];
