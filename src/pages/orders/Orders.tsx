import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { today, useAdminStore } from "../../store/AdminStore";
import "../products/products.scss";

const ORDER_STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const { data, addRow, deleteRow, update } = useAdminStore();

  const setStatus = (id: number, status: string) =>
    update(
      (d) => ({
        ...d,
        orders: d.orders.map((row) => (row.id === id ? { ...row, status } : row)),
      }),
      `Order #${id} marked as ${status}`
    );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "customer", headerName: "Customer", width: 180 },
    { field: "product", headerName: "Product", width: 240 },
    { field: "amount", headerName: "Amount", width: 110 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => (
        <select
          className={`statusBadge ${String(params.value).toLowerCase()}`}
          value={String(params.value)}
          onChange={(e) => setStatus(params.row.id, e.target.value)}
          aria-label={`Status of order ${params.row.id}`}
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      ),
    },
    { field: "createdAt", headerName: "Date", width: 120 },
  ];

  // The add form only asks for what a person would type in.
  const addColumns = columns.filter((column) => column.field !== "status");

  return (
    <div className="products">
      <div className="info">
        <h1>Orders</h1>
        <button onClick={() => setOpen(true)}>Add new Order</button>
      </div>
      <div className="table-container">
        <DataTable
          slug="orders"
          columns={columns}
          rows={data.orders}
          viewable={false}
          onDelete={(id) => deleteRow("orders", id)}
        />
        {open && (
          <Add
            slug="order"
            columns={addColumns}
            setOpen={setOpen}
            onAdd={(values) =>
              addRow(
                "orders",
                { ...values, status: "Processing", createdAt: today() },
                `an order for ${values.customer}`
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
