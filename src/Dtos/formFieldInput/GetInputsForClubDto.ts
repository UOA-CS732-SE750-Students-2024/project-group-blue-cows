import { GetFormFieldInputDto } from "./GetFormFieldInputDto";

export interface GetInputsForClubDto {
  userId: string;
  formFieldInputs: GetFormFieldInputDto[];
}
