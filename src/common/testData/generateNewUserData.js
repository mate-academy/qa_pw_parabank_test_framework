import  {faker} from '@faker-js/faker'

export function generateNewUserData(logger){
 const firstName = faker.person.firstName();
 const timestampSuffix = Date.now().toString().slice(-6);
 const randomSuffix = faker.string.alphanumeric(3).toLowerCase();
 const uniqueUsername = `u${timestampSuffix}${randomSuffix}`;


const user = {
    username: uniqueUsername,
    email:`${firstName}_${faker.internet.email()}`.toLowerCase(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.numeric(9),

    
}

if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
}
  return user;
  }


  