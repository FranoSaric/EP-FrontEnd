import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { stringOperators } from "./Filters";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
/**
 * Defined columns of the data grid
 */
export const columns = [
    {
        field: "scopePermissionName",
        headerName: "scopePermissionName",
        width: 200,
        filterOperators: stringOperators,
    },
    {
        field: "productName",
        headerName: "productId",
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
                    link="/administration/products/permissions/productaddpermissionscope"
                    claimType="ProductPermissions.Permission"
                />
            );
        },
    },
];