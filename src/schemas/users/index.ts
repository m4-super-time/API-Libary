import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequestReturnedClient } from "../../interfaces";

export interface IuserRequestList {
  name: string;
  email: string;
  isEmployee: boolean;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const userWithoutPasswordFieldSerializer: SchemaOf<IUserRequestReturnedClient> =
  yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    isEmployee: yup.boolean().notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

const userVetorSerializer: SchemaOf<IuserRequestList[]> = yup.array(
  userWithoutPasswordFieldSerializer
);

export {
  userWithoutPasswordFieldSerializer,
  IUserRequestReturnedClient,
  userVetorSerializer,
};
