import AppIcon from '../assets/icon.png';


export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center w-full border-b-2 border-b-primary">
      <div className="flex flex-row items-center justify-start w-full">
        <img
          src={AppIcon}
          alt="QR Maker App Icon"
          width="80"
          height="80"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-row items-center justify-end w-full mr-3">
        <h1 className="font-bold italic text-2xl text-primary text-end w-full">
          QR Maker
        </h1>
      </div>
    </div>
  );
};
