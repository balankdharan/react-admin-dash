import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";

type FeedsWidgetProps = {
  className?: string;
};

const FeedsWidget: React.FC<FeedsWidgetProps> = ({ className }) => {
  return (
    <Card className={className}>
      {/* Card Body */}
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={2}>
          {/* User */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            {/* Avatar */}
            <Avatar
              alt="Nick Logan"
              src="/media/avatars/300-23.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            {/* Info */}
            <Box>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                fontWeight="bold"
              >
                Nick Logan
              </Typography>
              <Typography variant="body2" color="textSecondary">
                PHP, SQLite, Artisan CLI
              </Typography>
            </Box>
          </Box>
          {/* Menu */}
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        {/* Post */}
        <Box mb={2}>
          {/* Text */}
          <Typography variant="body1" color="textPrimary" mb={2}>
            Outlines keep you honest. They stop you from indulging in poorly
            thought-out metaphors about driving and keep you focused on the
            overall structure of your post.
          </Typography>
          {/* Toolbar */}
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              startIcon={<CommentIcon />}
              sx={{ textTransform: "none", mr: 1 }}
            >
              120
            </Button>
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              sx={{ textTransform: "none" }}
            >
              15
            </Button>
          </Box>
        </Box>
        {/* Separator */}
        <Divider />
        {/* Reply Input */}
        <Box mt={2} sx={{ position: "relative" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Reply..."
            multiline
            rows={1}
            sx={{ border: "none", p: 0, pr: 5 }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
            }}
          >
            <IconButton size="small">
              <CommentIcon />
            </IconButton>
            <IconButton size="small">
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedsWidget;
