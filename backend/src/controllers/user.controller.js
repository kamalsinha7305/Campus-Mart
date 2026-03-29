import userModel from "../models/User.model.js";
import sendEmail from "../config/sendEmail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import verifyEmailTempplate from "../utils/templates/verifyEmailTemplate.js";

