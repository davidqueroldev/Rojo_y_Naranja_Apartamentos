interface Props {
  params: { slug: string }
}

export default function ApartamentoPage({ params }: Props) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Apartamento: {params.slug}</h1>
    </main>
  )
}
