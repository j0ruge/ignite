import {randomUUID} from 'node:crypto';
import { Database } from '../database/database.js';
import { buildRoutePath } from '../utils/build-route-path.js'
import { title } from 'node:process';

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
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {                             
            const { id } = request.params;
            const { title, description } = request.body;
            
            if(!title || !description) {
                return response.writeHead(400)
                .end(JSON.stringify({error: 'Title and description are required'}));
            }

            const [task] = database.select('tasks', { id });
            if(!task) {
                return response.writeHead(404)
                .end(JSON.stringify({error: 'Task not found'}));
            }

            database.update('tasks', id, {
                title,
                description,
                created_at: task.created_at,                
                updated_at: new Date(),
                completed_at: task.completed_at,
            });
            return response.writeHead(204).end();
        }
    }, 
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params;            
            
            const [task] = database.select('tasks', { id });
            if(!task) {
                return response.writeHead(404)
                .end(JSON.stringify({error: 'Task not found'}));
            }
            
            database.delete('tasks', id);
            return response.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (request, response) => {                             
            const { id } = request.params;
            
            const [task] = database.select('tasks', { id });
            if(!task) {
                return response.writeHead(404)
                .end(JSON.stringify({error: 'Task not found'}));
            }            
            
            if(task.completed_at === null) {
                database.update('tasks', id, {
                    title: task.title,
                    description: task.description,
                    created_at: task.created_at,                
                    updated_at: new Date(),
                    completed_at: new Date(),
                });
            } 
            if(task.completed_at !== null) {
                database.update('tasks', id, {
                    title: task.title,
                    description: task.description,
                    created_at: task.created_at,                
                    updated_at: new Date(),
                    completed_at: null,
                });
            }
            
            return response.writeHead(204).end();
        }
    }, 
]
