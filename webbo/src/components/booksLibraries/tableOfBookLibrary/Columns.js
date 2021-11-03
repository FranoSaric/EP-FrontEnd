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
        field: "libraryName",
        headerName: "libraryName",
        width: 170,
        filterOperators: stringOperators,
    },
    {
        field: "bookName",
        headerName: "bookName",
        width: 150,
        filterOperators: stringOperators,
    },
    {
        field: "editDelete",
        headerName: "edit/delete",
        width: 150,
        filterable: false,
        sortable: false,
        editable: false,
        renderCell: (params) => {
            return (
                <EditDeleteColumn
                    id={params.id}
                    row={params.row}
                    link="/library/bookLibrary/addBookLibrary"
                    claimType="BookLibrary.Permission"
                />
            );
        },
    },
];
