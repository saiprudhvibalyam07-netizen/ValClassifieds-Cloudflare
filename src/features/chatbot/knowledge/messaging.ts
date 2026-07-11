import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface MessagingArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface MessagingArticle {
  id: string
  version: number
  title: string
  intent: 'CONTACT_SELLER'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: MessagingArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: MessagingArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const MESSAGING_ACTIONS: SuggestedAction[] = [
  { label: 'Open Messages', value: 'open messages' },
  { label: 'Safety Tips', value: 'safety tips' },
  { label: 'Search Listings', value: 'search' },
]

const articles: MessagingArticle[] = [
  // ───────────────────────── STARTING CONVERSATIONS (8) ─────────────────────────
  {
    id: 'MSG-START-001',
    version: VERSION,
    title: 'Messaging Help',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['messaging', 'messaging help', 'messaging support', 'message support'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Messaging Help', level: 2 },
      { type: 'text', content: 'ValClassifieds messaging lets you talk to sellers safely, all within the platform. Here is what you can do:\n\n• Start a conversation from any listing\n• Ask about availability, condition, or price\n• Negotiate and make offers\n• Share photos and documents\n• Report or block anyone who makes you uncomfortable\n\nKeeping every conversation on ValClassifieds protects both buyers and sellers.' },
    ],
    actions: [
      { label: 'Open Messages', value: 'open messages' },
      { label: 'How to Message', value: 'how to message seller' },
      { label: 'Negotiation Tips', value: 'negotiation tips' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-002',
    version: VERSION,
    title: 'Start a Conversation',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['start a conversation', 'start conversation', 'begin chat', 'start chat', 'send a message', 'send message', 'write a message'],
    response: [
      { type: 'heading', content: 'Start a Conversation', level: 2 },
      { type: 'text', content: 'Starting a chat on ValClassifieds takes a moment:\n\n1. Open the listing you are interested in\n2. Tap "Contact Seller" or "Send Message"\n3. Write a short, friendly message introducing yourself\n4. Ask your first question and wait for the seller to reply\n\nMost sellers respond within 24 hours. You can track every chat in the Messages section.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-003',
    version: VERSION,
    title: 'Open the Messages Section',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['open messages', 'messages section', 'where are my messages', 'inbox', 'message centre'],
    response: [
      { type: 'heading', content: 'Open the Messages Section', level: 2 },
      { type: 'text', content: 'All your chats live in one place. Open the Messages icon from the top menu or your account dashboard to see active conversations, unread messages, and archived chats. Tap any conversation to continue the discussion.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-004',
    version: VERSION,
    title: 'Message a Seller for the First Time',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['first message', 'first time', 'new conversation', 'message someone', 'message a seller'],
    response: [
      { type: 'heading', content: 'Message a Seller for the First Time', level: 2 },
      { type: 'text', content: 'A good first message gets a faster reply. Mention the item by name, say you are interested, and ask one clear question — for example about availability or condition. Friendly, specific messages stand out to sellers.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-005',
    version: VERSION,
    title: 'Find Your Conversations',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['find conversation', 'my conversations', 'previous chats', 'old messages', 'past chats'],
    response: [
      { type: 'heading', content: 'Find Your Conversations', level: 2 },
      { type: 'text', content: 'Your previous chats are saved automatically. Go to Messages and use the search box to look up a seller by name or listing title. Archived conversations can be restored from the Archive folder.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-006',
    version: VERSION,
    title: 'Message from a Listing Page',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['from listing', 'on the listing', 'listing page message', 'contact from listing', 'message on listing'],
    response: [
      { type: 'heading', content: 'Message from a Listing Page', level: 2 },
      { type: 'text', content: 'Every active listing has a "Contact Seller" button. Tapping it opens a pre-linked conversation tied to that item, so the seller knows exactly what you are asking about. You can reference the listing directly in your message.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-007',
    version: VERSION,
    title: 'Greeting a Seller',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['greet', 'hello seller', 'how to greet', 'introduce', 'say hello'],
    response: [
      { type: 'heading', content: 'Greeting a Seller', level: 2 },
      { type: 'text', content: 'A polite greeting builds trust. Start with a friendly "Hello" or "Hi", name the item you are interested in, and say a little about what you are looking for. Sellers are more willing to help buyers who are courteous and clear.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-START-008',
    version: VERSION,
    title: 'Message Multiple Sellers',
    intent: 'CONTACT_SELLER',
    category: 'starting',
    triggers: ['multiple sellers', 'several sellers', 'many sellers', 'compare sellers', 'message more than one'],
    response: [
      { type: 'heading', content: 'Message Multiple Sellers', level: 2 },
      { type: 'text', content: 'Comparing options? You can message as many sellers as you like — each becomes a separate conversation in Messages. Ask the same key questions (price, condition, availability) so you can compare answers side by side before deciding.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── CONTACTING SELLERS (8) ─────────────────────────
  {
    id: 'MSG-CON-001',
    version: VERSION,
    title: 'How to Message a Seller',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['how to message', 'how to contact', 'reach seller', 'contact seller', 'contact a seller', 'message a seller'],
    response: [
      { type: 'heading', content: 'How to Message a Seller', level: 2 },
      { type: 'text', content: 'Reaching a seller is simple:\n\n1. Open the listing you are interested in\n2. Tap "Contact Seller" or "Send Message"\n3. Write a clear message about what you would like to know\n4. Mention your interest and ask any relevant questions\n5. Check your Messages inbox for their reply\n\nAll conversations are kept on the platform for your protection.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-002',
    version: VERSION,
    title: 'Message About a Specific Listing',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['about this listing', 'question about listing', 'ask about item', 'listing question', 'this item'],
    response: [
      { type: 'heading', content: 'Ask About a Listing', level: 2 },
      { type: 'text', content: 'When you message from a listing, the item is attached to the chat automatically. Refer to its title or price in your message so the seller knows which item you mean, then ask about anything not covered in the description.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-003',
    version: VERSION,
    title: 'Ask About Availability',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['available', 'still available', 'is it available', 'in stock', 'still for sale'],
    response: [
      { type: 'heading', content: 'Check Availability', level: 2 },
      { type: 'text', content: 'Before arranging a visit, send a quick message asking "Is this still available?" Sellers update their listings regularly, but a confirmation avoids a wasted trip. If it is sold, ask whether they have similar items.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-004',
    version: VERSION,
    title: 'Ask About Condition and Details',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['condition', 'details', 'specs', 'what is included', 'more info', 'more information'],
    response: [
      { type: 'heading', content: 'Ask About Condition and Details', level: 2 },
      { type: 'text', content: 'Get the full picture before you commit. Ask about the item\'s condition, age, any faults, and what is included in the sale. For electronics, confirm specs and whether chargers or boxes are part of the deal.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-005',
    version: VERSION,
    title: 'Ask About Price or Discount',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['price', 'discount', 'cheaper', 'best price', 'final price', 'any discount'],
    response: [
      { type: 'heading', content: 'Ask About Price', level: 2 },
      { type: 'text', content: 'You can ask a seller whether the price is flexible. Phrase it politely — for example, "Is the price negotiable?" or "Would you consider a small discount for a quick sale?" Respect their answer if the price is fixed.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-006',
    version: VERSION,
    title: 'Arrange a Meeting or Pickup',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['meet', 'pickup', 'collection', 'where to meet', 'inspect', 'arrange meeting'],
    response: [
      { type: 'heading', content: 'Arrange a Meeting or Pickup', level: 2 },
      { type: 'text', content: 'Once you agree on a price, arrange a safe public meeting place to inspect and collect the item. Agree the time and location in the chat, and keep the conversation on ValClassifieds until the deal is done.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Open Messages', value: 'open messages' },
      { label: 'Search Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-007',
    version: VERSION,
    title: 'Message Before You Buy',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['before buying', 'before i buy', 'should i buy', 'check before', 'questions before buying'],
    response: [
      { type: 'heading', content: 'Message Before You Buy', level: 2 },
      { type: 'text', content: 'A few questions now can save problems later. Confirm the condition, reason for selling, and whether you can inspect the item first. If anything feels unclear, ask before you pay — a genuine seller will be happy to help.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-CON-008',
    version: VERSION,
    title: 'Reply to a Seller',
    intent: 'CONTACT_SELLER',
    category: 'contacting',
    triggers: ['reply to seller', 'respond', 'seller replied', 'answer seller', 'seller message'],
    response: [
      { type: 'heading', content: 'Replying to a Seller', level: 2 },
      { type: 'text', content: 'When a seller replies, open the conversation and tap the message box to respond. Keep your answers clear and polite, and confirm next steps such as price, meeting point, or payment method within the same chat.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── NEGOTIATION & OFFERS (6) ─────────────────────────
  {
    id: 'MSG-NEG-001',
    version: VERSION,
    title: 'Negotiating the Price',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['negotiate', 'negotiation', 'bargain', 'haggle', 'negotiate the price', 'price negotiable'],
    response: [
      { type: 'heading', content: 'Negotiating the Price', level: 2 },
      { type: 'text', content: 'Here are a few suggestions for negotiating through messaging:\n\n• Start with a friendly greeting to build rapport\n• Reference specific details from the listing to show genuine interest\n• Make a clear, reasonable offer and briefly explain your reasoning\n• Be polite — sellers are more likely to negotiate with courteous buyers\n• Ask questions about the condition or what is included\n\nKeep all communication on the platform for your protection.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-NEG-002',
    version: VERSION,
    title: 'Making an Offer',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['make an offer', 'offer', 'my offer', 'put in an offer', 'send an offer'],
    response: [
      { type: 'heading', content: 'Making an Offer', level: 2 },
      { type: 'text', content: 'When you make an offer, state the amount and any conditions clearly — for example "I can offer ₹X if I collect today." A specific, fair offer is easier for a seller to accept than a vague request for "your best price."' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-NEG-003',
    version: VERSION,
    title: 'Reasonable vs Lowball Offers',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['lowball', 'too low', 'reasonable offer', 'fair price', 'what to offer'],
    response: [
      { type: 'heading', content: 'Reasonable vs Lowball Offers', level: 2 },
      { type: 'text', content: 'A reasonable offer is close to the asking price and shows respect for the seller. Very low offers can be ignored. Check similar listings first to gauge market value, then propose a figure you would genuinely pay.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-NEG-004',
    version: VERSION,
    title: 'Counter Offers',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['counter', 'counter offer', 'come down', 'meet in the middle', 'split the difference'],
    response: [
      { type: 'heading', content: 'Counter Offers', level: 2 },
      { type: 'text', content: 'If a seller counters your offer, you can accept, decline, or propose a middle figure. Keep the tone friendly and confirm the final amount in the chat before arranging the meeting.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-NEG-005',
    version: VERSION,
    title: 'Accepting or Declining an Offer',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['accept offer', 'decline', 'deal', 'agreed price', 'accept the price'],
    response: [
      { type: 'heading', content: 'Accepting or Declining an Offer', level: 2 },
      { type: 'text', content: 'Once you agree on a price, confirm it in the chat — "Sounds good, ₹X it is." If you decide not to proceed, a brief polite message lets the seller move on. Either way, keep the agreement in writing within the conversation.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-NEG-006',
    version: VERSION,
    title: 'Closing the Deal',
    intent: 'CONTACT_SELLER',
    category: 'negotiation',
    triggers: ['close the deal', 'finalise', 'finalize', 'confirmed', 'done deal', 'seal the deal'],
    response: [
      { type: 'heading', content: 'Closing the Deal', level: 2 },
      { type: 'text', content: 'To wrap up safely, agree the final price, meeting point, and time in the chat. Inspect the item at the meeting before paying, and complete the exchange in person. Keeping the agreement in the conversation protects both sides.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Open Messages', value: 'open messages' },
      { label: 'Search Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── ATTACHMENTS (4) ─────────────────────────
  {
    id: 'MSG-ATT-001',
    version: VERSION,
    title: 'Send Photos',
    intent: 'CONTACT_SELLER',
    category: 'attachments',
    triggers: ['send photos', 'photos', 'send picture', 'attach photo', 'pictures', 'share photo'],
    response: [
      { type: 'heading', content: 'Send Photos', level: 2 },
      { type: 'text', content: 'You can attach photos to any conversation using the image button in the chat. Sellers often share extra pictures of the item\'s condition — and you can send photos of what you are looking for as well. Only share images relevant to the sale.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-ATT-002',
    version: VERSION,
    title: 'Attach Documents',
    intent: 'CONTACT_SELLER',
    category: 'attachments',
    triggers: ['attach documents', 'documents', 'receipt', 'invoice', 'papers', 'bill'],
    response: [
      { type: 'heading', content: 'Attach Documents', level: 2 },
      { type: 'text', content: 'Use the attachment option to share documents such as a receipt, invoice, or proof of purchase. This helps verify an item\'s history. Never share identity documents or financial details through chat — keep personal data private.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-ATT-003',
    version: VERSION,
    title: 'Share More Images of an Item',
    intent: 'CONTACT_SELLER',
    category: 'attachments',
    triggers: ['more images', 'more photos', 'additional pictures', 'extra photos', 'more pictures'],
    response: [
      { type: 'heading', content: 'Share More Images', level: 2 },
      { type: 'text', content: 'Ask the seller for more angles if the listing photos are unclear. They can send close-ups of any marks, the serial number, or the item in use. Reviewing extra images before meeting reduces surprises on the day.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-ATT-004',
    version: VERSION,
    title: 'Attachment Limits and Formats',
    intent: 'CONTACT_SELLER',
    category: 'attachments',
    triggers: ['attachment limit', 'file size', 'format', 'too large', 'upload limit', 'file too big'],
    response: [
      { type: 'heading', content: 'Attachment Limits and Formats', level: 2 },
      { type: 'text', content: 'Images should be in common formats (JPG, PNG) and kept within the size limit shown in the chat. If an upload fails, compress the file or resize the photo, then try again. Documents are accepted in PDF or image form.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── MESSAGING PROBLEMS (6) ─────────────────────────
  {
    id: 'MSG-PRO-001',
    version: VERSION,
    title: "Seller Isn't Replying",
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ['not replying', 'no reply', 'not responding', 'ignoring', "isn't replying", 'no response'],
    response: [
      { type: 'heading', content: "Seller Isn't Replying", level: 2 },
      { type: 'text', content: 'If a seller hasn\'t replied, give them a little time — many respond within a day. You can send one polite follow-up, or message other sellers listing the same item. If the listing looks inactive, it may already be sold.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-PRO-002',
    version: VERSION,
    title: "I Can't Send Messages",
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ["can't send", "can't send messages", 'cannot send', 'cannot send messages', 'unable to send', 'unable to send messages', 'message failed', 'send error', 'not letting me message'],
    response: [
      { type: 'heading', content: "I Can't Send Messages", level: 2 },
      { type: 'text', content: 'If sending fails, check your internet connection and that you are signed in. Refresh the page or restart the app, then try again. Make sure the seller\'s listing is still active — you cannot message a removed or sold listing.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-PRO-003',
    version: VERSION,
    title: 'Messages Not Delivered',
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ['not delivered', 'not sending', 'failed to send', 'delivery', 'message not sent'],
    response: [
      { type: 'heading', content: 'Messages Not Delivered', level: 2 },
      { type: 'text', content: 'A message stuck on "sending" usually means a weak connection. Confirm you are online, then tap the message to retry. If it still fails, sign out and back in. Your draft is saved until it goes through.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-PRO-004',
    version: VERSION,
    title: 'Message Notifications',
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ['notifications', 'no notification', 'alert', 'notification settings', 'not getting alerts'],
    response: [
      { type: 'heading', content: 'Message Notifications', level: 2 },
      { type: 'text', content: 'Missing alerts? Enable notifications for ValClassifieds in your device settings and make sure the chat isn\'t muted. You can adjust notification preferences anytime from your account settings.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-PRO-005',
    version: VERSION,
    title: 'Missing or Disappeared Messages',
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ['missing', 'disappeared', 'lost message', 'gone', 'deleted by itself', 'vanished'],
    response: [
      { type: 'heading', content: 'Missing or Disappeared Messages', level: 2 },
      { type: 'text', content: 'If a conversation vanished, check your Archive and Filters — chats are never deleted automatically. If you still can\'t find it, contact support with the seller\'s name and item title so we can help restore it.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Open Messages', value: 'open messages' },
      { label: 'Safety Tips', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-PRO-006',
    version: VERSION,
    title: 'Messaging Is Slow or Laggy',
    intent: 'CONTACT_SELLER',
    category: 'problems',
    triggers: ['slow', 'laggy', 'delayed', 'taking long', 'loading', 'messages delayed'],
    response: [
      { type: 'heading', content: 'Messaging Is Slow or Laggy', level: 2 },
      { type: 'text', content: 'Slow chats are usually a connection issue. Switch to a stronger network, clear the app cache, or update ValClassifieds to the latest version. A quick refresh typically resolves delays.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── REPORTING & BLOCKING (4) ─────────────────────────
  {
    id: 'MSG-REP-001',
    version: VERSION,
    title: 'Report a User',
    intent: 'CONTACT_SELLER',
    category: 'reporting',
    triggers: ['report', 'report user', 'report this person', 'flag', 'report someone'],
    response: [
      { type: 'heading', content: 'Report a User', level: 2 },
      { type: 'text', content: 'If someone is behaving suspiciously or breaking our rules, open the conversation, tap "Report," choose a reason, and submit. Our trust and safety team reviews every report and takes action where needed.' },
      { type: 'warning', content: 'Never share personal information like OTPs, bank details, or passwords with other users.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Open Messages', value: 'open messages' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-REP-002',
    version: VERSION,
    title: 'Block a User',
    intent: 'CONTACT_SELLER',
    category: 'reporting',
    triggers: ['block', 'block user', 'block this user', 'stop messages', 'prevent messages'],
    response: [
      { type: 'heading', content: 'Block a User', level: 2 },
      { type: 'text', content: 'To stop unwanted contact, open the conversation, tap the user\'s name, and select "Block." Blocked users can no longer message you, and the chat is hidden from your inbox. You can unblock anytime from settings.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Report User', value: 'report user' },
      { label: 'Open Messages', value: 'open messages' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-REP-003',
    version: VERSION,
    title: 'Report a Conversation',
    intent: 'CONTACT_SELLER',
    category: 'reporting',
    triggers: ['report conversation', 'report this chat', 'report message', 'report thread', 'report the chat', 'report this conversation', 'report the conversation'],
    response: [
      { type: 'heading', content: 'Report a Conversation', level: 2 },
      { type: 'text', content: 'If a chat contains scams, harassment, or banned content, open it and use "Report Conversation." Select the issue and send. Our team reads the full thread in context and responds accordingly. Block the user if you want no further contact.' },
      { type: 'warning', content: 'Keep all evidence in the chat — do not delete the conversation before reporting.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Block User', value: 'block user' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-REP-004',
    version: VERSION,
    title: 'Dealing with Suspicious Messages',
    intent: 'CONTACT_SELLER',
    category: 'reporting',
    triggers: ['suspicious', 'scam', 'fake', 'spam', 'fraud', 'suspicious message'],
    response: [
      { type: 'heading', content: 'Dealing with Suspicious Messages', level: 2 },
      { type: 'text', content: 'Be cautious of messages asking for payment outside ValClassifieds, requesting OTPs, or promising deals that seem too good to be true. Do not click unknown links or share financial details. Report and block the sender immediately.' },
      { type: 'warning', content: 'ValClassifieds will never ask for your password, OTP, or bank login by message.' },
    ],
    actions: [
      { label: 'Safety Tips', value: 'safety tips' },
      { label: 'Report User', value: 'report user' },
      { label: 'Block User', value: 'block user' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── CONVERSATION MANAGEMENT (4) ─────────────────────────
  {
    id: 'MSG-MAN-001',
    version: VERSION,
    title: 'Delete a Conversation',
    intent: 'CONTACT_SELLER',
    category: 'management',
    triggers: ['delete conversation', 'delete chat', 'remove conversation', 'delete thread', 'delete messages', 'delete my conversation', 'my conversation'],
    response: [
      { type: 'heading', content: 'Delete a Conversation', level: 2 },
      { type: 'text', content: 'To remove a chat, open it, tap the menu, and choose "Delete Conversation." This clears it from your view. If the matter involved a dispute or scam, report it before deleting so our team keeps a record.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-MAN-002',
    version: VERSION,
    title: 'Archive a Chat',
    intent: 'CONTACT_SELLER',
    category: 'management',
    triggers: ['archive', 'archive chat', 'hide conversation', 'archive messages', 'archive thread'],
    response: [
      { type: 'heading', content: 'Archive a Chat', level: 2 },
      { type: 'text', content: 'Archiving moves a conversation out of your main inbox without deleting it. Tap the menu in any chat and select "Archive." You can find archived chats later and restore them whenever you need.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-MAN-003',
    version: VERSION,
    title: 'Mark as Read or Unread',
    intent: 'CONTACT_SELLER',
    category: 'management',
    triggers: ['mark read', 'mark unread', 'unread', 'read receipt', 'mark as read'],
    response: [
      { type: 'heading', content: 'Mark as Read or Unread', level: 2 },
      { type: 'text', content: 'Keep your inbox tidy by marking chats read once you have replied, or unread to revisit later. Long-press or use the menu on a conversation to toggle its status.' },
    ],
    actions: MESSAGING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'MSG-MAN-004',
    version: VERSION,
    title: 'Mute or Unmute a Chat',
    intent: 'CONTACT_SELLER',
    category: 'management',
    triggers: ['mute', 'unmute', 'silence', 'turn off notifications', 'mute chat'],
    response: [
      { type: 'heading', content: 'Mute or Unmute a Chat', level: 2 },
      { type: 'text', content: 'Need a break from alerts? Open the chat menu and select "Mute" to pause notifications for that conversation. You can unmute anytime, and messages still arrive — you simply won\'t be notified.' },
    ],
    actions: MESSAGING_ACTIONS,
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

function matchArticles(pool: MessagingArticle[], query: string): MessagingArticle | null {
  let best: { article: MessagingArticle; score: number; triggerLen: number } | null = null
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

export function selectMessagingArticle(
  classification: IntentClassification
): MessagingArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}
