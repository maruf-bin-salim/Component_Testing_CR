let products = [
  {
    product_id: "1",
    name: "Shirt",
    base_image: "https://picsum.photos/200",
    category: "electronics",

    images: [
      {
        color_code: "#dbdbdb",
        image: "https://picsum.photos/200",
      },
    ],
  },

  {
    product_id: "2",
    name: "ben 10 figure",
    base_image: "https://picsum.photos/200",
    category: "toys",

    images: [
      {
        color_code: "#dbdbdb",
        image: "https://picsum.photos/200",
      },
    ],
  },

  {
    product_id: "3",
    name: "star wars figure",
    base_image: "https://picsum.photos/200",
    category: "toys",

    images: [
      {
        color_code: "#dbdbdb",
        image: "https://picsum.photos/200",
      },
    ],
  },
];

// to simulate a delay in the api response
async function simulatedDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

export default async function handler(req, res) {
  let page = req.query.page || 1;
  let page_size = req.query.page_size || 20;
  let total_count = products.length;

  let results = products.slice((page - 1) * page_size, page * page_size);

  await simulatedDelay();

  res.status(200).json({
    meta: {
      page: page,
      page_size: page_size,
      total_count: total_count,
    },
    results: results,
  });
}
