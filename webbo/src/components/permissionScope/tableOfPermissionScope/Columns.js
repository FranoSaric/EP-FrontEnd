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
        field: "active",
        headerName: "active",
        width: 120,
        filterOperators: stringOperators,
        renderCell: (params) => {
            if (params.row.active === 1) {
                return <CheckIcon style={{ color: "green" }} />;
            } else {
                return <CloseIcon style={{ color: "red" }} />;
            }
        },
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
                    link="/administration/scopes/addpermissionscope"
                    claimType="Scopes.Permission"
                />
            );
        },
    },
];
