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
        <div className="text-xl text-gray-600">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">QR Code History</h1>
        
        {qrCodes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No QR codes saved yet.</p>
            <p className="text-gray-400 mt-2">Generate and save QR codes to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrCodes.map((qr) => (
              <div key={qr.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded uppercase">
                      {qr.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(qr.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono">
                    {truncateData(qr.data)}
                  </p>
                </div>
                
                <div className="p-4 flex flex-col items-center">
                  <img 
                    src={qr.qrImageData} 
                    alt={`QR Code ${qr.id}`}
                    className="w-48 h-48 border border-gray-200 rounded-lg"
                  />
                </div>
                
                <div className="p-4 bg-gray-50 flex justify-end">
                  <button
                    onClick={() => qr.id && handleDelete(qr.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
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