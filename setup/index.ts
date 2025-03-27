import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();


app.use('/ping', (_req, res) => {
   res.send('pong');
});

app.use('/bmi', (req, res) => {
   const height = Number(req.query.height);
   const weight = Number(req.query.weight);

   if(!weight && !height) {
      res.send({
         error: "malformatted parameters"
       });
       return ;
   }
   const bmi = calculateBmi(height, weight);
   res.send({
      height: height,
      weight: weight,
      bmi: bmi
   });
});


app.use('/exercise', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   const { daily_exercises, target } = req.body;

   if (!daily_exercises || !target) {
      res.send({
         error: "parameters missing"
      });
      return;
   }

   if(!Array.isArray(daily_exercises) || isNaN(Number(target))){
      res.send({
         error: "malformatted parameters"
      });
      return;
   };

   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
   const result = calculateExercises(daily_exercises, target);
   res.send(result);
});


const PORT = 3001;

app.listen(PORT , () => {
   console.log('sever is up at http://localhost:3001');
});