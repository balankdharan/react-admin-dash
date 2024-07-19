import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  marginBottom: 16,
});

interface KanbanCardProps {
  title: string;
  description: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ title, description }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default KanbanCard;
