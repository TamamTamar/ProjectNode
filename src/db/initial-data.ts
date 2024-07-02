const users = [
  {
    isAdmin: true,
    cart : [],
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
    isBusiness: true,
  },
  {
    cart : [],
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
    isBusiness: true,
  },
  {
    cart : [],
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
    isBusiness: true,

  },

];
const products = [
  {
    title: "product 1",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 111,
    quantity: 3,
    sold: 0,
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
  },

  {
    title: "product 2",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 222,
    quantity: 4,
    sold: 0,
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
  },

  {
    title: "product 3",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    price: 333,
    quantity: 5,
    sold: 2,
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
  },


];
export { products, users };
