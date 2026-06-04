interface Props {
  params: { id: string }
}

export default function DetalleReservaPage({ params }: Props) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Reserva #{params.id}</h1>
    </main>
  )
}
