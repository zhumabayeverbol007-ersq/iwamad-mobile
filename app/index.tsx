import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Yerbol</Text>
      <Text style={styles.likes}>Likes: {likes}</Text>
      
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Link href="/events" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32 },
  name: { fontSize: 24, marginBottom: 20 },
  likes: { fontSize: 20, marginBottom: 20 },
  button: { backgroundColor: '#1d4ed8', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 8, minHeight: 44, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});