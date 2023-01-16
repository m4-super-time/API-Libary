import * as yup from "yup";

export const filterAddressId = yup.object().shape({
    id:yup.string().uuid("Id need to be uuid")
})