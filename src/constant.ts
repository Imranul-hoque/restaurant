export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/reservation", label: "Reservation" },
  { href: "/order", label: "Order Online" },
  { href: "/contact", label: "Contact" },
  { href: "/events", label: "Events & Offers" },
];

export const featuredDishes = [
  {
    id: 2,
    name: "Seared Scallops",
    description:
      "Pan-seared scallops with cauliflower purée, bacon, and herb oil",
    price: "$32",
    image: "/images/feature-images/image-02.avif",
  },
  {
    id: 3,
    name: "Wagyu Steak",
    description: "A5 Wagyu beef with roasted vegetables and red wine reduction",
    price: "$65",
    image: "/images/feature-images/image-03.avif",
  },
  {
    id: 4,
    name: "Steak Diff",
    description: "A5 Wagyu beef with roasted vegetables and red wine reduction",
    price: "$65",
    image: "/images/feature-images/image-04.avif",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Food Critic",
    quote:
      "Savoria offers an unforgettable dining experience with impeccable service and extraordinary flavors.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    quote:
      "The attention to detail in every dish is remarkable. This is my go-to place for special occasions.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Food Blogger",
    quote:
      "From the ambiance to the menu, everything at Savoria speaks of passion and culinary excellence.",
    rating: 5,
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Chef Marco Rossi",
    role: "Executive Chef",
    bio: "With over 20 years of experience in fine dining, Chef Marco brings his passion for Italian cuisine and innovative techniques to Savoria.",
    image: "/images/about/team/image-01.avif",
  },
  {
    id: 2,
    name: "Sophie Laurent",
    role: "Pastry Chef",
    bio: "Trained in Paris, Sophie creates exquisite desserts that are as beautiful as they are delicious, adding a sweet finale to every meal.",
    image: "/images/about/team/image-02.avif",
  },
  {
    id: 3,
    name: "James Chen",
    role: "Sous Chef",
    bio: "James specializes in fusion cuisine, blending Asian flavors with European techniques to create unique and memorable dishes.",
    image: "/images/about/team/image-03.avif",
  },
  {
    id: 4,
    name: "Isabella Martínez",
    role: "Sommelier",
    bio: "With an exceptional palate and knowledge of wines, Isabella ensures the perfect pairing for every dish on our menu.",
    image: "/images/about/team/image-04.avif",
  },
];

