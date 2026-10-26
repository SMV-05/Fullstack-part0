export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hours) => hours > 0).length
  const totalHours = dailyHours.reduce((sum, current) => sum + current, 0)
  const average = periodLength === 0 ? 0 : totalHours / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string

  const ratio = target === 0 ? 1 : average / target

  if (ratio >= 1) {
    rating = 3
    ratingDescription = 'great work, you met your target!'
  } else if (ratio >= 0.75) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'bad, you need to work harder'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2)
    if (args.length < 2) {
      throw new Error(
        'Please provide target and daily exercise hours: npm run calculateExercises <target> <day1> <day2> ...'
      )
    }

    const target = Number(args[0])
    const dailyHours = args.slice(1).map((val) => Number(val))

    if (isNaN(target) || dailyHours.some((val) => isNaN(val))) {
      throw new Error('Provided values were not numbers!')
    }

    console.log(calculateExercises(dailyHours, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
