import { z } from 'zod';

const createDepartmentValidationSchema = z.object({
  
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
   facultyId: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Faculty is required',
    }),
  
});

const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'department Name is required',
      })
      .optional(),
    facultyId: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const DepartmentValidation = {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
};