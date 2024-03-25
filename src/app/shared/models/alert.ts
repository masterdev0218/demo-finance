export interface Alert {
  variant: 'info' | 'success' | 'error';
  message: string;
  duration: number;
  open?: boolean;
}
