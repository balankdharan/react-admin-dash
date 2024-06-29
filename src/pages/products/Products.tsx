import { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

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
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add new Product</button>
      </div>
      <div className="table-container">
        <DataTable slug="products" columns={columns} rows={products} />
        {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default Products;
