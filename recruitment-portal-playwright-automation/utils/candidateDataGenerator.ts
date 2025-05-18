import { faker } from '@faker-js/faker';

export interface JobApplicationFormData {
  fullName: string;
  referredBy: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  currentOrLastEmployer: string;
  noticePeriod: string;
  expectedSalary: string;
  totalExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
  experienceInManualTesting: string;
  experienceInAutomationTesting: string;
  randomProfessionalExperience: string;
  experienceInPostman: string;
  experienceInFastApi: string;
  randomLinkedInURL : string;
  randomGitURL:string;
  randomStackOverflowURL:string,
  randomOtherURL:string,
  universityName: string;
  degree: string;
  bachelorPassingYear: string;
  hscPassingYear: string;
}

export const generateJobApplicationFormData = (): JobApplicationFormData => {
  const data: JobApplicationFormData = {
    fullName: faker.person.fullName(),
    referredBy: `${faker.person.firstName()} ${faker.person.lastName()} - QA Engineer`,
    phoneNumber: `+880${faker.phone.number({ style: 'national' })}`,
    email: faker.internet.email(),
    residentialAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
    currentOrLastEmployer: faker.company.name(),
    noticePeriod: faker.number.int({ min: 1, max: 3 }).toString(),
    expectedSalary: faker.number.int({ min: 10000, max: 50000 }).toString(),
    totalExperience: faker.number.int({ min: 1, max: 20 }).toString(),
    primarySkills: ['Android Apps', 'Flutter', 'AWS'],
    secondarySkills: ['Big Data', 'Dart'],
    experienceInManualTesting: faker.number.int({ min: 0, max: 10 }).toString(),
    experienceInAutomationTesting: faker.number.int({ min: 0, max: 10 }).toString(),
    randomProfessionalExperience: faker.number.int({ min: 0, max: 10 }).toString(),
    experienceInPostman: faker.number.int({ min: 1, max: 5 }).toString(),
    experienceInFastApi: faker.number.int({ min: 1, max: 5 }).toString(),
    randomLinkedInURL: `https://www.linkedin.com/in/${faker.internet.userName()}`,
    randomGitURL: `https://github.com/${faker.internet.userName()}`,
    randomStackOverflowURL: `https://stackoverflow.com/users/${faker.number.int({ min: 1000000, max: 9999999 })}/${faker.internet.userName()}`,
    randomOtherURL: `https://www.xyz.com/in/${faker.internet.userName()}`,
    universityName: 'Comilla University',
    degree: 'BSc in CSE',
    bachelorPassingYear: '2019',
    hscPassingYear: '2014',
  };
  return data;
};



