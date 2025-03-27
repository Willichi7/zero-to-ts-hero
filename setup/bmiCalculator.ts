interface BmiType{
   height: number
   weight: number
}
type bmiType = number | string

const parseArgument = (args: string[]): BmiType => {
   if(args.length< 4){ throw new Error('less arguments')}
   if(args.length > 4){ throw new Error('too many arguments')}
   return {
      height: Number(args[2]),
      weight: Number(args[3])
   }
}

export const calculateBmi = (height: number, weight: number): bmiType => {
   let newHeight = height / 100
   const bmi = weight / (newHeight * newHeight)
   console.log(bmi)

   if(bmi < 18.5){
      return "UnderWeight"
   }else if(bmi > 18.5 && bmi <= 24.49){
      return "Normal range"
   }else if(bmi >24.49 && bmi < 29.9 ){
      return 'OverWeight'
   }else if( bmi >= 30){
      return 'Obese'
   }
   return  bmi
}


try {
   const {height, weight} = parseArgument(process.argv)
   console.log(calculateBmi(height, weight))
} catch (error: unknown) {
   let errorMessage = "Something bad happened"
   if(error instanceof Error){
      errorMessage += ' Error ' + error.message
   }
   console.log(errorMessage)
}

