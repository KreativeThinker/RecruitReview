import data from "../data/data.json";

export interface Data {
  id: number;
  created_at: string;
  formdata: {
    questions: Record<string, string>; // Updated
    common_questions: Record<string, string>; // Updated
  };
  slot: string;
  email: string;
  dep: string;
  shortlisted: boolean;
  contact: number;
  name: string;
  regno: string;
}

const allData: Data[] = data as Data[];

export { allData as data };
