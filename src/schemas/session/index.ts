import * as yup from "yup";
import { ICreateSessionRequest } from "../../interfaces";

const sessionRequestSchema: yup.SchemaOf<ICreateSessionRequest> = yup
  .object()
  .shape({
    email: yup.string().max(64).required(),
    password: yup.string().max(64).required(),
  });

export { sessionRequestSchema };
