import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function Toast() {
  const { toast } = useToast();
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded shadow-lg border border-stone-700">
      {toast.message}
    </div>
  );
}
