import { useStore } from '@nanostores/react';
import { cartStore, addToCart, removeFromCart, type CartItem } from '../store/cartStore';
import { FaArrowRight, FaCheck, FaPlus, FaTrash } from 'react-icons/fa6';

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
      className={`cat-btn-add ${isInCart ? 'is-in-cart' : ''}`}
    >
      {isInCart ? (
        <>
          Aggiunto al carrello <FaCheck className="arrow-icon" />
        </>
      ) : (
        <>
          Aggiungi al carrello <FaPlus className="arrow-icon" />
        </>
      )}
    </button>
  );
}
