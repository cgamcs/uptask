import '@dnd-kit/react'
import type { UniqueIdentifier } from '@dnd-kit/abstract'

declare module '@dnd-kit/react' {
  interface DragEndEvent {
    canceled: boolean;
    operation: {
      source?: { id: UniqueIdentifier } | null;
      target?: { id: UniqueIdentifier } | null;
    };
  }
}