import { z } from "zod";

const facultyValidationSchema = z.object({
    name:z.string({
        invalid_type_error:'name must be a string'
    })
})

export const facultyValidation = {
    facultyValidationSchema
}