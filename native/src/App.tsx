import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable, Text } from 'react-native'
import HomePage from './pages/HomePage'
import UserCenterPage from './pages/UserCenterPage'
import { type AuthState, useAuthStore } from './stores/auth'

const Tab = createBottomTabNavigator()

const HeaderLogoutButton = () => {
  const logout = useAuthStore((state: AuthState) => state.logout)

  return (
    <Pressable onPress={logout} className="mr-3 rounded-full border border-green-200 px-2.5 py-1.5">
      <Text className="text-xs font-semibold text-green-700">Logout</Text>
    </Pressable>
  )
}

const App = () => (
  <Tab.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      tabBarActiveTintColor: '#16a34a',
    }}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen
      name="Me"
      component={UserCenterPage}
      options={{
        headerRight: () => <HeaderLogoutButton />,
      }}
    />
  </Tab.Navigator>
)

export default App
