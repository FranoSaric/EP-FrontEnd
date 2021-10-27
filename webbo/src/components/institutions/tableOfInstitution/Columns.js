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
        field: "address",
        headerName: "address",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "giroAccount",
        headerName: "giroAccount",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "contact",
        headerName: "contact",
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
                    link="/administration/institutions/addInstitution"
                    claimType="Institutions.Permission"
                />
            );
        },
    },
];
