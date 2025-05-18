import { faker } from '@faker-js/faker';

export function generatePerksAndBenefitsData() {
    const randomPerksAndBenefitsTitle = `${faker.company.name()} Perks & Benefits Title_${Math.random().toString(36).substring(2, 15)}`;
    const randomPerksAndBenefitsBody = `${faker.lorem.sentence()} Perks & Benefits body_${Math.random().toString(36).substring(2, 15)}`;
    
    return { randomPerksAndBenefitsTitle, randomPerksAndBenefitsBody };
}
export function generateQuoteData() {
    const randomQuote = faker.lorem.sentence(); 
    const randomAuthor = faker.person.fullName(); 
    const randomDesignation = faker.person.jobTitle(); 

    return { randomQuote, randomAuthor, randomDesignation };
}
