import Image from "next/image";


export default function Home() {
 
  return (
    <div className="font-sans min-h-screen bg-[#f8fafa] flex flex-col items-center pb-6 px-2">
      <Image
        src="/padel_tournament.jpg"
        alt="Padel Tournament"
        width={320}
        height={120}
        className="rounded-xl mb-3 shadow-md object-cover w-full max-w-xs"
        priority
      />
      <h1 className="text-2xl font-extrabold mb-2 text-[#0f7b7b] text-center tracking-tight">Padel Tournament</h1>
      
      
    </div>
  );
}
