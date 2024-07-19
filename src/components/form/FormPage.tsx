import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";

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

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Here you can add your form submission logic
  };

  return (
    <Container component="main" maxWidth="xs">
      <Root>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5" align="center">
              Contact Us
            </Typography>
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
      </Root>
    </Container>
  );
};

export default FormPage;
