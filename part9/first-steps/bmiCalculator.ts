export const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be positive numbers.')
  }

  const heightMeters = heightCm / 100
  const bmi = weightKg / (heightMeters * heightMeters)

  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)'
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return 'Normal range'
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 'Overweight (pre-obese)'
  } else {
    return 'Obese'
  }
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2)
    if (args.length < 2) {
      throw new Error('Please provide height and weight as arguments: npm run calculateBmi <height> <weight>')
    }

    const height = Number(args[0])
    const weight = Number(args[1])

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!')
    }

    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
