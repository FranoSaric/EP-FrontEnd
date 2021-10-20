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
        field: "description",
        headerName: "description",
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
                    link="/administration/types/addtype"
                    claimType="Types.Permission"
                />
            );
        },
    },
];
