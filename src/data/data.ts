import { productImgs } from "@/contains/fakeData";
import productVariantImg2 from "@/images/products/v2.jpg";
import productVariantImg3 from "@/images/products/v3.jpg";
import productVariantImg4 from "@/images/products/v4.jpg";
import productVariantImg5 from "@/images/products/v5.jpg";
import productVariantImg6 from "@/images/products/v6.jpg";
//
import productSport1 from "@/images/products/sport-1.png";
import productSport2 from "@/images/products/sport-2.png";
import productSport3 from "@/images/products/sport-3.png";
import productSport4 from "@/images/products/sport-4.png";
import productSport5 from "@/images/products/sport-5.png";
import productSport6 from "@/images/products/sport-6.png";
import productSport7 from "@/images/products/sport-7.png";
import productSport8 from "@/images/products/sport-8.png";
import axios from "axios";
import { StaticImageData } from "next/image";

//

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredImage: StaticImageData | string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: "/product-detail/";
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
  rating?: string;
  numberOfReviews?: number;
  _id: string;
  featuredImage: any;
  addItem: any;
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: "Black",
    thumbnail: productVariantImg6,
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "White",
    thumbnail: productVariantImg2,
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    thumbnail: productVariantImg3,
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    thumbnail: productVariantImg4,
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Natural",
    thumbnail: productVariantImg5,
    featuredImage: productImgs[4],
  },
];
const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    name: "Violet",
    color: "bg-violet-400",
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "Yellow",
    color: "bg-yellow-400",
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    color: "bg-orange-400",
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    color: "bg-sky-400",
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Green",
    color: "bg-green-400",
    featuredImage: productImgs[4],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rey Nylon Backpack",
    description: "Brown cockroach wings",
    price: 74,
    image: productImgs[16],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.4",
    numberOfReviews: 98,
  },
  {
    id: 2,
    name: 'Round Buckle 1" Belt',
    description: "Classic green",
    price: 68,
    image: productImgs[1],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    name: "Waffle Knit Beanie",
    description: "New blue aqua",
    price: 132,
    image: productImgs[15],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    name: "Travel Pet Carrier",
    description: "Dark pink 2023",
    price: 28,
    image: productImgs[3],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    name: "Leather Gloves",
    description: "Perfect mint green",
    price: 42,
    image: productImgs[4],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    image: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    name: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    image: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    name: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    image: productImgs[7],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
  },
];

export const SPORT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mastermind Toys",
    description: "Brown cockroach wings",
    price: 74,
    image: productSport1,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 2,
    name: "Jump Rope Kids",
    description: "Classic green",
    price: 68,
    image: productSport2,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    name: "Tee Ball Beanie",
    description: "New blue aqua",
    price: 132,
    image: productSport3,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    name: "Rubber Table Tennis",
    description: "Dark pink 2023",
    price: 28,
    image: productSport4,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    name: "Classic Blue Rugby",
    description: "Perfect mint green",
    price: 42,
    image: productSport5,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    name: "Manhattan Toy WRT",
    description: "New design 2023",
    price: 30,
    image: productSport6,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    name: "Tabletop Football ",
    description: "Matte black",
    price: 12,
    image: productSport7,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    name: "Pvc Catching Toy",
    description: "Cream pink",
    price: 145,
    image: productSport8,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
  },
];

