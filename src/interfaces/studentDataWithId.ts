import { studentData } from "./studentData";

export interface studentDataWithId extends studentData {
  id: string;
}
