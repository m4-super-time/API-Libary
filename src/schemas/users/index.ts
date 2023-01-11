import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserResponse } from "../../interfaces";

const userWithoutPasswordFieldSerializer: SchemaOf<IUserResponse> =
  yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    isEmployee: yup.boolean().notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

const userVetorSerializer: SchemaOf<IUserResponse[]> = yup.array(
  userWithoutPasswordFieldSerializer
);

export {
  userWithoutPasswordFieldSerializer,
  userVetorSerializer,
};
