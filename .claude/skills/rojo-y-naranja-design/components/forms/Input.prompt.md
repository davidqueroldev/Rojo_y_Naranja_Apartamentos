Labelled form field — text, email and date inputs for the reservation flow and the email-validation step.

```jsx
<Input label="Correo electrónico" type="email" placeholder="tu@email.com" hint="Te enviaremos un código de validación" />
<Input label="Entrada" type="date" />
<Input label="Email" type="email" error="Introduce un correo válido" />
```

Props: `label`, `hint`, `error` (turns border red), `iconLeft`, plus all native input attributes (`type`, `placeholder`, `value`, `disabled`, …).
