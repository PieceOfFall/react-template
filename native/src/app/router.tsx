import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import MainTabs from '../App'
import LoginPage from '../pages/LoginPage'
import { type AuthState, useAuthStore } from '../stores/auth'

const Stack = createNativeStackNavigator()

export const AppRouter = () => {
  const isHydrated = useAuthStore((state: AuthState) => state.isHydrated)
  const isLoggedIn = useAuthStore((state: AuthState) => state.isLoggedIn)

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
