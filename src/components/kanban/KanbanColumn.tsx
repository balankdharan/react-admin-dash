// src/components/KanbanColumn.tsx
import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import KanbanCard from "./KanbanCard";
import { KanbanCardData } from "../../store/AdminStore";

const StyledPaper = styled(Paper)({
  padding: 16,
  width: 300,
  minHeight: 200,
  backgroundColor: "#f4f4f4",
});

interface KanbanColumnProps {
  title: string;
  cards: KanbanCardData[];
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMove: (id: number, step: number) => void;
  onDelete: (id: number) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  cards,
  canMoveLeft,
  canMoveRight,
  onMove,
  onDelete,
}) => {
  return (
    <StyledPaper>
      <Typography variant="h5" component="h3" gutterBottom>
        {title} ({cards.length})
      </Typography>
      {cards.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          Nothing here
        </Typography>
      )}
      {cards.map((card) => (
        <KanbanCard
          key={card.id}
          title={card.title}
          description={card.description}
          onMoveLeft={canMoveLeft ? () => onMove(card.id, -1) : undefined}
          onMoveRight={canMoveRight ? () => onMove(card.id, 1) : undefined}
          onDelete={() => onDelete(card.id)}
        />
      ))}
    </StyledPaper>
  );
};

export default KanbanColumn;
