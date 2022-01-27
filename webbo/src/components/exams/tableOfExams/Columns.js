import { numberOperators } from "./Filters";
import { EditDeleteColumn } from "../../dataTable/EditDeleteColumn";
import { ListColumn } from "../../dataTable/ListColumn";
import { stringOperators } from "./Filters";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
/**
 * Defined columns of the data grid
 */
export const columns = [
  {
    field: "date",
    headerName: "date",
    width: 200,
    filterOperators: stringOperators,
  },
  {
    field: "classroomName",
    headerName: "classroomName",
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
          link="/administration/terms/addTerm"
          claimType="Exams.Permission"
        />
      );
    },
  },
];
