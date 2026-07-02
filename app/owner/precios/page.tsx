import { createClient } from '@/lib/supabase/server'
import { PrecioBaseEditor } from '@/components/owner/PrecioBaseEditor'
import { PrecioEspecialForm } from '@/components/owner/PrecioEspecialForm'

export default async function OwnerPreciosPage() {
  const supabase = await createClient()

  const [{ data: apartamentos }, { data: especiales }] = await Promise.all([
    supabase.from('apartamentos').select('id, nombre, precio_noche_base').order('nombre'),
    supabase
      .from('precios_especiales')
      .select('id, nombre, fecha_inicio, fecha_fin, precio_noche, apartamentos(nombre)')
      .order('fecha_inicio', { ascending: true }),
  ])

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Precios</h1>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Precio base por apartamento</h2>
        <div className="flex flex-col gap-2 mb-8">
          {(apartamentos ?? []).map((a) => (
            <PrecioBaseEditor key={a.id} apartamentoId={a.id} nombre={a.nombre} precioActual={a.precio_noche_base} />
          ))}
        </div>

        <PrecioEspecialForm
          apartamentosDisponibles={(apartamentos ?? []).map((a) => ({ id: a.id, nombre: a.nombre }))}
          especiales={especiales ?? []}
        />
      </div>
    </main>
  )
}
