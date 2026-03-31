import { TextInput, type TextInputProps } from 'react-native'
import { cn } from '../../util/cn'

type InputProps = TextInputProps & {
  className?: string
}

export const Input = ({ className, ...props }: InputProps) => (
  <TextInput
    className={cn(
      'rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900',
      className,
    )}
    placeholderTextColor="#94a3b8"
    {...props}
  />
)
