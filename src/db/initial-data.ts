import {IProductInput } from "../@types/@types";

const users = [
  {
    isAdmin: true,
    name: {
      first: "Tamar",
      middle: "",
      last: "Tamam",
    },
    phone: "0507123012",
    email: "TamarTamam@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Tel aviv",
      street: "Shoham",
      houseNumber: 5,
      zip: "8920435",
    },
   // isBusiness: true,
  },
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
    //isBusiness: true,

  },

];
const products: IProductInput[] = [
  {
    title: "product 1",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 111,
    quantity: 3,
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    sizes: ["S", "M", "L"],
  },
  {
    title: "product 2",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 222,
    quantity: 4,
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    sizes: ["S", "M", "L"],
  },
  {
    title: "product 3",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 333,
    quantity: 5,
    image: {
      url: "http://localhost:8080/uploads/1721164164801-1721142311247-360.png",
    },
    alt: "image of something",
    sizes: ["S", "M", "L"],
  },
];


export { products, users };
