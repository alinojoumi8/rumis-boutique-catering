export type PackageId = "high-tea" | "cocktail-party";

export type MenuPackage = {
  id: PackageId;
  name: string;
  shortDescription: string;
  savouries: string[];
  sweets: string[];
};

export type Tea = {
  id: string;
  name: string;
  note?: string;
  description?: string;
};

// Owner-editable catering data. Keep names and prices here so future menu updates
// do not require changing layout or form code.
export const site = {
  name: "Rumi's Boutique Catering",
  shortName: "Rumi's Catering",
  tagline: "Specializing in High Tea and Cocktail Parties",
  phone: "647-995-8384",
  phoneHref: "tel:+16479958384",
  email: "info@rumiscatering.ca",
  emailHref: "mailto:info@rumiscatering.ca",
  instagram: "https://instagram.com/rumiscatering",
  facebook: "https://facebook.com/rumiscatering",
  areaServed: "Toronto"
} as const;

export const missionCopy =
  "At Rumi's Catering, our mission is to provide exceptional catering services that exceed our clients' expectations. We use fresh, high-quality ingredients and provide exceptional service so every event we cater is a success. Our team has years of experience, specializing in high tea and elegant cocktail parties.";

export const pricing = {
  perPerson: 150,
  minimumGuests: 20,
  servingStaffHourly: 40,
  servingStaffMinimumHours: 4,
  bartenderHourly: 100,
  bartenderMinimumHours: 4
} as const;

export const packages: MenuPackage[] = [
  {
    id: "high-tea",
    name: "High Tea",
    shortDescription:
      "Vintage china, tiered platters, fresh pastries, refined savouries, and three sommelier-paired teas.",
    savouries: [
      "Mini Quiche",
      "Mini Olivier Sandwich",
      "Mini Roasted Turkey with Cranberry Orange Sauce",
      "Beef Vol au Vent",
      "Dill Egg Salad in Tart",
      "Cucumber and Cream Cheese Canapés",
      "Eggplant Canapés",
      "Melted Brie & Fig on Corn Bread"
    ],
    sweets: [
      "Buttermilk Scones",
      "Clotted Cream & Strawberry Jam",
      "Assortment of Mini French Pastries",
      "Mini Red Velvet Cupcake",
      "Mini Chocolate Mousse Cup",
      "Napoleon (French puff pastry with fresh cream)"
    ]
  },
  {
    id: "cocktail-party",
    name: "Cocktail Party",
    shortDescription:
      "A polished roaming menu of savoury bites, elegant sweets, and a tea and coffee station.",
    savouries: [
      "Beef Sliders",
      "Mini Beef Taco",
      "Mini Chicken Kabob Skewers",
      "Tortellini Salad Cups with Grilled Jumbo Shrimp",
      "Avocado Salmon Salad Bite",
      "Mini Veggie Pizza Bites",
      "Mango Salad Cup"
    ],
    sweets: [
      "Assortment of Mini French Pastries",
      "Strawberry Cream Cannoli",
      "Puff Pastry Dipped in Chocolate & Pistachio",
      "Tea & Coffee Station"
    ]
  }
];

export const teas: Tea[] = [
  {
    id: "darjeeling",
    name: "Darjeeling",
    note: "Champagne of Teas",
    description: "black tea, Margaret's Hope Estate, India"
  },
  {
    id: "special-blend",
    name: "Rumi's Special Blend",
    description: "black tea, rose, cardamom, high-grown from Lahijan, Iran"
  },
  {
    id: "tie-guan-yin",
    name: "Tie Guan Yin",
    note: "Iron Goddess",
    description: "oolong, Alishan Mountains, Taiwan"
  },
  {
    id: "long-jing",
    name: "Long Jing",
    note: "Dragon Well",
    description: "green tea, Longjing Village, China"
  },
  {
    id: "moroccan-mint",
    name: "Moroccan Mint"
  },
  {
    id: "cinnamon",
    name: "Cinnamon"
  }
];

export const otherServices = [
  "Deliveries",
  "High Tea Gift Box",
  "Cocktail Food Gift Box",
  "A La Carte menu"
];

export const includedItems = [
  "vintage china",
  "tea cups",
  "pots",
  "tiers",
  "platters",
  "table decor",
  "flower arrangements",
  "linen",
  "napkins",
  "setup and cleanup"
];

export const galleryCaptions = [
  "Cocktail Party Set-Up",
  "Berries Cup",
  "Beef Slider",
  "Mini Grilled Pesto Sandwiches",
  "Greek Salad Cups",
  "Strawberries, Grapes & Smoked Cheese",
  "Mini Quiche",
  "Buttermilk Scone with Clotted Cream & Strawberry Jam",
  "Tortellini Salad Cup",
  "Olivier (French Chicken Salad) Sandwich",
  "Chicken Taco",
  "Rainbow Coleslaw",
  "Cauliflower Steak & Potato Skewer",
  "Potato Salad Cup",
  "Eggplant Canapé",
  "Dill Egg Salad Tart",
  "Mini Beef Taco",
  "Roasted Mini Turkey Sandwich",
  "Melted Brie and Fig on Corn Bread",
  "Assorted Mini Fresh Pastries",
  "Grilled Shrimp Canapé",
  "Mini Chocolate Mousse Cup",
  "Napoleon",
  "Cucumber and Cream Cheese",
  "Mini Red Velvet Cupcake",
  "Cocktail Gift Box"
];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];
