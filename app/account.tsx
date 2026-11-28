import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { signOutUser } from '../src/lib/auth';
import { decodeTokenPayload } from '../src/lib/jwt';

export default function AccountScreen() {
  const { user, status } = useAuth();
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    // Мұнда getIDToken емес, getIdToken болуы керек
    user.getIdToken().then((token) => {
      const payload = decodeTokenPayload(token);
      setMinutes(Math.round((payload.exp * 1000 - Date.now()) / 60000));
    });
  }, [user]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Checking sign-in</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Text>Signed in as {user.email}</Text>
      {minutes !== null && <Text>Token expires in {minutes} min</Text>}
      <Pressable onPress={signOutUser} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { backgroundColor: '#1d4ed8', padding: 12, borderRadius: 8, minHeight: 44, alignItems: 'center', width: 200 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});