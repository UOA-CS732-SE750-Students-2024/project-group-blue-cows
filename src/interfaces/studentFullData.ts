import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";
import { studentDataWithId } from "./studentDataWithId";

export interface studentFullData extends studentDataWithId {
  formFieldInputs: GetFormFieldInputDto[];
}
