import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledCard = styled(Card)({
  marginBottom: 16,
});

interface KanbanCardProps {
  title: string;
  description: string;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onDelete: () => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
  onMoveLeft,
  onMoveRight,
  onDelete,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Box>
            <IconButton size="small" onClick={onMoveLeft} disabled={!onMoveLeft} aria-label="Move left">
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onMoveRight} disabled={!onMoveRight} aria-label="Move right">
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton size="small" onClick={onDelete} aria-label="Delete task">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default KanbanCard;
