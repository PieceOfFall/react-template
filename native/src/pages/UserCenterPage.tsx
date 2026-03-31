import { Pressable, ScrollView, Text, View } from 'react-native'
import { cn } from '../util/cn'

const UserCenterPage = () => (
  <ScrollView className="flex-1 bg-slate-50">
    <View className="gap-3 p-3 pb-6">
      <View className="flex-row items-center justify-between rounded-2xl bg-green-600 p-4">
        <View>
          <Text className="text-xs text-white/85">Lv.3 Member</Text>
          <Text className="mt-1 text-[26px] font-bold text-white">Alex Li</Text>
        </View>
        <Pressable className="rounded-full border border-white/50 bg-white/15 px-3 py-1.5">
          <Text className="text-[13px] text-white">Edit</Text>
        </Pressable>
      </View>

      <View className="rounded-2xl bg-white p-3">
        <Text className="mb-2.5 text-base font-bold text-slate-900">Assets</Text>
        <View className="flex-row gap-2">
          {[
            { value: '1280', label: 'Points' },
            { value: '6', label: 'Coupons' },
            { value: '¥230', label: 'Balance' },
          ].map((item) => (
            <View key={item.label} className="flex-1 items-center rounded-xl bg-green-50 py-3">
              <Text className="text-base font-bold text-green-900">{item.value}</Text>
              <Text className="mt-0.5 text-[11px] text-slate-500">{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="rounded-2xl bg-white p-3">
        <Text className="mb-2.5 text-base font-bold text-slate-900">Orders</Text>
        <View className="flex-row gap-2">
          {['To Pay', 'To Ship', 'To Receive', 'After Sale'].map((item) => (
            <Pressable key={item} className="flex-1 items-center rounded-[10px] border border-slate-200 py-2">
              <Text className="text-[11px] text-slate-700">{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="rounded-2xl bg-white p-3">
        <Text className="mb-2.5 text-base font-bold text-slate-900">Common Tools</Text>
        {['Address', 'Invoice', 'Support', 'Settings'].map((item, index) => (
          <View key={item} className={cn('py-3', index > 0 && 'border-t border-slate-100')}>
            <Text className="text-sm text-slate-700">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
)

export default UserCenterPage
