import fs from 'fs';

const DUMMY_IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1628015081036-0747ec8f077a?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687931-570a2f4cc8cc?w=800&q=80",
];

const mockProperties = [
    { title: "Oceanfront Modern Mansion", location: "Miami Beach, FL", price: "$12,500,000", beds: 6, baths: 7, area: "8,500 sqft", tag: "Villa", status: "FOR SALE", slug: "miami-beach-modern-mansion" },
    { title: "Beverly Hills Estate", location: "Beverly Hills, CA", price: "$25,000,000", beds: 8, baths: 10, area: "12,000 sqft", tag: "House", status: "FOR SALE", slug: "beverly-hills-estate" },
    { title: "Luxury Penthouse Skyline View", location: "Manhattan, NY", price: "$28,000", beds: 3, baths: 4, area: "3,200 sqft", tag: "Penthouse", status: "FOR RENT", price_suffix: "/mo", slug: "manhattan-skyline-penthouse" },
    { title: "Malibu Cliffside Retreat", location: "Malibu, CA", price: "$8,900,000", beds: 4, baths: 5, area: "4,500 sqft", tag: "House", status: "FOR SALE", slug: "malibu-cliffside-retreat" },
    { title: "Aspen Ski Chalet", location: "Aspen, CO", price: "$15,200,000", beds: 5, baths: 6, area: "6,000 sqft", tag: "Villa", status: "FOR SALE", slug: "aspen-ski-chalet" },
    { title: "Downtown ATX Condo", location: "Austin, TX", price: "$1,850,000", beds: 2, baths: 2, area: "1,800 sqft", tag: "Condo", status: "FOR SALE", slug: "downtown-austin-condo" },
    { title: "Gold Coast Historic Home", location: "Chicago, IL", price: "$4,200,000", beds: 4, baths: 4, area: "4,100 sqft", tag: "Townhouse", status: "FOR SALE", slug: "chicago-historic-home" },
    { title: "Seattle Waterfront Flat", location: "Seattle, WA", price: "$1,500,000", beds: 2, baths: 2, area: "1,500 sqft", tag: "Apartment", status: "FOR SALE", slug: "seattle-waterfront-flat" },
    { title: "Red Rocks Desert Villa", location: "Sedona, AZ", price: "$3,750,000", beds: 3, baths: 4, area: "3,800 sqft", tag: "Villa", status: "FOR SALE", slug: "sedona-red-rocks-villa" },
    { title: "Key West Tropical Getaway", location: "Key West, FL", price: "$12,000", beds: 4, baths: 3, area: "2,500 sqft", tag: "House", status: "FOR RENT", price_suffix: "/mo", slug: "key-west-getaway" },
    { title: "Honolulu Ocean Dream", location: "Honolulu, HI", price: "$5,500,000", beds: 3, baths: 3, area: "2,200 sqft", tag: "Apartment", status: "FOR SALE", slug: "honolulu-ocean-dream" },
    { title: "Santa Monica Beach House", location: "Santa Monica, CA", price: "$6,800,000", beds: 5, baths: 4, area: "3,500 sqft", tag: "House", status: "FOR SALE", slug: "santa-monica-beach-house" },
    { title: "Brooklyn Brownstone", location: "Brooklyn, NY", price: "$3,900,000", beds: 4, baths: 4, area: "3,600 sqft", tag: "Townhouse", status: "FOR SALE", slug: "brooklyn-brownstone" },
    { title: "San Francisco Victorian", location: "San Francisco, CA", price: "$4,500,000", beds: 4, baths: 3, area: "2,800 sqft", tag: "House", status: "FOR SALE", slug: "sf-victorian-home" },
    { title: "Vegas Strip Penthouse", location: "Las Vegas, NV", price: "$3,200,000", beds: 3, baths: 4, area: "3,000 sqft", tag: "Penthouse", status: "FOR SALE", slug: "vegas-strip-penthouse" },
    { title: "Denver Highlands Modern", location: "Denver, CO", price: "$2,100,000", beds: 4, baths: 4, area: "3,200 sqft", tag: "House", status: "FOR SALE", slug: "denver-modern-home" },
    { title: "Tahoe Lakefront Cabin", location: "Lake Tahoe, NV", price: "$7,500,000", beds: 5, baths: 5, area: "4,200 sqft", tag: "Villa", status: "FOR SALE", slug: "tahoe-lakefront-cabin" },
    { title: "Palm Springs Mid-Century", location: "Palm Springs, CA", price: "$2,850,000", beds: 3, baths: 3, area: "2,400 sqft", tag: "House", status: "FOR SALE", slug: "palm-springs-mid-century" },
    { title: "Charleston Palmetto Estate", location: "Charleston, SC", price: "$5,200,000", beds: 6, baths: 5, area: "5,800 sqft", tag: "House", status: "FOR SALE", slug: "charleston-estate" },
    { title: "Boston Beacon Hill Townhouse", location: "Boston, MA", price: "$4,800,000", beds: 4, baths: 4, area: "3,800 sqft", tag: "Townhouse", status: "FOR SALE", slug: "boston-beacon-hill" }
];

async function seed() {
    const propertiesToInsert = [];

    for (let i = 0; i < mockProperties.length; i++) {
        const p = mockProperties[i];
        const shuffledImages = [...DUMMY_IMAGES].sort(() => 0.5 - Math.random());

        propertiesToInsert.push(`(
      gen_random_uuid(),
      '${p.title.replace(/'/g, "''")}',
      '${p.location.replace(/'/g, "''")}',
      '${p.price}',
      ${p.beds},
      ${p.baths},
      '${p.area}',
      'standard',
      '${p.tag}',
      '${p.status}',
      ${p.price_suffix ? `'${p.price_suffix}'` : 'NULL'},
      '${p.slug}',
      false,
      ARRAY['${shuffledImages[0]}', '${shuffledImages[1]}', '${shuffledImages[2]}']
    )`);
    }

    const sql = `
INSERT INTO properties (id, title, location, price, beds, baths, area, type, tag, status, price_suffix, slug, is_featured, images) 
VALUES 
${propertiesToInsert.join(',\n')};
`;

    fs.writeFileSync('seed.sql', sql);
    console.log('Saved to seed.sql');
}

seed().catch(console.error);
