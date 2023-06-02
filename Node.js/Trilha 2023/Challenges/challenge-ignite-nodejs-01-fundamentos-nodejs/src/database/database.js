import fs from 'node:fs/promises'; // Importing the promises version of the fs module

const databasePath = new URL('db.json', import.meta.url); // Getting the path to the db.json file

export class Database { // Creating a class to handle the database
    #database = {}; // Creating a private property to store the database

    constructor() { // Creating a constructor to initialize the database
        fs.readFile(databasePath, 'utf8') // Reading the database.json file
        .then(data => { // If the file is read successfully
            this.#database = JSON.parse(data); // Parsing the data to JSON and storing it in the private property            
        })
        .catch(() => { // If the file is not read successfully
            this.#persist();    // Creating the database.json file
        }); 
    }

    #persist() { // Creating a private method to persist the database
        fs.writeFile(databasePath, JSON.stringify(this.#database)); // Writing the database to the database.json file
    }

    select(table, search){ // Creating a method to select data from the database
        let data = this.#database[table] ?? []; // Getting the data from the table or an empty array if the table doesn't exist

        if(search){ // If there is a search object
            data = data.filter(row =>{ // Filtering the data
                return Object.entries(search).some(([key, value])=>{ // Checking if any of the search values are in the row
                    return row[key].toLowerCase().includes(value.toLowerCase()); // Returning true if the value is in the row
                });
            });
        }
        return data;
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
        return data;
    }

    update(table, id, data){ // Creating a method to update data in the database
        const rowIndex = this.#database[table].findIndex(row => row.id === id); // Getting the index of the row with the id

        if(rowIndex > -1){ // If the row exists
            const row = this.#database[table][rowIndex]; // Getting the row
            this.#database[table][rowIndex] = {id, ...row,...data}; // Updating the row
            this.#persist();    
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

}