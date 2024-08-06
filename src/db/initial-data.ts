import { IProductInput, IUser, IUserInput } from "../@types/@types";

// Example data
const users = [
  {
    isAdmin: true,
    name: {
      first: "Tamar",
      middle: "",
      last: "Doe",
    },
    phone: "050-8123012",
    email: "TamarTamam@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },

  },
  {
    name: {
      first: "Moshe",
      middle: "",
      last: "Doe",
    },
    phone: "050-8123012",
    email: "moshettt@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    // Optional field
    // isBusiness: true,
  },
  {
    name: {
      first: "Yossi",
      middle: "",
      last: "Cohen",
    },
    phone: "050-9123012",
    email: "yosi@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    // Optional field
    // isBusiness: true,
  },
];

const products: IProductInput[] = [
  {
    title: "Summer Dress",
    subtitle: "Light and airy summer dress",
    description: "Perfect for hot days and casual outings.\nMade from breathable fabric for ultimate comfort.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/summer_dress.png",
    },
    alt: "image of a summer dress",
    variants: [
      { size: "S", quantity: 10, price: 300 },
      { size: "M", quantity: 15, price: 310 },
      { size: "L", quantity: 20, price: 320 },
    ],
  },
  {
    title: "Elegant Blouse",
    subtitle: "Chic blouse for professional and casual wear",
    description: "Versatile blouse that pairs well with skirts or pants.\nElegant design with a comfortable fit.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/Elegant_Blouse.png",
    },
    alt: "image of an elegant blouse",
    variants: [
      { size: "S", quantity: 8, price: 250 },
      { size: "M", quantity: 12, price: 260 },
      { size: "L", quantity: 18, price: 270 },
    ],
  },
  {
    title: "Casual T-Shirt",
    subtitle: "Comfortable everyday t-shirt",
    description: "Soft cotton t-shirt available in multiple colors.\nIdeal for casual wear or layering.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/casual_tshirt.png",
    },
    alt: "image of a casual t-shirt",
    variants: [
      { size: "S", quantity: 20, price: 100 },
      { size: "M", quantity: 25, price: 110 },
      { size: "L", quantity: 30, price: 120 },
    ],
  },
  {
    title: "Modest Maxi Skirt",
    subtitle: "Flowing and modest maxi skirt",
    description: "Elegant and modest maxi skirt perfect for various occasions.\nMade from soft and comfortable fabric.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/modest_maxi_skirt.png",
    },
    alt: "image of a modest maxi skirt",
    variants: [
      { size: "S", quantity: 15, price: 350 },
      { size: "M", quantity: 20, price: 360 },
      { size: "L", quantity: 25, price: 370 },
    ],
  },
  {
    title: "Office Skirt",
    subtitle: "Professional office skirt",
    description: "Elegant skirt suitable for office and formal occasions.\nMade from high-quality fabric for a polished look.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/office_skirt.png",
    },
    alt: "image of an office skirt",
    variants: [
      { size: "S", quantity: 10, price: 350 },
      { size: "M", quantity: 15, price: 360 },
      { size: "L", quantity: 20, price: 370 },
    ],
  },
  {
    title: "Winter Coat",
    subtitle: "Warm and stylish winter coat",
    description: "Stay warm in style with this luxurious winter coat.\nPerfect for cold weather and fashion-forward outfits.",
    image: {
      url: "https://projectnode-vvte.onrender.com/uploads/winter_coat.png",
    },
    alt: "image of a winter coat",
    variants: [
      { size: "S", quantity: 5, price: 600 },
      { size: "M", quantity: 8, price: 610 },
      { size: "L", quantity: 12, price: 620 },
    ],
  },
];

export { products, users };
