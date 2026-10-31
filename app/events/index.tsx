import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  function toggleSave(id: number) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((s) => s !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>
      
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
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
            saved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  hint: { fontSize: 14, color: '#555', marginBottom: 8 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
});