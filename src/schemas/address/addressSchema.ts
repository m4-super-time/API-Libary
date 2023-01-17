import * as yup from "yup";
import { IAddressUpdate } from "../../interfaces/address";

export const filterAddressId = yup.string().uuid("Id need to be uuid").required()

export const updateAddressSchema: yup.SchemaOf<IAddressUpdate> = yup.object().shape({
    city: yup.string().notRequired(),
    neighborhood: yup.string().notRequired(),
    number: yup.string().notRequired(),
    state: yup.string().notRequired(),
    street: yup.string().notRequired(),
    zipCode: yup.string().notRequired(),
})