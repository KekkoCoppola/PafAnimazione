import { useStore } from '@nanostores/react';
import { cartStore, addToCart, removeFromCart, type CartItem } from '../store/cartStore';
import { FaCheck, FaPlus } from 'react-icons/fa6';

interface AddToCartButtonProps {
  item: CartItem;
}

export default function AddToCartButton({ item }: AddToCartButtonProps) {
  const cart = useStore(cartStore);
  
  const isInCart = cart.some(i => i.id === item.id);

  const toggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  return (
    <button 
      onClick={toggleCart}
      className={`cat-btn-add-circle ${isInCart ? 'is-in-cart' : ''}`}
      title={isInCart ? 'Rimuovi dal carrello' : 'Aggiungi al carrello'}
    >
      {isInCart ? <FaCheck /> : <FaPlus />}
    </button>
  );
}
