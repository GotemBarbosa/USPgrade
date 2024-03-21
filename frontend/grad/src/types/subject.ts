
interface Credits {
  Class: number;
  Work: number;
  Total: number;
}

interface About {
  Goal: string;
  Summary: string;
  Program: string;
}

interface LinkWithItem {
  Code: string;
  Subject: string;
  Link: string;
  requirement?: string;
  type?: string;
}

interface LinkWith {
  Requirements: LinkWithItem[];
  RequirementOf: LinkWithItem[];
  Recomendations: LinkWithItem[];
}

export interface Subject {
  Subject: string;
  Code: string;
  Course: string;
  Type: string;
  Link: string;
  Semester: string;
  Institute: string;
  Credits: Credits;
  About: About;
  LinkWith: LinkWith;
}

