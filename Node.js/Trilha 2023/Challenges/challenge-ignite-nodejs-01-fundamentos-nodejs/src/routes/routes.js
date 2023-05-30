import {randomUUID} from 'node:crypto';
import { Database } from '../database/database.js';
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { search } = request.query; 
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search 
            }:null);

            return response.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { title , description } = request.body;
            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                updated_at: new Date(),
                completed_at: null
            };
            database.insert('tasks', task);
            return response.writeHead(201).end();
        }
    },
]
