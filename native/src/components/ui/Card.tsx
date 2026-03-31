import { View, type ViewProps } from 'react-native'
import { cn } from '../../util/cn'

type CardProps = ViewProps & {
  className?: string
}

export const Card = ({ className, ...props }: CardProps) => (
  <View className={cn('rounded-2xl bg-white p-4', className)} {...props} />
)
