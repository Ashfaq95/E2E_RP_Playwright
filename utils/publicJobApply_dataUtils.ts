import { faker } from '@faker-js/faker';

export function generateRandomData(fieldName: string): string {
    if (fieldName.includes('Experience in years')) {
        return faker.number.int({ min: 0, max: 10 }).toString();
    } else if (fieldName.includes('Give answer')) {
        return faker.lorem.sentence();
    }
    return faker.lorem.words(3);
}

