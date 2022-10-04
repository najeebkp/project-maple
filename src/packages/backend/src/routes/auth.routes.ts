import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../helpers";
import {
  reset_password_create,
  reset_password_update,
  sign_in,
  verify_token,
  register,
} from "../validations/auth.validation";

const router = Router();
const AuthControllerInstance = new AuthController();

router.post("/sign-in", validate(sign_in), AuthControllerInstance.createJWT);

router.post(
  "/onboard",
  validate(register),
  AuthControllerInstance.createAccount
);

router.post("/token", AuthControllerInstance.reCreateJWT);

router.post(
  "/password-reset",
  validate(reset_password_create),
  AuthControllerInstance.initatePasswordReset
);

router.patch(
  "/password-reset",
  validate(reset_password_update),
  AuthControllerInstance.resetPassword
);

router.post(
  "/password-reset/verify-token",
  validate(verify_token),
  AuthControllerInstance.verifyPasswordResetToken
);

export default router;
