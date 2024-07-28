import { IProductInput, IUser, IUserInput } from "../@types/@types";

// Example data
const users : IUserInput[] = [
  {
    name: {
      first: "Moshe",
      middle: "",
      last: "Doe",
    },
    phone: "050-8123012",
    email: "moshe@gmail.com",
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
    title: "product 1",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 10 ,price: 222},
      { size: "M", quantity: 15, price: 222},
      { size: "L", quantity: 20, price: 222},
    ],
  },
  {
    title: "product 2",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 10 , price: 222},
      { size: "M", quantity: 15, price: 222},
      { size: "L", quantity: 20 , price: 222},
    ],
  },
  {
    title: "product 3",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 10 , price: 222},
      { size: "M", quantity: 15, price: 222},
      { size: "L", quantity: 20, price: 222},
    ],
  },
];

export { products, users };
