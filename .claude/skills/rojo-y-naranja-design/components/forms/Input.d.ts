import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — also turns the border red. */
  error?: string;
  iconLeft?: React.ReactNode;
}

/** Labelled text/email/date input for booking and email-validation forms. */
export function Input(props: InputProps): JSX.Element;
