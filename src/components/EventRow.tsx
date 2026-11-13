import { Pressable, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved: boolean;
};

export default function EventRow({ event, onPress, onToggleSaved, saved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
            { minHeight: 44 },
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.detail}>
            {event.date} — {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardPressed: { backgroundColor: '#e5e7eb' },
  title: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 14, color: '#555', marginTop: 4 },
  saved: { marginTop: 4, color: '#ca8a04', fontWeight: 'bold' },
  action: {
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  actionText: { color: '#fff', fontWeight: 'bold' },
});