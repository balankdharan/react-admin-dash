import { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { today, useAdminStore } from "../../store/AdminStore";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Image",
    width: 90,
    renderCell: (params) => {
      return (
        <img
          src={params.row.img || "/noavatar.png"}
          alt=""
          style={{ width: "100%" }}
        />
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "color",
    headerName: "Color",
    width: 120,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "producer",
    headerName: "Producer",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 100,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const { data, addRow, deleteRow } = useAdminStore();

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add new Product</button>
      </div>
      <div className="table-container">
        <DataTable
          slug="products"
          columns={columns}
          rows={data.products}
          onDelete={(id) => deleteRow("products", id)}
        />
        {open && (
          <Add
            slug="product"
            columns={columns}
            setOpen={setOpen}
            onAdd={(values) =>
              addRow(
                "products",
                { ...values, createdAt: today() },
                String(values.title)
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Products;
