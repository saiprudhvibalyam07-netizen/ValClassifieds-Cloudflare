import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface SellingArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface SellingArticle {
  id: string
  version: number
  title: string
  intent: 'SELLING_HELP'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: SellingArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: SellingArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const articles: SellingArticle[] = [
  // ───────────────────────── GENERAL (no category) ─────────────────────────
  {
    id: 'SEL-GEN-001',
    version: VERSION,
    title: 'Selling on ValClassifieds',
    intent: 'SELLING_HELP',
    category: 'general',
    triggers: ['sell', 'selling', 'how to sell', 'post', 'list', 'sell my item'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling on ValClassifieds', level: 2 },
      { type: 'text', content: 'ValClassifieds helps you reach local buyers quickly and safely. Our step-by-step guide covers everything from photos to pricing.\n\nHere is what we help with:\n\n• Photo tips to make your listing stand out\n• Writing a clear title and description\n• Pricing your item at the right value\n• Posting in the correct category for visibility' },
    ],
    actions: [
      { label: 'Step-by-Step Guide', value: 'listing guide' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SELLING VEHICLES (18) ─────────────────────────
  {
    id: 'SEL-VEH-001',
    version: VERSION,
    title: 'Selling a Car',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['car', 'cars', 'sell a car', 'vehicle', 'automobile'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling a Car on ValClassifieds', level: 2 },
      { type: 'text', content: 'Cars attract serious buyers on ValClassifieds. A complete, honest listing sells faster.\n\nBefore you post:\n\n• Click clear photos: exterior, interior, engine, and tyres\n• Keep the RC, insurance, and service record ready\n• Set a realistic price from similar listings\n• Mention kilometre reading and ownership count\n• Choose "Vehicles" so buyers can find you easily' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-002',
    version: VERSION,
    title: 'Selling a Used Car',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['used car', 'second hand car', 'pre owned car'],
    response: [
      { type: 'text', content: 'Used cars sell best when condition is shown honestly. On ValClassifieds, note any repairs or wear in the description.\n\nTips:\n\n• Photograph dents or scratches openly\n• Share the service history and RC status\n• State the exact kilometre reading\n• Be ready for a buyer’s inspection and test drive' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-003',
    version: VERSION,
    title: 'Selling a New Car',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['new car', 'brand new car', 'showroom car'],
    response: [
      { type: 'text', content: 'If you are reselling an unused or demo car, highlight the warranty and low kilometre reading.\n\nInclude:\n\n• Invoice and active insurance\n• Manufacturing month from the VIN\n• Remaining factory warranty\n• Any free-service balance' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-004',
    version: VERSION,
    title: 'Selling a Bike or Scooter',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['bike', 'bikes', 'scooter', 'motorcycle', 'motorbike'],
    response: [
      { type: 'text', content: 'Two-wheelers move fast on ValClassifieds. Make yours easy to trust.\n\nChecklist:\n\n• Photos of both sides and the odometer\n• RC and valid insurance details\n• Note any modifications honestly\n• Mention battery and tyre condition' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-005',
    version: VERSION,
    title: 'Selling a Bicycle',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['bicycle', 'cycle', 'bike cycle'],
    response: [
      { type: 'text', content: 'Bicycles are simple to list. On ValClassifieds, mention the frame size and condition clearly.\n\nInclude:\n\n• Photos of the frame and gears\n• Any rust or paint damage\n• Original bill for premium models\n• Accessories included' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-006',
    version: VERSION,
    title: 'Selling an Electric Vehicle',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['ev', 'electric car', 'electric vehicle', 'electric scooter'],
    response: [
      { type: 'text', content: 'EV buyers care about battery health. ValClassifieds listings should state it clearly.\n\nMention:\n\n• Battery warranty and health percentage\n• Real versus claimed range\n• Charging type and home setup\n• Any subsidy or road-tax benefit' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-007',
    version: VERSION,
    title: 'Selling a Commercial Vehicle',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['commercial vehicle', 'truck', 'tempo', 'van'],
    response: [
      { type: 'text', content: 'For tempos, trucks, and vans, business buyers want documents first. On ValClassifieds, list them up front.\n\nInclude:\n\n• Fitness certificate and permit\n• Load capacity and body condition\n• Tax and insurance status\n• Clear photos of the cabin and load bed' },
    ],
    actions: [
      { label: 'Documents Check', value: 'rc transfer' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-008',
    version: VERSION,
    title: 'Vehicle Listing Photos',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['photo', 'photos', 'picture', 'image'],
    response: [
      { type: 'text', content: 'Good photos build buyer trust for vehicles. On ValClassifieds, show the real condition.\n\nPhoto checklist:\n\n• Front, rear, both sides, and interior\n• Engine bay and odometer\n• Any scratches or repairs, honestly\n• Park in daylight with a plain background' },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-009',
    version: VERSION,
    title: 'Writing a Vehicle Description',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['description', 'describe', 'title', 'listing description'],
    response: [
      { type: 'text', content: 'A clear title and description help buyers shortlist. On ValClassifieds, follow this format.\n\nTemplate:\n\n• Title: Brand + Model + Year + Fuel\n• Condition, kilometre reading, and ownership\n• What is included (spare key, accessories)\n• Reason for selling, stated briefly' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-010',
    version: VERSION,
    title: 'Pricing Your Vehicle',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['price', 'pricing', 'how much', 'value'],
    response: [
      { type: 'text', content: 'Price your vehicle from live market data. On ValClassifieds, check similar cars in your city.\n\nGuidance:\n\n• New or unused: 80–100% of original price\n• Gently used: 60–80%\n• Well-used: 40–60%\n• Leave small room for negotiation' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Check Prices', value: 'search' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-011',
    version: VERSION,
    title: 'Vehicle Documents and RC',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['rc', 'registration', 'documents', 'papers'],
    response: [
      { type: 'text', content: 'Keep documents ready so the sale closes smoothly. ValClassifieds recommends confirming before handover.\n\nYou need:\n\n• Original RC and valid insurance\n• Pollution certificate\n• Loan closure letter if financed\n• Both parties’ ID for the transfer' },
    ],
    actions: [
      { label: 'Documents Check', value: 'rc transfer' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-012',
    version: VERSION,
    title: 'Buyer Test Drive',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['test drive', 'test ride', 'buyer visit'],
    response: [
      { type: 'text', content: 'A test drive is normal. On ValClassifieds, arrange it safely in a public place.\n\nTips:\n\n• Meet in daylight at a busy location\n• Carry the RC and insurance\n• Accompany the buyer on the drive\n• Verify the buyer’s ID first' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-013',
    version: VERSION,
    title: 'Negotiating the Sale',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['negotiat', 'bargain', 'offer'],
    response: [
      { type: 'text', content: 'Negotiation is expected on ValClassifieds. Stay firm but fair.\n\nSuggestions:\n\n• Know your lowest acceptable price\n• Highlight recent service or new tyres\n• Keep all talk on the platform\n• Close only after the RC transfer starts' },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-014',
    version: VERSION,
    title: 'Avoiding Seller Scams',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['scam', 'fraud', 'fake buyer'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Stay Safe as a Seller', message: 'Scammers may send fake payment proofs. ValClassifieds never asks you to pay to release money.', tips: [
        'Do not release the vehicle before cleared payment',
        'Avoid buyers who refuse to meet',
        'Ignore requests to pay a "refund fee"',
        'Report suspicious buyers to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-015',
    version: VERSION,
    title: 'Selling a Luxury Car',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['luxury car', 'premium car'],
    response: [
      { type: 'text', content: 'Luxury cars need premium presentation. On ValClassifieds, show service and authenticity.\n\nInclude:\n\n• Full brand-service history\n• Original keys, manuals, and spares\n• Professional photos\n• Honest note on any repairs' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-016',
    version: VERSION,
    title: 'Selling a Budget Car',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['budget car', 'cheap car'],
    response: [
      { type: 'text', content: 'Budget cars sell on price and honesty. On ValClassifieds, highlight what works well.\n\nTips:\n\n• Be clear about known issues\n• Keep the price realistic\n• Share recent repairs with bills\n• Respond quickly to buyers' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-017',
    version: VERSION,
    title: 'Selling an SUV',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['suv', 'sports utility'],
    response: [
      { type: 'text', content: 'SUVs are in demand on ValClassifieds. Show practicality and condition.\n\nMention:\n\n• Seating and boot space\n• 4x4 or 2WD and mileage\n• Service record and tyres\n• Any modifications' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-VEH-018',
    version: VERSION,
    title: 'Safe Vehicle Meet-ups',
    intent: 'SELLING_HELP',
    category: 'vehicles',
    triggers: ['meet', 'safe', 'pickup', 'delivery'],
    response: [
      { type: 'safety_banner', variant: 'general_safety', title: 'Safe Meet-ups', message: 'Complete the RC transfer and payment before handing over keys.', tips: [
        'Meet in a public place in daylight',
        'Verify the buyer’s ID',
        'Keep communication on ValClassifieds',
        'Never share OTP or bank details',
      ] },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SELLING PROPERTY (12) ─────────────────────────
  {
    id: 'SEL-PRO-001',
    version: VERSION,
    title: 'Selling Property',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['property', 'real estate', 'sell property', 'house'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling Property on ValClassifieds', level: 2 },
      { type: 'text', content: 'Property is a high-value listing, so documentation matters most. ValClassifieds connects you with genuine buyers.\n\nBefore you post:\n\n• Keep the title and approved plan ready\n• Click clear photos of every room\n• Set a price from recent local sales\n• Choose the right sub-category for reach' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-002',
    version: VERSION,
    title: 'Selling a House',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['house', 'independent house', 'home'],
    response: [
      { type: 'text', content: 'An independent house listing should show layout and land. On ValClassifieds, add a floor plan if you have one.\n\nInclude:\n\n• Built area and plot size\n• Approvals and amenities\n• Honest note on age and repairs\n• Clear, bright photos' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-003',
    version: VERSION,
    title: 'Selling an Apartment or Flat',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['apartment', 'flat'],
    response: [
      { type: 'text', content: 'For flats, buyers check society and charges. ValClassifieds listings should state them.\n\nMention:\n\n• Car parking and floor\n• Maintenance and society dues\n• Approved plan and OC\n• Age of the building' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-004',
    version: VERSION,
    title: 'Selling Land or Plot',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['land', 'plot', 'site', 'vacant land'],
    response: [
      { type: 'text', content: 'Plots need the strictest document clarity. On ValClassifieds, upload the relevant proofs.\n\nInclude:\n\n• Title deed and encumbrance certificate\n• Approved layout and conversion order\n• Dimensions and boundaries\n• Cleared tax and dues' },
    ],
    actions: [
      { label: 'Documents Check', value: 'property documents' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-005',
    version: VERSION,
    title: 'Selling a Villa or Bungalow',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['villa', 'bungalow'],
    response: [
      { type: 'text', content: 'Villas sell on lifestyle and space. On ValClassifieds, show both.\n\nMention:\n\n• Built-up and plot area\n• Gardens, parking, and amenities\n• Approval and society charges\n• Recent renovations honestly' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-006',
    version: VERSION,
    title: 'Selling Commercial Property',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['office space', 'shop', 'commercial property'],
    response: [
      { type: 'text', content: 'For offices, shops, and showrooms, business buyers check zoning. ValClassifieds listings should state use.\n\nInclude:\n\n• Permitted business use\n• Maintenance and common charges\n• Lease or sale terms\n• Fire and safety NOC if needed' },
    ],
    actions: [
      { label: 'Documents Check', value: 'property documents' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-007',
    version: VERSION,
    title: 'Renting Out Property',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['rent', 'rental', 'lease', 'tenant'],
    response: [
      { type: 'text', content: 'If you are renting rather than selling, ValClassifieds helps you find tenants.\n\nList:\n\n• Rent, deposit, and notice period\n• Furnished or unfurnished status\n• Society and maintenance details\n• Preferred tenant type' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-008',
    version: VERSION,
    title: 'Property Documents and Title',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['documents', 'title', 'agreement'],
    response: [
      { type: 'text', content: 'Have your papers ready before listing. On ValClassifieds, a verified title builds buyer trust.\n\nKeep:\n\n• Sale deed and previous chain of titles\n• Encumbrance certificate\n• Approved plan and OC\n• Tax and utility bills cleared' },
    ],
    actions: [
      { label: 'Documents Check', value: 'property documents' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-009',
    version: VERSION,
    title: 'Property Listing Photos',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['photo', 'photos', 'staging'],
    response: [
      { type: 'text', content: 'Photos decide first impressions for property. On ValClassifieds, show rooms with light.\n\nTips:\n\n• Shoot in daylight with lights on\n• Declutter each room\n• Capture the kitchen, bath, and balcony\n• Add a locality or view shot' },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-010',
    version: VERSION,
    title: 'Pricing Your Property',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['price', 'pricing', 'how much', 'value'],
    response: [
      { type: 'text', content: 'Price property from recent local sales. On ValClassifieds, compare similar listings in your area.\n\nGuidance:\n\n• Note per-square-foot rates nearby\n• Factor in floor, facing, and age\n• Keep a small buffer for negotiation\n• Be realistic on resale demand' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Check Prices', value: 'search' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-011',
    version: VERSION,
    title: 'Avoiding Property Fraud',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['scam', 'fraud', 'fake buyer'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Avoid Property Fraud', message: 'Never pay a fee to "unlock" a buyer. ValClassifieds keeps communication on the platform.', tips: [
        'Verify buyer identity before visits',
        'Use a registered sale agreement',
        'Avoid advance-fee tricks',
        'Report suspicious buyers to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Documents Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PRO-012',
    version: VERSION,
    title: 'Writing a Property Description',
    intent: 'SELLING_HELP',
    category: 'property',
    triggers: ['description', 'describe', 'title'],
    response: [
      { type: 'text', content: 'A good property description answers buyer questions early. On ValClassifieds, structure it clearly.\n\nTemplate:\n\n• Title: Type + Location + Size\n• Key features: bedrooms, parking, amenities\n• Neighbourhood and connectivity\n• Possession and any conditions' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  // ───────────────────────── SELLING ELECTRONICS (12) ─────────────────────────
  {
    id: 'SEL-ELE-001',
    version: VERSION,
    title: 'Selling Electronics',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['electronics', 'gadget', 'sell electronics'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling Electronics on ValClassifieds', level: 2 },
      { type: 'text', content: 'Electronics sell well when buyers trust the condition. ValClassifieds listings should be transparent.\n\nBefore you post:\n\n• Note IMEI or serial and unlock status\n• Keep the bill and warranty\n• Click photos showing any wear\n• Set a price from similar listings' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-002',
    version: VERSION,
    title: 'Selling a Phone',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['phone', 'mobile', 'smartphone', 'iphone', 'samsung'],
    response: [
      { type: 'text', content: 'Phones move fast on ValClassifieds. Remove your accounts before listing.\n\nSteps:\n\n• Sign out of cloud and remove lock\n• Note IMEI and battery health\n• Share the original bill\n• Photograph the screen and body' },
    ],
    actions: [
      { label: 'IMEI Check', value: 'imei' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-003',
    version: VERSION,
    title: 'Selling a Laptop',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['laptop', 'computer', 'macbook'],
    response: [
      { type: 'text', content: 'Laptops need clarity on specs and health. On ValClassifieds, state them plainly.\n\nMention:\n\n• Processor, RAM, and storage\n• Battery condition and charger\n• No MDM or account lock\n• Bill and remaining warranty' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-004',
    version: VERSION,
    title: 'Selling a TV or Monitor',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['tv', 'television', 'monitor'],
    response: [
      { type: 'text', content: 'For TVs and monitors, show the screen works. On ValClassifieds, note size and condition.\n\nInclude:\n\n• Screen size and resolution\n• No dead pixels or lines\n• Original remote and stand\n• Bill if under warranty' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-005',
    version: VERSION,
    title: 'Selling a Camera',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['camera', 'dslr', 'gopro'],
    response: [
      { type: 'text', content: 'Cameras sell on condition and shutter count. On ValClassifieds, share sample images.\n\nMention:\n\n• Sensor and lens condition\n• Shutter count if known\n• Included batteries and cards\n• Box and warranty' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-006',
    version: VERSION,
    title: 'Selling Audio Gear',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['headphones', 'earbuds', 'speaker', 'audio'],
    response: [
      { type: 'text', content: 'Headphones and speakers should be tested before sale. On ValClassifieds, note pairing status.\n\nInclude:\n\n• Working condition of both buds\n• No account or pairing lock\n• Original case and cable\n• Any wear honestly' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-007',
    version: VERSION,
    title: 'Selling a Gaming Console',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['console', 'playstation', 'xbox', 'ps5'],
    response: [
      { type: 'text', content: 'Consoles sell best with accounts cleared. On ValClassifieds, confirm status.\n\nSteps:\n\n• Factory-reset and remove accounts\n• Note disc drive condition\n• Include controllers and cables\n• Share bill and warranty' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-008',
    version: VERSION,
    title: 'IMEI, Serial, and Unlock',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['imei', 'serial', 'unlock', 'activation lock'],
    response: [
      { type: 'text', content: 'Buyers verify identity before purchase. On ValClassifieds, clear locks beforehand.\n\nChecklist:\n\n• Note IMEI or serial in the listing\n• Remove cloud and screen locks\n• Confirm the device is not reported lost\n• Keep the original box' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-009',
    version: VERSION,
    title: 'Electronics Photos and Condition',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['photo', 'photos', 'condition'],
    response: [
      { type: 'text', content: 'Show real condition with honest photos. On ValClassifieds, scratches and dents should be visible.\n\nTips:\n\n• Photo the device powered on\n• Show ports and accessories\n• Note any defects in text\n• Use plain background and daylight' },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-010',
    version: VERSION,
    title: 'Pricing Electronics',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['price', 'pricing', 'how much', 'value'],
    response: [
      { type: 'text', content: 'Price electronics from live listings. On ValClassifieds, check the same model and condition.\n\nGuidance:\n\n• New or sealed: 80–100% of price\n• Like new: 60–80%\n• Good used: 40–60%\n• Heavy wear: 20–40%' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Check Prices', value: 'search' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-011',
    version: VERSION,
    title: 'Warranty and Bill',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['warranty', 'invoice', 'bill', 'receipt'],
    response: [
      { type: 'text', content: 'A valid bill and warranty raise buyer confidence. On ValClassifieds, mention transferability.\n\nTips:\n\n• Upload the GST or retail invoice\n• State remaining warranty\n• Confirm the device is not claimed\n• Keep a copy for yourself' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'IMEI Check', value: 'imei' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-ELE-012',
    version: VERSION,
    title: 'Avoiding Counterfeit Claims',
    intent: 'SELLING_HELP',
    category: 'electronics',
    triggers: ['counterfeit', 'fake', 'replica'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Sell Genuine Items', message: 'Only list original products. ValClassifieds removes counterfeit posts.', tips: [
        'Keep the original box and bill',
        'Be ready to show serial or IMEI',
        'Describe condition honestly',
        'Report counterfeit buyers to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SELLING FURNITURE & HOME (8) ─────────────────────────
  {
    id: 'SEL-FUR-001',
    version: VERSION,
    title: 'Selling Furniture',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['furniture', 'home', 'sell furniture'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling Furniture on ValClassifieds', level: 2 },
      { type: 'text', content: 'Furniture needs honest condition notes and good photos. ValClassifieds buyers plan transport in advance.\n\nBefore you post:\n\n• Measure the piece and note dimensions\n• Click photos from all sides\n• Mention any stains or repairs\n• Confirm if it disassembles for moving' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-002',
    version: VERSION,
    title: 'Selling a Sofa',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['sofa', 'couch'],
    response: [
      { type: 'text', content: 'Sofas sell on comfort and cleanliness. On ValClassifieds, show the real fabric.\n\nMention:\n\n• Dimensions and seat count\n• No stains, odour, or pests\n• Removable covers if any\n• Whether it splits for moving' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-003',
    version: VERSION,
    title: 'Selling a Bed or Mattress',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['bed', 'mattress'],
    response: [
      { type: 'text', content: 'Beds and mattresses need hygiene clarity. On ValClassifieds, prefer clean, gently used items.\n\nInclude:\n\n• Size and mattress type\n• No sagging or stains\n• Frame condition and slats\n• Storage options if any' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-004',
    version: VERSION,
    title: 'Selling Tables, Chairs, Desks',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['table', 'chair', 'desk'],
    response: [
      { type: 'text', content: 'Work and dining furniture should be stable. On ValClassifieds, note material and finish.\n\nMention:\n\n• Dimensions and material\n• No wobble or broken joints\n• Surface chips or water marks\n• Weight for transport' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-005',
    version: VERSION,
    title: 'Selling Wardrobes, Cabinets, Shelves',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['wardrobe', 'cabinet', 'shelf'],
    response: [
      { type: 'text', content: 'Storage furniture should be complete. On ValClassifieds, list all fittings.\n\nInclude:\n\n• Dimensions and material\n• Working doors, locks, drawers\n• No rust on metal units\n• Whether it needs wall anchoring' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-006',
    version: VERSION,
    title: 'Selling Home Decor',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['decor', 'curtain', 'carpet'],
    response: [
      { type: 'text', content: 'Decor items sell on look and size. On ValClassifieds, give exact dimensions.\n\nMention:\n\n• Material and condition\n• Size against your wall or floor\n• Any damage in photos\n• Care instructions if relevant' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-007',
    version: VERSION,
    title: 'Furniture Photos and Condition',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['photo', 'photos', 'condition'],
    response: [
      { type: 'text', content: 'Honest photos speed up furniture sales. On ValClassifieds, show wear clearly.\n\nTips:\n\n• Photo from multiple angles\n• Show defects in close-up\n• Use daylight and a plain wall\n• Note if pest-free and clean' },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FUR-008',
    version: VERSION,
    title: 'Delivery and Pickup',
    intent: 'SELLING_HELP',
    category: 'furniture-home',
    triggers: ['delivery', 'pickup', 'moving', 'assembly'],
    response: [
      { type: 'text', content: 'Furniture is bulky, so agree on movement up front. On ValClassifieds, state your terms.\n\nBest practice:\n\n• Mention if you help with loading\n• Confirm disassembled vs assembled\n• Agree labour charges in writing\n• Inspect on pickup before payment' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  // ───────────────────────── SELLING FASHION & LIFESTYLE (6) ─────────────────────────
  {
    id: 'SEL-FAS-001',
    version: VERSION,
    title: 'Selling Fashion and Lifestyle',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['fashion', 'clothing', 'sell clothes', 'apparel'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling Fashion on ValClassifieds', level: 2 },
      { type: 'text', content: 'Clothes and accessories sell on honest photos and sizing. ValClassifieds buyers want the real item.\n\nBefore you post:\n\n• Share actual photos, not catalogue images\n• State size and fabric\n• Note stains, tears, or odour\n• Mention brand if original' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FAS-002',
    version: VERSION,
    title: 'Selling Shoes',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['shoes', 'sneakers', 'boots'],
    response: [
      { type: 'text', content: 'Shoes should show true wear. On ValClassifieds, photograph the soles too.\n\nMention:\n\n• Size and brand\n• No sole separation or heel damage\n• Inner lining and insoles clean\n• Original box if kept' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FAS-003',
    version: VERSION,
    title: 'Selling a Watch',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['watch', 'smartwatch'],
    response: [
      { type: 'text', content: 'Watches need authenticity proof. On ValClassifieds, show serial and bill.\n\nInclude:\n\n• Serial and model number\n• Original strap and buckle\n• Function of crown and buttons\n• Bill for premium brands' },
    ],
    actions: [
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FAS-004',
    version: VERSION,
    title: 'Selling Bags and Accessories',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['bag', 'backpack', 'handbag'],
    response: [
      { type: 'text', content: 'Bags sell on material and hardware. On ValClassifieds, show zippers and lining.\n\nMention:\n\n• Brand and size\n• No peeling or colour transfer\n• Working zippers and clasps\n• Actual photos from the seller' },
    ],
    actions: [
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FAS-005',
    version: VERSION,
    title: 'Selling Jewelry',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['jewelry', 'jewellery', 'gold'],
    response: [
      { type: 'text', content: 'Jewelry needs certification. On ValClassifieds, state purity and assay.\n\nInclude:\n\n• Hallmark for gold and silver\n• Bill and certificate\n• Clasp and stone security\n• Resale or buyback terms' },
    ],
    actions: [
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-FAS-006',
    version: VERSION,
    title: 'Authenticity and Photos',
    intent: 'SELLING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['authentic', 'brand', 'photo', 'photos'],
    response: [
      { type: 'text', content: 'Branded fashion sells only with proof. On ValClassifieds, show the details buyers check.\n\nTips:\n\n• Photo the logo, stitching, and serial\n• Keep the original bill\n• Compare with the brand’s product\n• Be honest about condition' },
    ],
    actions: [
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SELLING PETS (4) ─────────────────────────
  {
    id: 'SEL-PET-001',
    version: VERSION,
    title: 'Selling or Rehoming Pets',
    intent: 'SELLING_HELP',
    category: 'pets',
    triggers: ['pet', 'dog', 'cat', 'sell pet', 'puppy'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Selling or Rehoming Pets on ValClassifieds', level: 2 },
      { type: 'text', content: 'Pet rehoming should put the animal’s welfare first. ValClassifieds encourages responsible listings.\n\nBefore you post:\n\n• Share vaccination and health records\n• Add clear photos of the pet\n• State breed, age, and temperament\n• Screen the new owner carefully' },
    ],
    actions: [
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PET-002',
    version: VERSION,
    title: 'Selling a Dog',
    intent: 'SELLING_HELP',
    category: 'pets',
    triggers: ['dog', 'puppy'],
    response: [
      { type: 'text', content: 'Dogs need a careful handover. On ValClassifieds, meet the buyer with the pet.\n\nMention:\n\n• Vaccination and deworming record\n• Breed and age honestly\n• Friendly behaviour and diet\n• Your contact for follow-up' },
    ],
    actions: [
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PET-003',
    version: VERSION,
    title: 'Selling a Cat',
    intent: 'SELLING_HELP',
    category: 'pets',
    triggers: ['cat', 'kitten'],
    response: [
      { type: 'text', content: 'Cats sell on temperament and health. On ValClassifieds, show the real pet.\n\nInclude:\n\n• Vaccination and litter training\n• Clear eyes, coat, and no fleas\n• Known medical history\n• Age and breed' },
    ],
    actions: [
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-PET-004',
    version: VERSION,
    title: 'Selling Pet Supplies',
    intent: 'SELLING_HELP',
    category: 'pets',
    triggers: ['pet food', 'pet supplies', 'pet accessories'],
    response: [
      { type: 'text', content: 'Pet supplies move quickly when sealed. On ValClassifieds, note expiry and condition.\n\nMention:\n\n• Food expiry and seal\n• Cage or tank condition\n• Brand and size\n• Prefer unopened packs' },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── POSTING JOBS (4) ─────────────────────────
  {
    id: 'SEL-JOB-001',
    version: VERSION,
    title: 'Posting a Job',
    intent: 'SELLING_HELP',
    category: 'jobs',
    triggers: ['job', 'jobs', 'post job', 'career', 'vacancy'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Posting a Job on ValClassifieds', level: 2 },
      { type: 'text', content: 'ValClassifieds helps you reach local candidates. A clear post attracts better applicants.\n\nBefore you post:\n\n• Write the role, location, and salary range\n• State full-time, part-time, or freelance\n• Mention required skills\n• Choose the right job sub-category' },
    ],
    actions: [
      { label: 'Job Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-JOB-002',
    version: VERSION,
    title: 'Full-time and Part-time Roles',
    intent: 'SELLING_HELP',
    category: 'jobs',
    triggers: ['full time', 'part time', 'internship'],
    response: [
      { type: 'text', content: 'State the terms clearly so candidates self-select. On ValClassifieds, add the essentials.\n\nInclude:\n\n• Working hours and shift\n• Salary or stipend\n• Contract length and notice\n• Office or work-from-home' },
    ],
    actions: [
      { label: 'Job Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-JOB-003',
    version: VERSION,
    title: 'Freelance and Contract Work',
    intent: 'SELLING_HELP',
    category: 'jobs',
    triggers: ['freelance', 'contract'],
    response: [
      { type: 'text', content: 'Freelance posts should set scope and rate. On ValClassifieds, be specific.\n\nMention:\n\n• Project or hourly basis\n• Deliverables and timeline\n• Required skills\n• Budget range if fixed' },
    ],
    actions: [
      { label: 'Job Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-JOB-004',
    version: VERSION,
    title: 'Writing a Good Job Post',
    intent: 'SELLING_HELP',
    category: 'jobs',
    triggers: ['job description', 'write job', 'job post'],
    response: [
      { type: 'text', content: 'A strong job post saves screening time. On ValClassifieds, follow this structure.\n\nTemplate:\n\n• Title: Role + Seniority + Location\n• Key responsibilities in brief\n• Must-have skills\n• Salary range and how to apply' },
    ],
    actions: [
      { label: 'Job Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── OFFERING SERVICES (3) ─────────────────────────
  {
    id: 'SEL-SER-001',
    version: VERSION,
    title: 'Offering a Service',
    intent: 'SELLING_HELP',
    category: 'services',
    triggers: ['service', 'services', 'plumber', 'electrician', 'offer service'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Offering a Service on ValClassifieds', level: 2 },
      { type: 'text', content: 'ValClassifieds helps local providers find customers. A clear post builds trust.\n\nBefore you post:\n\n• Describe the service and area covered\n• Mention pricing mode (hourly or fixed)\n• Add proof of past work if possible\n• Choose the right service sub-category' },
    ],
    actions: [
      { label: 'Service Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-SER-002',
    version: VERSION,
    title: 'Home Services',
    intent: 'SELLING_HELP',
    category: 'services',
    triggers: ['plumber', 'electrician', 'cleaning', 'repair'],
    response: [
      { type: 'text', content: 'Home-service providers get more responses with specifics. On ValClassifieds, list what you cover.\n\nMention:\n\n• Jobs you take (plumbing, electrical, cleaning)\n• Area and response time\n• Pricing and any visit charge\n• Tools and parts you bring' },
    ],
    actions: [
      { label: 'Service Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-SER-003',
    version: VERSION,
    title: 'Professional Services',
    intent: 'SELLING_HELP',
    category: 'services',
    triggers: ['tutor', 'consulting', 'photography', 'coaching'],
    response: [
      { type: 'text', content: 'Tutors and consultants should show credibility. On ValClassifieds, add samples or credentials.\n\nInclude:\n\n• Service and experience\n• Deliverables and timeline\n• Fees and any travel cost\n• Past work or testimonials' },
    ],
    actions: [
      { label: 'Service Post Tips', value: 'job description' },
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── LISTING QUALITY (3) ─────────────────────────
  {
    id: 'SEL-LIS-001',
    version: VERSION,
    title: 'Creating a Listing',
    intent: 'SELLING_HELP',
    category: 'listing',
    triggers: ['create listing', 'post listing', 'how to list', 'listing', 'list my item'],
    isDefault: true,
    response: [
      { type: 'numbered_steps', title: 'How to Create a Listing', steps: [
        'Choose the correct category for your item',
        'Add clear photos from multiple angles',
        'Write a title with brand, model, and condition',
        'Describe honestly and set a competitive price',
        'Add your location and post',
      ] },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-LIS-002',
    version: VERSION,
    title: 'Better Listing Photos',
    intent: 'SELLING_HELP',
    category: 'listing',
    triggers: ['photo', 'photos', 'image', 'picture'],
    response: [
      { type: 'numbered_steps', title: 'Better Listing Photos', steps: [
        'Photograph in natural daylight near a window',
        'Capture front, back, sides, and details',
        'Show any defects honestly to build trust',
        'Use a plain, uncluttered background',
        'Add at least 4–6 photos for a complete view',
      ] },
    ],
    actions: [
      { label: 'Pricing Tips', value: 'pricing help' },
      { label: 'Post My Listing', value: 'post listing' },
      { label: 'View My Listings', value: 'my listings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SEL-LIS-003',
    version: VERSION,
    title: 'Pricing Your Item',
    intent: 'SELLING_HELP',
    category: 'listing',
    triggers: ['price', 'pricing', 'how much', 'value'],
    response: [
      { type: 'numbered_steps', title: 'How to Price Your Item', steps: [
        'Search similar items to see market rates',
        'New or unused: 80–100% of original price',
        'Like new or gently used: 60–80%',
        'Good condition with wear: 40–60%',
        'Price slightly above your minimum for negotiation',
      ] },
    ],
    actions: [
      { label: 'Photo Tips', value: 'photo tips' },
      { label: 'Check Prices', value: 'search' },
      { label: 'Post My Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
]

export default articles

const CATEGORY_ALIASES: Record<string, string> = {
  'mobiles-tablets': 'electronics',
}

function normalizeCategory(category?: string): string | undefined {
  if (!category) return undefined
  return CATEGORY_ALIASES[category] ?? category
}

function scoreTriggerMatch(query: string, trigger: string): number {
  const q = query.toLowerCase().trim()
  const t = trigger.toLowerCase().trim()
  if (!t) return 0
  if (q === t) return 3
  if (q.startsWith(t)) return 2
  if (q.includes(t)) return 1
  return 0
}

export function selectSellingArticle(classification: IntentClassification): SellingArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const category = normalizeCategory(classification.entities.category)

  const scoped = category ? articles.filter(a => a.category === category) : articles

  if (query) {
    let best: { article: SellingArticle; score: number } | null = null
    for (const article of scoped) {
      for (const trigger of article.triggers) {
        const score = scoreTriggerMatch(query, trigger)
        if (score > 0 && (best === null || score > best.score)) {
          best = { article, score }
        }
      }
    }
    if (best) return best.article
  }

  const categoryDefault = scoped.find(a => a.isDefault)
  if (categoryDefault) return categoryDefault

  const genericDefault = articles.find(a => a.isDefault)
  if (genericDefault) return genericDefault

  return articles[0]
}
