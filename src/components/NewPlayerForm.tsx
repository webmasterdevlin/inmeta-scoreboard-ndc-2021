import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

import { PlayerModel } from "src/models/playerModel";
import SharedInput from "./SharedInput";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (player: PlayerModel) => Promise<void>;
};

const NewPlayerForm = (props: Props) => {
  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitle>Player Info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please complete the form below to add a new player to the database.
        </DialogContentText>
        <Formik
          initialValues={{
            id: "",
            name: "",
            mobile: "",
            email: "",
            company: "",
            points: 0,
            agree: false,
          }}
          validationSchema={yup.object({
            name: yup.string().label("Name").min(2).required(),
            mobile: yup.string().label("Mobile").min(8).required(),
            email: yup.string().email().label("Email").required(),
            company: yup.string().label("Company").optional(),
            points: yup.number().label("Points").required(),
            agree: yup
              .boolean()
              .label("Agree")
              .required()
              .oneOf([true], "Must Accept Terms of Service"),
          })}
          onSubmit={async (values, actions) => {
            try {
              await props.onSubmit(values);
              actions.resetForm();
            } catch (e: any) {
              alert(e.message);
            }
          }}
        >
          {(formikProps) => (
            <Box mb={4}>
              <Paper>
                <Form style={{ padding: "1rem" }}>
                  <div>
                    <SharedInput required={true} id={"name"} label={"Name"} />
                    <SharedInput
                      required={true}
                      id={"mobile"}
                      label={"Mobile"}
                    />
                    <SharedInput required={true} id={"email"} label={"Email"} />
                    <SharedInput
                      required={false}
                      id={"company"}
                      label={"Company"}
                    />
                    <SharedInput
                      required={true}
                      id={"points"}
                      label={"Points"}
                    />
                  </div>
                  <Box mb={2}>
                    <Button
                      disabled={!formikProps.dirty || !formikProps.isValid}
                      type="submit"
                      color={"primary"}
                      variant={"contained"}
                      style={{ color: "#fff" }}
                    >
                      {formikProps.isSubmitting ? "Sending..." : "Save"}
                    </Button>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Field
                      as={Checkbox}
                      id={"agree"}
                      label={"Agree"}
                      type={"checkbox"}
                      name={"agree"}
                    />
                    <Typography>
                      I agree to the{" "}
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                      <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#00aaa1",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Terms of Service
                      </a>
                    </Typography>
                  </Box>
                </Form>
              </Paper>
            </Box>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Box mr={2} mb={2}>
          <Button color={"secondary"} onClick={props.onClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlayerForm;
