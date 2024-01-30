import { Router } from 'express';
import path from 'path';
import fs from 'fs';

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

interface Subject {
  Subject: string;
  Code: string;
  Course: string;
  Type: string;
  Link: string;
  Institute: string;
  Credits: Credits;
  About: About;
  LinkWith: LinkWith;
}

const subjectsJson = path.join(__dirname, '../../../data/subjects.json');

const subjectRouter = Router();

async function getSubjects(): Promise<Subject[]> {
  try {
    const data = await fs.promises.readFile(subjectsJson, 'utf-8');
    const subjects: Subject[] = JSON.parse(data);
    if (!subjects) return [];
    return subjects;
  } catch (err) {
    return [];
  }
}

subjectRouter.get('/', async (request, response) => {
  const subjects = await getSubjects();
  return response.json(subjects);
});

subjectRouter.get('/:code', async (request, response) => {
  const { code } = request.params;
  const subjects = await getSubjects();

  const subject = subjects.find((subject: any) => subject.Code === code);

  return response.json(subject);
});

subjectRouter.get('/:code/requirements', async (request, response) => {
  const { code } = request.params;
  const subjects = await getSubjects();

  const subject = subjects.find((subjectItem: any) => subjectItem.Code === code);
  if (!subject) return response.json([]);
  const subjectRequirements = subject.LinkWith.Requirements;
  let requirements: any = [];

  if (!subjectRequirements) return response.json(requirements);

  subjectRequirements.forEach((requirement: any) => {
    const item = subjects.find((subjectItem: any) => {
      return subjectItem.Code === requirement.Code;
    });
    requirements.push(item);
  });

  return response.json(requirements);
});

subjectRouter.get('/:code/requirementOf', async (request, response) => {
  const { code } = request.params;
  const subjects = await getSubjects();

  const subject = subjects.find((subjectItem: any) => subjectItem.Code === code);
  if (!subject) return response.json([]);
  const subjectRequirements = subject.LinkWith.RequirementOf;
  let requirements: any = [];

  if (!subjectRequirements) return response.json(requirements);

  subjectRequirements.forEach((requirement: any) => {
    const item = subjects.find((subjectItem: any) => {
      return subjectItem.Code === requirement.Code;
    });
    requirements.push(item);
  });

  return response.json(requirements);
});

subjectRouter.get('/:code/recomendations', async (request, response) => {
  const { code } = request.params;
  const subjects = await getSubjects();

  const subject = subjects.find((subjectItem: any) => subjectItem.Code === code);
  if (!subject) return response.json([]);
  const subjectRecomendations = subject.LinkWith.Recomendations;
  let recomendations: any = [];

  if (!subjectRecomendations) return response.json(recomendations);

  subjectRecomendations.forEach((recomendation: any) => {
    const item = subjects.find((subjectItem: any) => {
      return subjectItem.Code === recomendation.Code;
    });
    recomendations.push(item);
  });

  return response.json(recomendations);
});

export default subjectRouter;
