import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const [messages, status] = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(eventId, trimmed);
    setText('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
      />

      <Pressable
        onPress={handleSend}
        disabled={!text.trim()}
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text>Connecting</Text>}
      {status === 'error' && <Text>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text>No messages yet</Text>}

      {messages.map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, gap: 8 },
  heading: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#1d4ed8', padding: 12, borderRadius: 8, alignItems: 'center', minHeight: 44 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  message: { fontSize: 14, color: '#333' },
});