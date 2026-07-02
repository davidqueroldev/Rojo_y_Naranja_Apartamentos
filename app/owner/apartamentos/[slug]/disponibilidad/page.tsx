import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { resolverApartamento } from '@/lib/utils/reservas'
import { apartamentos } from '@/lib/data/apartments'
import { BloqueoManager } from '@/components/owner/BloqueoManager'

interface Props {
  params: { slug: string }
}

export default async function DisponibilidadApartamentoPage({ params }: Props) {
  const supabase = await createClient()
  const apt = await resolverApartamento(supabase, params.slug)
  if (!apt) notFound()

  const nombre = apartamentos.find((a) => a.slug === apt.slug)?.nombre ?? apt.slug

  const { data: bloqueos } = await supabase
    .from('bloqueos_calendario')
    .select('id, fecha_inicio, fecha_fin, motivo')
    .eq('apartamento_id', apt.id)
    .order('fecha_inicio', { ascending: true })

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Disponibilidad — {nombre}</h1>
        <BloqueoManager apartamentoId={apt.id} bloqueos={bloqueos ?? []} />
      </div>
    </main>
  )
}
