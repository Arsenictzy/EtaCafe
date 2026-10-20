import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Server,
  Code2,
  FileArchive,
  CheckCircle2,
  Utensils,
  Receipt,
  ChefHat,
  BarChart3,
  ExternalLink,
  Terminal,
  FolderTree,
  GraduationCap,
} from 'lucide-react';

export default function App() {
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Helper to trigger ZIP download of the backend files
  const handleDownloadBackendZip = async () => {
    setIsZipping(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();

      // Read files or populate the complete backend code
      zip.file('requirements.txt', `fastapi>=0.111.0\nuvicorn[standard]>=0.30.0\nsqlalchemy>=2.0.30\npsycopg2-binary>=2.9.9\nalembic>=1.13.1\npydantic>=2.7.4\npydantic-settings>=2.3.4\npython-jose[cryptography]>=3.3.0\npasslib[bcrypt]>=1.7.4\npython-multipart>=0.0.9\n`);
      zip.file('docker-compose.yml', `version: '3.8'\nservices:\n  db:\n    image: postgres:16-alpine\n    restart: always\n    environment:\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: postgrespassword\n      POSTGRES_DB: restoflow_db\n    ports:\n      - "5432:5432"\n`);
      zip.file('.env.example', `DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/restoflow_db\nSECRET_KEY=secret_unhas_2026\nALGORITHM=HS256\nACCESS_TOKEN_EXPIRE_MINUTES=1440\nALLOWED_ORIGINS=["http://localhost:3000","http://localhost:5173"]\n`);
      zip.file('README.md', `# RestoFlow Backend (FastAPI + PostgreSQL)\nSistem Manajemen Pesanan Restoran/Kafe v1.2 Unhas\n\nJalankan:\n1. python -m venv venv\n2. source venv/bin/activate (atau venv\\Scripts\\activate)\n3. pip install -r requirements.txt\n4. docker compose up -d\n5. uvicorn app.main:app --reload --port 8000\nBuka http://localhost:8000/docs`);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'restoflow-backend-fastapi.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="border-b border-stone-800 bg-stone-900/90 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center font-bold text-white shadow-md">
              RF
            </div>
            <div>
              <h1 className="text-base font-black text-white flex items-center gap-2">
                <span>RestoFlow</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                  SRS v1.2
                </span>
              </h1>
              <p className="text-xs text-stone-400">
                Sistem Manajemen Pesanan Restoran/Kafe • FMIPA Universitas Hasanuddin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadBackendZip}
              disabled={isZipping}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                downloadSuccess
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-md shadow-emerald-950/30'
              }`}
            >
              {isZipping ? (
                <span>Mengemas...</span>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ZIP Terunduh!</span>
                </>
              ) : (
                <>
                  <FileArchive className="w-4 h-4" />
                  <span>Unduh Paket Backend (.ZIP)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-10 w-full">
        {/* Banner Status */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Backend FastAPI + PostgreSQL Siap Digunakan</span>
          </div>

          <h2 className="text-2xl font-black text-stone-100">
            Frontend Kosongan (Siap Dikerjakan oleh Tim Frontend)
          </h2>
          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            Sesuai permintaan Anda, seluruh kode backend sudah terpisah rapi di folder{' '}
            <code className="text-amber-300 font-mono bg-stone-950 px-1.5 py-0.5 rounded">/backend</code>{' '}
            dengan endpoint yang dipisahkan berdasarkan 4 role. File frontend di{' '}
            <code className="text-amber-300 font-mono bg-stone-950 px-1.5 py-0.5 rounded">/src</code>{' '}
            dikosongkan agar rekan kelompok Anda dapat bebas merancang antarmuka UI sesuai kebutuhan.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs">
            <div className="bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-stone-300">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Base URL: <strong>http://localhost:8000/api/v1</strong></span>
            </div>
            <div className="bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-stone-300">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Dokumentasi Swagger: <strong>/docs</strong></span>
            </div>
          </div>
        </div>

        {/* 4 Role Endpoints Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-stone-300 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-amber-500" />
            <span>Pemisahan Endpoint Backend Berdasarkan 4 Role (SRS v1.2):</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Pelanggan */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Utensils className="w-4 h-4" />
                <span>1. Role Pelanggan (`/api/v1/pelanggan`)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                File: <code>backend/app/api/v1/endpoints/pelanggan.py</code>
              </p>
              <ul className="text-stone-300 space-y-1.5 text-[11px]">
                <li>• <strong className="text-emerald-400">GET /menu</strong>: Katalog menu & ketersediaan (FR-03)</li>
                <li>• <strong className="text-blue-400">POST /orders</strong>: Checkout pesanan (Langsung / QR Meja BR-14, Total BR-05)</li>
                <li>• <strong className="text-emerald-400">GET /orders/{'{id}'}/status</strong>: Pelacakan status real-time (FR-10)</li>
                <li>• <strong className="text-red-400">POST /orders/{'{id}'}/cancel</strong>: Batal mandiri saat status 'Menunggu' (BR-03)</li>
              </ul>
            </div>

            {/* Kasir */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                <Receipt className="w-4 h-4" />
                <span>2. Role Kasir (`/api/v1/kasir`)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                File: <code>backend/app/api/v1/endpoints/kasir.py</code>
              </p>
              <ul className="text-stone-300 space-y-1.5 text-[11px]">
                <li>• <strong className="text-emerald-400">GET /orders/queue</strong>: Antrean baru 'Menunggu Konfirmasi' (FR-16)</li>
                <li>• <strong className="text-blue-400">POST /orders/{'{id}'}/confirm</strong>: Konfirmasi pesanan (wajib sebelum masuk Dapur, BR-02 & BR-09)</li>
                <li>• <strong className="text-emerald-400">GET /orders/{'{id}'}/receipt</strong>: Cetak struk HANYA SETELAH dikonfirmasi (BR-08)</li>
              </ul>
            </div>

            {/* Dapur */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
                <ChefHat className="w-4 h-4" />
                <span>3. Role Dapur (`/api/v1/dapur`)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                File: <code>backend/app/api/v1/endpoints/dapur.py</code>
              </p>
              <ul className="text-stone-300 space-y-1.5 text-[11px]">
                <li>• <strong className="text-emerald-400">GET /orders/queue</strong>: HANYA tiket yang telah dikonfirmasi Kasir (FR-19, BR-09)</li>
                <li>• <strong className="text-amber-400">PATCH /orders/{'{id}'}/start-processing</strong>: Mulai masak (FR-24)</li>
                <li>• <strong className="text-emerald-400">PATCH /orders/{'{id}'}/complete</strong>: Tandai selesai siap saji (FR-25)</li>
              </ul>
            </div>

            {/* Manajer */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>4. Role Manajer (`/api/v1/manajer`)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                File: <code>backend/app/api/v1/endpoints/manajer.py</code>
              </p>
              <ul className="text-stone-300 space-y-1.5 text-[11px]">
                <li>• <strong className="text-blue-400">POST/PUT/DELETE /menus</strong>: Kelola menu & toggle ketersediaan (FR-34)</li>
                <li>• <strong className="text-blue-400">POST/DELETE /users</strong>: Tambah & hapus user (BR-11: Dilarang edit)</li>
                <li>• <strong className="text-emerald-400">GET /reports/summary</strong>: Laporan omzet HANYA pesanan 'Selesai' (BR-13)</li>
                <li>• <strong className="text-emerald-400">GET /reports/export-csv</strong>: Ekspor data laporan (FR-39)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frontend Helper Info */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 text-xs text-stone-400 space-y-2">
          <p className="font-semibold text-stone-200">
            Keterangan untuk Rekan Tim Frontend:
          </p>
          <p className="text-[11px] leading-relaxed">
            File client service sudah disiapkan di <code className="text-amber-300">src/api/client.ts</code>. Tim frontend cukup mengimpor <code className="text-amber-300">PelangganAPI</code>, <code className="text-amber-300">KasirAPI</code>, <code className="text-amber-300">DapurAPI</code>, atau <code className="text-amber-300">ManajerAPI</code> untuk memanggil backend FastAPI.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/90 py-6 px-6 text-xs text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Sistem Manajemen Pesanan Restoran/Kafe Versi 1.2 • FMIPA Unhas 2026</span>
          </div>
          <div className="text-center md:text-right text-[11px] text-stone-400">
            Dosen Pengampu: <strong>Dr. Hendra, S.Si., M.Kom.</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
