/**
 * api.js — Layanan terpusat untuk komunikasi ke backend FastAPI EtaCafe
 * Base URL: http://127.0.0.1:8000/api/v1
 */

const BACKEND_HOST = (typeof window !== 'undefined' && window.location.hostname) ? window.location.hostname : '127.0.0.1';
const BASE_URL = `http://${BACKEND_HOST}:8000/api/v1`;

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function login(usernameOrEmail, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Login gagal');
  return data; // { access_token, token_type, user }
}

export async function register(name, emailOrPhone, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email_or_phone: emailOrPhone, password, role: 'pelanggan' }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Registrasi gagal');
  return data;
}

// ─── MENU ─────────────────────────────────────────────────────────────────────

export async function getMenu(kategoriId = null, search = null) {
  let url = `${BASE_URL}/pelanggan/menu`;
  const params = new URLSearchParams();
  if (kategoriId) params.append('kategori_id', kategoriId);
  if (search) params.append('search', search);
  if ([...params].length) url += '?' + params.toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal mengambil menu');
  return res.json();
}

export async function getMenuDetail(menuId) {
  const res = await fetch(`${BASE_URL}/pelanggan/menu/${menuId}`);
  if (!res.ok) throw new Error('Menu tidak ditemukan');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/pelanggan/categories`);
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export async function getPromos() {
  const res = await fetch(`${BASE_URL}/pelanggan/promos`);
  if (!res.ok) throw new Error('Gagal mengambil promo');
  return res.json();
}

// ─── ORDER ────────────────────────────────────────────────────────────────────

/**
 * Checkout / Buat pesanan baru
 * @param {Object} payload
 * @param {string} payload.customer_name
 * @param {string} payload.customer_phone
 * @param {string} payload.order_type  - 'langsung' | 'qr_meja'
 * @param {string} [payload.table_number]
 * @param {Array}  payload.items       - [{ menu_item_id, quantity, notes? }]
 * @param {string} [payload.promo_code]
 * @param {string} payload.payment_method - 'QRIS' | 'Kartu' | 'Tunai'
 */
export async function checkout(payload) {
  const res = await fetch(`${BASE_URL}/pelanggan/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Checkout gagal');
  return data;
}

export async function getOrderStatus(orderId) {
  const res = await fetch(`${BASE_URL}/pelanggan/orders/${orderId}/status`);
  if (!res.ok) throw new Error('Pesanan tidak ditemukan');
  return res.json();
}

export async function getOrderHistory(customerPhone = null) {
  let url = `${BASE_URL}/pelanggan/orders/history`;
  if (customerPhone) url += `?customer_phone=${encodeURIComponent(customerPhone)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal mengambil riwayat');
  return res.json();
}

export async function cancelOrder(orderId) {
  const res = await fetch(`${BASE_URL}/pelanggan/orders/${orderId}/cancel`, { method: 'POST' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Pembatalan gagal');
  return data;
}
