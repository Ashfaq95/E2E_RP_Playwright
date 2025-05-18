import { faker } from '@faker-js/faker';

export interface AddNewJobFormData {
  jobTitle: string;
  jobSummary: string;
  jobDescription: string;
  shortCode: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export const generateJobData = (): AddNewJobFormData => {
  return {
    jobTitle: faker.person.jobTitle(),
    jobSummary: faker.lorem.sentence(),
    jobDescription: faker.lorem.paragraph(),
    shortCode: faker.string.alpha({ length: 4 }).toUpperCase(),
    metaTitle: faker.company.catchPhrase(),
    metaDescription: faker.lorem.sentences(2),
    metaKeywords: faker.lorem.words(5).split(' ').join(', ')
  };
};
