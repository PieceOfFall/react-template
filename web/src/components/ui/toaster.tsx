import * as React from 'react';

import { onToast, type AppToast } from '@/lib/toast';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

const MAX_TOASTS = 4;

export function Toaster() {
  const [toasts, setToasts] = React.useState<AppToast[]>([]);

  React.useEffect(() => {
    return onToast((nextToast) => {
      setToasts((prev) => [...prev, nextToast].slice(-MAX_TOASTS));
    });
  }, []);

  const handleOpenChange = (id: string, open: boolean) => {
    if (open) return;
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          duration={toast.duration ?? 3500}
          onOpenChange={(open) => handleOpenChange(toast.id, open)}
          variant={toast.variant}
        >
          <div className="grid gap-1">
            {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
            <ToastDescription>{toast.description}</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
