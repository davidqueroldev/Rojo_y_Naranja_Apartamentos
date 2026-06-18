/* @ds-bundle: {"format":3,"namespace":"RojoYNaranjaDesignSystem_3c785d","components":[{"name":"ReservationStatus","sourcePath":"components/booking/ReservationStatus.jsx"},{"name":"ApartmentCard","sourcePath":"components/cards/ApartmentCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/booking/ReservationStatus.jsx":"b0f6fc25ad96","components/cards/ApartmentCard.jsx":"95129ff47f33","components/core/Badge.jsx":"30f8e85b32b8","components/core/Button.jsx":"dbc64daed652","components/forms/Input.jsx":"6141fe04207f","ui_kits/landing/AdminPanel.jsx":"0bdc43d41de7","ui_kits/landing/ApartmentDetail.jsx":"b6eaf1f8cf1a","ui_kits/landing/BookingModal.jsx":"403be5aabb65","ui_kits/landing/Calendar.jsx":"2edee8752742","ui_kits/landing/Hero.jsx":"322b73f757c6","ui_kits/landing/LandingSections.jsx":"f7716ac549c5","ui_kits/landing/Navbar.jsx":"8987524156d5","ui_kits/landing/data.js":"75bbfbe51580","ui_kits/landing/kit-shared.jsx":"a279e9321e54"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RojoYNaranjaDesignSystem_3c785d = window.RojoYNaranjaDesignSystem_3c785d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/booking/ReservationStatus.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ReservationStatus — labelled pill for the reservation state machine:
 * pendiente_pago → pendiente_confirmacion → confirmada → completada / anulada.
 * Renders a status dot + Spanish label with the right semantic colour.
 */
const STATES = {
  pendiente_pago: {
    label: 'Pendiente de pago',
    color: 'var(--ryn-warning)',
    soft: '#F7ECD6',
    text: '#8A5E14'
  },
  pendiente_confirmacion: {
    label: 'Pendiente confirmar',
    color: 'var(--ryn-info)',
    soft: '#E5EAEC',
    text: '#465259'
  },
  confirmada: {
    label: 'Confirmada',
    color: 'var(--ryn-success)',
    soft: '#E7EEE4',
    text: '#3F5938'
  },
  completada: {
    label: 'Completada',
    color: 'var(--ryn-stone)',
    soft: 'var(--surface-sunken)',
    text: 'var(--text-body)'
  },
  anulada: {
    label: 'Anulada',
    color: 'var(--ryn-danger)',
    soft: 'var(--ryn-rojo-soft)',
    text: 'var(--ryn-rojo-dark)'
  }
};
function ReservationStatus({
  estado = 'pendiente_pago',
  size = 'md',
  ...rest
}) {
  const s = STATES[estado] || STATES.pendiente_pago;
  const dims = size === 'sm' ? {
    padding: '3px 10px 3px 8px',
    font: 'var(--text-2xs)',
    dot: 6
  } : {
    padding: '5px 13px 5px 10px',
    font: 'var(--text-xs)',
    dot: 7
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5em',
      background: s.soft,
      color: s.text,
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: dims.font,
      letterSpacing: '0.03em',
      padding: dims.padding,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: dims.dot,
      height: dims.dot,
      borderRadius: '50%',
      background: s.color,
      flex: 'none'
    }
  }), s.label);
}
Object.assign(__ds_scope, { ReservationStatus });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/booking/ReservationStatus.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact label for capacity, restrictions and apartment identity.
 * Tones map to the brand palette; `soft` is the default low-emphasis style.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  iconLeft = null,
  ...rest
}) {
  const palette = {
    neutral: {
      solid: '#3A332D',
      soft: 'var(--surface-sunken)',
      softText: 'var(--text-body)',
      line: 'var(--border-strong)'
    },
    rojo: {
      solid: 'var(--ryn-rojo)',
      soft: 'var(--ryn-rojo-soft)',
      softText: 'var(--ryn-rojo-dark)',
      line: 'var(--ryn-rojo)'
    },
    naranja: {
      solid: 'var(--ryn-naranja)',
      soft: 'var(--ryn-naranja-soft)',
      softText: 'var(--ryn-naranja-dark)',
      line: 'var(--ryn-naranja)'
    },
    plata: {
      solid: 'var(--ryn-plata)',
      soft: 'var(--ryn-plata-soft)',
      softText: 'var(--ryn-plata-dark)',
      line: 'var(--ryn-plata)'
    },
    oro: {
      solid: 'var(--ryn-oro)',
      soft: 'var(--ryn-oro-soft)',
      softText: 'var(--ryn-oro-dark)',
      line: 'var(--ryn-oro-dark)'
    },
    success: {
      solid: 'var(--ryn-success)',
      soft: '#E7EEE4',
      softText: '#3F5938',
      line: 'var(--ryn-success)'
    },
    warning: {
      solid: 'var(--ryn-warning)',
      soft: '#F7ECD6',
      softText: '#8A5E14',
      line: 'var(--ryn-warning)'
    },
    danger: {
      solid: 'var(--ryn-danger)',
      soft: 'var(--ryn-rojo-soft)',
      softText: 'var(--ryn-rojo-dark)',
      line: 'var(--ryn-danger)'
    }
  };
  const p = palette[tone] || palette.neutral;
  const sizes = {
    sm: {
      padding: '2px 8px',
      font: 'var(--text-2xs)'
    },
    md: {
      padding: '4px 11px',
      font: 'var(--text-xs)'
    }
  };
  const s = sizes[size] || sizes.md;
  const styleByVariant = {
    solid: {
      background: p.solid,
      color: tone === 'oro' || tone === 'plata' ? 'var(--ryn-ink)' : '#fff',
      border: '1px solid transparent'
    },
    soft: {
      background: p.soft,
      color: p.softText,
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: p.softText,
      border: `1px solid ${p.line}`
    }
  };
  const v = styleByVariant[variant] || styleByVariant.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4em',
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: s.font,
      lineHeight: 1.2,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      padding: s.padding,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...v
    }
  }, rest), iconLeft, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Rojo y Naranja design system — core control. */

