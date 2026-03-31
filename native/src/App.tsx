import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Pressable, StyleSheet, Text } from 'react-native'
import HomePage from './pages/HomePage'
import UserCenterPage from './pages/UserCenterPage'
import { type AuthState, useAuthStore } from './stores/auth'

const Tab = createBottomTabNavigator()

const HeaderLogoutButton = () => {
  const logout = useAuthStore((state: AuthState) => state.logout)

  return (
    <Pressable onPress={logout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </Pressable>
  )
}

const App = () => (
  <NavigationContainer>
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
  </NavigationContainer>
)

const styles = StyleSheet.create({
  logoutButton: {
    borderColor: '#bbf7d0',
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  logoutText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '600',
  },
})

export default App
