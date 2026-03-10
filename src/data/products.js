/**
 * Product data aligned with current live offerings.
 * Live site: https://splendid-starburst-0f0af1.netlify.app (3 items)
 * Sync names, prices, and descriptions from eBay (@ryloc_parts) or Instagram (rylocparts) when ready.
 */
export const products = [
  {
    id: 1,
    name: "Classic Tachometer Assembly",
    price: 450.00,
    category: "Full Assembly",
    image: "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg",
    description: "Luxury-grade refurbished tachometer assembly for classic Mercedes-Benz. Precision, finish, and fitment to OEM+ standard—built for enthusiasts who care about tolerances and materials. Core exchange program available.",
    fits: ["W123", "W124", "W126", "R107"],
    features: [
      "Calibrated to factory specs",
      "New capacitors and resistors",
      "Cleaned and polished face",
      "1-Year Warranty"
    ],
    installGuide: "https://youtube.com/watch?v=placeholder"
  },
  {
    id: 2,
    name: "Instrument Cluster PCB Board",
    price: 125.00,
    category: "Individual Boards",
    image: "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg",
    description: "Replacement PCB for instrument clusters. OEM+ fit with upgraded materials—thicker copper, modern substrate. Designed around real vehicles and measured mounting points. Clear install guidance included.",
    fits: ["W123", "W126"],
    features: [
      "Thicker copper traces for durability",
      "Modern FR4 material",
      "Direct fit replacement",
      "Includes installation hardware"
    ],
    installGuide: "https://youtube.com/watch?v=placeholder"
  },
  {
    id: 3,
    name: "Ryloc Parts Merchandise",
    price: 25.00,
    category: "Merchandise",
    image: "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg",
    description: "Minimal branding, refined textures. Show your support for classic Mercedes preservation with Ryloc Parts apparel and accessories.",
    fits: ["Unisex"],
    features: [
      "Premium materials",
      "Limited runs, consistent QC",
      "Built for enthusiasts"
    ],
    installGuide: null
  }
];
