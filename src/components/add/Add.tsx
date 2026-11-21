import { FormEvent } from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (values: Record<string, string | boolean>) => void;
};

// Fields that are filled in automatically instead of typed.
const AUTO_FIELDS = ["id", "img", "createdAt"];

const Add = (props: Props) => {
  const fields = props.columns.filter((item) => !AUTO_FIELDS.includes(item.field));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values: Record<string, string | boolean> = {};
    fields.forEach((column) => {
      values[column.field] =
        column.type === "boolean"
          ? form.get(column.field) === "on"
          : String(form.get(column.field) ?? "").trim();
    });
    props.onAdd(values);
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {fields.map((column) => (
            <div
              className={column.type === "boolean" ? "item checkbox" : "item"}
              key={column.field}
            >
              <label htmlFor={`add-${column.field}`}>{column.headerName}</label>
              {column.type === "boolean" ? (
                <input id={`add-${column.field}`} name={column.field} type="checkbox" />
              ) : (
                <input
                  id={`add-${column.field}`}
                  name={column.field}
                  type="text"
                  placeholder={column.headerName}
                  required
                />
              )}
            </div>
          ))}
          <button>Add {props.slug}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
