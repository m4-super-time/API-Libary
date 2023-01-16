import * as yup from "yup";

export const updateBookSchema = yup.object().shape({
    name: yup.string().notRequired(),
    price: yup.number().notRequired(),
    author: yup.string().notRequired(),
    synopsis: yup.string().notRequired(),
    categoryId: yup.array(yup.string())
})