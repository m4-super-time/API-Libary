import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse } from "../../interfaces";
import { IUpdateUserRequest } from "../../interfaces/users";

const userWithoutPasswordFieldSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
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

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isEmployee: yup.boolean().required(),
});

const userUpdateRequestSerializer: SchemaOf<IUpdateUserRequest> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    updatedAt: yup.date(),
  });

export {
  userWithoutPasswordFieldSerializer,
  userVetorSerializer,
  userRequestSerializer,
  userUpdateRequestSerializer,
};
