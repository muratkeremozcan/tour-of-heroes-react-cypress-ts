type CardContentProps = {
  name: string
  description: string
}

export default function CardContent({name, description}: CardContentProps) {
  return (
    <div data-cy="card-content" className="card-content">
      <div className="name">{name}</div>
      <div className="description">{description}</div>
    </div>
  )
}
