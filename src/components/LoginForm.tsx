import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  onClose: () => void;
};

const LoginForm = ({ open, onClose }: Props) => {
  const [error, setError] = useState("");
  const navigate = useRouter();

  const saveUserAuthDetails = () => {
    localStorage.setItem("token", "pass");
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>*/}
        {/*  Please enter your credentials to login*/}
        {/*</DialogContentText>*/}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values, formikHelpers) => {
            try {
              if (
                values.email !== "ruby.jane.cabagnot@avanade.com" &&
                values.password !== "squidgame"
              ) {
                alert("Invalid email or password");
                return;
              }
              saveUserAuthDetails();
              formikHelpers.resetForm();
              formikHelpers.setStatus({ success: true });
              formikHelpers.setSubmitting(false);
              await navigate.reload();
              onClose();
            } catch (e: any) {
              setError("Failed. Please try again.");
              formikHelpers.setStatus({ success: false });
              formikHelpers.setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            dirty,
            isValid,
          }) => (
            <Card>
              <Form noValidate onSubmit={handleSubmit}>
                {/*<CardHeader title="Login" />*/}
                <Divider />
                <Box m={2}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    autoFocus
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  <Box mt={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting || !dirty || !isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Log In
                    </Button>
                  </Box>
                  {error && (
                    <Box mt={3}>
                      <FormHelperText error>{error}</FormHelperText>
                    </Box>
                  )}
                  <Box mt={2}>
                    <Alert severity="info">
                      <div>need help? contact the admin</div>
                    </Alert>
                  </Box>
                </Box>
              </Form>
            </Card>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Box mr={2} mb={2}>
          <Button color={"secondary"} onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LoginForm;
