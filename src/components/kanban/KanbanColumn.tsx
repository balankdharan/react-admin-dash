// src/components/KanbanColumn.tsx
import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import KanbanCard from "./KanbanCard";

const StyledPaper = styled(Paper)({
  padding: 16,
  width: 300,
  backgroundColor: "#f4f4f4",
});

interface KanbanColumnProps {
  title: string;
  cards: { title: string; description: string }[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, cards }) => {
  return (
    <StyledPaper>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      {cards.map((card, index) => (
        <KanbanCard
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </StyledPaper>
  );
};

export default KanbanColumn;
