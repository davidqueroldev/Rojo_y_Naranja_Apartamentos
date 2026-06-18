import * as React from 'react';

/**
 * Primary action control for Rojo y Naranja.
 * @startingPoint section="Core" subtitle="Pill CTA in 5 brand variants" viewport="700x430"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `sand` is the hero RESERVAR treatment; `light` is for dark photo overlays. */
  variant?: 'primary' | 'sand' | 'outline' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  /** Pill (default, brand standard) or lightly rounded. */
  shape?: 'pill' | 'rounded';
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as another element, e.g. "a" for links. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

/**
 * Primary action control for Rojo y Naranja.
 */
export function Button(props: ButtonProps): JSX.Element;
