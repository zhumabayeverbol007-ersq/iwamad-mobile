import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { signIn, signUp, authErrorMessage } from '../src/lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(action: typeof signIn) {
    setError('');
    setBusy(true);
    try {
      await action(email, password);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/account');
      }
    } catch (e) {
      setError(authErrorMessage(e instanceof FirebaseError ? e.code : ''));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        onPress={() => submit(signIn)}
        disabled={busy}
        style={[styles.button, busy && styles.disabled]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable
        onPress={() => submit(signUp)}
        disabled={busy}
        style={[styles.button, busy && styles.disabled]}
      >
        <Text style={styles.buttonText}>Create account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  error: { color: 'red' },
  button: { backgroundColor: '#1d4ed8', padding: 12, borderRadius: 8, alignItems: 'center', minHeight: 44 },
  disabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});