import React, { FormEvent, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { Post } from "../../store/AdminStore";

type FeedsWidgetProps = {
  post: Post;
  onLike: () => void;
  onReply: (text: string) => void;
  onDelete: () => void;
};

const FeedsWidget: React.FC<FeedsWidgetProps> = ({ post, onLike, onReply, onDelete }) => {
  const [reply, setReply] = useState("");
  const [showComments, setShowComments] = useState(post.comments.length > 0);

  const handleReply = (e: FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    onReply(reply.trim());
    setReply("");
    setShowComments(true);
  };

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Avatar alt={post.author} src={post.avatar} sx={{ width: 45, height: 45, mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" color="textPrimary" fontWeight="bold">
                {post.author}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {post.role} · {post.createdAt}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onDelete} aria-label="Delete post">
            <DeleteIcon />
          </IconButton>
        </Box>
        {/* Post */}
        <Box mb={2}>
          <Typography variant="body1" color="textPrimary" mb={2}>
            {post.text}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              startIcon={<CommentIcon />}
              sx={{ textTransform: "none", mr: 1 }}
              onClick={() => setShowComments(!showComments)}
            >
              {post.comments.length}
            </Button>
            <Button
              variant={post.liked ? "contained" : "outlined"}
              color="error"
              startIcon={post.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              sx={{ textTransform: "none" }}
              onClick={onLike}
            >
              {post.likes}
            </Button>
          </Box>
        </Box>
        {showComments && post.comments.length > 0 && (
          <Box mb={2}>
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ bgcolor: "#f4f4f4", borderRadius: 2, p: 1.5, mb: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {comment.author}
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Divider />
        {/* Reply */}
        <Box component="form" onSubmit={handleReply} mt={2} display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <IconButton type="submit" aria-label="Send reply">
            <SendIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedsWidget;
