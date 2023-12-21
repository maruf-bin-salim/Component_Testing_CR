import Image from "next/image";

export default function Header() {
    return (
      <>
        <div className="h-[max-content] w-full">
          <Image
            className="m-auto"
            src="/pick_product.png"
            alt="Pick a Product"
            height={10}
            width={200}
          />
          {/* {page}  */}
        </div>
        <div className="flex h-[max-content] items-center">
          <div className="flex h-[2px] flex-1 border-b"></div>
          <p className="m-4">Buy it now!</p>
          <div className={`flex h-[2px] flex-1 border-b`}></div>
        </div>
      </>
    );
  }
  