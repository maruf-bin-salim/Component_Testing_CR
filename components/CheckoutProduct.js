const { PAGE_MODES } = require("@/data/enums");

export default function CheckoutProduct({
    selectedProduct,
    selectedColor,
    setSelectedColor,
    setPageMode,
    setSelectedProduct,
  }) {
    return (
      <div className="mt-4 flex h-[min-content] max-h-[90%] w-full flex-col">
        <div className="scrollbar-hidden flex flex-[1] flex-col overflow-y-scroll bg-[#F5F5F5]">
          {/* top portion */}
          <div className="min-h-[max-content] flex-col p-2 text-center lg:flex lg:text-left">
            <div className="flex flex-1 flex-col">
              <img
                src="/back.png"
                alt=""
                className="w-[20px] cursor-pointer lg:w-[30px]"
                onClick={() => {
                  setPageMode(PAGE_MODES.PRODUCT_DETAILS);
                }}
              />
  
              <img
                src={
                  selectedProduct?.images?.find((image) => {
                    return image.color_code === selectedColor;
                  })?.image_url || selectedProduct.base_image
                }
                className="m-auto w-[40%] min-w-[100px] lg:m-2 lg:mt-4"
              />
            </div>
  
            <div className="flex flex-1 flex-col p-2 pt-[15px] lg:pt-[30px]">
              <h1 className="text-xl font-bold">{selectedProduct.brand}</h1>
              <div className="flex flex-1 items-center justify-center gap-2 lg:justify-start">
                <p className=" text-lg">{selectedProduct?.name}</p>
                {selectedColor && (
                  <div
                    className="mb-2 mt-2 flex h-[20px] w-[20px] flex-wrap border-2 border-black"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                )}
              </div>
            </div>
          </div>
  
          <div className="flex w-[100%] flex-col p-4">
            <button
              onClick={async () => {
                alert("Thank you for your purchase!");
                setSelectedColor(null);
                setSelectedProduct(null);
                setPageMode(PAGE_MODES.ALL_PRODUCTS);
              }}
              className="mb-2 rounded-xl border-2 border-[#7190ff] bg-[#a1b5ff] p-2 text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-none disabled:bg-[#a1b5ff] disabled:opacity-50"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  }
  