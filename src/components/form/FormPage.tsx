import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { nextId, useAdminStore } from "../../store/AdminStore";

const Root = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

interface FormData {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormData = { name: "", email: "", message: "" };

const FormPage: React.FC = () => {
  const { data, update } = useAdminStore();
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sent, setSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSent(false);
  };

  const validate = () => {
    const found: Partial<FormData> = {};
    if (!formData.name.trim()) found.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) found.email = "Please enter a valid email";
    if (formData.message.trim().length < 10)
      found.message = "The message needs at least 10 characters";
    return found;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    update(
      (d) => ({
        ...d,
        messages: [
          {
            id: nextId(d.messages),
            ...formData,
            createdAt: new Date().toLocaleString(),
          },
          ...d.messages,
        ],
      }),
      `New message from ${formData.name}`
    );
    setFormData(EMPTY);
    setSent(true);
  };

  const removeMessage = (id: number) =>
    update(
      (d) => ({ ...d, messages: d.messages.filter((m) => m.id !== id) }),
      `Deleted message #${id}`
    );

  return (
    <Container component="main" maxWidth="xs">
      <Root>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5" align="center">
              Contact Us
            </Typography>
            {sent && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Thanks! Your message was saved below.
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="message"
                label="Message"
                id="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                error={Boolean(errors.message)}
                helperText={errors.message}
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </SubmitButton>
            </Form>
          </CardContent>
        </Card>
        <div className="panel formMessages">
          <h2>Messages ({data.messages.length})</h2>
          {data.messages.length === 0 && (
            <p className="muted">Messages sent with the form show up here.</p>
          )}
          {data.messages.map((m) => (
            <div className="formMessage" key={m.id}>
              <div>
                <strong>{m.name}</strong> <span className="muted">{m.email}</span>
                <p>{m.message}</p>
                <span className="muted">{m.createdAt}</span>
              </div>
              <button className="btn small danger" onClick={() => removeMessage(m.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </Root>
    </Container>
  );
};

export default FormPage;
