import * as yup from "yup";
import { IBooksUpdateRequest } from "../../interfaces/books";

export const updateBookSchema: yup.SchemaOf<IBooksUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    price: yup.number().notRequired(),
    author: yup.string().notRequired(),
    synopsis: yup.string().notRequired(),
  });
