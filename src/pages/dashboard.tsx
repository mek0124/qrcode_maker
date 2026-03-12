import { useState, useRef } from 'react';
import qrcode from 'qrcode-generator';
import { saveQR } from '../utils/db';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi';

export default function Dashboard() {
  const [qrType, setQrType] = useState<QRType>('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phone, setPhone] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [qrImageData, setQrImageData] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQRData = (): string => {
    switch (qrType) {
      case 'text':
        return text;
      case 'url':
        return url;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phone}`;
      case 'sms':
        return `smsto:${smsPhone}:${smsMessage}`;
      case 'wifi':
        return `WIFI:S:${wifiSSID};T:${wifiEncryption};P:${wifiPassword};;`;
      default:
        return '';
    }
  };

  const generateQR = () => {
    const data = getQRData();
    if (!data) return;

    const qr = qrcode(0, 'L');
    qr.addData(data);
    qr.make();

    const size = qr.getModuleCount();
    const cellSize = 10;
    
    const canvas = document.createElement('canvas');
    canvas.width = size * cellSize;
    canvas.height = size * cellSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        ctx.fillStyle = qr.isDark(row, col) ? '#000000' : '#ffffff';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }

    setQrImageData(canvas.toDataURL());
    setSavedMessage('');
  };

  const saveQRCode = async () => {
    if (!qrImageData) return;
    
    const data = getQRData();
    
    await saveQR({
      type: qrType,
      data: data,
      qrImageData: qrImageData,
      createdAt: Date.now()
    });
    
    setSavedMessage('QR code saved to history!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const downloadQR = () => {
    if (!qrImageData) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrImageData;
    link.click();
  };

  return (
    <div className="flex flex-row w-full min-h-screen p-6 gap-6 bg-gray-50">
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">QR Code Data</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={qrType}
            onChange={(e) => setQrType(e.target.value as QRType)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="text">Text</option>
            <option value="url">URL</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="wifi">WiFi</option>
          </select>
        </div>

        {qrType === 'text' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter any text..."
            />
          </div>
        )}

        {qrType === 'url' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://example.com"
            />
          </div>
        )}

        {qrType === 'email' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="recipient@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        {qrType === 'phone' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="+1234567890"
            />
          </div>
        )}

        {qrType === 'sms' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={smsPhone}
                onChange={(e) => setSmsPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="+1234567890"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        {qrType === 'wifi' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">SSID</label>
              <input
                type="text"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
              <select
                value={wifiEncryption}
                onChange={(e) => setWifiEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </>
        )}

        <button
          onClick={generateQR}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mb-3"
        >
          Generate QR Code
        </button>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-start">
        <h2 className="text-2xl font-bold mb-6">QR Code</h2>
        <div className="border-2 border-gray-200 p-4 rounded-lg mb-4">
          {qrImageData ? (
            <img src={qrImageData} alt="QR Code" className="max-w-full h-auto" />
          ) : (
            <div className="w-[300px] h-[300px] bg-gray-100 flex items-center justify-center text-gray-400">
              QR code preview
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveQRCode}
            disabled={!qrImageData}
            className={`py-2 px-6 rounded-md transition-colors ${
              qrImageData
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save to History
          </button>
          <button
            onClick={downloadQR}
            disabled={!qrImageData}
            className={`py-2 px-6 rounded-md transition-colors ${
              qrImageData
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Download PNG
          </button>
        </div>
        {savedMessage && (
          <p className="mt-3 text-green-600 font-medium">{savedMessage}</p>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}