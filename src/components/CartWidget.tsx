import { useStore } from '@nanostores/react';
import { cartStore, removeFromCart } from '../store/cartStore';
import { FaCartShopping, FaArrowRight, FaTrash, FaXmark } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function CartWidget() {
  const cart = useStore(cartStore);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Evitiamo mismatch tra SSR e client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Quando viene aggiunto qualcosa, assicuriamoci che sia aperto
  useEffect(() => {
    if (cart.length > 0) {
      setIsOpen(true);
    }
  }, [cart.length]);

  if (!mounted || cart.length === 0) return null;

  return (
    <>
      {!isOpen && (
        <button className="cart-widget-toggle" onClick={() => setIsOpen(true)}>
          <FaCartShopping />
          <span className="cart-badge">{cart.length}</span>
        </button>
      )}

      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-panel-header">
          <h3>
            <FaCartShopping style={{ marginRight: '0.5rem', color: 'var(--yellow)' }} /> Il tuo Preventivo
          </h3>
          <button className="cart-close" onClick={() => setIsOpen(false)}>
            <FaXmark />
          </button>
        </div>

        <div className="cart-panel-body">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              {item.image && (
                <img src={item.image} alt={item.title} className="cart-item-img" />
              )}
              <div className="cart-item-info">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-price">{item.price}</span>
              </div>
              <button 
                className="cart-item-remove" 
                onClick={() => removeFromCart(item.id)}
                title="Rimuovi"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-panel-footer">
          <a href="#evento" className="cart-checkout-btn" onClick={() => setIsOpen(false)}>
            Richiedi preventivo <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
      
      <style>{`
        .cart-widget-toggle {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          background: var(--black);
          color: var(--yellow);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transition: transform 0.2s;
        }
        .cart-widget-toggle:hover {
          transform: scale(1.1);
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--orange);
          color: var(--white);
          font-size: 0.8rem;
          font-weight: bold;
          font-family: var(--font-display);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 2px solid var(--black);
        }

        .cart-panel {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 380px;
          max-width: calc(100vw - 2rem);
          background: var(--white);
          border-radius: var(--radius-lg);
          border: 4px solid var(--black);
          box-shadow: 12px 12px 0 rgba(0,0,0,0.8);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          max-height: 70vh;
          transform: translateY(150%);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cart-panel.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .cart-panel-header {
          background: var(--black);
          color: var(--white);
          padding: 1.2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cart-panel-header h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
        }
        .cart-close {
          background: none;
          border: none;
          color: var(--white);
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .cart-close:hover {
          color: var(--orange);
        }

        .cart-panel-body {
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--gray-100);
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--white);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 2px solid var(--gray-300);
        }
        .cart-item-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-300);
        }
        .cart-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-item-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--black);
          line-height: 1.2;
        }
        .cart-item-price {
          font-size: 0.9rem;
          color: var(--gray-600);
          font-weight: bold;
        }
        .cart-item-remove {
          background: none;
          border: none;
          color: var(--orange);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.2s;
        }
        .cart-item-remove:hover {
          transform: scale(1.1);
        }

        .cart-panel-footer {
          padding: 1.5rem;
          background: var(--white);
          border-top: 2px solid var(--gray-200);
        }

        .cart-checkout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: var(--yellow);
          color: var(--black);
          padding: 1rem;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: bold;
          text-decoration: none;
          border: 2px solid var(--black);
          box-shadow: 4px 4px 0 var(--black);
          transition: all 0.2s;
        }
        .cart-checkout-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--black);
        }
        .cart-checkout-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 var(--black);
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @media (max-width: 640px) {
          .cart-panel {
            bottom: 0;
            right: 0;
            width: 100vw;
            max-width: 100vw;
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            border: none;
            border-top: 4px solid var(--black);
            max-height: 85vh;
          }
          .cart-widget-toggle {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
}
