export const categories = [
  { category: 'Burger' },
  { category: 'Pasta' },
  { category: 'Chicken' },
  { category: 'Fries' },
  { category: 'Drinks' },
];

export const foods = [
  {
    id: 1,
    category: 'Burger',
    name: 'Burger Wcdo',
    price: 50.0,
    size: null,
    cost: 40.0,
    stocks: 12,
    img: 'https://pngimg.com/d/burger_sandwich_PNG96716.png',
  },
  {
    id: 2,
    category: 'Burger',
    name: 'Cheese Burger Wcdo',
    price: 70.0,
    size: null,
    cost: 50.0,
    stocks: 20,
    img: 'https://images.ctfassets.net/2iottqjdrp5h/3bINoMZdsE6f8GnXaSDlHK/d92450d299129fcb27dcb895a6df9cd7/Plain_Cheeseburger.png',
  },
  {
    id: 3,
    category: 'Burger',
    name: 'Egg Burger Wcdo',
    price: 60.0,
    size: null,
    cost: 45.0,
    stocks: 40,
    img: 'https://static.vecteezy.com/system/resources/previews/027/145/327/original/delicious-fried-egg-burger-isolated-on-transparent-background-png.png',
  },

  {
    id: 4,
    category: 'Chicken',
    name: 'Chicken Wcdo',
    price: 89.7,
    size: null,
    cost: 70.0,
    stocks: 0,
    img: 'https://delivery.giligansrestaurant.com/cdn/shop/products/SK_1_Piece_Fried_Chicken_with_Rice.jpg?v=1601024846',
  },
  {
    id: 5,
    category: 'Pasta',
    name: 'Wcdo Spag',
    price: 69.4,
    size: null,
    cost: 50.45,
    stocks: 40,
    img: 'https://queen.jollibee.com.ph/2022/05/Jolly-Spaghetti-Solo.webp',
  },

  {
    id: 6,
    category: 'Fries',
    name: 'Wcdo Fries',
    options: ['Small', 'Medium', 'Large'],
    price: [39.0, 59.0, 79.0],
    cost: [30.0, 40.0, 50.0],
    stocks: '30',
    img: 'https://pngimg.com/d/fries_PNG10.png',
  },
  {
    id: 7,
    category: 'Drinks',
    name: 'Coke',
    options: ['Small', 'Medium', 'Large'],
    price: [25.0, 35.0, 45.0],
    cost: [15.0, 20.0, 25.0],
    stocks: '50',
    img: 'https://medsgo.ph/images/detailed/33/4801981118502COKE295MLP13.75_800x_1_-removebg-preview.png',
  },
];

export const transactionData = [
  {
    totalCosts: 100,
    totalPrices: 120,
    netProfit: 8,
    discountPercent: 10,
    discountAmount: 12,
    date: '2024-06-13',
    items: [
      {
        id: 1,
        name: 'Burger Wcdo',
        prices: 50,
        costs: 40,
        category: 'Burger',
      },
      {
        id: 1,
        name: 'Cheese Burger Wcdo',
        prices: 70,
        costs: 60,
        category: 'Burger',
      },
    ],
  },
];
