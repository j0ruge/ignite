interface IUser {
  name: string;
  yearOfBirth: number;
}

function calculateUserAge(user: IUser) {
  return new Date().getFullYear() - user.yearOfBirth;
}

// RunTime Type Checking
// Path: Node.js/Trilha 2023/02-api-rest-nodejs/src/index.js
//Só verifica em tempo de execução, não é muito eficiente

const result = calculateUserAge({ name: "Lucas", yearOfBirth: 1996 });
//calculateUserAge();
//calculateUserAge("Lucas");

// Static Type Checking
// Path: Node.js/Trilha 2023/02-api-rest-nodejs/src/index.js
// Verifica em tempo de desenvolvimento, é mais eficiente

console.log(result);
