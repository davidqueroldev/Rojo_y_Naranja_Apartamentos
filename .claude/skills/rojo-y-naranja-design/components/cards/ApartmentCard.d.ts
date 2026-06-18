import * as React from 'react';

/**
 * Signature listing card for the four apartments.
 * @startingPoint section="Booking" subtitle="The four-apartment listing card" viewport="700x440"
 */
export interface ApartmentCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Identity colour — drives the bottom seam. */
  tone?: 'rojo' | 'naranja' | 'plata' | 'oro';
  nombre: string;
  /** Photo node: an <img>, an <image-slot>, or a colour block. */
  media?: React.ReactNode;
  /** e.g. "Hasta 4 personas". */
  capacidad?: string;
  soloAdultos?: boolean;
  /** Short amenity labels, joined with middots. */
  amenities?: string[];
  /** Number — rendered as "desde {n}€ /noche". */
  precioDesde?: number;
  ctaLabel?: string;
  onCta?: () => void;
}

/**
 * Signature listing card for the four apartments.
 */
export function ApartmentCard(props: ApartmentCardProps): JSX.Element;
