interface Exercise {
   periodLength: number
   trainingDays: number
   success:  boolean,
   rating: number
   ratingDescription: string
   target: number
   average: number
}

interface ExerciseType {
   dailyExercise: number[]
   target: number
}

const exerciseArgument = (args: string[]): ExerciseType => {
   if(args.length < 4){ throw new Error('not enough arguments');}

   const dailyExercise = args.slice(2, -1).map(num => {
      if(!isNaN(Number(num))){
         throw new Error("Provided values is not a number");
      }
      return Number(num);
   });

   const target = Number(args[args.length - 1]);
   if(isNaN(target)){
      throw new Error("Provided target is not a number");
   }

   return {
      dailyExercise: dailyExercise,
      target: target
   };
};

export const calculateExercises = (dailyExercise: number[], target: number): Exercise => {
   const periodLength = dailyExercise.length;
   const trainingDays = dailyExercise.filter(e => e> 0).length;
   const average = dailyExercise.reduce((sum , e) => sum + e) / periodLength;
   const success = average >= target;

   let rating: number;
   let ratingDescription: string;

   if(average >  target){
      rating = 3;
      ratingDescription = "Perfect exercise to develop your muscles";
   }else if(average === target){
      rating = 2;
      ratingDescription = 'Not too bad but could be better';
   }else if (average < target) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rating = 1;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ratingDescription = "Quit being lazy and do some exercsie";
   }

   return { 
      periodLength: periodLength,
      trainingDays: trainingDays,
      rating: 2,
      ratingDescription: 'not too bad but could be better',
      target: 2,
      average: 1.9285714285714286,
      success: success
    };
};


try {
   const { dailyExercise, target } = exerciseArgument(process.argv);
   console.log(calculateExercises(dailyExercise, target));
} catch (error: unknown) {
   let errorMessage = 'Something bad happened';
   if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
   };
   console.log(errorMessage);
};


console.log(calculateExercises([1, 0, 2, 0, 3, 0, 2.5], 2.5));

