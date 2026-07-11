import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface BuyingArticle {
  id: string
  version: number
  title: string
  intent: 'BUYING_HELP'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1

const articles: BuyingArticle[] = [
  // ───────────────────────── GENERAL (no category) ─────────────────────────
  {
    id: 'BUY-GEN-001',
    version: VERSION,
    title: 'Buying on ValClassifieds',
    intent: 'BUYING_HELP',
    category: 'general',
    triggers: ['buy', 'buying', 'how to buy', 'purchase', 'how do i buy'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying on ValClassifieds', level: 2 },
      { type: 'text', content: 'ValClassifieds makes buying simple and secure. You can search thousands of listings, compare similar items, contact sellers directly, and complete your purchase — all within our platform.\n\nHere is what we help with:\n\n• Searching listings by category, location, and budget\n• Comparing items so you can make informed decisions\n• Contacting sellers and discussing pricing\n• Staying safe with our marketplace safety guidance' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
      { label: 'Compare Items', value: 'compare' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── VEHICLES (20) ─────────────────────────
  {
    id: 'BUY-VEH-001',
    version: VERSION,
    title: 'Buying a Car',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['car', 'cars', 'vehicle', 'automobile', 'buy a car', 'four wheeler'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying a Car on ValClassifieds', level: 2 },
      { type: 'text', content: 'Whether you are looking for a daily commuter or a family vehicle, ValClassifieds lists verified cars from owners and dealers across the country.\n\nBefore you decide:\n\n• Set a clear budget, including insurance and transfer costs\n• Shortlist by fuel type, model year, and kilometre reading\n• Always inspect the car and take a test drive\n• Verify the RC, insurance, and service history\n• Meet the seller in a public place and avoid advance payments' },
    ],
    actions: [
      { label: 'Search Cars', value: 'search vehicles' },
      { label: 'Vehicle Safety', value: 'safety tips' },
      { label: 'Get Financing', value: 'car loan' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-002',
    version: VERSION,
    title: 'Buying a Used Car',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['used car', 'second hand car', 'pre owned car', 'pre-owned car'],
    response: [
      { type: 'heading', content: 'Buying a Used Car', level: 2 },
      { type: 'text', content: 'A used car can offer excellent value if you check it carefully. On ValClassifieds, filter by "Used" and review the listing photos and description closely.\n\nKey checks:\n\n• Match the chassis number on the RC with the car\n• Look for accident repairs, paint unevenness, and tyre wear\n• Ask for the service record and previous insurance claims\n• Get an independent mechanic’s opinion before paying' },
    ],
    actions: [
      { label: 'Search Used Cars', value: 'search vehicles' },
      { label: 'Inspection Checklist', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-003',
    version: VERSION,
    title: 'Buying a New Car',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['new car', 'brand new car', 'showroom car'],
    response: [
      { type: 'heading', content: 'Buying a New Car', level: 2 },
      { type: 'text', content: 'For a brand-new vehicle, compare authorised dealer listings on ValClassifieds and confirm the on-road price in your city.\n\nKeep in mind:\n\n• Ask for the ex-showroom, RTO, and insurance breakup\n• Check the manufacturing month on the VIN for fresh stock\n• Understand the warranty and free-service period\n• Negotiate extras such as accessories and insurance' },
    ],
    actions: [
      { label: 'Search New Cars', value: 'search vehicles' },
      { label: 'Car Loan Options', value: 'car loan' },
      { label: 'Insurance Guide', value: 'vehicle insurance' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-004',
    version: VERSION,
    title: 'Buying a Bike or Scooter',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['bike', 'bikes', 'scooter', 'motorcycle', 'motorbike', 'two wheeler'],
    response: [
      { type: 'heading', content: 'Buying a Bike or Scooter', level: 2 },
      { type: 'text', content: 'Two-wheelers are among the most searched categories on ValClassifieds. Filter by city and condition to find the right ride.\n\nBefore you buy:\n\n• Confirm the RC and valid insurance\n• Test ride to check brakes, clutch, and suspension\n• For scooters, check battery and metre reading\n• Avoid deals that ask for full payment before you see the vehicle' },
    ],
    actions: [
      { label: 'Search Bikes', value: 'search vehicles' },
      { label: 'Test Ride Tips', value: 'test drive' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-005',
    version: VERSION,
    title: 'Buying a Bicycle',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['bicycle', 'cycle', 'bike cycle'],
    response: [
      { type: 'heading', content: 'Buying a Bicycle', level: 2 },
      { type: 'text', content: 'From commuter cycles to premium mountain bikes, ValClassifieds has options for every rider.\n\nWhat to check:\n\n• Frame size suited to your height\n• Tyre, gear, and brake condition\n• Any rust or structural damage\n• Original bill for higher-end models' },
    ],
    actions: [
      { label: 'Search Bicycles', value: 'search vehicles' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-006',
    version: VERSION,
    title: 'Buying an Electric Vehicle',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['ev', 'electric car', 'electric vehicle', 'electric scooter', 'electric bike'],
    response: [
      { type: 'heading', content: 'Buying an Electric Vehicle', level: 2 },
      { type: 'text', content: 'Electric vehicles are growing fast on ValClassifieds. Along with price, review the battery and charging practicality.\n\nConsider:\n\n• Real-world range versus claimed range\n• Battery health and warranty remaining\n• Availability of a home or public charger\n• State subsidy or road-tax benefits in your state' },
    ],
    actions: [
      { label: 'Search EVs', value: 'search vehicles' },
      { label: 'EV Battery Guide', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-007',
    version: VERSION,
    title: 'Buying a Commercial Vehicle',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['commercial vehicle', 'truck', 'tempo', 'van', 'goods vehicle'],
    response: [
      { type: 'heading', content: 'Buying a Commercial Vehicle', level: 2 },
      { type: 'text', content: 'For business use, ValClassifieds lists tempos, mini-trucks, and vans from fleets and owners.\n\nReview carefully:\n\n• Fitness certificate and permit validity\n• Load capacity and body condition\n• Tampered odometer or engine rebuild signs\n• Tax and insurance dues cleared by the seller' },
    ],
    actions: [
      { label: 'Search Commercial', value: 'search vehicles' },
      { label: 'Documents Check', value: 'rc transfer' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-008',
    version: VERSION,
    title: 'Vehicle Inspection Checklist',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['inspect', 'inspection', 'check vehicle', 'vehicle check', 'vehicle condition'],
    response: [
      { type: 'numbered_steps', title: 'Vehicle Inspection Checklist', steps: [
        'Verify the RC, engine, and chassis numbers match the vehicle',
        'Check for accident repairs, rust, and uneven paint',
        'Start the engine and listen for unusual noises',
        'Test brakes, steering, lights, and indicators',
        'Review tyres, suspension, and fluid levels',
        'Take a short test drive on varied roads',
      ] },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'RC & Papers', value: 'rc transfer' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-009',
    version: VERSION,
    title: 'Test Drive Tips',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['test drive', 'test ride', 'test driving'],
    response: [
      { type: 'text', content: 'A proper test drive tells you more than any listing photo. On ValClassifieds, arrange a meet-up with the seller in a safe public area.\n\nDuring the drive:\n\n• Check acceleration, braking, and gear shifts\n• Listen for suspension or engine knocking\n• Confirm the speedometer and warning lights work\n• Drive on both smooth and rough roads if possible' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Inspection Checklist', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-010',
    version: VERSION,
    title: 'RC Transfer and Paperwork',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['rc transfer', 'registration', 'paperwork', 'rc', 'ownership transfer'],
    response: [
      { type: 'heading', content: 'RC Transfer and Paperwork', level: 2 },
      { type: 'text', content: 'Ownership is complete only after the RC is transferred to your name. ValClassifieds recommends completing this before final payment.\n\nYou will need:\n\n• Form 29 and Form 30 (sale transfer)\n• Valid insurance and pollution certificate\n• Original RC and a copy of the seller’s ID\n• Payment of road-tax and transfer fees at the RTO' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-011',
    version: VERSION,
    title: 'Car Loan and Finance',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['car loan', 'finance', 'emi', 'loan', 'vehicle finance'],
    response: [
      { type: 'heading', content: 'Car Loan and Finance', level: 2 },
      { type: 'text', content: 'Many buyers on ValClassifieds choose financing. Compare loan offers before committing.\n\nTips:\n\n• Check the effective interest rate, not just the EMI\n• Understand processing fees and foreclosure charges\n• Keep a down payment to reduce total interest\n• Ensure the loan is sanctioned before you finalise' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Insurance Guide', value: 'vehicle insurance' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-012',
    version: VERSION,
    title: 'Vehicle Insurance',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['insurance', 'vehicle insurance', 'car insurance', 'bike insurance'],
    response: [
      { type: 'text', content: 'Third-party insurance is mandatory in India, and comprehensive cover protects your vehicle too. Confirm the policy is active and transferred at the time of purchase.\n\nChecklist:\n\n• Valid policy number and expiry date\n• No pending claims on the vehicle\n• Transfer or buy a fresh policy in your name\n• Keep the invoice for any claim later' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'RC & Papers', value: 'rc transfer' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-013',
    version: VERSION,
    title: 'Checking Mileage and Condition',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['mileage', 'odometer', 'condition', 'km reading'],
    response: [
      { type: 'text', content: 'Kilometre reading and overall condition decide a vehicle’s true value. On ValClassifieds, cross-check the odometer with service records.\n\nWatch for:\n\n• Very low kilometres on an old car (possible tampering)\n• Mismatch between metre and service history\n• Worn pedals, seats, and steering for the claimed age\n• Service stamps from authorised centres' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Inspection Checklist', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-014',
    version: VERSION,
    title: 'Negotiating the Vehicle Price',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['negotiat', 'bargain', 'offer', 'price', 'discount'],
    response: [
      { type: 'heading', content: 'Negotiating the Vehicle Price', level: 2 },
      { type: 'text', content: 'Negotiation is normal on ValClassifieds. A fair offer backed by research works best.\n\nSuggestions:\n\n• Compare similar listings to know the market price\n• Point to genuine defects politely\n• Make a reasonable offer, not an unrealistically low one\n• Keep all discussion on the platform for your safety' },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Compare Listings', value: 'compare' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-015',
    version: VERSION,
    title: 'Avoiding Vehicle Scams',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['scam', 'fraud', 'fake', 'vehicle scam', 'fake seller'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Stay Safe from Vehicle Scams', message: 'Vehicle scams often involve requests for advance payment or "too good" prices. ValClassifieds never asks you to pay outside the platform.', tips: [
        'Never pay a token or deposit before seeing the vehicle',
        'Meet in a public place and verify documents in person',
        'Be cautious of sellers who refuse video calls',
        'Report suspicious listings to ValClassifieds immediately',
      ] },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-016',
    version: VERSION,
    title: 'Buying a Luxury or Premium Car',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['luxury car', 'premium car', 'high end', 'expensive car'],
    response: [
      { type: 'text', content: 'Luxury cars need extra diligence. ValClassifieds lists premium models from authorised and pre-owned sources.\n\nExtra checks:\n\n• Full service history from brand workshops\n• Accident and insurance claim record\n• Original keys, manuals, and spare tyre\n• Independent inspection before transfer' },
    ],
    actions: [
      { label: 'Search Luxury Cars', value: 'search vehicles' },
      { label: 'Inspection Checklist', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-017',
    version: VERSION,
    title: 'Buying a Budget Car',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['budget car', 'cheap car', 'affordable', 'low cost car'],
    response: [
      { type: 'text', content: 'A budget car can be reliable with the right checks. On ValClassifieds, sort by price and focus on well-maintained examples.\n\nAdvice:\n\n• Prioritise mechanical health over looks\n• Keep a small reserve for immediate repairs\n• Prefer single-owner vehicles with records\n• Verify insurance and RC are clear' },
    ],
    actions: [
      { label: 'Search Budget Cars', value: 'search vehicles' },
      { label: 'Inspection Checklist', value: 'vehicle inspection' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-018',
    version: VERSION,
    title: 'Buying an SUV',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['suv', 'sports utility', 'sport utility'],
    response: [
      { type: 'text', content: 'SUVs are popular for space and road presence. ValClassifieds listings include compact and full-size SUVs.\n\nThings to verify:\n\n• Underbody and suspension for off-road wear\n• 4x4 or 2WD as per your need\n\n• Service record and tyre size\n• Insurance and RC clarity' },
    ],
    actions: [
      { label: 'Search SUVs', value: 'search vehicles' },
      { label: 'Test Drive Tips', value: 'test drive' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-019',
    version: VERSION,
    title: 'Dealer vs Owner Purchase',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['dealer', 'owner', 'private seller', 'individual seller'],
    response: [
      { type: 'info_section', title: 'Dealer vs Owner', items: [
        'Dealers may offer warranty and quick paperwork but at a higher price',
        'Owners usually price lower but involve more verification by you',
        'Either way, insist on a physical inspection',
        'Confirm the seller’s ID matches the RC before paying',
      ] },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'RC & Papers', value: 'rc transfer' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-VEH-020',
    version: VERSION,
    title: 'Safe Meet-ups for Vehicles',
    intent: 'BUYING_HELP',
    category: 'vehicles',
    triggers: ['meet', 'safe', 'pickup', 'delivery', 'where to meet'],
    response: [
      { type: 'safety_banner', variant: 'general_safety', title: 'Safe Meet-ups', message: 'Always inspect the vehicle before paying and meet where others are around.', tips: [
        'Choose a busy public location in daylight',
        'Take a friend or family member along',
        'Keep all communication on ValClassifieds',
        'Do not share OTPs, bank, or UPI details',
      ] },
    ],
    actions: [
      { label: 'Search Vehicles', value: 'search vehicles' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PROPERTY (15) ─────────────────────────
  {
    id: 'BUY-PRO-001',
    version: VERSION,
    title: 'Buying Property',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['property', 'real estate', 'buy property', 'house', 'immovable'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying Property on ValClassifieds', level: 2 },
      { type: 'text', content: 'Property is a high-value purchase, so verification matters most. ValClassifieds connects you with verified owners, builders, and agents.\n\nStart with:\n\n• Fixing a budget and preferred locality\n• Shortlisting resale or new construction\n• Verifying the title and approved plan\n• Consulting a legal expert before signing' },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Document Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-002',
    version: VERSION,
    title: 'Buying a House',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['house', 'buying house', 'independent house', 'home'],
    response: [
      { type: 'text', content: 'An independent house gives you privacy and land ownership. On ValClassifieds, review the layout, age, and approvals.\n\nKey points:\n\n• Clear title and encumbrance certificate\n• Approved building plan and occupancy certificate\n• Water, electricity, and drainage connections\n• Boundaries and any pending dues' },
    ],
    actions: [
      { label: 'Search Houses', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-003',
    version: VERSION,
    title: 'Buying an Apartment or Flat',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['apartment', 'flat', 'buying flat', '2bhk', '3bhk'],
    response: [
      { type: 'text', content: 'Apartments are the most common city purchase on ValClassifieds. Check both the unit and the society.\n\nVerify:\n\n• Society approvals and maintenance charges\n• Car parking and amenity allocation\n• Builder’s track record for new projects\n• Resale papers for older flats' },
    ],
    actions: [
      { label: 'Search Flats', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-004',
    version: VERSION,
    title: 'Renting a Property',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['rent', 'rental', 'renting', 'tenant', 'lease'],
    response: [
      { type: 'heading', content: 'Renting a Property', level: 2 },
      { type: 'text', content: 'If you are looking to rent, ValClassifieds lists houses, flats, and rooms with photos and rent details.\n\nBefore moving in:\n\n• Agree on rent, deposit, and notice period in writing\n• Inspect fixtures and appliances with the owner\n• Click photos of existing damage\n• Keep the rent agreement registered if the term is long' },
    ],
    actions: [
      { label: 'Search Rentals', value: 'search property' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-005',
    version: VERSION,
    title: 'Buying Land or Plot',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['land', 'plot', 'vacant land', 'site', 'ground'],
    response: [
      { type: 'text', content: 'Plots need the strictest document checks. On ValClassifieds, confirm the land is residential and legally convertible.\n\nChecklist:\n\n• Title deed and encumbrance certificate\n• Approved layout and conversion order\n• Na la or local body clearance\n• Boundaries and survey sketch' },
    ],
    actions: [
      { label: 'Search Plots', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-006',
    version: VERSION,
    title: 'Buying a Villa or Bungalow',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['villa', 'bungalow', 'independent villa'],
    response: [
      { type: 'text', content: 'Villas and bungalows combine house ownership with premium amenities. ValClassifieds listings show gated-community and standalone options.\n\nVerify:\n\n• Society and clubhouse charges\n• Construction quality and approvals\n• Clear land title and taxes paid\n• Resale vs new build documents' },
    ],
    actions: [
      { label: 'Search Villas', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-007',
    version: VERSION,
    title: 'Buying Commercial Property',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['office space', 'shop', 'commercial property', 'commercial', 'showroom'],
    response: [
      { type: 'text', content: 'For offices, shops, or showrooms, ValClassifieds lists commercial spaces by location and size.\n\nReview:\n\n• Zoning and permitted business use\n• Maintenance and common area charges\n• Lease or sale deed clarity\n• Fire and safety NOC where applicable' },
    ],
    actions: [
      { label: 'Search Commercial', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-008',
    version: VERSION,
    title: 'Verifying Property Documents',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['documents', 'title', 'agreement', 'legal', 'encumbrance'],
    response: [
      { type: 'numbered_steps', title: 'Document Verification', steps: [
        'Obtain the sale deed and previous chain of titles',
        'Get an encumbrance certificate from the sub-registrar',
        'Confirm approved building plan and layout',
        'Check property tax and utility bills are cleared',
        'Engage a property lawyer before registration',
      ] },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-009',
    version: VERSION,
    title: 'Home Loan',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['home loan', 'mortgage', 'housing loan', 'loan against property'],
    response: [
      { type: 'heading', content: 'Home Loan', level: 2 },
      { type: 'text', content: 'Most property buyers on ValClassifieds use a home loan. Get pre-approved to strengthen your offer.\n\nTips:\n\n• Compare interest rates across banks\n• Check processing and prepayment charges\n• Keep down payment ready for the gap\n• Ensure the property is loan-eligible' },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-010',
    version: VERSION,
    title: 'Property Registration',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['registration', 'stamp duty', 'registry', 'sub registrar'],
    response: [
      { type: 'text', content: 'Registration makes the sale legally valid. Budget for stamp duty and registration fees, which vary by state.\n\nProcess:\n\n• Draft the sale deed on stamp paper\n• Both parties sign before the sub-registrar\n• Pay stamp duty and registration charges\n• Collect the registered deed and update records' },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-011',
    version: VERSION,
    title: 'Checking Locality and Amenities',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['locality', 'neighborhood', 'amenities', 'area', 'connectivity'],
    response: [
      { type: 'text', content: 'Location decides long-term value. On ValClassifieds, read the locality notes and visit at different times.\n\nEvaluate:\n\n• Water, power, and internet availability\n• Schools, hospitals, and transport nearby\n• Road and drainage condition\n• Future development and zoning Plans' },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Site Visit', value: 'site visit' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-012',
    version: VERSION,
    title: 'Avoiding Property Fraud',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['property fraud', 'fake listing', 'scam', 'fraud'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Avoid Property Fraud', message: 'Property fraud often involves fake titles or advance-fee tricks. ValClassifieds verifies many listings, but always confirm documents.', tips: [
        'Never pay token money without a written agreement',
        'Verify the seller’s ownership through records',
        'Avoid deals that pressure quick payment',
        'Report suspicious listings to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-013',
    version: VERSION,
    title: 'Token Amount and Booking',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['token', 'booking', 'advance', 'earnest money'],
    response: [
      { type: 'text', content: 'A token amount shows seriousness but should be small and documented. On ValClassifieds, keep all booking communication on the platform.\n\nBest practice:\n\n• Mention token, balance, and refund terms in writing\n• Link the token to a specific agreement date\n• Get a receipt with both parties’ signatures\n• Avoid large advances before document checks' },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-014',
    version: VERSION,
    title: 'Resale vs New Property',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['resale', 'new property', 'under construction', 'ready to move'],
    response: [
      { type: 'info_section', title: 'Resale vs New', items: [
        'Resale is usually quicker to occupy and negotiable',
        'New projects offer modern amenities but carry completion risk',
        'Check the builder’s delivery history for under-construction',
        'Compare total cost including maintenance and charges',
      ] },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PRO-015',
    version: VERSION,
    title: 'Site Visit Checklist',
    intent: 'BUYING_HELP',
    category: 'property',
    triggers: ['site visit', 'inspection', 'visit', 'physical visit'],
    response: [
      { type: 'numbered_steps', title: 'Site Visit Checklist', steps: [
        'Visit at least twice, including evening hours',
        'Check ventilation, light, and water pressure',
        'Talk to neighbours about the society',
        'Note any cracks, seepage, or repairs needed',
        'Confirm the included fixtures and parking',
      ] },
    ],
    actions: [
      { label: 'Search Property', value: 'search property' },
      { label: 'Legal Check', value: 'property documents' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── ELECTRONICS (15, includes mobiles-tablets) ─────────────────────────
  {
    id: 'BUY-ELE-001',
    version: VERSION,
    title: 'Buying Electronics',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['electronics', 'gadget', 'buy electronics', 'appliance'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying Electronics on ValClassifieds', level: 2 },
      { type: 'text', content: 'From phones to home appliances, ValClassifieds lists electronics in every budget. A few checks protect your purchase.\n\nGeneral advice:\n\n• Prefer listings with clear, original photos\n• Ask for the bill and warranty status\n• Verify IMEI or serial before paying\n• Meet in a safe place or use verified delivery' },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-002',
    version: VERSION,
    title: 'Buying a Phone',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['phone', 'mobile', 'smartphone', 'iphone', 'samsung', 'android', 'handset'],
    response: [
      { type: 'heading', content: 'Buying a Phone', level: 2 },
      { type: 'text', content: 'Phones are the most searched electronics on ValClassifieds. Protect yourself with a quick verification.\n\nCheck:\n\n• IMEI status via *#06# and the carrier\n• Original bill and active warranty\n• Screen, battery, and camera condition\n• No activation lock or account signed in' },
    ],
    actions: [
      { label: 'Search Phones', value: 'search electronics' },
      { label: 'IMEI Check', value: 'imei' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-003',
    version: VERSION,
    title: 'Buying a Laptop',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['laptop', 'computer', 'macbook', 'notebook', 'pc'],
    response: [
      { type: 'text', content: 'Laptops on ValClassifieds range from budget to premium. Verify performance before you pay.\n\nWhat to test:\n\n• Battery health and charger inclusion\n• Keyboard, trackpad, and ports\n• Original OS and no MDM lock\n• Bill and remaining warranty' },
    ],
    actions: [
      { label: 'Search Laptops', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-004',
    version: VERSION,
    title: 'Buying a TV or Monitor',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['tv', 'television', 'monitor', 'display'],
    response: [
      { type: 'text', content: 'For TVs and monitors, screen quality and ports matter. ValClassifieds listings usually state size and condition.\n\nVerify:\n\n• No dead pixels or backlight bleed\n• All HDMI and USB ports work\n• Original remote and stand included\n• Bill and warranty wherever possible' },
    ],
    actions: [
      { label: 'Search TVs', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-005',
    version: VERSION,
    title: 'Buying a Camera',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['camera', 'dslr', 'gopro', 'mirrorless'],
    response: [
      { type: 'text', content: 'Cameras need careful inspection of the sensor and lens. On ValClassifieds, ask for sample photos.\n\nCheck:\n\n• Sensor spots and shutter count\n• Lens clarity and autofocus\n• Included batteries and memory\n• Original box and warranty' },
    ],
    actions: [
      { label: 'Search Cameras', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-006',
    version: VERSION,
    title: 'Buying Headphones and Audio',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['headphones', 'earbuds', 'speaker', 'earphones', 'audio'],
    response: [
      { type: 'text', content: 'Audio gear is easy to test on the spot. ValClassifieds listings often include brand and model details.\n\nTips:\n\n• Pair and test both earbuds\n• Check for distortion at high volume\n• Confirm charging case and cable\n• Verify no pairing lock to another device' },
    ],
    actions: [
      { label: 'Search Audio', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-007',
    version: VERSION,
    title: 'Buying a Gaming Console',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['console', 'playstation', 'xbox', 'ps5', 'nintendo', 'gaming'],
    response: [
      { type: 'text', content: 'Consoles are in high demand on ValClassifieds. Check the account and disc drive before buying.\n\nVerify:\n\n• No banned or locked account\n• Disc drive reads games (if applicable)\n• Controllers and cables included\n• Bill and warranty if available' },
    ],
    actions: [
      { label: 'Search Consoles', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-008',
    version: VERSION,
    title: 'Checking IMEI and Serial',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['imei', 'serial', 'serial number', 'serial no'],
    response: [
      { type: 'numbered_steps', title: 'IMEI and Serial Check', steps: [
        'Dial *#06# to view the IMEI on phones',
        'Match it with the number on the box and bill',
        'Use the carrier or brand portal to check status',
        'For laptops, note the serial on the base and BIOS',
        'Avoid devices reported lost or stolen',
      ] },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-009',
    version: VERSION,
    title: 'New vs Refurbished',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['refurbished', 'renewed', 'second hand', 'used electronics'],
    response: [
      { type: 'info_section', title: 'New vs Refurbished', items: [
        'New items carry full warranty and peace of mind',
        'Refurbished can save money if certified and boxed',
        'Confirm the refurbisher and remaining warranty',
        'Inspect thoroughly for refurbished gear',
      ] },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-010',
    version: VERSION,
    title: 'Warranty and Bills',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['warranty', 'invoice', 'bill', 'receipt', 'guarantee'],
    response: [
      { type: 'text', content: 'The original bill and valid warranty protect you after purchase. On ValClassifieds, ask the seller to share these.\n\nBest practice:\n\n• Request a GST or retail invoice\n• Confirm warranty is transferable\n• Keep a photo of the bill and serial\n• Register the product with the brand if needed' },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'IMEI Check', value: 'imei' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-011',
    version: VERSION,
    title: 'Battery and Condition Check',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['battery', 'condition', 'health'],
    response: [
      { type: 'text', content: 'Battery health decides usable life for phones and laptops. ValClassifieds sellers often state condition.\n\nCheck:\n\n• Maximum capacity versus design capacity\n• Heating or swelling signs\n• Cycle count where available\n• Function of charger and ports' },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-012',
    version: VERSION,
    title: 'Avoiding Electronics Scams',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['electronics scam', 'fake', 'counterfeit', 'duplicate'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Avoid Electronics Scams', message: 'Beware of brand-new devices at unreal prices or requests to pay outside ValClassifieds.', tips: [
        'Verify IMEI or serial before paying',
        'Buy only after inspecting the device',
        'Avoid sellers who refuse video verification',
        'Report counterfeit listings to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-013',
    version: VERSION,
    title: 'Comparing Specs',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['specs', 'specification', 'compare phone', 'compare laptop'],
    response: [
      { type: 'text', content: 'Comparing specifications helps you pay for what you need. Use ValClassifieds filters to line up similar models.\n\nFocus on:\n\n• Processor and RAM for performance\n• Storage type and size\n• Display and battery for daily use\n• Resale value of the model' },
    ],
    actions: [
      { label: 'Search Electronics', value: 'search electronics' },
      { label: 'Compare Listings', value: 'compare' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-014',
    version: VERSION,
    title: 'Buying a Tablet',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['tablet', 'ipad', 'tab'],
    response: [
      { type: 'text', content: 'Tablets on ValClassifieds suit work and entertainment. Confirm the screen and account status.\n\nVerify:\n\n• No activation lock\n• Battery and charging port\n• Stylus or keyboard inclusion\n• Bill and warranty' },
    ],
    actions: [
      { label: 'Search Tablets', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-ELE-015',
    version: VERSION,
    title: 'Buying Home Appliances',
    intent: 'BUYING_HELP',
    category: 'electronics',
    triggers: ['appliance', 'fridge', 'microwave', 'oven', 'kitchen appliance', 'washing machine'],
    response: [
      { type: 'text', content: 'Appliances like fridges, ovens, and washers are bulky but common on ValClassifieds. Check function and age.\n\nTips:\n\n• Run a quick demo if you can\n• Note dents, rust, or seal damage\n• Confirm voltage and installation needs\n• Ask about remaining warranty' },
    ],
    actions: [
      { label: 'Search Appliances', value: 'search electronics' },
      { label: 'Warranty Check', value: 'warranty' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── FURNITURE & HOME (10) ─────────────────────────
  {
    id: 'BUY-FUR-001',
    version: VERSION,
    title: 'Buying Furniture',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['furniture', 'home', 'buy furniture', 'household'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying Furniture on ValClassifieds', level: 2 },
      { type: 'text', content: 'Furniture and home items are easy to find on ValClassifieds, from sofas to wardrobes. Check condition before you arrange transport.\n\nAdvice:\n\n• Ask for actual photos from multiple angles\n• Confirm dimensions fit your space\n• Check for termites, stains, or repairs\n• Agree on delivery and assembly upfront' },
    ],
    actions: [
      { label: 'Search Furniture', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-002',
    version: VERSION,
    title: 'Buying a Sofa or Couch',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['sofa', 'couch', 'settee'],
    response: [
      { type: 'text', content: 'Sofas are a centrepiece of any living room. ValClassifieds listings show fabric, size, and condition.\n\nCheck:\n\n• Frame stability and cushion support\n• No stains, odour, or pest signs\n• Removable covers if important to you\n• Whether it disassembles for moving' },
    ],
    actions: [
      { label: 'Search Sofas', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-003',
    version: VERSION,
    title: 'Buying a Bed or Mattress',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['bed', 'mattress', 'cot'],
    response: [
      { type: 'text', content: 'Beds and mattresses need hygiene checks. On ValClassifieds, prefer gently used or new-in-pack items.\n\nVerify:\n\n• No sagging or broken slats\n• Mattress free of stains and odour\n• Size matches your room and sheets\n• Storage or hydraulic options if needed' },
    ],
    actions: [
      { label: 'Search Beds', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-004',
    version: VERSION,
    title: 'Buying Tables, Chairs, and Desks',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['table', 'chair', 'desk', 'study table', 'dining'],
    response: [
      { type: 'text', content: 'Work and dining furniture is widely listed on ValClassifieds. Stability and finish matter most.\n\nCheck:\n\n• Even legs and no wobble\n• Smooth drawers and hinges\n• Surface chips or water damage\n• Weight and ease of transport' },
    ],
    actions: [
      { label: 'Search Tables', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-005',
    version: VERSION,
    title: 'Buying Wardrobes, Cabinets, and Shelves',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['wardrobe', 'cabinet', 'shelf', 'almirah', 'storage'],
    response: [
      { type: 'text', content: 'Storage furniture should be sturdy and complete. ValClassifieds listings note material and size.\n\nVerify:\n\n• Doors and locks function smoothly\n• No rust on metal units\n• All shelves and fittings included\n• Whether it needs wall anchoring' },
    ],
    actions: [
      { label: 'Search Storage', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-006',
    version: VERSION,
    title: 'Buying Home Decor',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['decor', 'curtain', 'carpet', 'home decor', 'showpiece'],
    response: [
      { type: 'text', content: 'Decor items add character to a home. On ValClassifieds, filter by room or style to find what fits.\n\nTips:\n\n• Confirm size against your wall or floor\n• Check for damage in photos\n• Ask about material and care\n• Combine pieces for a cohesive look' },
    ],
    actions: [
      { label: 'Search Decor', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-007',
    version: VERSION,
    title: 'Checking Used Furniture Condition',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['used furniture', 'condition', 'quality', 'second hand furniture'],
    response: [
      { type: 'numbered_steps', title: 'Used Furniture Check', steps: [
        'Inspect the frame for cracks or repairs',
        'Look under cushions for stains or pests',
        'Test moving parts like drawers and recliners',
        'Confirm the item is pest-free and clean',
        'Agree on cleaning or repair responsibility',
      ] },
    ],
    actions: [
      { label: 'Search Furniture', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-008',
    version: VERSION,
    title: 'Delivery and Assembly',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['delivery', 'assembly', 'moving', 'transport', 'packers'],
    response: [
      { type: 'text', content: 'Furniture is bulky, so plan movement in advance. ValClassifieds sellers may offer or suggest help.\n\nBest practice:\n\n• Measure doors and lifts beforehand\n• Confirm disassembled vs assembled delivery\n• Agree on labour charges in writing\n• Inspect on arrival before payment' },
    ],
    actions: [
      { label: 'Search Furniture', value: 'search furniture' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-009',
    version: VERSION,
    title: 'Avoiding Furniture Scams',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['scam', 'fake', 'fraud'],
    response: [
      { type: 'safety_banner', variant: 'general_safety', title: 'Furniture Buying Safety', message: 'Most furniture deals are straightforward, but stay cautious with advance payments.', tips: [
        'Pay only after seeing the item',
        'Use ValClassifieds messages for agreements',
        'Avoid unusually low prices for branded items',
        'Report suspicious sellers to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Search Furniture', value: 'search furniture' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FUR-010',
    version: VERSION,
    title: 'Measuring Your Space',
    intent: 'BUYING_HELP',
    category: 'furniture-home',
    triggers: ['measure', 'space', 'size', 'dimension'],
    response: [
      { type: 'text', content: 'A wrong size is the most common furniture mistake. Before you buy on ValClassifieds, measure your room.\n\nSteps:\n\n• Note length, width, and door clearance\n• Compare with the listing dimensions\n• Allow space to walk around\n• Check if items split for easy entry' },
    ],
    actions: [
      { label: 'Search Furniture', value: 'search furniture' },
      { label: 'Delivery Help', value: 'delivery' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── FASHION & LIFESTYLE (8) ─────────────────────────
  {
    id: 'BUY-FAS-001',
    version: VERSION,
    title: 'Buying Fashion and Lifestyle',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['fashion', 'clothing', 'buy clothes', 'apparel', 'lifestyle'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying Fashion on ValClassifieds', level: 2 },
      { type: 'text', content: 'Clothes, shoes, and accessories are listed daily on ValClassifieds. A few checks avoid disappointment.\n\nAdvice:\n\n• Ask for actual photos, not catalogue images\n• Confirm size and fabric\n• Check for stains, tears, or odour\n• Prefer tried-and-true brands you know' },
    ],
    actions: [
      { label: 'Search Fashion', value: 'search fashion' },
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-002',
    version: VERSION,
    title: 'Buying Shoes',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['shoes', 'sneakers', 'boots', 'sandals', 'footwear'],
    response: [
      { type: 'text', content: 'Shoes should fit well and show honest wear. ValClassifieds listings include size and brand.\n\nVerify:\n\n• No sole separation or heel damage\n• Inner lining and insoles clean\n• Matches the stated size\n• Original box if it matters to you' },
    ],
    actions: [
      { label: 'Search Shoes', value: 'search fashion' },
      { label: 'Size Guide', value: 'size' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-003',
    version: VERSION,
    title: 'Buying a Watch',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['watch', 'smartwatch', 'wrist watch'],
    response: [
      { type: 'text', content: 'Watches range from everyday to luxury on ValClassifieds. Authenticity is key for branded models.\n\nCheck:\n\n• Serial and model number\n• Original strap and buckle\n• Function of crown and buttons\n• Bill and warranty for premium brands' },
    ],
    actions: [
      { label: 'Search Watches', value: 'search fashion' },
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-004',
    version: VERSION,
    title: 'Buying Bags and Accessories',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['bag', 'backpack', 'handbag', 'purse', 'accessories'],
    response: [
      { type: 'text', content: 'Bags and accessories are popular gifts and daily use items. On ValClassifieds, confirm material and hardware.\n\nVerify:\n\n• Zippers, stitches, and lining\n• No peeling or colour transfer\n• Brand tags and serial if applicable\n• Actual photos from the seller' },
    ],
    actions: [
      { label: 'Search Bags', value: 'search fashion' },
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-005',
    version: VERSION,
    title: 'Buying Jewelry',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['jewelry', 'jewellery', 'gold', 'silver', 'ornament'],
    response: [
      { type: 'text', content: 'Jewelry needs certification. ValClassifieds listings should mention purity and assay details.\n\nCheck:\n\n• Hallmark for gold and silver\n• Bill and certificate of purity\n• Clasp and stone setting security\n• Resale and buyback terms' },
    ],
    actions: [
      { label: 'Search Jewelry', value: 'search fashion' },
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-006',
    version: VERSION,
    title: 'Checking Authenticity and Brand',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['authentic', 'brand', 'original', 'genuine'],
    response: [
      { type: 'numbered_steps', title: 'Authenticity Check', steps: [
        'Ask for the original bill and brand tags',
        'Compare logo, stitching, and serial with the brand',
        'Use the brand’s verification if available',
        'Be cautious of prices far below retail',
        'Meet where you can inspect closely',
      ] },
    ],
    actions: [
      { label: 'Search Fashion', value: 'search fashion' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-007',
    version: VERSION,
    title: 'Size and Fit Guide',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['size', 'fit', 'measurement', 'sizing'],
    response: [
      { type: 'text', content: 'Sizes vary by brand, so always confirm measurements. ValClassifieds sellers can share actual dimensions.\n\nTips:\n\n• Ask for chest, waist, and length in inches\n• Compare with a garment that fits you\n• Check stretch and fabric type\n• Clarify return or exchange policy' },
    ],
    actions: [
      { label: 'Search Fashion', value: 'search fashion' },
      { label: 'Authenticity', value: 'authenticity' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-FAS-008',
    version: VERSION,
    title: 'Avoiding Counterfeit Goods',
    intent: 'BUYING_HELP',
    category: 'fashion-lifestyle',
    triggers: ['counterfeit', 'fake', 'replica', 'first copy'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Avoid Counterfeits', message: 'Counterfeit fashion is common online. ValClassifieds encourages buying from verified sellers.', tips: [
        'Insist on the original bill',
        'Compare with the brand’s official product',
        'Avoid "first copy" or "replica" listings',
        'Report counterfeits to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Search Fashion', value: 'search fashion' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PETS (5) ─────────────────────────
  {
    id: 'BUY-PET-001',
    version: VERSION,
    title: 'Buying Pets',
    intent: 'BUYING_HELP',
    category: 'pets',
    triggers: ['pet', 'dog', 'cat', 'buy pet', 'puppy', 'kitten'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Buying a Pet on ValClassifieds', level: 2 },
      { type: 'text', content: 'Bringing a pet home is a long-term commitment. ValClassifieds connects you with responsible breeders and owners.\n\nBefore you decide:\n\n• Confirm vaccination and health records\n• Meet the pet in person with the seller\n• Check breed papers if applicable\n• Ensure your home is ready for the pet' },
    ],
    actions: [
      { label: 'Search Pets', value: 'search pets' },
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PET-002',
    version: VERSION,
    title: 'Buying a Dog',
    intent: 'BUYING_HELP',
    category: 'pets',
    triggers: ['dog', 'puppy', 'breed dog'],
    response: [
      { type: 'text', content: 'Dogs make wonderful companions. On ValClassifieds, meet the puppy with its mother where possible.\n\nVerify:\n\n• Vaccination and deworming record\n• Breed authenticity if promised\n• Friendly behaviour and clean coat\n• Seller’s contact for follow-up' },
    ],
    actions: [
      { label: 'Search Dogs', value: 'search pets' },
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PET-003',
    version: VERSION,
    title: 'Buying a Cat',
    intent: 'BUYING_HELP',
    category: 'pets',
    triggers: ['cat', 'kitten'],
    response: [
      { type: 'text', content: 'Cats are low-maintenance but need care. ValClassifieds listings show breed and age.\n\nCheck:\n\n• Vaccination and litter training\n• Clear eyes, coat, and no fleas\n• Temperament with people\n• Any known medical history' },
    ],
    actions: [
      { label: 'Search Cats', value: 'search pets' },
      { label: 'Pet Health', value: 'pet health' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PET-004',
    version: VERSION,
    title: 'Buying Pet Supplies',
    intent: 'BUYING_HELP',
    category: 'pets',
    triggers: ['pet food', 'pet supplies', 'pet accessories', 'aquarium'],
    response: [
      { type: 'text', content: 'Food, cages, and accessories are easy to find on ValClassifieds. Check expiry and condition.\n\nTips:\n\n• Confirm food expiry and seal\n• Inspect cages and tanks for damage\n• Ask about brand and size\n• Prefer unopened packs' },
    ],
    actions: [
      { label: 'Search Pet Supplies', value: 'search pets' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-PET-005',
    version: VERSION,
    title: 'Responsible Pet Buying and Health',
    intent: 'BUYING_HELP',
    category: 'pets',
    triggers: ['health', 'vaccination', 'breeder', 'adoption', 'responsible'],
    response: [
      { type: 'numbered_steps', title: 'Responsible Pet Buying', steps: [
        'Ask for vaccination and deworming proof',
        'Visit the pet in its current environment',
        'Avoid very young puppies taken from the mother early',
        'Choose adoption where suitable',
        'Budget for food, vet, and grooming',
      ] },
    ],
    actions: [
      { label: 'Search Pets', value: 'search pets' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── JOBS (4) ─────────────────────────
  {
    id: 'BUY-JOB-001',
    version: VERSION,
    title: 'Finding a Job',
    intent: 'BUYING_HELP',
    category: 'jobs',
    triggers: ['job', 'jobs', 'career', 'vacancy', 'employment'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Finding a Job on ValClassifieds', level: 2 },
      { type: 'text', content: 'ValClassifieds lists jobs across roles and cities. Apply with a clear profile and verified contact.\n\nTips:\n\n• Read the full description and location\n• Match your skills to the role\n• Communicate through the platform\n• Never pay a fee to an employer for a job' },
    ],
    actions: [
      { label: 'Search Jobs', value: 'search jobs' },
      { label: 'Job Safety', value: 'safety tips' },
      { label: 'Post Resume', value: 'post resume' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-JOB-002',
    version: VERSION,
    title: 'Full-time and Part-time Roles',
    intent: 'BUYING_HELP',
    category: 'jobs',
    triggers: ['full time', 'part time', 'internship', 'regular'],
    response: [
      { type: 'text', content: 'Whether full-time, part-time, or an internship, ValClassifieds has flexible options. Clarify the terms before applying.\n\nConfirm:\n\n• Working hours and shift\n• Salary or stipend clearly\n• Contract length and notice\n• Work-from-home or office' },
    ],
    actions: [
      { label: 'Search Jobs', value: 'search jobs' },
      { label: 'Job Safety', value: 'safety tips' },
      { label: 'Post Resume', value: 'post resume' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-JOB-003',
    version: VERSION,
    title: 'Freelance and Contract Work',
    intent: 'BUYING_HELP',
    category: 'jobs',
    triggers: ['freelance', 'contract', 'gig', 'project work'],
    response: [
      { type: 'text', content: 'Freelance and contract roles are common on ValClassifieds. Protect your work and payments.\n\nBest practice:\n\n• Agree on scope and rate in writing\n• Use milestones for long projects\n• Confirm ownership of deliverables\n• Keep communication on the platform' },
    ],
    actions: [
      { label: 'Search Freelance', value: 'search jobs' },
      { label: 'Job Safety', value: 'safety tips' },
      { label: 'Post Resume', value: 'post resume' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-JOB-004',
    version: VERSION,
    title: 'Avoiding Job Scams',
    intent: 'BUYING_HELP',
    category: 'jobs',
    triggers: ['job scam', 'fake job', 'fraud', 'scam'],
    response: [
      { type: 'safety_banner', variant: 'scam_warning', title: 'Avoid Job Scams', message: 'Legitimate employers do not ask for money to hire you. ValClassifieds flags suspicious job posts.', tips: [
        'Never pay a registration or training fee',
        'Verify the company before sharing documents',
        'Avoid offers that seem too easy or remote-only',
        'Report job scams to ValClassifieds',
      ] },
    ],
    actions: [
      { label: 'Search Jobs', value: 'search jobs' },
      { label: 'Job Safety', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SERVICES (3) ─────────────────────────
  {
    id: 'BUY-SER-001',
    version: VERSION,
    title: 'Hiring a Service',
    intent: 'BUYING_HELP',
    category: 'services',
    triggers: ['service', 'services', 'plumber', 'electrician', 'repair'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Hiring a Service on ValClassifieds', level: 2 },
      { type: 'text', content: 'From plumbers to tutors, ValClassifieds helps you find local service providers. A clear request gets better responses.\n\nAdvice:\n\n• Describe the job with photos if possible\n• Agree on price before work starts\n• Check reviews or past work\n• Keep communication on the platform' },
    ],
    actions: [
      { label: 'Search Services', value: 'search services' },
      { label: 'Service Safety', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-SER-002',
    version: VERSION,
    title: 'Home Services',
    intent: 'BUYING_HELP',
    category: 'services',
    triggers: ['plumber', 'electrician', 'cleaning', 'repair', 'painting', 'ac repair'],
    response: [
      { type: 'text', content: 'Home services like plumbing, electrical, and cleaning are listed by verified providers on ValClassifieds.\n\nBefore the visit:\n\n• Explain the issue clearly\n• Confirm hourly or fixed pricing\n• Ask about spare parts and warranty\n• Ensure someone is home during the job' },
    ],
    actions: [
      { label: 'Search Home Services', value: 'search services' },
      { label: 'Service Safety', value: 'safety tips' },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'BUY-SER-003',
    version: VERSION,
    title: 'Professional Services',
    intent: 'BUYING_HELP',
    category: 'services',
    triggers: ['tutor', 'consulting', 'photography', 'coaching', 'professional service'],
    response: [
      { type: 'text', content: 'Tutors, consultants, and photographers advertise on ValClassifieds. Review their portfolio or credentials first.\n\nTips:\n\n• Ask for samples or past work\n• Agree on deliverables and timeline\n• Confirm fees and any travel cost\n• Keep payments linked to milestones' },
    ],
    actions: [
      { label: 'Search Professionals', value: 'search services' },
      { label: 'Service Safety', value: 'safety tips' },
    ],
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

export function selectBuyingArticle(classification: IntentClassification): BuyingArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const category = normalizeCategory(classification.entities.category)

  const scoped = category ? articles.filter(a => a.category === category) : articles

  if (query) {
    let best: { article: BuyingArticle; score: number } | null = null
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
