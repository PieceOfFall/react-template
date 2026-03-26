import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useAuth } from '../stores/auth'

const LoginPage = () => {
  const { login } = useAuth()
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
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login to Health Mall</Text>
        <Text style={styles.subtitle}>
          Demo mode: any non-empty account and password will log in successfully.
        </Text>

        <Text style={styles.label}>Account</Text>
        <TextInput
          value={account}
          onChangeText={setAccount}
          style={styles.input}
          placeholder="Enter account"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#dcfce7',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  error: {
    color: '#e11d48',
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    borderColor: '#e2e8f0',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    color: '#334155',
    fontSize: 13,
    marginBottom: 6,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 12,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 16,
    marginTop: 6,
  },
  title: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '700',
  },
})

export default LoginPage
