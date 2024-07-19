// src/components/KanbanBoard.tsx
import React from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import KanbanColumn from "./KanbanColumn";

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 32,
});

const KanbanBoard: React.FC = () => {
  const columns = [
    {
      title: "To Do",
      cards: [
        { title: "Task 1", description: "Description for Task 1" },
        { title: "Task 2", description: "Description for Task 2" },
      ],
    },
    {
      title: "In Progress",
      cards: [
        { title: "Task 3", description: "Description for Task 3" },
        { title: "Task 4", description: "Description for Task 4" },
      ],
    },
    {
      title: "Done",
      cards: [
        { title: "Task 5", description: "Description for Task 5" },
        { title: "Task 6", description: "Description for Task 6" },
      ],
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={2}>
        {columns.map((column, index) => (
          <Grid item key={index}>
            <KanbanColumn title={column.title} cards={column.cards} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default KanbanBoard;
