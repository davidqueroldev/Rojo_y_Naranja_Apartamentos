# M14 — DESPLIEGUE & GO-LIVE
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S5 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Lanzamiento a producción con todos los servicios configurados, verificados y funcionales.

## 📋 Checklist completo pre-lanzamiento

### Supabase (producción)
- [ ] RLS habilitado y verificado en TODAS las tablas
- [ ] Probar políticas con usuarios de roles diferentes
- [ ] Backups automáticos diarios activados
- [ ] Todas las migraciones ejecutadas en producción
- [ ] Seed de 4 apartamentos con datos y fotos reales
- [ ] Trigger `on_auth_user_created` activo
- [ ] Database Webhook para chat-ia configurado

### Vercel
- [ ] Todas las variables de entorno de producción configuradas
- [ ] Dominio personalizado configurado (DNS apuntando a Vercel)
- [ ] Certificado SSL/HTTPS activo
- [ ] Webhook Stripe apunta a URL de producción
- [ ] Redirects configurados (www → raíz o viceversa)
- [ ] Vercel Analytics habilitado

### Stripe (modo LIVE)
- [ ] Cambiar `STRIPE_SECRET_KEY` por clave live
- [ ] Cambiar `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` por clave live
- [ ] Webhook endpoint actualizado a URL de producción
- [ ] `STRIPE_WEBHOOK_SECRET` actualizado con secret live
- [ ] Verificación con transacción real de 1€
- [ ] Configurar política de reembolsos en Stripe Dashboard

### Email (Resend)
- [ ] Dominio verificado (SPF, DKIM, DMARC configurados)
- [ ] Email de prueba enviado desde producción
- [ ] Plantilla de confirmación de cuenta de Supabase Auth en producción

### Claude API
- [ ] `ANTHROPIC_API_KEY` con plan suficiente para producción
- [ ] Test del chat en modo IA en producción
- [ ] System prompt del chatbot revisado y aprobado por el propietario

### QA final
- [ ] Flujo completo de reserva probado en producción (pago real 1€)
- [ ] Registro + confirmación email funcional en producción
- [ ] Login propietario → acceso dashboard ✅
- [ ] Chat IA funcional
- [ ] Emails de confirmación recibidos correctamente
- [ ] Core Web Vitals: Lighthouse ≥ 90 en mobile
- [ ] Google Rich Results Test: Schema.org válido
- [ ] Sitemap enviado a Google Search Console

### Entregables S5/S6
- [ ] README completo con descripción, setup, variables de entorno y capturas
- [ ] Vídeo demo grabado (máx. 3 min)
- [ ] URL pública funcional
- [ ] Post LinkedIn preparado: repo + deploy + reflexión

---

## 🔗 Checklist de URLs a verificar el día del lanzamiento

```
https://tudominio.com                    → Landing carga ✅
https://tudominio.com/apartamentos/rojo  → Página apartamento ✅
https://tudominio.com/register           → Registro funcional ✅
https://tudominio.com/login              → Login funcional ✅
https://tudominio.com/user/dashboard     → Redirige a /login si no autenticado ✅
https://tudominio.com/owner/dashboard    → Solo accesible con rol owner ✅
```

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M14 · Depende de: todos los módulos · Ver 00_ROADMAP_GENERAL.md*
