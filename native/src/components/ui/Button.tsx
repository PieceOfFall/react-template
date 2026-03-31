import {
  Pressable,
  Text,
  type PressableProps,
  type ViewStyle,
} from 'react-native'
import { cn } from '../../util/cn'

type ButtonProps = PressableProps & {
  text: string
  className?: string
  textClassName?: string
}

export const Button = ({ className, text, textClassName, ...props }: ButtonProps) => (
  <Pressable
    className={cn('items-center rounded-xl bg-green-600 px-4 py-3 active:bg-green-700', className)}
    style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }] as ViewStyle[]}
    {...props}
  >
    <Text className={cn('text-sm font-semibold text-white', textClassName)}>{text}</Text>
  </Pressable>
)
