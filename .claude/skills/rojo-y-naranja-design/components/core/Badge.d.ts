import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour family — apartment identity tones plus neutral/status. */
  tone?: 'neutral' | 'rojo' | 'naranja' | 'plata' | 'oro' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'soft' | 'outline';
  size?: 'sm' | 'md';
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
}

/** Compact uppercase label for capacity, restrictions and apartment identity. */
export function Badge(props: BadgeProps): JSX.Element;
