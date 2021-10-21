import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "categoryName",
        headerName: "categoryName",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "name",
        headerName: "name",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "author",
        headerName: "author",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "barCode",
        headerName: "barCode",
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
                    link="/library/books/bookForm"
                    claimType="Books.Permission"
                />
            );
        },
    },
];
