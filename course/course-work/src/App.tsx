import assertNever from "./utils";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {  
  backgroundMaterial: string;
  kind: "background"
}

interface CourseAttributes extends CoursePartDescription {
  requirements: string[];
  kind: 'special'
}


type CourseParts = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseAttributes;

interface Header {
  name : string
}

interface Total {
  totalExercises: number 
}

interface Content {
  coursesParts : CourseParts[]
}

const Header = (props: Header): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = ({course}: {course: CourseParts}): JSX.Element => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <p><strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em></p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p><strong>{course.name} {course.exerciseCount}</strong> <br /><em>project exercises {course.groupProjectCount}</em></p>
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em> <br />
          submit to <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{course.name} {course.exerciseCount}</strong> <br /><em>{course.description}</em><br />
          required skills: {course.requirements.join(', ')}
        </div>
      )
    default:
      return assertNever(course);
  }
}

const Content = (props: Content): JSX.Element => {
  return (
   <>
   {props.coursesParts.map((course, index) => 
   <Part key={index}  course={course}/>
  )}
   </>
  )
}

const Total = (props: Total) : JSX.Element=> {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CourseParts[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name = {courseName}/>
     <Content coursesParts={courseParts}/>
     <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;