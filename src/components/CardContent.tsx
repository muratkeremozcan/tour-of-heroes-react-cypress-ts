type ButtonFooterProps = {
  name: string
  description: string
}

export default function CardContent({name, description}: ButtonFooterProps) {
  return (
    <div className="card-content">
      <div className="name">{name}</div>
      <div className="description">{description}</div>
    </div>
  )
}
