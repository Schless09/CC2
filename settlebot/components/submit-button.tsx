'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText: string;
  children: React.ReactNode;
}

export function SubmitButton({ children, pendingText, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button {...props} disabled={pending} className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${props.className || ''}`}>
      {pending ? pendingText : children}
    </button>
  )
}