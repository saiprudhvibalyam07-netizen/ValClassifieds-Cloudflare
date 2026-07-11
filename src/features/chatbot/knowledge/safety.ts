import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface SafetyArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface SafetyArticle {
  id: string
  version: number
  title: string
  intent: 'SAFETY'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: SafetyArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: SafetyArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const SAFETY_ACTIONS: SuggestedAction[] = [
  { label: 'Report User', value: 'report' },
  { label: 'Contact Support', value: 'contact support' },
  { label: 'Safety Guide', value: 'safety tips' },
]

const articles: SafetyArticle[] = [
  // ───────────────────────── GENERAL MARKETPLACE SAFETY (10) ─────────────────────────
  {
    id: 'SAF-GEN-001',
    version: VERSION,
    title: 'Marketplace Safety Guide',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['safety', 'safe', 'marketplace safety', 'guidelines', 'safety tips'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Marketplace Safety Guide', level: 2 },
      { type: 'text', content: 'Your safety matters on ValClassifieds. We verify users during registration, but we cannot guarantee any individual transaction — please use your own judgement in every deal. A few habits keep most buyers and sellers safe:\n\n• Review the other person\'s profile and listing history before engaging\n• Keep all communication on the platform\n• Meet in a public, well-lit place for in-person transactions\n• Inspect items carefully before you pay\n• Never share OTPs, passwords, or bank details\n• Report anything that feels wrong so we can act' },
      { type: 'warning', content: 'ValClassifieds does not process payments or hold funds. If someone asks you to pay outside the platform, treat it as a red flag.' },
    ],
    actions: [
      { label: 'Scam Awareness', value: 'scam warning' },
      { label: 'Payment Safety', value: 'payment safety' },
      { label: 'Meetup Tips', value: 'meetup tips' },
      { label: 'Report User', value: 'report' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-002',
    version: VERSION,
    title: 'How to Evaluate a Seller',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['seller', 'trust', 'trustworthy', 'reliable', 'evaluate seller', 'fake seller', 'is this seller'],
    response: [
      { type: 'heading', content: 'How to Evaluate a Seller', level: 2 },
      { type: 'text', content: 'We verify user accounts at registration, but we cannot promise that any particular seller is trustworthy. Take a few minutes to evaluate them yourself:\n\n• Check their profile — when they joined and how many listings they have\n• Look closely at the listing photos and description for honesty and detail\n• Send a message first and notice how responsive and professional they are\n• Be cautious of prices well below market value\n• Always inspect the item in person before paying' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-003',
    version: VERSION,
    title: 'How to Evaluate a Buyer',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['buyer', 'evaluate buyer', 'trustworthy buyer', 'is the buyer'],
    response: [
      { type: 'heading', content: 'How to Evaluate a Buyer', level: 2 },
      { type: 'text', content: 'Sellers should vet buyers just as carefully. We cannot confirm a buyer is genuine, so check for yourself:\n\n• Review the buyer\'s profile and message history\n• Watch for urgency to pay without seeing the item, or requests to move off-platform\n• Prefer local buyers who can meet and inspect in person\n• Agree the price and payment method in writing before the meetup\n• Trust your instincts — pause if anything feels rushed' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-004',
    version: VERSION,
    title: 'Verify Listings Yourself',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['verify listing', 'verify', 'check listing', 'listing real', 'real listing', 'is this listing real'],
    response: [
      { type: 'heading', content: 'Verify Listings Yourself', level: 2 },
      { type: 'text', content: 'Photos can be reused from other sites, so confirm the listing is genuine before you commit:\n\n• Search the images in a reverse-image tool to spot stolen photos\n• Compare the price and description with similar local listings\n• Ask the seller for a fresh photo of the item with today\'s date\n• Check that the location and contact details make sense\n• Read the listing carefully for vague or copied text' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-005',
    version: VERSION,
    title: 'Keep Communication on the Platform',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['off platform', 'outside', 'whatsapp', 'email', 'phone number', 'phone', 'move to'],
    response: [
      { type: 'heading', content: 'Keep Communication on the Platform', level: 2 },
      { type: 'text', content: 'Staying inside ValClassifieds chat protects you. If a user pushes you to continue on WhatsApp, email, or by phone, slow down:\n\n• We can only help with disputes we can see in the chat\n• Off-platform messages are easier to fake and harder to trace\n• Scammers often ask for your number to move the conversation away\n• Share contact details only once you trust the other party and the deal\n\nWhen in doubt, keep it on ValClassifieds.' },
      { type: 'warning', content: 'Never share OTPs, passwords, or bank login details with another user, on or off the platform.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-006',
    version: VERSION,
    title: 'Red Flags to Watch For',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['red flag', 'warning sign', 'suspicious', 'too good', 'warning', 'something off'],
    response: [
      { type: 'heading', content: 'Red Flags to Watch For', level: 2 },
      { type: 'text', content: 'Most users are genuine, but a few patterns deserve caution:\n\n• Prices far below market value with a rush to close\n• Requests for advance payment to "hold" or "reserve" an item\n• Refusal to meet or let you inspect the item\n• Pressure to communicate off the platform\n• Spelling out bank details or OTPs to "verify" you\n• Stories about customs, shipping, or agent fees for a local item\n\nIf several appear together, step back and report the user.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-007',
    version: VERSION,
    title: 'Protect Your Personal Information',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['personal info', 'personal information', 'privacy', 'data', 'share details', 'my details'],
    response: [
      { type: 'heading', content: 'Protect Your Personal Information', level: 2 },
      { type: 'text', content: 'Keep your private data private. On ValClassifieds you should never need to share:\n\n• OTPs, PINs, or bank login credentials\n• Your full address before a meetup is arranged\n• Copies of ID or financial documents with a stranger\n• Passwords or verification codes, for any service\n\nShare only what is needed to complete the deal, and only inside the chat.' },
      { type: 'warning', content: 'No representative of ValClassifieds will ever ask for your password or OTP by message.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-008',
    version: VERSION,
    title: 'Using ValClassifieds Safely',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['new to', 'getting started', 'how to stay safe', 'use safely', 'first time'],
    response: [
      { type: 'heading', content: 'Using ValClassifieds Safely', level: 2 },
      { type: 'text', content: 'New to the marketplace? A few basics go a long way:\n\n• Set up your profile with accurate, verifiable details\n• Browse and chat within the platform\n• Learn the signs of common scams before you buy\n• Meet in public and inspect before paying\n• Use the Report and Block tools whenever needed\n\nSafety is a habit — small checks prevent most problems.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-009',
    version: VERSION,
    title: 'Verify User Profiles',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['profile', 'joined', 'account age', 'review profile', 'check profile'],
    response: [
      { type: 'heading', content: 'Verify User Profiles', level: 2 },
      { type: 'text', content: 'A profile tells you more than a message. Before dealing, look at:\n\n• When the account was created and how active it is\n• How many listings and completed chats they have\n• Whether photos and descriptions look consistent\n• Reviews or ratings where available\n\nAn empty or very new profile is not proof of risk, but it is a reason to verify carefully.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-GEN-010',
    version: VERSION,
    title: 'Community Safety',
    intent: 'SAFETY',
    category: 'general',
    triggers: ['community', 'keep community safe', 'report behaviour', 'help keep safe', 'safer marketplace'],
    response: [
      { type: 'heading', content: 'Community Safety', level: 2 },
      { type: 'text', content: 'ValClassifieds works best when everyone looks out for each other. If you see a listing or message that breaks the rules, report it — our team reviews reports and removes harmful content. Blocking users you no longer wish to hear from keeps your inbox clean. Your reports help keep the whole community safer.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PAYMENT SAFETY (8) ─────────────────────────
  {
    id: 'SAF-PAY-001',
    version: VERSION,
    title: 'Safe Payment Tips',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['payment', 'pay', 'payment method', 'how to pay', 'pay safely', 'safest way to pay'],
    response: [
      { type: 'heading', content: 'Safe Payment Tips', level: 2 },
      { type: 'text', content: 'ValClassifieds connects buyers and sellers — we do not process payments directly, so we cannot guarantee a payment. Handle money carefully:\n\n• Inspect the item in person before paying anything\n• Cash or in-person card payments are simplest for local deals\n• For bank transfers, confirm the account details and that funds have arrived\n• Never pay in advance to "reserve" or "hold" an item\n• Keep your own record of the transaction' },
      { type: 'warning', content: 'If a seller insists on advance payment before you have seen the item, treat it as a red flag.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-002',
    version: VERSION,
    title: 'Paying in Advance or Holding Items',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['pay in advance', 'advance payment', 'hold', 'reserve', 'deposit', 'pay to hold'],
    response: [
      { type: 'heading', content: 'Paying in Advance or Holding Items', level: 2 },
      { type: 'text', content: 'Be careful with any request to pay before you see the item. We cannot recover money sent to a stranger in advance. Before you agree to "hold" an item:\n\n• Ask to meet and inspect it first\n• Prefer paying only once the item is in front of you\n• Treat upfront "shipping," "customs," or "agent" fees as warning signs\n• Remember that a genuine local seller rarely needs a deposit' },
      { type: 'warning', content: 'Paying in advance removes your leverage. If you cannot meet the seller, consider walking away.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-003',
    version: VERSION,
    title: 'Cash vs Digital Payments',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['cash', 'digital payment', 'upi', 'bank transfer', 'online payment', 'card'],
    response: [
      { type: 'heading', content: 'Cash vs Digital Payments', level: 2 },
      { type: 'text', content: 'For local, in-person deals, cash or a card payment on the spot is usually simplest — you hand over money only after inspecting the item. With UPI or bank transfers, confirm the money has actually reached your account before releasing the item; screenshots can be faked. Choose the method you can verify.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-004',
    version: VERSION,
    title: 'Avoid Payment Scams',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['payment scam', 'fake screenshot', 'payment proof', 'scam payment', 'fake payment'],
    response: [
      { type: 'heading', content: 'Avoid Payment Scams', level: 2 },
      { type: 'text', content: 'Payment scams often rely on fake proof. Protect yourself:\n\n• Never trust a screenshot as proof of payment — check your own bank or UPI app\n• Beware "overpayment" tricks asking you to refund the difference\n• Do not pay a "fee" to unlock a payment someone claims to have sent\n• Confirm the sender\'s UPI ID matches the person you are dealing with' },
      { type: 'warning', content: 'A real payment shows in your own account. If you only have a picture, you have not been paid.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-005',
    version: VERSION,
    title: 'Confirm You Have Been Paid',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['verify payment', 'money received', 'did i get paid', 'payment confirmed', 'confirm payment'],
    response: [
      { type: 'heading', content: 'Confirm You Have Been Paid', level: 2 },
      { type: 'text', content: 'Sellers should confirm funds before handing over goods. Open your own banking or UPI app and check the balance and transaction — do not rely on what the buyer shows you. Only release the item once the money is clearly in your account.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-006',
    version: VERSION,
    title: 'Escrow and Secure Methods',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['escrow', 'secure payment', 'safe method', 'protected payment', 'safe way to pay'],
    response: [
      { type: 'heading', content: 'Escrow and Secure Methods', level: 2 },
      { type: 'text', content: 'For higher-value deals, a trusted escrow or in-person exchange reduces risk. ValClassifieds does not hold funds, so arrange any escrow through a service you independently verify. Meet at a bank or safe public place for large amounts, and complete the transfer together.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-007',
    version: VERSION,
    title: 'Refunds and Disputes',
    intent: 'SAFETY',
    category: 'payment',
    triggers: ['refund', 'dispute', 'money back', 'chargeback', 'return'],
    response: [
      { type: 'heading', content: 'Refunds and Disputes', level: 2 },
      { type: 'text', content: 'Because ValClassifieds does not process payments, refunds are arranged between buyer and seller. If a deal goes wrong:\n\n• Keep all chat and payment records\n• Contact your bank or UPI provider about a reversal where applicable\n• Report the other user to us with evidence\n• For fraud, also file a complaint with the local cyber crime channel' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-PAY-008',
    version: VERSION,
    title: "What ValClassifieds Doesn't Do",
    intent: 'SAFETY',
    category: 'payment',
    triggers: ["doesn't process", 'not process', 'we do not pay', 'platform does not', 'no payment'],
    response: [
      { type: 'heading', content: "What ValClassifieds Doesn't Do", level: 2 },
      { type: 'text', content: 'It helps to know our limits. ValClassifieds does not hold your money, process payments, or guarantee transactions. We connect local buyers and sellers and provide tools to report abuse. Any claim that "ValClassifieds will release your payment" or "pay you directly" is not from us — report it.' },
      { type: 'warning', content: 'We will never ask for your OTP, PIN, or bank login to "release" a payment.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── MEETING BUYERS & SELLERS (8) ─────────────────────────
  {
    id: 'SAF-MEE-001',
    version: VERSION,
    title: 'Safe Meetup Tips',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['meet', 'meetup', 'pickup', 'in person', 'meeting', 'collect'],
    response: [
      { type: 'heading', content: 'Safe Meetup Tips', level: 2 },
      { type: 'text', content: 'Meeting in person is the norm for local deals. Stay safe with a few habits:\n\n• Choose a public, well-lit place — a café, mall, or police station\n• Bring a friend or family member if you can\n• Tell someone where you are going and when you expect to be back\n• Inspect the item closely before handing over any money\n• Test electronics to confirm they work\n• Trust your instincts — it is fine to walk away' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-002',
    version: VERSION,
    title: 'Choosing a Public Place',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['public place', 'where to meet', 'where should i meet', 'meet the seller', 'where to meet the seller', 'safe location', 'meet location', 'meet somewhere'],
    response: [
      { type: 'heading', content: 'Choosing a Public Place', level: 2 },
      { type: 'text', content: 'A good meeting spot is busy and observable. Consider a shopping centre, a café during open hours, or a designated police-station meeting point. Avoid private homes, isolated areas, or meetups after dark. Agree the exact spot in the chat before you go.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-003',
    version: VERSION,
    title: 'Bring Someone Along',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['bring friend', 'alone', 'with someone', 'accompany', 'take someone'],
    response: [
      { type: 'heading', content: 'Bring Someone Along', level: 2 },
      { type: 'text', content: 'There is safety in numbers. For any meetup, especially with a stranger or a high-value item, bring a friend or family member. If that is not possible, share your live location and the listing link with someone you trust and check in when you are done.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-004',
    version: VERSION,
    title: 'Inspect Before You Pay',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['inspect', 'check item', 'test', 'condition before paying', 'before paying'],
    response: [
      { type: 'heading', content: 'Inspect Before You Pay', level: 2 },
      { type: 'text', content: 'Never pay before you have seen and checked the item. Match it to the listing photos, look for damage or mismatched serial numbers, and test electronics, appliances, or vehicles on the spot. If the seller refuses an inspection, reconsider the deal.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-005',
    version: VERSION,
    title: 'Meeting for High-Value Items',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['high value', 'expensive', 'large amount', 'valuable', 'big purchase'],
    response: [
      { type: 'heading', content: 'Meeting for High-Value Items', level: 2 },
      { type: 'text', content: 'Larger transactions deserve extra care. Meet at a bank or a busy public place during business hours, complete the transfer together so both sides see confirmation, and consider a short escrow or a written receipt. Take a photo of the item and the meeting if appropriate.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-006',
    version: VERSION,
    title: 'Tell Someone Your Plans',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['tell someone', 'let someone know', 'share plans', 'inform', 'let a friend'],
    response: [
      { type: 'heading', content: 'Tell Someone Your Plans', level: 2 },
      { type: 'text', content: 'Before any meetup, message a friend or family member the listing link, the meeting spot, and the time. Share your live location if you can, and agree to check in afterwards. A quick heads-up gives everyone peace of mind.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-007',
    version: VERSION,
    title: 'Vehicle Test Drives',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['test drive', 'test the car', 'driving', 'vehicle inspection', 'drive the car'],
    response: [
      { type: 'heading', content: 'Vehicle Test Drives', level: 2 },
      { type: 'text', content: 'Buying a vehicle? Meet in daylight at a safe spot and inspect documents (RC, insurance, PUC) before driving. Agree who rides along, keep the test drive short and local, and verify the seller\'s identity matches the documents. Never hand over payment before the documents check out.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-MEE-008',
    version: VERSION,
    title: 'Trust Your Instincts',
    intent: 'SAFETY',
    category: 'meeting',
    triggers: ['instinct', 'feels off', 'walk away', 'something wrong', 'gut feeling'],
    response: [
      { type: 'heading', content: 'Trust Your Instincts', level: 2 },
      { type: 'text', content: 'If a deal or a person makes you uneasy, you are allowed to stop. You do not owe anyone a purchase. End the chat, leave the meetup, and block the user if needed. Protecting yourself is more important than being polite.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SCAM & FRAUD DETECTION (8) ─────────────────────────
  {
    id: 'SAF-SCA-001',
    version: VERSION,
    title: 'Scam Awareness',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['scam', 'scammer', 'fraud', 'avoid scam', 'scams'],
    response: [
      { type: 'heading', content: 'Scam Awareness', level: 2 },
      { type: 'text', content: 'Staying alert is your best defence. Common tactics include:\n\n• Requests for OTPs, UPI PINs, or bank details — no genuine party will ever ask\n• Advance payment to "hold" or "reserve" an item you have not seen\n• Fake payment screenshots — always verify in your own app\n• Links from strangers that may be phishing attempts\n\nIf you spot any of these, stop communicating and report the user.' },
      { type: 'warning', content: 'ValClassifieds will never ask for your OTP or PIN by message. Anyone who does is not us.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-002',
    version: VERSION,
    title: 'OTP and PIN Fraud',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['otp', 'pin', 'upi pin', 'one time password', 'verification code'],
    response: [
      { type: 'heading', content: 'OTP and PIN Fraud', level: 2 },
      { type: 'text', content: 'Fraudsters often pose as buyers or support to steal a one-time password. Remember:\n\n• Your OTP and UPI PIN are for you alone — never read them out or share them\n• No real transaction needs your PIN to "verify" you\n• If you get an OTP you did not request, ignore it and secure your account\n• Report anyone who asks for a code immediately' },
      { type: 'warning', content: 'Sharing an OTP gives a stranger direct access to your money. Keep it secret.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-003',
    version: VERSION,
    title: 'Fake Listings and Phishing',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['fake listing', 'phishing', 'fake link', 'suspicious link', 'spam link'],
    response: [
      { type: 'heading', content: 'Fake Listings and Phishing', level: 2 },
      { type: 'text', content: 'Some listings or messages link to fake sites built to steal your data. Protect yourself:\n\n• Do not click links sent by people you have not verified\n• Check the web address carefully before entering any details\n• Be wary of listings with stock photos or almost no description\n• Report phishing links so we can take them down' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-004',
    version: VERSION,
    title: 'Advance-Fee Scams',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['advance fee', 'pay first', 'shipping fee', 'customs', 'processing fee'],
    response: [
      { type: 'heading', content: 'Advance-Fee Scams', level: 2 },
      { type: 'text', content: 'A classic scam asks for a small fee up front — shipping, customs, an "agent," or a refundable deposit — then disappears. For a local item there is no customs or shipping charge. Do not pay any fee before you have met the seller and seen the item in person.' },
      { type: 'warning', content: 'If the story keeps adding fees, it is almost certainly a scam. Stop and report.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-005',
    version: VERSION,
    title: 'Too-Good-To-Be-True Deals',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['too good', 'below market', 'cheap', 'unrealistic price', 'low price'],
    response: [
      { type: 'heading', content: 'Too-Good-To-Be-True Deals', level: 2 },
      { type: 'text', content: 'An iPhone at half price or a car for a fraction of its value is often bait. Compare with similar local listings — if the gap is large and the seller is rushed, pause. Genuine bargains exist, but extreme discounts with pressure to pay fast are a frequent scam pattern.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-006',
    version: VERSION,
    title: 'Account Takeover and Impersonation',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['impersonat', 'fake profile', 'hacked', 'pretending', 'someone else', 'posing'],
    response: [
      { type: 'heading', content: 'Account Takeover and Impersonation', level: 2 },
      { type: 'text', content: 'Scammers sometimes pretend to be a known brand, a friend, or a past buyer. Watch for:\n\n• Requests to switch to a "new" account mid-conversation\n• Messages that feel out of character from someone you know\n• Links or payments routed to a different person than the listing shows\n\nVerify identity through the original chat and report impersonation.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-007',
    version: VERSION,
    title: 'This Listing Looks Suspicious',
    intent: 'SAFETY',
    category: 'scam',
    triggers: ['looks suspicious', 'suspicious listing', 'not sure if real', 'doubt', 'something is wrong'],
    response: [
      { type: 'heading', content: 'This Listing Looks Suspicious', level: 2 },
      { type: 'text', content: 'If a listing feels off, slow down before engaging. Check the photos against other sites, read the description for copied text, and compare the price with similar items. Ask the seller for a fresh photo with today\'s date. If it still seems fake or the seller pressures you, report the listing and move on.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-SCA-008',
    version: VERSION,
    title: "I Think I've Been Scammed",
    intent: 'SAFETY',
    category: 'scam',
    triggers: ["been scammed", 'scammed me', 'lost money', 'fraudulent', 'tricked', 'i was scammed'],
    response: [
      { type: 'heading', content: "I Think I've Been Scammed", level: 2 },
      { type: 'text', content: 'Act quickly if you believe you have been defrauded:\n\n• Stop all contact with the other party\n• Report the user and the listing to ValClassifieds with screenshots\n• Contact your bank or UPI provider to flag the transaction and seek a reversal\n• File a complaint on the local cyber crime portal\n• Change any passwords or PINs you may have shared' },
      { type: 'warning', content: 'We cannot reverse payments ourselves, but a prompt report to your bank and cyber crime authorities improves your chances.' },
    ],
    actions: [
      { label: 'Report User', value: 'report' },
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Safety Guide', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── REPORTING & EMERGENCY GUIDANCE (6) ─────────────────────────
  {
    id: 'SAF-REP-001',
    version: VERSION,
    title: 'How to Report a User',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['report user', 'report', 'how to report', 'flag user', 'report someone'],
    response: [
      { type: 'heading', content: 'How to Report a User', level: 2 },
      { type: 'text', content: 'Reporting helps keep ValClassifieds safe. To report someone:\n\n1. Open the conversation or listing\n2. Tap "Report" or "Flag"\n3. Choose the reason that fits best\n4. Add any details and submit\n\nOur trust and safety team reviews reports and acts where needed. You stay anonymous to the reported user.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-REP-002',
    version: VERSION,
    title: 'How to Block Someone',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['block', 'block someone', 'block user', 'stop messages', 'prevent contact'],
    response: [
      { type: 'heading', content: 'How to Block Someone', level: 2 },
      { type: 'text', content: 'To stop unwanted contact, open the conversation, tap the user\'s name, and select "Block." The person can no longer message you and the chat is hidden from your inbox. You can unblock at any time from your settings. Blocking does not stop our team from reviewing a report you also file.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-REP-003',
    version: VERSION,
    title: 'Report a Listing',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['report listing', 'fake ad', 'report this ad', 'report post', 'report this listing'],
    response: [
      { type: 'heading', content: 'Report a Listing', level: 2 },
      { type: 'text', content: 'If a listing breaks the rules or looks fraudulent, open it and choose "Report Listing." Pick the reason — such as fake, prohibited, or misleading — and send. Our team checks reported listings and removes those that violate our policies. Include a note if something specific stood out.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-REP-004',
    version: VERSION,
    title: 'What to Do If Scammed',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['what to do', 'scammed', 'next steps', 'after scam', 'i was scammed'],
    response: [
      { type: 'heading', content: 'What to Do If Scammed', level: 2 },
      { type: 'text', content: 'If you have already lost money or shared details, move fast:\n\n• Report the user and listing to us with evidence\n• Contact your bank or UPI provider to dispute the charge\n• File a cyber crime complaint with the local authorities\n• Change any credentials you may have exposed\n• Keep all chat logs and screenshots for the investigation' },
      { type: 'warning', content: 'Act within the first hours where possible — banks and providers act quicker on fresh reports.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-REP-005',
    version: VERSION,
    title: 'Emergency Guidance',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['emergency', 'danger', 'threatened', 'unsafe now', 'call police', 'feel threatened'],
    response: [
      { type: 'heading', content: 'Emergency Guidance', level: 2 },
      { type: 'text', content: 'If you are in immediate danger or threatened, your safety comes first. Step away from the situation and contact local emergency services or the police right away — do not try to handle it through the app. Once safe, report the user to ValClassifieds and share any evidence with the authorities.' },
      { type: 'warning', content: 'For immediate physical risk, call your local emergency number now rather than messaging us.' },
    ],
    actions: [
      { label: 'Report User', value: 'report' },
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Safety Guide', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'SAF-REP-006',
    version: VERSION,
    title: 'Contact Support and Keep Evidence',
    intent: 'SAFETY',
    category: 'reporting',
    triggers: ['contact support', 'evidence', 'screenshot', 'keep records', 'proof'],
    response: [
      { type: 'heading', content: 'Contact Support and Keep Evidence', level: 2 },
      { type: 'text', content: 'Good records speed up any review. Before you report:\n\n• Save screenshots of the conversation and the listing\n• Note the user\'s name, listing ID, and dates\n• Keep payment receipts or bank statements\n• Share these with our support team and, if needed, the authorities\n\nThe more detail you provide, the faster we can act.' },
    ],
    actions: SAFETY_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
]

export default articles

function scoreTriggerMatch(query: string, trigger: string): number {
  const q = query.toLowerCase().trim()
  const t = trigger.toLowerCase().trim()
  if (!t) return 0
  if (q === t) return 3
  if (q.startsWith(t)) return 2
  if (q.includes(t)) return 1
  return 0
}

function matchArticles(pool: SafetyArticle[], query: string): SafetyArticle | null {
  let best: { article: SafetyArticle; score: number; triggerLen: number } | null = null
  for (const article of pool) {
    for (const trigger of article.triggers) {
      const score = scoreTriggerMatch(query, trigger)
      if (score > 0) {
        if (
          best === null ||
          score > best.score ||
          (score === best.score && trigger.length > best.triggerLen)
        ) {
          best = { article, score, triggerLen: trigger.length }
        }
      }
    }
  }
  return best ? best.article : null
}

export function selectSafetyArticle(
  classification: IntentClassification
): SafetyArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}
