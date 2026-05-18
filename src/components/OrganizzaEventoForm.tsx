import { useState } from 'react';
import { FaChampagneGlasses, FaPaperPlane, FaTrash } from 'react-icons/fa6';
import { useStore } from '@nanostores/react';
import { cartStore, removeFromCart, clearCart } from '../store/cartStore';

export default function OrganizzaEventoForm() {
  const cart = useStore(cartStore);
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefono: '',
    data: '',
    persone: '',
    luogo: '',
    messaggio: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = 'Il nome è obbligatorio';
    if (!form.email.includes('@')) e.email = 'Email non valida';
    if (cart.length === 0) e.cart = 'Seleziona almeno un servizio dal catalogo';
    if (!form.data) e.data = 'La data è obbligatoria';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    // Payload to send to backend would include `form` and `cart`
    console.log("Submitting:", { user: form, services: cart });
    
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    clearCart();
  };

  if (sent) {
    return (
      <div className="form-success">
        <div className="success-icon"><FaChampagneGlasses /></div>
        <h3>Richiesta inviata!</h3>
        <p>
          Grazie <strong>{form.nome}</strong>! Ti contatteremo entro 24 ore
          all'indirizzo <strong>{form.email}</strong> per confermare i dettagli del tuo evento.
        </p>
        <button className="btn-reset" onClick={() => { setSent(false); setForm({ nome:'',email:'',telefono:'',data:'',persone:'',luogo:'',messaggio:'' }); }}>
          Invia un'altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form className="evento-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nome">Nome e Cognome *</label>
          <input id="nome" name="nome" type="text" placeholder="Mario Rossi" value={form.nome} onChange={handleChange} className={errors.nome ? 'error' : ''} />
          {errors.nome && <span className="field-error">{errors.nome}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" placeholder="mario@email.it" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group form-group--full" style={{ marginBottom: '1rem' }}>
        <label>Servizi Selezionati *</label>
        {cart.length > 0 ? (
          <div className="cart-summary-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {cart.map((item) => (
              <div key={item.id} className="cart-summary-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--gray-100)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{item.title} <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>({item.price})</span></span>
                <button type="button" onClick={() => removeFromCart(item.id)} className="btn-remove-item" style={{ background: 'none', border: 'none', color: 'var(--orange)', cursor: 'pointer', padding: '0.5rem' }}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="cart-empty-message" style={{ background: 'rgba(255,107,53,0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--orange)', color: 'var(--orange-dark)' }}>
            Nessun servizio selezionato. <a href="#catalogo" style={{ color: 'var(--orange)', textDecoration: 'underline', fontWeight: 'bold' }}>Sfoglia il catalogo</a> per aggiungerne uno!
          </div>
        )}
        {errors.cart && <span className="field-error" style={{ marginTop: '0.5rem' }}>{errors.cart}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="telefono">Telefono</label>
          <input id="telefono" name="telefono" type="tel" placeholder="+39 320 1234567" value={form.telefono} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="data">Data dell'Evento *</label>
          <input id="data" name="data" type="date" value={form.data} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={errors.data ? 'error' : ''} />
          {errors.data && <span className="field-error">{errors.data}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group form-group--full">
          <label htmlFor="persone">Numero di Persone</label>
          <input id="persone" name="persone" type="number" placeholder="es. 50" value={form.persone} onChange={handleChange} min="1" />
        </div>
      </div>

      <div className="form-group form-group--full">
        <label htmlFor="luogo">Luogo dell'Evento</label>
        <input id="luogo" name="luogo" type="text" placeholder="Città, Salone, Villa..." value={form.luogo} onChange={handleChange} />
      </div>

      <div className="form-group form-group--full">
        <label htmlFor="messaggio">Raccontaci la tua idea</label>
        <textarea id="messaggio" name="messaggio" rows={4} placeholder="Descrivi il tuo evento, le tue aspettative, i temi preferiti..." value={form.messaggio} onChange={handleChange} />
      </div>

      <div className="form-footer">
        <p className="form-note">* Campi obbligatori. Ti risponderemo entro 24 ore.</p>
        <button type="submit" className="btn-submit" disabled={sending}>
          {sending ? (
            <><span className="spinner"></span> Invio in corso...</>
          ) : (
            <><FaPaperPlane style={{marginRight: '0.5rem'}} /> Invia la Richiesta</>
          )}
        </button>
      </div>
    </form>
  );
}