export const DummyData = [
  {
    id: "66193c476d6515a80c68e353",
    name: "sadsadsadas with review",
    description: "بوكس ورد طبيعي فاخر من البيبي روز معsada شوكولاتة",
    price: 10,
    image: {
      src: "/_next/static/media/4.a3e1e5fb.png",
      height: 411,
      width: 413,
      blurDataURL:
        "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
      blurWidth: 8,
      blurHeight: 8,
    },
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: [
      {
        id: 1,
        name: "Violet",
        color: "bg-violet-400",
        featuredImage: {
          src: "/_next/static/media/1.d473d70f.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d473d70f.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 2,
        name: "Yellow",
        color: "bg-yellow-400",
        featuredImage: {
          src: "/_next/static/media/2.95a88b31.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.95a88b31.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 3,
        name: "Orange",
        color: "bg-orange-400",
        featuredImage: {
          src: "/_next/static/media/3.5a7d7901.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.5a7d7901.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 4,
        name: "Sky Blue",
        color: "bg-sky-400",
        featuredImage: {
          src: "/_next/static/media/4.a3e1e5fb.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 5,
        name: "Green",
        color: "bg-green-400",
        featuredImage: {
          src: "/_next/static/media/5.addcba21.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
    ],
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    _id: "66193c476d6515a80c68e353",
    color: "bg-yellow-50",
    featuredImage: {
      id: "66193c476d6515a80c68e353",
      category: 1,
      src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
      blurHeight: 8,
      blurWidth: 7,
      height: 200,
      width: 362,
      allOfSizes: ["XS", "S"],
      link: "product-detail",
      numberOfReviews: 50,
      rating: "4.9",
    },
    rates: 6,
  },
  {
    id: "65fb25cf92dc3cdfb19db721",
    name: "بوكس ورد طبيعي فاخر من البيبي روز مع 4 ",
    description: "4 ورد طبيعي فاخر من البيبي روز مع شوكولاتة",
    price: 200,
    image: {
      src: "/_next/static/media/4.a3e1e5fb.png",
      height: 411,
      width: 413,
      blurDataURL:
        "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
      blurWidth: 8,
      blurHeight: 8,
    },
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: [
      {
        id: 1,
        name: "Violet",
        color: "bg-violet-400",
        featuredImage: {
          src: "/_next/static/media/1.d473d70f.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d473d70f.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 2,
        name: "Yellow",
        color: "bg-yellow-400",
        featuredImage: {
          src: "/_next/static/media/2.95a88b31.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.95a88b31.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 3,
        name: "Orange",
        color: "bg-orange-400",
        featuredImage: {
          src: "/_next/static/media/3.5a7d7901.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.5a7d7901.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 4,
        name: "Sky Blue",
        color: "bg-sky-400",
        featuredImage: {
          src: "/_next/static/media/4.a3e1e5fb.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 5,
        name: "Green",
        color: "bg-green-400",
        featuredImage: {
          src: "/_next/static/media/5.addcba21.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
    ],
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    _id: "65fb25cf92dc3cdfb19db721",
    color: "bg-yellow-50",
    featuredImage: {
      id: "65fb25cf92dc3cdfb19db721",
      category: 1,
      src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
      blurHeight: 8,
      blurWidth: 7,
      height: 200,
      width: 362,
      allOfSizes: ["XS", "S"],
      link: "product-detail",
      numberOfReviews: 50,
      rating: "4.9",
    },
    rates: 0,
  },
  {
    id: "65fb25138f6c4f14fa7161aa",
    name: "بوكس ورد طبيعي فاخر من البيبي روز مع شوكولاتة2 ",
    description: "2بوكس ورد طبيعي فاخر من البيبي روز مع شوكولاتة",
    price: 50,
    image: {
      src: "/_next/static/media/4.a3e1e5fb.png",
      height: 411,
      width: 413,
      blurDataURL:
        "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
      blurWidth: 8,
      blurHeight: 8,
    },
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: [
      {
        id: 1,
        name: "Violet",
        color: "bg-violet-400",
        featuredImage: {
          src: "/_next/static/media/1.d473d70f.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d473d70f.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 2,
        name: "Yellow",
        color: "bg-yellow-400",
        featuredImage: {
          src: "/_next/static/media/2.95a88b31.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.95a88b31.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 3,
        name: "Orange",
        color: "bg-orange-400",
        featuredImage: {
          src: "/_next/static/media/3.5a7d7901.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.5a7d7901.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 4,
        name: "Sky Blue",
        color: "bg-sky-400",
        featuredImage: {
          src: "/_next/static/media/4.a3e1e5fb.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 5,
        name: "Green",
        color: "bg-green-400",
        featuredImage: {
          src: "/_next/static/media/5.addcba21.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
    ],
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    _id: "65fb25138f6c4f14fa7161aa",
    color: "bg-yellow-50",
    featuredImage: {
      id: "65fb25138f6c4f14fa7161aa",
      category: 1,
      src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
      blurHeight: 8,
      blurWidth: 7,
      height: 200,
      width: 362,
      allOfSizes: ["XS", "S"],
      link: "product-detail",
      numberOfReviews: 50,
      rating: "4.9",
    },
    rates: 0,
  },
  {
    id: "65fb24fa8f6c4f14fa7161a8",
    name: "sadsadsadas",
    description: "بوكس ورد طبيعي فاخر من البيبي روز معsada شوكولاتة",
    price: 5,
    image: {
      src: "/_next/static/media/4.a3e1e5fb.png",
      height: 411,
      width: 413,
      blurDataURL:
        "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
      blurWidth: 8,
      blurHeight: 8,
    },
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: [
      {
        id: 1,
        name: "Violet",
        color: "bg-violet-400",
        featuredImage: {
          src: "/_next/static/media/1.d473d70f.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d473d70f.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 2,
        name: "Yellow",
        color: "bg-yellow-400",
        featuredImage: {
          src: "/_next/static/media/2.95a88b31.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.95a88b31.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 3,
        name: "Orange",
        color: "bg-orange-400",
        featuredImage: {
          src: "/_next/static/media/3.5a7d7901.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.5a7d7901.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 4,
        name: "Sky Blue",
        color: "bg-sky-400",
        featuredImage: {
          src: "/_next/static/media/4.a3e1e5fb.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 5,
        name: "Green",
        color: "bg-green-400",
        featuredImage: {
          src: "/_next/static/media/5.addcba21.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
    ],
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    _id: "65fb24fa8f6c4f14fa7161a8",
    color: "bg-yellow-50",
    featuredImage: {
      id: "65fb24fa8f6c4f14fa7161a8",
      category: 1,
      src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
      blurHeight: 8,
      blurWidth: 7,
      height: 200,
      width: 362,
      allOfSizes: ["XS", "S"],
      link: "product-detail",
      numberOfReviews: 50,
      rating: "4.9",
    },
    rates: 0,
  },
  {
    id: "65fb201767d02754b6630689",
    name: "ب..........وكس ورد طبيعي فاخر من البيبي روز مع شوكولاتة",
    description: "بوكس ورد طبيعي فاخر من البيبي روز مع شوكولاتة",
    price: 735,
    image: {
      src: "/_next/static/media/4.a3e1e5fb.png",
      height: 411,
      width: 413,
      blurDataURL:
        "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
      blurWidth: 8,
      blurHeight: 8,
    },
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: [
      {
        id: 1,
        name: "Violet",
        color: "bg-violet-400",
        featuredImage: {
          src: "/_next/static/media/1.d473d70f.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d473d70f.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 2,
        name: "Yellow",
        color: "bg-yellow-400",
        featuredImage: {
          src: "/_next/static/media/2.95a88b31.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.95a88b31.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 3,
        name: "Orange",
        color: "bg-orange-400",
        featuredImage: {
          src: "/_next/static/media/3.5a7d7901.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.5a7d7901.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 4,
        name: "Sky Blue",
        color: "bg-sky-400",
        featuredImage: {
          src: "/_next/static/media/4.a3e1e5fb.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.a3e1e5fb.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
      {
        id: 5,
        name: "Green",
        color: "bg-green-400",
        featuredImage: {
          src: "/_next/static/media/5.addcba21.png",
          height: 411,
          width: 413,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
      },
    ],
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
    _id: "65fb201767d02754b6630689",
    color: "bg-yellow-50",
    featuredImage: {
      id: "65fb201767d02754b6630689",
      category: 1,
      src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
      blurHeight: 8,
      blurWidth: 7,
      height: 200,
      width: 362,
      allOfSizes: ["XS", "S"],
      link: "product-detail",
      numberOfReviews: 50,
      rating: "4.9",
    },
    rates: 0,
  },
];