/**
 * Button — Rojo y Naranja's primary action control.
 * Pill-shaped by default (matches the hero "RESERVAR" CTA). Uses brand
 * tokens only; never hard-codes colour.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      font: 'var(--text-sm)'
    },
    md: {
      padding: '12px 24px',
      font: 'var(--text-base)'
    },
    lg: {
      padding: '15px 34px',
      font: 'var(--text-md)'
    }
  };
  const variants = {
    // terracotta fill — the strongest call to action
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-on)',
      border: '1px solid transparent'
    },
    // warm sand pill with dark text — the hero "RESERVAR" treatment
    sand: {
      background: 'var(--ryn-oro)',
      color: 'var(--ryn-ink)',
      border: '1px solid transparent'
    },
    // outline — secondary actions
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '1px solid var(--border-strong)'
    },
    // ghost — tertiary / inline
    ghost: {
      background: 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid transparent'
    },
    // for placement on dark photography
    light: {
      background: 'rgba(251, 246, 238, 0.10)',
      color: 'var(--ryn-cream)',
      border: '1px solid rgba(251, 246, 238, 0.35)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.55em',
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: s.font,
    lineHeight: 1,
    letterSpacing: '0.01em',
    padding: s.padding,
    borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out)',
    ...v
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `ryn-btn ryn-btn--${variant}`,
    style: style,
    disabled: Tag === 'button' ? disabled : undefined
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/ApartmentCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ApartmentCard — the signature listing card for the four apartments.
 * Photo on top (pass any node — an <img>, an <image-slot>, or a colour block),
 * then identity-coloured name, capacity, optional "solo adultos" flag,
 * a short amenities line and the "desde X€/noche" price with a CTA.
 */