export const menuCategories = [
  { id: "starters", name: "Starters" },
  { id: "main", name: "Main Course" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

export const menuItems = {
  starters: [
    {
      id: 1,
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and mozzarella",
      price: "$16",
      image: "/images/menu/starter/truffle.avif",
    },
    {
      id: 2,
      name: "Tuna Tartare",
      description: "Fresh tuna with avocado, citrus, and crispy wonton",
      price: "$18",
      image: "/images/menu/starter/tuna.avif",
    },
    {
      id: 3,
      name: "Burrata Salad",
      description: "Creamy burrata with heirloom tomatoes and basil oil",
      price: "$15",
      image: "/images/menu/starter/Burrata.avif",
    },
    {
      id: 4,
      name: "Lobster Bisque",
      description: "Rich and creamy soup with lobster meat and cognac",
      price: "$19",
      image: "/images/menu/starter/Lobster.avif",
    },
  ],
  main: [
    {
      id: 5,
      name: "Filet Mignon",
      description:
        "8oz grass-fed beef with truffle mashed potatoes and red wine reduction",
      price: "$42",
      image: "/images/menu/main-course/filet.avif",
    },
    {
      id: 6,
      name: "Chilean Sea Bass",
      description:
        "Pan-seared sea bass with saffron risotto and lemon beurre blanc",
      price: "$38",
      image: "/images/menu/main-course/Chilean.avif",
    },
    {
      id: 7,
      name: "Mushroom Risotto",
      description:
        "Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan",
      price: "$28",
      image: "/images/menu/main-course/Mushroom.avif",
    },
    {
      id: 8,
      name: "Rack of Lamb",
      description: "Herb-crusted lamb with roasted vegetables and mint jus",
      price: "$44",
      image: "/images/menu/main-course/Rack.webp",
    },
  ],
  desserts: [
    {
      id: 9,
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla ice cream",
      price: "$14",
      image: "/images/menu/dessert/Chocolate.avif",
    },
    {
      id: 10,
      name: "Crème Brûlée",
      description: "Classic vanilla custard with caramelized sugar",
      price: "$12",
      image: "/images/menu/dessert/Crème.avif",
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Espresso-soaked ladyfingers with mascarpone cream",
      price: "$13",
      image: "/images/menu/dessert/Tiramisu.avif",
    },
    {
      id: 12,
      name: "Berry Panna Cotta",
      description: "Vanilla bean panna cotta with mixed berry compote",
      price: "$12",
      image: "/images/menu/dessert/Berry.avif",
    },
  ],
  drinks: [
    {
      id: 13,
      name: "Signature Martini",
      description: "Vodka, elderflower liqueur, and fresh lemon",
      price: "$16",
      image: "/images/menu/drink/Signature.avif",
    },
    {
      id: 14,
      name: "Barrel-Aged Manhattan",
      description: "Bourbon, sweet vermouth, and bitters aged in oak",
      price: "$18",
      image: "/images/menu/drink/Barrel-Aged Manhattan.webp",
    },
    {
      id: 15,
      name: "Sommelier's Wine Selection",
      description: "Ask your server about our curated wine list",
      price: "Varies",
      image: "/images/menu/drink/drew.avif",
    },
    {
      id: 16,
      name: "Artisanal Mocktails",
      description: "House-made non-alcoholic beverages with fresh ingredients",
      price: "$10",
      image: "/images/menu/dessert/Berry.avif",
    },
  ],
};


export const menuCategoriesOrder = [
  { id: "popular", name: "Popular Items" },
  { id: "starters", name: "Starters" },
  { id: "main", name: "Main Course" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

export const menuItemsOrder = {
  popular: [
    {
      id: "p1",
      name: "Truffle Risotto",
      description: "Creamy Arborio rice with black truffle and parmesan",
      price: 28,
      image: "/images/menu/starter/truffle.avif",
    },
    {
      id: "p2",
      name: "Wagyu Steak",
      description:
        "A5 Wagyu beef with roasted vegetables and red wine reduction",
      price: 65,
      image: "/images/menu/starter/tuna.avif",
    },
    {
      id: "p3",
      name: "Lobster Pasta",
      description:
        "Fresh lobster with homemade linguine in a light cream sauce",
      price: 42,
      image: "/images/menu/starter/Lobster.avif",
    },
    {
      id: "p4",
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla ice cream",
      price: 14,
      image: "/images/menu/dessert/Chocolate.avif",
    },
  ],
  starters: [
    {
      id: "s1",
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and mozzarella",
      price: 16,
      image: "/images/menu/starter/truffle.avif",
    },
    {
      id: "s2",
      name: "Tuna Tartare",
      description: "Fresh tuna with avocado, citrus, and crispy wonton",
      price: 18,
      image: "/images/menu/starter/tuna.avif",
    },
    {
      id: "s3",
      name: "Burrata Salad",
      description: "Creamy burrata with heirloom tomatoes and basil oil",
      price: 15,
      image: "/images/menu/starter/Burrata.avif",
    },
    {
      id: "s4",
      name: "Lobster Bisque",
      description: "Rich and creamy soup with lobster meat and cognac",
      price: 19,
      image: "/images/menu/starter/Lobster.avif",
    },
  ],
  main: [
    {
      id: "m1",
      name: "Filet Mignon",
      description:
        "8oz grass-fed beef with truffle mashed potatoes and red wine reduction",
      price: 42,
      image: "/images/menu/main-course/filet.avif",
    },
    {
      id: "m2",
      name: "Chilean Sea Bass",
      description:
        "Pan-seared sea bass with saffron risotto and lemon beurre blanc",
      price: 38,
      image: "/images/menu/main-course/Chilean.avif",
    },
    {
      id: "m3",
      name: "Mushroom Risotto",
      description:
        "Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan",
      price: 28,
      image: "/images/menu/main-course/Mushroom.avif",
    },
    {
      id: "m4",
      name: "Rack of Lamb",
      description: "Herb-crusted lamb with roasted vegetables and mint jus",
      price: 44,
      image: "/images/menu/main-course/Rack.webp",
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla ice cream",
      price: 14,
      image: "/images/menu/dessert/Chocolate.avif",
    },
    {
      id: "d2",
      name: "Crème Brûlée",
      description: "Classic vanilla custard with caramelized sugar",
      price: 12,
      image: "/images/menu/dessert/Crème.avif",
    },
    {
      id: "d3",
      name: "Tiramisu",
      description: "Espresso-soaked ladyfingers with mascarpone cream",
      price: 13,
      image: "/images/menu/dessert/Tiramisu.avif",
    },
    {
      id: "d4",
      name: "Berry Panna Cotta",
      description: "Vanilla bean panna cotta with mixed berry compote",
      price: 12,
      image: "/images/menu/dessert/Berry.avif",
    },
  ],
  drinks: [
    {
      id: "dr1",
      name: "Signature Martini",
      description: "Vodka, elderflower liqueur, and fresh lemon",
      price: 16,
      image: "/images/menu/drink/Signature.avif",
    },
    {
      id: "dr2",
      name: "Barrel-Aged Manhattan",
      description: "Bourbon, sweet vermouth, and bitters aged in oak",
      price: 18,
      image: "/images/menu/drink/Barrel-Aged Manhattan.webp",
    },
    {
      id: "dr3",
      name: "Red Wine Selection",
      description: "Ask about our curated wine list",
      price: 14,
      image: "/images/menu/drink/drew.avif",
    },
    {
      id: "dr4",
      name: "Artisanal Mocktail",
      description: "House-made non-alcoholic beverage with fresh ingredients",
      price: 10,
      image: "/images/menu/drink/cocacola.webp",
    },
  ],
};

export const events = [
  {
    id: 1,
    title: "Wine Tasting Evening",
    description:
      "Join our sommelier for an exclusive tasting of premium wines paired with chef-selected appetizers.",
    date: "June 15, 2023",
    time: "7:00 PM - 9:30 PM",
    location: "Savoria Wine Cellar",
    image: "/images/events/event-01.avif",
    price: "$85 per person",
  },
  {
    id: 2,
    title: "Chef's Table Experience",
    description:
      "An intimate dining experience where our executive chef prepares a special tasting menu right before your eyes.",
    date: "June 22, 2023",
    time: "6:30 PM - 9:30 PM",
    location: "Savoria Kitchen",
    image: "/images/events/event-02.avif",
    price: "$150 per person",
  },
  {
    id: 3,
    title: "Summer Cocktail Workshop",
    description:
      "Learn to craft refreshing summer cocktails with our expert mixologists in this hands-on workshop.",
    date: "July 8, 2023",
    time: "4:00 PM - 6:00 PM",
    location: "Savoria Bar",
    image: "/images/events/event-03.avif",
    price: "$65 per person",
  },
];

export const specialOffers = [
  {
    id: 1,
    title: "Weekday Lunch Special",
    description:
      "Enjoy a two-course lunch with a glass of house wine for a special price, available Monday to Friday.",
    validUntil: "Ongoing",
    price: "$35 per person",
    image: "/images/events/lunch.avif",
  },
  {
    id: 2,
    title: "Anniversary Celebration",
    description:
      "Celebrating our 5th anniversary with a special tasting menu featuring our most popular dishes from the past five years.",
    validUntil: "June 30, 2023",
    price: "$95 per person",
    image: "/images/events/anniversary.avif",
  },
  {
    id: 3,
    title: "Sunday Family Feast",
    description:
      "Bring the whole family for a special Sunday feast with shared platters and family-style dining.",
    validUntil: "Ongoing",
    price: "$45 per person, children under 12 half price",
    image: "/images/events/family-feast.avif",
  },
];

// Blog post data
export const blogPosts = [
  {
    id: 1,
    title: "The Art of Food Plating: Presentation Tips from Our Chef",
    excerpt:
      "Learn the secrets behind beautiful food presentation from our executive chef, including techniques, tools, and principles that can elevate any dish.",
    date: "May 15, 2023",
    author: "Chef Marco Rossi",
    category: "Culinary Tips",
    image: "/images/blog/food-plating.avif",
    slug: "art-of-food-plating",
  },
  {
    id: 2,
    title: "Seasonal Ingredients: Summer Edition",
    excerpt:
      "Discover the finest summer ingredients and how our chefs incorporate them into our seasonal menu to create fresh, vibrant dishes.",
    date: "June 2, 2023",
    author: "Sophie Laurent",
    category: "Seasonal",
    image: "/images/blog/summer-food.avif",
    slug: "seasonal-ingredients-summer",
  },
  {
    id: 3,
    title: "Wine Pairing Fundamentals: A Beginner's Guide",
    excerpt:
      "Our sommelier shares essential tips for pairing wine with food, helping you enhance your dining experience with perfect combinations.",
    date: "June 10, 2023",
    author: "Isabella Martínez",
    category: "Non Seasonal",
    image: "/images/blog/non-seasonal.avif",
    slug: "wine-pairing-fundamentals",
  },
  {
    id: 4,
    title: "Behind the Scenes: A Day in Our Kitchen",
    excerpt:
      "Take a peek behind the scenes and discover what goes into preparing for a busy service at Savoria, from morning prep to evening service.",
    date: "June 18, 2023",
    author: "James Chen",
    category: "Restaurant Life",
    image: "/images/blog/kitchen.avif",
    slug: "behind-the-scenes-kitchen",
  },
  {
    id: 5,
    title: "The History of Italian Cuisine: Regional Variations",
    excerpt:
      "Explore the rich history and regional diversity of Italian cuisine, from the seafood of Sicily to the risottos of Lombardy.",
    date: "June 25, 2023",
    author: "Chef Marco Rossi",
    category: "Food History",
    image: "/images/blog/italian-cuisin.avif",
    slug: "history-italian-cuisine",
  },
  {
    id: 6,
    title: "Sustainable Dining: Our Commitment to the Environment",
    excerpt:
      "Learn about Savoria's initiatives to reduce environmental impact, from sourcing local ingredients to minimizing waste.",
    date: "July 5, 2023",
    author: "Emma Thompson",
    category: "Sustainability",
    image: "/images/blog/dining.avif",
    slug: "sustainable-dining",
  },
];

// Categories for filtering
export const categories = [
  "All",
  "Culinary Tips",
  "Seasonal",
  "Non Seasonal",
  "Restaurant Life",
  "Food History",
  "Sustainability",
];

export const getOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    items: ["Classic Burger", "French Fries", "Iced Tea"],
    total: "$45.50",
    status: "Completed",
    date: "Today, 2:30 PM",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    items: ["Margherita Pizza", "Caesar Salad", "Soda"],
    total: "$32.75",
    status: "Processing",
    date: "Today, 1:15 PM",
    address: "456 Oak Ave, Somewhere, USA",
    phone: "(555) 987-6543",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    items: ["Chicken Wings", "Garlic Bread", "Beer"],
    total: "$78.25",
    status: "Pending",
    date: "Today, 12:45 PM",
    address: "789 Pine Rd, Nowhere, USA",
    phone: "(555) 456-7890",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    items: ["Caesar Salad", "Iced Tea"],
    total: "$24.99",
    status: "Completed",
    date: "Yesterday, 7:30 PM",
    address: "321 Elm St, Anytown, USA",
    phone: "(555) 234-5678",
  },
  {
    id: "ORD-005",
    customer: "Robert Wilson",
    items: ["Margherita Pizza", "Chocolate Cake", "Soda"],
    total: "$56.20",
    status: "Completed",
    date: "Yesterday, 6:15 PM",
    address: "654 Maple Dr, Somewhere, USA",
    phone: "(555) 876-5432",
  },
  {
    id: "ORD-006",
    customer: "Jennifer Lee",
    items: ["Classic Burger", "Onion Rings", "Milkshake"],
    total: "$38.75",
    status: "Cancelled",
    date: "Yesterday, 5:45 PM",
    address: "987 Cedar Ln, Nowhere, USA",
    phone: "(555) 345-6789",
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    items: ["Chicken Wings", "French Fries", "Beer"],
    total: "$42.30",
    status: "Processing",
    date: "Yesterday, 4:30 PM",
    address: "159 Birch Ave, Anytown, USA",
    phone: "(555) 567-8901",
  },
  {
    id: "ORD-008",
    customer: "Lisa Garcia",
    items: ["Caesar Salad", "Iced Tea"],
    total: "$18.50",
    status: "Pending",
    date: "2 days ago, 8:15 PM",
    address: "753 Walnut St, Somewhere, USA",
    phone: "(555) 678-9012",
  },
];

export const reservations = [
  {
    id: "RES-001",
    customer: "David Miller",
    guests: 4,
    date: "2023-05-15",
    time: "19:30",
    status: "Confirmed",
    phone: "(555) 123-4567",
    email: "david@example.com",
    notes: "Window seat preferred",
  },
  {
    id: "RES-002",
    customer: "Jennifer Lee",
    guests: 2,
    date: "2023-05-15",
    time: "20:00",
    status: "Confirmed",
    phone: "(555) 987-6543",
    email: "jennifer@example.com",
    notes: "Anniversary celebration",
  },
  {
    id: "RES-003",
    customer: "Thomas Anderson",
    guests: 6,
    date: "2023-05-16",
    time: "18:30",
    status: "Pending",
    phone: "(555) 456-7890",
    email: "thomas@example.com",
    notes: "Birthday party",
  },
  {
    id: "RES-004",
    customer: "Lisa Garcia",
    guests: 3,
    date: "2023-05-16",
    time: "19:00",
    status: "Confirmed",
    phone: "(555) 234-5678",
    email: "lisa@example.com",
    notes: "",
  },
  {
    id: "RES-005",
    customer: "James Taylor",
    guests: 2,
    date: "2023-05-16",
    time: "20:30",
    status: "Confirmed",
    phone: "(555) 876-5432",
    email: "james@example.com",
    notes: "Allergic to nuts",
  },
  {
    id: "RES-006",
    customer: "Emma Wilson",
    guests: 4,
    date: "2023-05-17",
    time: "19:00",
    status: "Cancelled",
    phone: "(555) 345-6789",
    email: "emma@example.com",
    notes: "",
  },
  {
    id: "RES-007",
    customer: "Michael Johnson",
    guests: 5,
    date: "2023-05-17",
    time: "18:00",
    status: "Pending",
    phone: "(555) 567-8901",
    email: "michael@example.com",
    notes: "High chair needed",
  },
  {
    id: "RES-008",
    customer: "Sophia Brown",
    guests: 2,
    date: "2023-05-18",
    time: "19:30",
    status: "Confirmed",
    phone: "(555) 678-9012",
    email: "sophia@example.com",
    notes: "",
  },
];

export const offers = [
  {
    id: "1",
    title: "Happy Hour Special",
    description: "50% off all drinks from 4-6 PM, Monday to Friday",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    image: "/images/dashboard/offers/happy-offer.avif",
  },
  {
    id: "2",
    title: "Family Meal Deal",
    description: "Buy 2 adult meals and get 1 kid's meal free",
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    image: "/images/dashboard/offers/family-meal.avif",
  },
  {
    id: "3",
    title: "Weekend Brunch",
    description:
      "Complimentary mimosa with any brunch entree, Saturday and Sunday 10 AM - 2 PM",
    startDate: "2023-05-01",
    endDate: "2023-08-31",
    image: "/images/dashboard/offers/weekend-brunch.avif",
  },
  {
    id: "4",
    title: "Loyalty Program",
    description: "Earn points with every purchase and redeem for free meals",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    image: "/images/dashboard/offers/loyalty-programme.avif",
  },
];