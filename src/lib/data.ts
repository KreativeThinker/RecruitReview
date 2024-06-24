import data from '../data/data.json';

export interface Data {
    id: number,
    created_at: string,
    formdata: {
      questions: {
        [key: string]: string,
      },
      common_questions: {
        [key: string]: string,
      }
    },
    slot: string,
    email: string,
    dep: string,
    shortlisted: boolean,
    contact: number,
    name: string,
    regno: string
  }

const allData: Data[] = data as Data[];

export { allData as data };
