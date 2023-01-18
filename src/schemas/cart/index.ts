/* import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICart } from "../../interfaces";

const bookSerializer: SchemaOf<ICart> =
  yup.object().shape({
    id: yup.string().notRequired(),
    status: yup.string().notRequired(),
    bookId: yup.string().notRequired(),
    userId: yup.string().notRequired(),
  });

export { bookSerializer }
 */