const { request, response, application } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid")

const app = express();
const customers = [];
app.use(express.json());

//Middleware
function verifyIfExistsAccountCPF(request, response, next){
  const { cpf } = request.headers;
  const customer = customers.find(customer => customer.cpf === cpf);
  if(!customer){
    return response.status(400).json({error: "Costumer not found"})
  }
  request.customer = customer;
  return next();
}

function getBalance(statement){
  const balance = statement.reduce((accumulator, operation) => {
    if(operation.type === "credit"){
      return accumulator + operation.amount;
    } else {
      return accumulator - operation.amount;
    }
  }, 0);
  return balance;
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );
  if (customerAlreadyExist) {
    return response.status(400).json({ error: "Customer already exist!"})
  }  
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });
  return response.status(201).send();
});

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer);
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {  
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }
  customer.statement.push(statementOperation);
  return response.status(201).send();
});


app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;
  const balance = getBalance(customer.statement);
  if ( balance < amount ) {
    return response.status(400).json({error: "Insufficient funds!"})
  }
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }
  customer.statement.push(statementOperation);
  return response.status(200).send();
});

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {  
  const { customer } = request;
  const { date } = request.query;
  const dateFormat = new Date(date + " 00:00")
  const statement = customer.statement.filter(
    (statement)=> 
    statement.created_at.toDateString() === new Date(dateFormat).toDateString()
  );
  return response.json(statement);
});

app.put("/account", verifyIfExistsAccountCPF,(request, response) => {
  const { name } = request.body;
  const { customer } = request;
  customer.name = name;
  return response.status(201).send();
})

app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  customers.splice(customer, 1);
  return response.status(200).json(customers);
})

app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { statement } = customer;
  const balance = getBalance(statement);
  return response.json(balance);
})

app.listen(3333);