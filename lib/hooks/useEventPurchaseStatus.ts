// hooks/useEventPurchaseStatus.ts
import { useState, useEffect } from 'react';
import { getOrdersByUserForCheckout } from '@/lib/actions/order.actions';

export function useEventPurchaseStatus(userId: string, eventId: string) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkPurchaseStatus() {
      if (userId && eventId) {
        const orders = await getOrdersByUserForCheckout({ userId });
        const hasEventBeenPurchased = orders.some((order: any) => order.event._id === eventId);
        setIsPurchased(hasEventBeenPurchased);
        setLoading(false);
      }
    }
    checkPurchaseStatus();
  }, [userId, eventId]);

  return { isPurchased, loading };
}