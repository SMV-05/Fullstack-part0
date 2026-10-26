interface TotalProps {
  total: number
}

const Total = ({ total }: TotalProps) => {
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  )
}

export default Total
