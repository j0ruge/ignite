import { Request, Response} from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name:"NodeJS", 
    duration: 10, 
    educator: "GabirU"
  });
  CreateCourseService.execute({
    name:"ReactJS",      
    educator: "GabirU FE"
  });
  return response.send();
}