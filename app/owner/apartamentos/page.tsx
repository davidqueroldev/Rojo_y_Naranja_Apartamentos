import Link from 'next/link'
import { apartamentos } from '@/lib/data/apartments'

export default function OwnerApartamentosPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Disponibilidad por apartamento</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apartamentos.map((a) => (
            <Link
              key={a.slug}
              href={`/owner/apartamentos/${a.slug}/disponibilidad`}
              className="rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-colors"
            >
              <div className="font-semibold">{a.nombre}</div>
              <div className="text-sm text-gray-500">Gestionar bloqueos de calendario</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