function ApartmentCard({
  tone = 'rojo',
  nombre,
  media = null,
  capacidad,
  soloAdultos = false,
  amenities = [],
  precioDesde,
  ctaLabel = 'Ver detalles',
  onCta,
  ...rest
}) {
  const toneVar = {
    rojo: 'var(--ryn-rojo)',
    naranja: 'var(--ryn-naranja)',
    plata: 'var(--ryn-plata)',
    oro: 'var(--ryn-oro-dark)'
  }[tone] || 'var(--ryn-rojo)';
  return /*#__PURE__*/React.createElement("article", _extends({
    className: "ryn-aptcard",
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--border)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, media, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      display: 'flex',
      gap: 8
    }
  }, soloAdultos && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "rojo",
    variant: "solid",
    size: "sm"
  }, "Solo adultos")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 4,
      background: toneVar
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)',
      margin: 0,
      fontWeight: 'var(--fw-semibold)',
      flex: '1 1 auto',
      minWidth: 0
    }
  }, nombre), capacidad && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "neutral",
    variant: "outline",
    size: "sm"
  }, capacidad))), amenities.length > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, amenities.join(' · ')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)'
    }
  }, "Desde"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, precioDesde, "\u20AC", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-regular)',
      color: 'var(--text-muted)'
    }
  }, " /noche"))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "sm",
    onClick: onCta
  }, ctaLabel))));
}
Object.assign(__ds_scope, { ApartmentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ApartmentCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text/email/date field for the reservation and
 * email-validation forms. Self-contained: label, optional hint, error state.
 */
function Input({
  label,
  hint,
  error,
  type = 'text',
  id,
  iconLeft = null,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  ...rest
}) {
  const fieldId = id || `ryn-field-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? 'var(--ryn-danger)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-xs)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      display: 'inline-flex',
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    className: "ryn-input",
    style: {
      width: '100%',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      padding: iconLeft ? '11px 14px 11px 38px' : '11px 14px',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: error ? 'var(--ryn-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/AdminPanel.jsx
try { (() => {
// Owner admin panel — manage and cancel reservations.
function AdminPanel({
  onSalir
}) {
  const {
    Button,
    ReservationStatus,
    Badge
  } = window.RojoYNaranjaDesignSystem_3c785d;
  const seed = [{
    codigo: 'ARN-2026-0042',
    apt: 'Ático Oro',
    tone: 'oro',
    huesped: 'Inés Marco',
    fechas: '12–15 jul',
    personas: 2,
    total: 390,
    estado: 'confirmada'
  }, {
    codigo: 'ARN-2026-0041',
    apt: 'Apartamento Plata',
    tone: 'plata',
    huesped: 'Mayte Roca',
    fechas: '10–12 jul',
    personas: 2,
    total: 220,
    estado: 'pendiente_pago'
  }, {
    codigo: 'ARN-2026-0040',
    apt: 'Apartamento Rojo',
    tone: 'rojo',
    huesped: 'Álvaro Méndez',
    fechas: '4–7 jul',
    personas: 4,
    total: 285,
    estado: 'pendiente_confirmacion'
  }, {
    codigo: 'ARN-2026-0038',
    apt: 'Apartamento Naranja',
    tone: 'naranja',
    huesped: 'Familia Poveda',
    fechas: '28–30 jun',
    personas: 3,
    total: 180,
    estado: 'completada'
  }];
  const [rows, setRows] = React.useState(seed);
  const [confirm, setConfirm] = React.useState(null);
  const cancelar = codigo => {
    setRows(rs => rs.map(r => r.codigo === codigo ? {
      ...r,
      estado: 'anulada'
    } : r));
    setConfirm(null);
  };
  const stats = [{
    icon: 'calendar-check',
    label: 'Confirmadas',
    value: rows.filter(r => r.estado === 'confirmada').length
  }, {
    icon: 'hourglass',
    label: 'Pendientes',
    value: rows.filter(r => r.estado.startsWith('pendiente')).length
  }, {
    icon: 'euro',
    label: 'Ingresos mes',
    value: rows.filter(r => r.estado !== 'anulada').reduce((s, r) => s + r.total, 0) + '€'
  }, {
    icon: 'home',
    label: 'Apartamentos',
    value: 4
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--ryn-ink)',
      padding: '14px var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 36
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "oro",
    variant: "soft",
    size: "sm"
  }, "Panel propietario")), /*#__PURE__*/React.createElement("button", {
    onClick: onSalir,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'none',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-pill)',
      padding: '7px 16px',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-on-dark)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 16
  }), " Salir"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: 'var(--space-7) var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-2xl)',
      margin: 0,
      fontWeight: 600
    }
  }, "Reservas"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-muted)',
      margin: '6px 0 0'
    }
  }, "Gestiona y cancela las reservas de los cuatro apartamentos."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      margin: '26px 0 30px'
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-md)',
      background: 'var(--ryn-rojo-soft)',
      color: 'var(--accent)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 600,
      color: 'var(--text-heading)',
      lineHeight: 1
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, s.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1.4fr 1fr 0.7fr 0.8fr 1fr 0.9fr',
      padding: '14px 22px',
      background: 'var(--surface-sunken)',
      fontFamily: 'var(--font-ui)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "C\xF3digo"), /*#__PURE__*/React.createElement("span", null, "Apartamento"), /*#__PURE__*/React.createElement("span", null, "Hu\xE9sped"), /*#__PURE__*/React.createElement("span", null, "Fechas"), /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, "Estado"), /*#__PURE__*/React.createElement("span", null)), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.codigo,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1.4fr 1fr 0.7fr 0.8fr 1fr 0.9fr',
      alignItems: 'center',
      padding: '16px 22px',
      borderTop: '1px solid var(--border)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      opacity: r.estado === 'anulada' ? 0.55 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, r.codigo), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: `var(--ryn-${r.tone})`
    }
  }), r.apt), /*#__PURE__*/React.createElement("span", null, r.huesped), /*#__PURE__*/React.createElement("span", null, r.fechas), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, r.total, "\u20AC"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(ReservationStatus, {
    estado: r.estado,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, r.estado !== 'anulada' && r.estado !== 'completada' ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirm(r),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'none',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      color: 'var(--ryn-danger)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 13
  }), " Cancelar") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)'
    }
  }, "\u2014")))))), confirm && /*#__PURE__*/React.createElement("div", {
    onClick: () => setConfirm(null),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(20,17,15,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(420px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-lg)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--ryn-rojo-soft)',
      color: 'var(--ryn-danger)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    size: 26
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      margin: '16px 0 0',
      fontWeight: 600
    }
  }, "\xBFCancelar reserva?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      margin: '8px 0 22px'
    }
  }, confirm.codigo, " \xB7 ", confirm.apt, ". El hu\xE9sped recibir\xE1 un email de cancelaci\xF3n. Esta acci\xF3n no se puede deshacer."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setConfirm(null)
  }, "Volver"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => cancelar(confirm.codigo),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 16
    })
  }, "S\xED, cancelar")))));
}
window.AdminPanel = AdminPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/AdminPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/ApartmentDetail.jsx
try { (() => {
// Apartment detail view — gallery, description, amenities, availability,
// price calculator and reserve CTA.
function ApartmentDetail({
  slug,
  onReservar,
  onVolver,
  onVer
}) {
  const {
    Button,
    Badge
  } = window.RojoYNaranjaDesignSystem_3c785d;
  const a = window.RYN.apartamentos.find(x => x.slug === slug);
  const blocked = [5, 6, 7, 18, 19, 25, 26];
  const nights = 3;
  const total = a.precio * nights;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-6) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onVolver,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-muted)',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 16
  }), " Todos los apartamentos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 12,
      height: 420,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: a.grad,
    label: `Foto principal · ${a.nombre}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: [a.grad[0], '#6b5b4f'],
    label: "Sal\xF3n"
  }), /*#__PURE__*/React.createElement(Photo, {
    grad: ['#2a2521', a.grad[1]],
    label: "Ba\xF1o"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--container-pad) var(--section-y)',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: a.tone,
    variant: "soft"
  }, a.nombre.replace('Apartamento ', 'Apartamento ')), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    variant: "outline"
  }, a.capacidad), !a.aceptaNinos && /*#__PURE__*/React.createElement(Badge, {
    tone: "rojo",
    variant: "solid"
  }, "Solo adultos")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-3xl)',
      margin: '16px 0 0',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)'
    }
  }, a.nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      margin: '14px 0 0',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Spec, {
    icon: "bed-double",
    t: `${a.habitaciones} habitaciones`
  }), /*#__PURE__*/React.createElement(Spec, {
    icon: "bath",
    t: `${a.banos} ${a.banos > 1 ? 'baños' : 'baño'}`
  }), /*#__PURE__*/React.createElement(Spec, {
    icon: "users",
    t: `${a.capacidadMax} huéspedes`
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '22px 0 0'
    }
  }, a.resumen), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      margin: '34px 0 16px',
      fontWeight: 600
    }
  }, "Equipamiento"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, a.amenities.map(am => /*#__PURE__*/React.createElement("div", {
    key: am,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: window.RYN.amenityIcons[am] || 'check',
    size: 18
  })), am))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      margin: '34px 0 16px',
      fontWeight: 600
    }
  }, "Disponibilidad"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    blocked: blocked,
    range: {
      in: 12,
      out: 15
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 14,
      fontFamily: 'var(--font-ui)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--accent)",
    t: "Tu selecci\xF3n"
  }), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--ryn-stone-2)",
    t: "No disponible"
  })))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 90,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, a.precio, "\u20AC"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, "/ noche")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      margin: '18px 0'
    }
  }, /*#__PURE__*/React.createElement(DateBox, {
    label: "Entrada",
    value: "12 jul 2026"
  }), /*#__PURE__*/React.createElement(DateBox, {
    label: "Salida",
    value: "15 jul 2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Row, {
    l: `${a.precio}€ × ${nights} noches`,
    r: `${total}€`
  }), /*#__PURE__*/React.createElement(Row, {
    l: "Tasa de limpieza",
    r: "incluida",
    muted: true
  }), /*#__PURE__*/React.createElement(Row, {
    l: "Total",
    r: `${total}€`,
    bold: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: () => onReservar(a.slug)
  }, "Reservar")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      textAlign: 'center',
      margin: '12px 0 0'
    }
  }, "Confirmamos por email \xB7 Sin comisiones"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Otros apartamentos",
    titulo: "Tambi\xE9n te pueden gustar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginTop: 'var(--space-6)'
    }
  }, window.RYN.apartamentos.filter(x => x.slug !== slug).map(o => {
    const {
      ApartmentCard
    } = window.RojoYNaranjaDesignSystem_3c785d;
    return /*#__PURE__*/React.createElement(ApartmentCard, {
      key: o.slug,
      tone: o.tone,
      nombre: o.nombre,
      capacidad: `${o.capacidadMax} pers.`,
      soloAdultos: !o.aceptaNinos,
      amenities: o.amenities.slice(0, 3),
      precioDesde: o.precio,
      onCta: () => onVer(o.slug),
      media: /*#__PURE__*/React.createElement(Photo, {
        grad: o.grad,
        label: `Foto · ${o.nombre.replace('Apartamento ', '')}`
      })
    });
  })))));
}
function Spec({
  icon,
  t
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  }), t);
}
function Legend({
  color,
  t
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: color
    }
  }), t);
}
function DateBox({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      marginTop: 2
    }
  }, value));
}
function Row({
  l,
  r,
  bold,
  muted
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-ui)',
      fontSize: bold ? 'var(--text-base)' : 'var(--text-sm)',
      fontWeight: bold ? 700 : 500,
      color: muted ? 'var(--text-muted)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", null, r));
}
window.ApartmentDetail = ApartmentDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/ApartmentDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/BookingModal.jsx
try { (() => {
// Booking flow modal — dates → datos + email → validación por código → confirmada.
// Demonstrates the brand's email-validation step.
function BookingModal({
  slug,
  onClose,
  onConfirmed
}) {
  const {
    Button,
    Input,
    Badge
  } = window.RojoYNaranjaDesignSystem_3c785d;
  const a = window.RYN.apartamentos.find(x => x.slug === slug) || window.RYN.apartamentos[0];
  const [step, setStep] = React.useState(0); // 0 datos, 1 validar, 2 hecho
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const nights = 3,
    total = a.precio * nights;
  const codeOk = code.replace(/\s/g, '').length === 6;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(20,17,15,0.55)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(560px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      maxHeight: 'calc(100vh - 40px)',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 24px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: a.grad
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 'var(--text-base)',
      color: 'var(--text-heading)'
    }
  }, a.nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "12\u201315 jul 2026 \xB7 2 hu\xE9spedes"))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '14px 24px 0'
    }
  }, ['Tus datos', 'Validación', 'Confirmada'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      borderRadius: 2,
      background: i <= step ? 'var(--accent)' : 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: i <= step ? 'var(--accent)' : 'var(--text-muted)'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      overflowY: 'auto',
      flex: 1
    }
  }, step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "Tu nombre",
    defaultValue: ""
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Apellidos",
    placeholder: "Tus apellidos"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Correo electr\xF3nico",
    type: "email",
    placeholder: "tu@email.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    }),
    hint: "Te enviaremos un c\xF3digo para confirmar la reserva."
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Tel\xE9fono",
    type: "tel",
    placeholder: "+34 ...",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 16
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      padding: 14,
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, a.precio, "\u20AC \xD7 ", nights, " noches"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, total, "\u20AC")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    disabled: !email.includes('@'),
    onClick: () => setStep(1),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Continuar")), step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      textAlign: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--ryn-naranja-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ryn-naranja)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail-check",
    size: 28
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      margin: 0,
      fontWeight: 600
    }
  }, "Valida tu correo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      margin: '8px 0 0'
    }
  }, "Hemos enviado un c\xF3digo de 6 d\xEDgitos a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, email || 'tu correo'), ".")), /*#__PURE__*/React.createElement("input", {
    value: code,
    onChange: e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6)),
    className: "ryn-input",
    inputMode: "numeric",
    placeholder: "\u2022 \u2022 \u2022 \u2022 \u2022 \u2022",
    style: {
      width: 220,
      textAlign: 'center',
      letterSpacing: '0.5em',
      fontSize: 22,
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      padding: '12px'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    disabled: !codeOk,
    onClick: () => setStep(2)
  }, "Confirmar reserva"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "Reenviar c\xF3digo")), step === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      textAlign: 'center',
      alignItems: 'center',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: '#E7EEE4',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ryn-success)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 34,
    strokeWidth: 2.2
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      margin: 0,
      fontWeight: 600
    }
  }, "\xA1Reserva confirmada!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: 360
    }
  }, "Tu c\xF3digo es ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, "ARN-2026-0042"), ". Te hemos enviado la confirmaci\xF3n a tu correo."), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    variant: "soft"
  }, "Confirmada \xB7 ", a.nombre), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onConfirmed,
    style: {
      marginTop: 6
    }
  }, "Ver mi reserva")))));
}
window.BookingModal = BookingModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/BookingModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Calendar.jsx
try { (() => {
// Availability calendar — month grid with blocked days and an optional
// selectable check-in/check-out range. Used in the detail page and booking flow.
function Calendar({
  year = 2026,
  month = 6,
  blocked = [],
  range,
  onPick,
  compact
}) {
  // month is 0-indexed (6 = July)
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = first.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const inRange = d => range && range.in && range.out && d > range.in && d < range.out;
  const isEnd = d => range && (d === range.in || d === range.out);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 'var(--text-base)',
      color: 'var(--text-heading)',
      textTransform: 'capitalize'
    }
  }, monthName), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: compact ? 3 : 5
    }
  }, ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      color: 'var(--text-muted)',
      padding: '2px 0'
    }
  }, d)), cells.map((d, i) => {
    if (!d) return /*#__PURE__*/React.createElement("span", {
      key: i
    });
    const isBlocked = blocked.includes(d);
    const end = isEnd(d);
    const mid = inRange(d);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: isBlocked,
      onClick: () => onPick && onPick(d),
      style: {
        aspectRatio: '1',
        border: 0,
        cursor: isBlocked ? 'not-allowed' : 'pointer',
        borderRadius: end ? 'var(--radius-sm)' : mid ? 0 : 'var(--radius-sm)',
        fontFamily: 'var(--font-ui)',
        fontSize: compact ? 11 : 13,
        fontWeight: end ? 700 : 500,
        background: end ? 'var(--accent)' : mid ? 'var(--ryn-rojo-soft)' : 'transparent',
        color: isBlocked ? 'var(--ryn-stone-2)' : end ? '#fff' : 'var(--text-body)',
        textDecoration: isBlocked ? 'line-through' : 'none',
        opacity: isBlocked ? 0.55 : 1,
        transition: 'background var(--dur-fast) var(--ease-out)'
      }
    }, d);
  })));
}
window.Calendar = Calendar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Calendar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
// Hero — full-bleed dark photography with left-weighted scrim and inline search.
function Hero({
  onBuscar
}) {
  const {
    Button
  } = window.RojoYNaranjaDesignSystem_3c785d;
  const [apt, setApt] = React.useState('');
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 620,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: ['#241f1b', '#5a4a3e']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-hero)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      paddingTop: 40,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ryn-overline",
    style: {
      color: 'var(--ryn-plata)'
    }
  }, "\xB7 Morella \xB7"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      color: '#fff',
      fontSize: 'var(--text-4xl)',
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: '18px 0 0',
      fontWeight: 600
    }
  }, "Apartamentos exclusivos en el centro de Morella"), /*#__PURE__*/React.createElement("div", {
    className: "ryn-rule",
    style: {
      background: 'var(--ryn-naranja)',
      margin: '22px 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-on-dark)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      maxWidth: 520,
      margin: 0
    }
  }, "Cuatro apartamentos de dise\xF1o en el coraz\xF3n de la ciudad medieval amurallada. A un minuto de los restaurantes, el castillo y la historia viva de Morella."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      alignItems: 'flex-end',
      background: 'rgba(251,246,238,0.10)',
      border: '1px solid rgba(251,246,238,0.22)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      backdropFilter: 'blur(6px)'
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    label: "Apartamento"
  }, /*#__PURE__*/React.createElement("select", {
    value: apt,
    onChange: e => setApt(e.target.value),
    className: "ryn-hero-select"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Cualquiera"), window.RYN.apartamentos.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.slug,
    value: a.slug
  }, a.nombre)))), /*#__PURE__*/React.createElement(SearchField, {
    label: "Entrada"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "ryn-hero-select",
    defaultValue: "2026-07-12"
  })), /*#__PURE__*/React.createElement(SearchField, {
    label: "Salida"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "ryn-hero-select",
    defaultValue: "2026-07-15"
  })), /*#__PURE__*/React.createElement(SearchField, {
    label: "Personas"
  }, /*#__PURE__*/React.createElement("select", {
    className: "ryn-hero-select"
  }, /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"), /*#__PURE__*/React.createElement("option", null, "4"))), /*#__PURE__*/React.createElement(Button, {
    variant: "sand",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }),
    onClick: onBuscar
  }, "Buscar")))));
}
function SearchField({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      flex: '1 1 130px',
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ryn-oro)'
    }
  }, label), children);
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingSections.jsx
try { (() => {
// Landing content sections below the hero.
const {
  useState: useS
} = React;
function ApartmentsSection({
  onVer
}) {
  const {
    ApartmentCard
  } = window.RojoYNaranjaDesignSystem_3c785d;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-page)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Los apartamentos",
    titulo: "Cuatro estancias, cuatro caracteres",
    texto: "Cada apartamento lleva el nombre de un color de nuestra identidad. Todos de dise\xF1o moderno, en pleno casco hist\xF3rico."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24,
      marginTop: 'var(--space-7)'
    }
  }, window.RYN.apartamentos.map(a => /*#__PURE__*/React.createElement(ApartmentCard, {
    key: a.slug,
    tone: a.tone,
    nombre: a.nombre,
    capacidad: `${a.capacidadMax} pers.`,
    soloAdultos: !a.aceptaNinos,
    amenities: a.amenities.slice(0, 3),
    precioDesde: a.precio,
    onCta: () => onVer(a.slug),
    media: /*#__PURE__*/React.createElement(Photo, {
      grad: a.grad,
      label: `Foto · ${a.nombre.replace('Apartamento ', '')}`
    })
  })))));
}
function WhySection() {
  const items = [{
    icon: 'castle',
    t: 'Centro histórico',
    d: 'Dentro de la ciudad amurallada, a un paso de todo.'
  }, {
    icon: 'sparkles',
    t: 'Diseño contemporáneo',
    d: 'Interiores actuales, cuidados hasta el último detalle.'
  }, {
    icon: 'waves',
    t: 'Jacuzzi y spa',
    d: 'Hidromasaje en todos; jacuzzi en Plata y Oro.'
  }, {
    icon: 'badge-percent',
    t: 'Sin comisiones',
    d: 'Reserva directa con el propietario. Mejor precio.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ryn-ink)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    dark: true,
    eyebrow: "Por qu\xE9 reservar directo",
    titulo: "La diferencia de reservar con nosotros"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 28,
      marginTop: 'var(--space-7)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 52,
      height: 52,
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(213,196,176,0.12)',
      color: 'var(--ryn-oro)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      color: '#fff',
      fontSize: 'var(--text-lg)',
      margin: '6px 0 0',
      fontWeight: 600
    }
  }, it.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-on-dark-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      margin: 0
    }
  }, it.d))))));
}
function ExperienciasSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-page)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Morella te espera",
    titulo: "Una villa medieval entre murallas",
    texto: "A los pies del castillo, Morella conserva calles empedradas, gastronom\xEDa con denominaci\xF3n propia y cielos perfectos para mirar las estrellas."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      marginTop: 'var(--space-6)'
    }
  }, window.RYN.experiencias.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.titulo,
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      flex: 'none',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: e.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      color: 'var(--text-heading)',
      fontSize: 'var(--text-base)'
    }
  }, e.titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.55
    }
  }, e.texto)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 420,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: ['#2a2521', '#8d7560'],
    label: "Foto \xB7 Morella"
  }))));
}
function ReviewsSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Opiniones",
    titulo: "Lo que dicen nuestros hu\xE9spedes",
    noMargin: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    value: window.RYN.info.valoracionMedia
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 'var(--text-xl)',
      color: 'var(--text-heading)'
    }
  }, window.RYN.info.valoracionMedia, "/10"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, "\xB7 ", window.RYN.info.numOpiniones, " opiniones"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20,
      marginTop: 'var(--space-7)'
    }
  }, window.RYN.reviews.map(r => /*#__PURE__*/React.createElement("figure", {
    key: r.nombre,
    style: {
      margin: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-xs)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    value: r.valoracion
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.55,
      color: 'var(--text-body)',
      fontStyle: 'italic'
    }
  }, "\u201C", r.texto, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--ryn-plata-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ryn-plata-dark)',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600
    }
  }, r.nombre[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)'
    }
  }, r.nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, r.apt))))))));
}
function CtaBanner({
  onReservar
}) {
  const {
    Button
  } = window.RojoYNaranjaDesignSystem_3c785d;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: 'var(--space-9) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    grad: ['#2a1810', '#AF2C0E']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(20,17,15,0.55)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      margin: '0 auto',
      textAlign: 'center',
      padding: '0 var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      color: '#fff',
      fontSize: 'var(--text-3xl)',
      margin: 0,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "Reserva directa, sin comisiones"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-on-dark)',
      fontSize: 'var(--text-md)',
      margin: '14px 0 26px'
    }
  }, "Mejor precio garantizado y atenci\xF3n directa del propietario."), /*#__PURE__*/React.createElement(Button, {
    variant: "sand",
    size: "lg",
    onClick: onReservar
  }, "Ver disponibilidad")));
}
function Footer() {
  const i = window.RYN.info;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ryn-ink)',
      color: 'var(--text-on-dark-muted)',
      padding: 'var(--space-8) 0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 64
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.7,
      marginTop: 18,
      maxWidth: 300
    }
  }, "Cuatro apartamentos boutique en el centro amurallado de Morella.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FooterHead, null, "Contacto"), /*#__PURE__*/React.createElement(FooterLine, {
    icon: "map-pin"
  }, i.direccion), /*#__PURE__*/React.createElement(FooterLine, {
    icon: "phone"
  }, i.telefono), /*#__PURE__*/React.createElement(FooterLine, {
    icon: "mail"
  }, i.email)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FooterHead, null, "Registro de turismo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      lineHeight: 1.8,
      margin: 0
    }
  }, i.registros), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 16,
      color: 'var(--ryn-plata)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '28px auto 0',
      padding: '18px var(--container-pad) 0',
      borderTop: '1px solid var(--border-on-dark)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Apartamentos Rojo y Naranja \xB7 Morella"), /*#__PURE__*/React.createElement("span", null, "Aviso legal \xB7 Privacidad \xB7 Cookies")));
}
function FooterHead({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ryn-overline",
    style: {
      color: 'var(--ryn-oro)',
      marginBottom: 14
    }
  }, children);
}
function FooterLine({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginBottom: 10,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ryn-plata)',
      flex: 'none',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  })), children);
}
function SectionHead({
  eyebrow,
  titulo,
  texto,
  dark,
  noMargin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      marginBottom: noMargin ? 0 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ryn-overline",
    style: {
      color: dark ? 'var(--ryn-plata)' : 'var(--accent)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-2xl)',
      margin: '12px 0 0',
      fontWeight: 600,
      color: dark ? '#fff' : 'var(--text-heading)',
      letterSpacing: '-0.01em'
    }
  }, titulo), texto && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      margin: '14px 0 0',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, texto));
}
Object.assign(window, {
  ApartmentsSection,
  WhySection,
  ExperienciasSection,
  ReviewsSection,
  CtaBanner,
  Footer,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Navbar.jsx
try { (() => {
// Sticky navigation bar — dark, translucent, versalita links + sand CTA.
function Navbar({
  onReservar,
  onHome,
  onAdmin,
  scrolled
}) {
  const links = ['Inicio', 'Apartamentos', 'Morella', 'Experiencias', 'Contacto'];
  const {
    Button
  } = window.RojoYNaranjaDesignSystem_3c785d;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(20,17,15,0.92)' : 'rgba(20,17,15,0.35)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: scrolled ? '1px solid var(--border-on-dark)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '14px var(--container-pad)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      cursor: 'pointer',
      flex: 'none'
    },
    onClick: onHome
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 30,
      background: 'var(--border-on-dark)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontVariantCaps: 'all-small-caps',
      letterSpacing: '0.1em',
      fontSize: 14,
      color: 'var(--ryn-plata)',
      whiteSpace: 'nowrap'
    }
  }, "tu lugar en Morella")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    onClick: i === 0 ? onHome : undefined,
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontVariantCaps: 'all-small-caps',
      letterSpacing: '0.08em',
      fontSize: 16,
      color: i === 0 ? 'var(--ryn-oro)' : 'var(--text-on-dark)',
      cursor: 'pointer'
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "sand",
    size: "sm",
    onClick: onReservar
  }, "Reservar"), /*#__PURE__*/React.createElement("a", {
    onClick: onAdmin,
    title: "Acceso propietario",
    style: {
      display: 'inline-flex',
      color: 'var(--text-on-dark-muted)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 18
  })))));
}
window.Navbar = Navbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/data.js
try { (() => {
// Rojo y Naranja — shared content for the landing UI kit.
// Real data sourced from the property's public listing.

window.RYN = window.RYN || {};
window.RYN.apartamentos = [{
  slug: 'rojo',
  nombre: 'Apartamento Rojo',
  tone: 'rojo',
  capacidadMax: 4,
  capacidad: 'Hasta 4 personas',
  habitaciones: 2,
  banos: 2,
  aceptaNinos: true,
  precio: 95,
  grad: ['#3a1a10', '#AF2C0E'],
  resumen: 'Dos dormitorios y dos baños completos, uno con bañera y ducha termostática, otro con hidromasaje. El más amplio, ideal para familias.',
  amenities: ['2 baños', 'Hidromasaje', 'Bañera', 'Cocina completa', 'Lavavajillas', 'Wifi', 'TV']
}, {
  slug: 'naranja',
  nombre: 'Apartamento Naranja',
  tone: 'naranja',
  capacidadMax: 4,
  capacidad: 'Hasta 4 personas',
  habitaciones: 2,
  banos: 1,
  aceptaNinos: true,
  precio: 90,
  grad: ['#3a2114', '#C25437'],
  resumen: 'Dos dormitorios con TV, baño con ducha de hidromasaje y cocina totalmente equipada. Luminoso y acogedor en pleno casco antiguo.',
  amenities: ['Hidromasaje', 'Cocina completa', 'Lavadora', 'Secadora', 'Wifi', 'TV']
}, {
  slug: 'plata',
  nombre: 'Apartamento Plata',
  tone: 'plata',
  capacidadMax: 2,
  capacidad: '2 personas',
  habitaciones: 1,
  banos: 1,
  aceptaNinos: false,
  precio: 110,
  grad: ['#3a3128', '#CB9E78'],
  resumen: 'Cama extragrande, jacuzzi para dos con cromoterapia y mantenedor de calor, y chimenea eléctrica de compañía. Una escapada para dos.',
  amenities: ['Jacuzzi 2 pax', 'Cromoterapia', 'Chimenea', 'Cama 160×200', 'Nespresso', 'Wifi']
}, {
  slug: 'oro',
  nombre: 'Ático Oro',
  tone: 'oro',
  capacidadMax: 2,
  capacidad: '2 personas',
  habitaciones: 1,
  banos: 1,
  aceptaNinos: false,
  precio: 130,
  grad: ['#3a342a', '#D5C4B0'],
  resumen: 'Nuestro ático de lujo: ducha de hidromasaje con cascada, amplio jacuzzi y una terraza privada de 16 m² con vistas y total discreción.',
  amenities: ['Terraza 16 m²', 'Jacuzzi', 'Ducha cascada', 'Chimenea', 'Vistas', 'Wifi']
}];
window.RYN.amenityIcons = {
  '2 baños': 'bath',
  'Hidromasaje': 'shower-head',
  'Bañera': 'bath',
  'Cocina completa': 'cooking-pot',
  'Lavavajillas': 'utensils',
  'Wifi': 'wifi',
  'TV': 'tv',
  'Lavadora': 'washing-machine',
  'Secadora': 'wind',
  'Jacuzzi 2 pax': 'waves',
  'Jacuzzi': 'waves',
  'Cromoterapia': 'palette',
  'Chimenea': 'flame',
  'Cama 160×200': 'bed-double',
  'Nespresso': 'coffee',
  'Terraza 16 m²': 'sun',
  'Ducha cascada': 'shower-head',
  'Vistas': 'mountain'
};
window.RYN.reviews = [{
  nombre: 'Inés',
  apt: 'Ático Oro',
  texto: 'Nuestra escapada estuvo genial. Apartamento muy bonito con todas las comodidades, el jacuzzi enorme muy relajante.',
  valoracion: 10
}, {
  nombre: 'Mayte',
  apt: 'Apartamento Plata',
  texto: 'Impecable: limpieza, equipamiento y estado. Se ajusta totalmente a las fotos. La ubicación dentro del pueblo es ideal y el propietario muy atento.',
  valoracion: 10
}, {
  nombre: 'Álvaro Méndez',
  apt: 'Apartamento Naranja',
  texto: 'Muy confortable y bien climatizado pese al frío. Muy bien ubicado, en el centro de Morella. Para repetir.',
  valoracion: 9
}, {
  nombre: 'Amparo Poveda',
  apt: 'Apartamento Rojo',
  texto: 'Anfitrión perfecto, resolviendo todo tipo de dudas. Por encima de nuestras expectativas. Fiel a la descripción.',
  valoracion: 10
}];
window.RYN.experiencias = [{
  icon: 'castle',
  titulo: 'Castillo y murallas',
  texto: 'A pocos minutos a pie del recinto amurallado medieval.'
}, {
  icon: 'utensils-crossed',
  titulo: 'Gastronomía',
  texto: 'Restaurantes de cocina morellana a un minuto de la puerta.'
}, {
  icon: 'footprints',
  titulo: 'Senderismo',
  texto: 'Rutas por Els Ports, observación de fauna y flora.'
}, {
  icon: 'telescope',
  titulo: 'Astroturismo',
  texto: 'Observatorio astronómico y cielos limpios del Maestrazgo.'
}];
window.RYN.info = {
  direccion: 'C/ San Nicolás, 11 · Morella (Castellón)',
  telefono: '+34 600 000 000',
  email: 'reservas@rojoynaranja.com',
  registros: '23750-CS · 23751-CS · 27852-CS · 27853-CS',
  valoracionMedia: 10,
  numOpiniones: 10
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/data.js", error: String((e && e.message) || e) }); }

// ui_kits/landing/kit-shared.jsx
try { (() => {
// Shared presentational helpers for the landing kit. Exposed on window.
// Loaded as a Babel script BEFORE the section files.

const {
  useEffect,
  useRef
} = React;

// Re-scan the DOM so Lucide swaps <i data-lucide> for SVGs after React renders.
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  });
}

// Thin-stroke Lucide icon. Renders into a ref-managed span so Lucide's node
// swap never collides with React reconciliation. size in px; color via currentColor.
function Icon({
  name,
  size = 20,
  fill = false,
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    window.lucide.createIcons();
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: 'ryn-ic' + (fill ? ' ryn-ic--fill' : ''),
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  });
}

// Warm moody gradient placeholder standing in for the dark interior photography.
// `label` is a quiet caption; real photos replace these in production.
function Photo({
  grad = ['#2a2521', '#6b5b4f'],
  label,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: `linear-gradient(140deg, ${grad[0]} 0%, ${grad[1]} 120%)`,
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 80% at 80% 10%, rgba(255,255,255,0.10), transparent 60%)'
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      bottom: 12,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.72)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 12
  }), " ", label), children);
}
function Stars({
  value = 10,
  max = 10
}) {
  // value is /10 on the source; render as 5 stars
  const fivescale = value / 2;
  const full = Math.round(fivescale);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      color: 'var(--ryn-naranja)'
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    size: 15,
    fill: i < full
  })));
}

// The wordmark — uses the extracted brand logo asset.
function Logo({
  variant = 'white',
  height = 46
}) {
  const src = variant === 'white' ? 'logo-white.png' : variant === 'rojo' ? 'logo-rojo.png' : 'logo-dark.png';
  return /*#__PURE__*/React.createElement("img", {
    src: `../../assets/${src}`,
    alt: "Rojo y Naranja \xB7 Morella",
    style: {
      height,
      width: 'auto',
      display: 'block'
    }
  });
}
Object.assign(window, {
  useLucide,
  Icon,
  Photo,
  Stars,
  Logo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/kit-shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ReservationStatus = __ds_scope.ReservationStatus;

__ds_ns.ApartmentCard = __ds_scope.ApartmentCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

})();
