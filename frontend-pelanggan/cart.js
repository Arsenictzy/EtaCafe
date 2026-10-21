/**
 * cart.js — Manajemen keranjang belanja menggunakan localStorage
 * Menyimpan state keranjang sehingga tetap ada saat berpindah halaman
 */

const CART_KEY = 'etacafe_cart';

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(menuItem) {
  const cart = getCart();
  const existing = cart.find(item => item.menu_item_id === menuItem.id);
  if (existing) {
    existing.quantity += 1;
    existing.subtotal = existing.price * existing.quantity;
  } else {
    cart.push({
      menu_item_id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image_url: menuItem.image_url,
      quantity: 1,
      subtotal: menuItem.price,
      notes: '',
    });
  }
  saveCart(cart);
  return cart;
}

export function updateQuantity(menuItemId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.menu_item_id === menuItemId);
  if (!item) return cart;
  if (quantity <= 0) return removeFromCart(menuItemId);
  item.quantity = quantity;
  item.subtotal = item.price * quantity;
  saveCart(cart);
  return cart;
}

export function removeFromCart(menuItemId) {
  const cart = getCart().filter(i => i.menu_item_id !== menuItemId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.subtotal, 0);
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}
