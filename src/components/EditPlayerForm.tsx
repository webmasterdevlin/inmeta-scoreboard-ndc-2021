import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";

import { PlayerModel } from "../models/playerModel";
import SharedInput from "./SharedInput";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (player: PlayerModel) => Promise<void>;
  player: PlayerModel;
};

export const EditPlayerForm = (props: Props) => {
  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitle>Player Info</DialogTitle>
      <DialogContent>
        <DialogContentText>You are editing a player.</DialogContentText>
        <Formik
          initialValues={props.player}
          validationSchema={yup.object({
            name: yup.string().label("Name").min(2).required(),
            mobile: yup.string().label("Mobile").min(8).required(),
            email: yup.string().email().label("Email").required(),
            company: yup.string().label("Company").optional(),
            points: yup.number().label("Points").required(),
          })}
          onSubmit={async (values, actions) => {
            try {
              await props.onSubmit(values);
              actions.resetForm();
            } catch (e) {
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

                  <Button
                    disabled={!formikProps.dirty || !formikProps.isValid}
                    type="submit"
                    color={"primary"}
                    variant={"contained"}
                    style={{ color: "#fff" }}
                  >
                    {formikProps.isSubmitting ? "Updating..." : "Update"}
                  </Button>
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
