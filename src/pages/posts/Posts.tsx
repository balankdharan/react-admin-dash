import { FormEvent, useState } from "react";
import FeedsWidget from "../../components/postwidget/FeedWidget";
import { nextId, useAdminStore } from "../../store/AdminStore";
import "./posts.scss";

const Posts = () => {
  const { data, update } = useAdminStore();
  const [text, setText] = useState("");
  const me = data.settings;

  const publish = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    update(
      (d) => ({
        ...d,
        posts: [
          {
            id: nextId(d.posts),
            author: me.name,
            role: "Admin",
            avatar: me.avatar,
            text: text.trim(),
            likes: 0,
            liked: false,
            comments: [],
            createdAt: "Just now",
          },
          ...d.posts,
        ],
      }),
      "Published a new post"
    );
    setText("");
  };

  const like = (id: number) =>
    update((d) => ({
      ...d,
      posts: d.posts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
          : post
      ),
    }));

  const reply = (id: number, replyText: string) =>
    update(
      (d) => ({
        ...d,
        posts: d.posts.map((post) =>
          post.id === id
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { id: nextId(post.comments), author: me.name, text: replyText },
                ],
              }
            : post
        ),
      }),
      `Replied to post #${id}`
    );

  const remove = (id: number) => {
    if (!window.confirm("Delete this post?")) return;
    update((d) => ({ ...d, posts: d.posts.filter((post) => post.id !== id) }), `Deleted post #${id}`);
  };

  return (
    <div className="page posts">
      <div className="pageHeader">
        <div>
          <h1>Posts</h1>
          <p>Share updates with the team. Like and reply to posts.</p>
        </div>
      </div>
      <form className="panel composer" onSubmit={publish}>
        <img src={me.avatar} alt="" />
        <textarea
          placeholder={`What's new, ${me.name.split(" ")[0]}?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />
        <button className="btn" disabled={!text.trim()}>
          Post
        </button>
      </form>
      {data.posts.length === 0 && <p className="muted">No posts yet. Write the first one.</p>}
      <div className="feed">
        {data.posts.map((post) => (
          <FeedsWidget
            key={post.id}
            post={post}
            onLike={() => like(post.id)}
            onReply={(replyText) => reply(post.id, replyText)}
            onDelete={() => remove(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
