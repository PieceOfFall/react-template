export type ToastVariant = 'default' | 'destructive';

export type ToastInput = {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
};

export type AppToast = ToastInput & {
  id: string;
};

type Listener = (toast: AppToast) => void;

const listeners = new Set<Listener>();
let toastCounter = 0;

const createId = () => {
  toastCounter += 1;
  return `toast-${Date.now()}-${toastCounter}`;
};

export function onToast(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function toast(input: ToastInput) {
  const payload: AppToast = {
    id: createId(),
    ...input,
  };

  listeners.forEach((listener) => listener(payload));
  return payload.id;
}

export function errorToast(message: string, title = 'Request failed') {
  return toast({
    title,
    description: message,
    variant: 'destructive',
  });
}
