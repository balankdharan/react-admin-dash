// src/components/KanbanBoard.tsx
import React, { FormEvent, useState } from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import KanbanColumn from "./KanbanColumn";
import { KanbanColumnId, nextId, useAdminStore } from "../../store/AdminStore";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  marginTop: 32,
});

const COLUMNS: { id: KanbanColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "In Progress" },
  { id: "done", title: "Done" },
];

const KanbanBoard: React.FC = () => {
  const { data, update } = useAdminStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addCard = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    update(
      (d) => ({
        ...d,
        kanban: [
          ...d.kanban,
          { id: nextId(d.kanban), title: title.trim(), description: description.trim(), column: "todo" },
        ],
      }),
      `Added task "${title.trim()}"`
    );
    setTitle("");
    setDescription("");
  };

  const moveCard = (id: number, step: number) =>
    update((d) => {
      const card = d.kanban.find((item) => item.id === id);
      if (!card) return d;
      const index = COLUMNS.findIndex((column) => column.id === card.column) + step;
      if (index < 0 || index >= COLUMNS.length) return d;
      return {
        ...d,
        kanban: d.kanban.map((item) =>
          item.id === id ? { ...item, column: COLUMNS[index].id } : item
        ),
      };
    }, `Moved task #${id}`);

  const deleteCard = (id: number) =>
    update((d) => ({ ...d, kanban: d.kanban.filter((item) => item.id !== id) }), `Deleted task #${id}`);

  return (
    <StyledContainer maxWidth="lg">
      <form className="panel kanbanAdd" onSubmit={addCard}>
        <label className="field">
          New task
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </label>
        <label className="field">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <button className="btn" disabled={!title.trim()}>
          Add to To Do
        </button>
      </form>
      <Grid container spacing={2}>
        {COLUMNS.map((column, index) => (
          <Grid item key={column.id}>
            <KanbanColumn
              title={column.title}
              cards={data.kanban.filter((card) => card.column === column.id)}
              canMoveLeft={index > 0}
              canMoveRight={index < COLUMNS.length - 1}
              onMove={moveCard}
              onDelete={deleteCard}
            />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default KanbanBoard;
