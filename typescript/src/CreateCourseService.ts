
interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ duration = 8, name, educator}: Course) {
    console.log(duration, name, educator);
  }
}

export default new CreateCourseService();