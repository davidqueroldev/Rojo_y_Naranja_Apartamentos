import Link from 'next/link'

export default function ConfirmPage() {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4">✉️</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Revisa tu email</h2>
      <p className="text-gray-600 text-sm mb-2">
        Te hemos enviado un enlace de confirmación.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        Haz clic en él para activar tu cuenta y acceder.
      </p>
      <p className="text-xs text-gray-400 mb-8">
        ¿No lo encuentras? Revisa la carpeta de spam.
      </p>
      <div className="border-t pt-6">
        <Link href="/login" className="text-red-600 hover:underline text-sm">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  )
}
