import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Acceso no autorizado</h1>
        <p className="text-gray-500 mb-6">No tienes permisos para ver esta página.</p>
        <Link href="/" className="text-red-700 underline">Volver al inicio</Link>
      </div>
    </main>
  )
}
