import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center self-center h-[50vh]">
        <Image
          src="/ttt51/home.png"
          alt="TTT Logo"
          width="1600"
          height="1600"
          quality={100}
          layout="intrinsic"
          className="w-64 col-12"
          priority
          />
      </div>
      <div className="text-center text-3xl">Taiwan Table Tennis 51</div>
    </div>
  );
}
