import { useEffect, useState } from 'react';
import { subscribeToChat } from '../lib/chat';
import type { ChatMessage } from '../lib/chat';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<'connecting' | 'live' | 'error'>('connecting');

  useEffect(() => {
    setStatus('connecting');
    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        setMessages(list);
        setStatus('live');
      },
      () => {
        setStatus('error');
      },
    );
    return unsubscribe;
  }, [eventId, eventTitle]);

  return [messages, status] as const;
}