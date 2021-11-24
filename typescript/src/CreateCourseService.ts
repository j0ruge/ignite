
interface Course {
  name: string;
  duration: number;
  educator: string;
}

class CreateCourseService {
  execute({ duration, name, educator}: Course) {
    console.log(duration, name, educator);
  }
}

export default new CreateCourseService();