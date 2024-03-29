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
    field: "institutionName",
    headerName: "institutions",
    width: 300,
    filterOperators: stringOperators,
  },
  {
    field: "indexNumber",
    headerName: "indexNumber",
    width: 120,
    filterOperators: stringOperators,
  },
  {
    field: "userName",
    headerName: "username",
    width: 120,
    filterOperators: stringOperators,
  },
  {
    field: "firstName",
    headerName: "name",
    width: 120,
    filterOperators: stringOperators,
  },
  {
    field: "lastName",
    headerName: "surname",
    width: 135,
    filterOperators: stringOperators,
  },
  {
    field: "email",
    headerName: "e-mail",
    width: 500,
    filterOperators: stringOperators,
  },
  //   {
  //     field: "creationDate",
  //     headerName: "creationDate",
  //     width: 500,
  //     filterOperators: stringOperators,
  //   },
  {
    field: "studyName",
    headerName: "studies",
    width: 200,
    filterOperators: stringOperators,
  },
  {
    field: "roleName",
    headerName: "roleFK",
    width: 200,
    filterOperators: stringOperators,
  },
  {
    field: "editDelete",
    headerName: "edit",
    width: 100,
    filterable: false,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      return (
        <EditDeleteColumn
          id={params.id}
          row={params.row}
          link="/administration/users/adduser"
          claimType="Users.Permission"
          deleteDisabled={true}
        />
      );
    },
  },
];
