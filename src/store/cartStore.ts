import { atom } from 'nanostores';

export type CartItem = {
  id: string;
  title: string;
  price: string;
  icon: string;
  image?: string;
};

// Il carrello è un array di CartItem
export const cartStore = atom<CartItem[]>([]);

export function addToCart(item: CartItem) {
  const currentCart = cartStore.get();
  // Evita duplicati
  if (!currentCart.find(i => i.id === item.id)) {
    cartStore.set([...currentCart, item]);
  }
}

export function removeFromCart(itemId: string) {
  const currentCart = cartStore.get();
  cartStore.set(currentCart.filter(i => i.id !== itemId));
}

export function clearCart() {
  cartStore.set([]);
}
