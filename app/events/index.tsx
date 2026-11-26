import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const { savedIds, toggleSaved } = useSavedIds();
  const [searchText, setSearchText] = useState('');

  const filteredEvents = (data || []).filter((e) =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events.</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Swipe or long-press an event to save it. Saved: {savedIds.length}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
            saved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  hint: { fontSize: 14, color: '#555', marginBottom: 8 },
  error: { color: 'red', fontSize: 18, marginBottom: 8, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
  button: { backgroundColor: '#1d4ed8', padding: 12, borderRadius: 8, marginTop: 16, minHeight: 44, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});