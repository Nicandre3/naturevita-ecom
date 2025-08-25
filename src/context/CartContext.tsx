import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  favorites: number[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isInFavorites: (productId: number) => boolean;
  cartTotal: number;
  cartCount: number;
  favoritesCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('naturevita_cart');
    const savedFavorites = localStorage.getItem('naturevita_favorites');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('naturevita_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('naturevita_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToFavorites = (productId: number) => {
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const isInFavorites = (productId: number) => {
    return favorites.includes(productId);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <CartContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToFavorites,
      removeFromFavorites,
      isInFavorites,
      cartTotal,
      cartCount,
      favoritesCount
    }}>
      {children}
    </CartContext.Provider>
  );
};