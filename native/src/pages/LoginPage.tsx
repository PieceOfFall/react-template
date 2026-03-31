import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { type AuthState, useAuthStore } from '../stores/auth'
import { Text } from 'react-native'

const LoginPage = () => {
  const login = useAuthStore((state: AuthState) => state.login)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = () => {
    const ok = login(account, password)
    if (!ok) {
      setError('Please enter both account and password.')
      return
    }

    setError('')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 items-center justify-center bg-slate-50 px-4"
    >
      <Card className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-5">
        <Text className="text-3xl font-bold text-slate-900">Login to Health Mall</Text>
        <Text className="mt-2 mb-4 text-sm leading-5 text-slate-500">
          Demo mode: any non-empty account and password will log in successfully.
        </Text>

        <Text className="mb-1 text-xs text-slate-700">Account</Text>
        <Input
          value={account}
          onChangeText={setAccount}
          placeholder="Enter account"
          autoCapitalize="none"
        />

        <Text className="mb-1 mt-3 text-xs text-slate-700">Password</Text>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        {error ? <Text className="mb-3 mt-3 text-sm text-rose-600">{error}</Text> : null}

        <Button className="mt-3" onPress={onSubmit} text="Login" />
      </Card>
    </KeyboardAvoidingView>
  )
}

export default LoginPage
