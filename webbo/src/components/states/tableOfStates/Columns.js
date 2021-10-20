import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "nazivDrzave",
        headerName: "nazivDrzave",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "kraticaDrzave",
        headerName: "kraticaDrzave",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "isO2",
        headerName: "isO2",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "isO3",
        headerName: "isO3",
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
                    link="/administration/states/addstate"
                    claimType="States.Permission"
                />
            );
        },
    },
];
