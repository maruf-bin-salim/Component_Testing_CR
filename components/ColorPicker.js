import { PAGE_MODES } from "@/data/enums";

export default function ColorPicker({
  selectedProduct,
  setSelectedColor,
  selectedColor,
  setPageMode,
  setSelectedProduct,
}) {
  return (
    <div className="mt-4 flex h-[min-content] max-h-[90%] w-full flex-col">
      <div>
        <p className="mt-8">Select A Product Color</p>
      </div>
      <div className="scrollbar-hidden flex flex-[1] flex-col overflow-y-scroll bg-[#F5F5F5]">
        {/* top portion */}
        <div className="flex min-h-[max-content] p-2">
          <div className="flex flex-1 flex-col">
            <img
              src="/back.png"
              alt=""
              className="w-[20px] cursor-pointer lg:w-[30px]"
              onClick={() => {
                setPageMode(PAGE_MODES.ALL_PRODUCTS);
                setSelectedProduct(null);
                setSelectedColor(null);
              }}
            />

            <img
              src="/pick_product.png"
              className="m-auto w-[40%] min-w-[100px]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-xl font-bold">{selectedProduct.brand}</h1>
            <h2 className="">{selectedProduct.name}</h2>
          </div>
        </div>

        <div className={`flex flex-wrap p-4`}>
          {
            // create a 20 size arrat and map it

            selectedProduct?.images?.map((current, index) => (
              <div
                key={index}
                className={`m-1 bg-blue-500 ${
                  selectedColor === current.color_code
                    ? "h-[24px] w-[24px] border-2 border-black"
                    : "h-[20px] w-[20px]"
                }`}
                style={{
                  backgroundColor: current.color_code,
                  width: "20px",
                  height: "20px",
                }}
                onClick={() => {
                  setSelectedColor(current.color_code);
                }}
              ></div>
            ))
          }
        </div>
        <div className="flex w-[100%] flex-col p-4">
          <button
            disabled={!selectedColor}
            onClick={() => {
              setPageMode(PAGE_MODES.PRODUCT_CHECKOUT);
            }}
            className="mb-2 rounded-xl border-2 border-[#7190ff] bg-[#a1b5ff] p-2 text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-none disabled:bg-[#a1b5ff] disabled:opacity-50"
          >
            Next
          </button>

          <p
            onClick={() => {
              setSelectedColor(null);
              setPageMode(PAGE_MODES.PRODUCT_CHECKOUT);
            }}
            className="text-[#a1b5ff] cursor-pointer"
          >
            Maybe Later
          </p>
        </div>
      </div>
    </div>
  );
}

