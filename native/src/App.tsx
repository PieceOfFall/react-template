import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable, StyleSheet, Text } from 'react-native'
import HomePage from './pages/HomePage'
import UserCenterPage from './pages/UserCenterPage'
import { useAuth } from './stores/auth'

const Tab = createBottomTabNavigator()

const HeaderLogoutButton = () => {
  const { logout } = useAuth()

  return (
    <Pressable onPress={logout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
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
