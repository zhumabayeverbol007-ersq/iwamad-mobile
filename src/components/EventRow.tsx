import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved: boolean;
};

export default function EventRow({ event, onPress, onLongPress, saved }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        { minHeight: 44 },
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>{event.date} — {event.place}</Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  cardPressed: { backgroundColor: '#e5e7eb' },
  title: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 14, color: '#555', marginTop: 4 },
  saved: { marginTop: 4, color: '#ca8a04', fontWeight: 'bold' },
});