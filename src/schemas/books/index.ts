import * as yup from "yup";
import { IBooksRequestt, IBooksUpdateRequest } from "../../interfaces/books";

export const updateBookSchema: yup.SchemaOf<IBooksUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    price: yup.number().notRequired(),
    author: yup.string().notRequired(),
    synopsis: yup.string().notRequired(),
  });

export const requestBookSchema: yup.SchemaOf<IBooksRequestt> = yup
  .object()
  .shape({
    name: yup.string().required(),
    price: yup.number().required(),
    author: yup.string().required(),
    synopsis: yup.string().required(),
    category: yup.string().required(),
  });
