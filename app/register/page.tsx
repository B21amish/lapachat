"use client";

import { FormEvent, useState } from "react";

import FormSnackbar from "@/components/FormSnackbar";
import PasswordInput from "@/components/PasswordInput";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import { Link } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useColorScheme } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";

import styles from "./page.module.css";

export type DefaultColorPalette =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning";

export default function Register() {
  // state
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [snackState, changeSnackState] = useState(false);
  const [snackMessage, changeSnackMessage] = useState("");
  const [snackColor, changeSnackColor] =
    useState<DefaultColorPalette>("primary");
  const { mode, setMode } = useColorScheme();

  // functions
  const registerFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      // form validation
      if (username.length < 8) {
        throw new Error("Username must be at least 8 characters long.");
      }

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+}{"':;?/.,<>=|\\[\]~-]).{8,20}$/;
      if (password.match(passwordRegex)) {
        if (password === confirmPassword) {
          changeSnackColor("success");
          changeSnackState(true);
          changeSnackMessage("Password correct");
        } else {
          throw new Error("Password does not match.");
        }
      } else {
        throw new Error(
          "Password must be between 8 to 20 characters long, including UPPER/lowercase, symbol and number."
        );
      }
      // submit logic
    } catch (err) {
      if (err instanceof Error) {
        // logic for opening snackbar here
        changeSnackColor("danger");
        changeSnackState(true);
        changeSnackMessage(err.message);
      } else {
        console.error(err);
      }
    }
  };

  // useEffects
  // misc

  return (
    <Sheet className={styles.main}>
      <FormSnackbar
        color={snackColor}
        message={snackMessage}
        open={snackState}
        changeOpenState={changeSnackState}
      />
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={registerFormSubmit}>
          <Typography level="h4">
            Register to {config.humanReadableAppName}
          </Typography>
          <Input
            className={styles.input}
            size="md"
            placeholder="Username"
            variant="outlined"
            color="neutral"
            value={username}
            onChange={(e) => {
              changeUsername(e.target.value);
            }}
            required
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            changePassword={changePassword}
          />
          <PasswordInput
            placeholder="Confirm password"
            value={confirmPassword}
            changePassword={changeConfirmPassword}
          />
          <Button type="submit" variant="solid">
            Register
          </Button>
          <Typography level="body-xs">
            Already have an account?
            <Link href="login" underline="hover">
              <Typography className={styles.loginlink} level="body-xs">
                Login
              </Typography>
            </Link>
          </Typography>
        </form>
      </Card>
      <ThemeToggle mode={mode} setMode={setMode} />
    </Sheet>
  );
}
