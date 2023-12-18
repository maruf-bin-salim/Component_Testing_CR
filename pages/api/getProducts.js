let products = [

  {
    "product_id": "1",
    "name": "example product id",
    "base_image": "https://example.com/image.jpg",

    "images": [
      {
        "color_code": "#dbdbdb",
        "image": "https://example.com/image.jpg"
      }
    ]
  },

  {
    "product_id": "2",
    "name": "example product id",
    "base_image": "https://example.com/image.jpg",

    "images": [
      {
        "color_code": "#dbdbdb",
        "image": "https://example.com/image.jpg"
      }
    ]
  },

];


export default function handler(req, res) {

  let page = req.query.page || 1;
  let page_size = req.query.page_size || 20;
  let total_count = products.length;

  let results = products.slice((page - 1) * page_size, page * page_size);

  res.status(200).json({
    "meta": {
      "page": page,
      "page_size": page_size,
      "total_count": total_count
    },
    "results": results
  })
}


