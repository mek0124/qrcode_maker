// src/pages/history.tsx
import { useState, useEffect } from 'react';
import { getAllQRs, deleteQR } from '../utils/db';
import type { SavedQR } from '../utils/db';

export default function History() {
  const [qrCodes, setQrCodes] = useState<SavedQR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadQRCodes = async () => {
      setLoading(true);
      const codes = await getAllQRs();
      if (isMounted) {
        setQrCodes(codes);
        setLoading(false);
      }
    };

    loadQRCodes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQR(id);
    const updatedCodes = await getAllQRs();
    setQrCodes(updatedCodes);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateData = (data: string, maxLength: number = 50) => {
    if (data.length <= maxLength) return data;
    return data.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-base md:text-xl text-gray-600">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-3 md:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 lg:mb-8">QR Code History</h1>
        
        {qrCodes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-12 text-center">
            <p className="text-gray-500 text-base md:text-lg">No QR codes saved yet.</p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Generate and save QR codes to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {qrCodes.map((qr) => (
              <div key={qr.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-3 md:p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded uppercase">
                      {qr.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(qr.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-mono truncate">
                    {truncateData(qr.data)}
                  </p>
                </div>
                
                <div className="p-3 md:p-4 flex flex-col items-center">
                  <img 
                    src={qr.qrImageData} 
                    alt={`QR Code ${qr.id}`}
                    className="w-32 sm:w-36 md:w-40 lg:w-48 h-32 sm:h-36 md:h-40 lg:h-48 border border-gray-200 rounded-lg"
                  />
                </div>
                
                <div className="p-3 md:p-4 bg-gray-50 flex justify-end">
                  <button
                    onClick={() => qr.id && handleDelete(qr.id)}
                    className="px-3 md:px-4 py-1 md:py-2 bg-red-600 text-white text-xs md:text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}