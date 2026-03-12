// src/components/header.tsx
import { Link } from 'react-router-dom';
import AppIcon from '../assets/icon.png';

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center w-full border-b-2 border-b-primary bg-surface p-2 md:p-3">
      <div className="flex flex-row items-center justify-start w-full">
        <Link to="/">
          <img
            src={AppIcon}
            alt="QR Maker App Icon"
            width={60}
            height={60}
            className="md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-xl"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end w-full mr-2 md:mr-3 gap-3 md:gap-4 lg:gap-6">
        <Link to="/" className="font-semibold text-primary hover:underline text-sm md:text-base">
          Create
        </Link>
        <Link to="/history" className="font-semibold text-primary hover:underline text-sm md:text-base">
          History
        </Link>
        <h1 className="font-bold italic text-lg md:text-xl lg:text-2xl text-primary text-end w-full">
          QR Maker
        </h1>
      </div>
    </div>
  );
}