import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  onDelete: (id: number) => void;
  // Orders have no detail page, so they only get the delete action.
  viewable?: boolean;
};

const DataTable = ({ columns, rows, slug, onDelete, viewable = true }: Props) => {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 120,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          {viewable && (
            <Link to={`/${slug}/${params.row.id}`} title="View">
              <img src="/view.svg" alt="View" />
            </Link>
          )}
          <div
            className="delete"
            title="Delete"
            onClick={() => {
              if (window.confirm(`Delete #${params.row.id}?`)) onDelete(params.row.id);
            }}
          >
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
