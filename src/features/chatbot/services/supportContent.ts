/**
 * Centralized Support Content Service
 *
 * Single source of truth for all deterministic support responses.
 * No AI. No LLM. No prompt generation. Just structured content.
 *
 * Every support topic maps to a set of sections that the ResponseRenderer
 * can display as info sections, numbered steps, warnings, etc.
 */

import type { ResponseSection, SuggestedAction } from './responseTypes'

// ─── Support Topic Types ───────────────────────────────────────────────────────

export interface SupportTopic {
  title: string
  sections: ResponseSection[]
  suggestedActions?: SuggestedAction[]
}

// ─── Registration & Account ────────────────────────────────────────────────────

const REGISTER: SupportTopic = {
  title: 'How to Register',
  sections: [
    { type: 'heading', content: 'Creating Your Account', level: 2 },
    { type: 'numbered_steps', steps: [
      'Tap the profile icon in the bottom navigation bar.',
      'Select "Sign Up" and enter your email address.',
      'Create a strong password (at least 8 characters).',
      'Verify your email by clicking the link we send you.',
      'Complete your profile with your name and location.',
    ]},
    { type: 'text', content: 'Once registered, you can post listings, save favorites, and message sellers directly.' },
  ],
  suggestedActions: [
    { label: 'Browse Listings', value: 'search' },
    { label: 'How to Post', value: 'how to post' },
  ],
}

const LOGIN: SupportTopic = {
  title: 'Signing In',
  sections: [
    { type: 'heading', content: 'Signing In to Your Account', level: 2 },
    { type: 'numbered_steps', steps: [
      'Tap the profile icon in the bottom navigation bar.',
      'Enter your registered email and password.',
      'Tap "Sign In" to access your account.',
    ]},
    { type: 'text', content: 'If you forgot your password, tap "Forgot Password" on the login screen to reset it via email.' },
  ],
  suggestedActions: [
    { label: 'Reset Password', value: 'forgot password' },
    { label: 'Create Account', value: 'register' },
  ],
}

const FORGOT_PASSWORD: SupportTopic = {
  title: 'Password Reset',
  sections: [
    { type: 'heading', content: 'Resetting Your Password', level: 2 },
    { type: 'numbered_steps', steps: [
      'On the login screen, tap "Forgot Password".',
      'Enter the email address you registered with.',
      'Check your inbox for the password reset link.',
      'Click the link and create a new password.',
      'Sign in with your new password.',
    ]},
    { type: 'warning', content: 'The reset link expires after 24 hours. If it has expired, request a new one.' },
  ],
}

const DELETE_ACCOUNT: SupportTopic = {
  title: 'Delete Account',
  sections: [
    { type: 'heading', content: 'Account Deletion', level: 2 },
    { type: 'numbered_steps', steps: [
      'Go to Settings > Account > Delete Account.',
      'Review what will be deleted (listings, messages, favorites).',
      'Confirm by entering your password.',
      'Your account will be permanently deleted within 48 hours.',
    ]},
    { type: 'warning', content: 'This action is irreversible. All your listings, messages, and data will be permanently removed.' },
  ],
}

// ─── Listings Management ───────────────────────────────────────────────────────

const POST_LISTING: SupportTopic = {
  title: 'How to Post a Listing',
  sections: [
    { type: 'heading', content: 'Posting a New Listing', level: 2 },
    { type: 'numbered_steps', steps: [
      'Tap the "+" button on the home screen or go to "My Listings".',
      'Select the category that best fits your item.',
      'Add a clear, descriptive title (e.g., "iPhone 15 Pro 256GB - Like New").',
      'Set your price in INR.',
      'Write a detailed description including condition, age, and any defects.',
      'Upload clear photos from multiple angles.',
      'Add your location (city and area).',
      'Review and tap "Publish".',
    ]},
    { type: 'info_section', title: 'Tips for Better Listings', items: [
      'Use natural lighting for photos.',
      'Include the original price if applicable.',
      'Mention any warranty remaining.',
      'Be honest about condition — builds trust.',
    ]},
  ],
  suggestedActions: [
    { label: 'Pricing Help', value: 'pricing help' },
    { label: 'Photo Tips', value: 'photo tips' },
  ],
}

const EDIT_LISTING: SupportTopic = {
  title: 'Editing a Listing',
  sections: [
    { type: 'heading', content: 'How to Edit Your Listing', level: 2 },
    { type: 'numbered_steps', steps: [
      'Go to "My Listings" from your profile.',
      'Find the listing you want to edit.',
      'Tap the three-dot menu (⋮) and select "Edit".',
      'Update any field — title, price, description, photos, or location.',
      'Tap "Save Changes" to update your listing.',
    ]},
    { type: 'text', content: 'Edited listings are re-reviewed for quality. Changes typically appear within minutes.' },
  ],
}

const DELETE_LISTING: SupportTopic = {
  title: 'Deleting a Listing',
  sections: [
    { type: 'heading', content: 'How to Delete Your Listing', level: 2 },
    { type: 'numbered_steps', steps: [
      'Go to "My Listings" from your profile.',
      'Find the listing you want to remove.',
      'Tap the three-dot menu (⋮) and select "Delete".',
      'Confirm the deletion when prompted.',
    ]},
    { type: 'warning', content: 'Deleted listings cannot be recovered. If you plan to relist, consider marking it as "Inactive" instead.' },
  ],
}

const LISTING_ADVICE: SupportTopic = {
  title: 'Listing Advice',
  sections: [
    { type: 'heading', content: 'Creating Better Listings', level: 2 },
    { type: 'numbered_steps', steps: [
      'Use a clear, descriptive title with key details (brand, model, condition).',
      'Include 3+ photos from different angles with good lighting.',
      'Write a detailed description: age, condition, defects, included accessories.',
      'Set a competitive price — research similar listings first.',
      'Respond to buyer inquiries within 24 hours.',
      'Mark as sold promptly when the item sells.',
    ]},
    { type: 'info_section', title: 'Quick Tips', items: [
      'Listings with photos get 5x more views.',
      'Price competitively — overpriced items sit longer.',
      'Respond within 24 hours to keep buyers engaged.',
      'Be honest about condition — builds trust and avoids disputes.',
    ]},
  ],
  suggestedActions: [
    { label: 'Pricing Help', value: 'pricing help' },
    { label: 'Photo Tips', value: 'photo tips' },
  ],
}

// ─── Buying & Selling ──────────────────────────────────────────────────────────

const _HOW_TO_BUY: SupportTopic = {
  title: 'How to Buy',
  sections: [
    { type: 'heading', content: 'Buying on ValClassifieds', level: 2 },
    { type: 'numbered_steps', steps: [
      'Search for the item you want or browse categories.',
      'Compare listings — check prices, conditions, and seller ratings.',
      'Tap a listing to view full details and photos.',
      'Use "Contact Seller" to ask questions or negotiate.',
      'Agree on price and meet in a safe, public location.',
      'Inspect the item before paying.',
    ]},
    { type: 'info_section', title: 'Buyer Protection', items: [
      'All payments through the platform are protected.',
      'Report suspicious sellers immediately.',
      'Keep records of all communications.',
    ]},
  ],
  suggestedActions: [
    { label: 'Safety Tips', value: 'safety tips' },
    { label: 'Search Listings', value: 'search' },
  ],
}

const _HOW_TO_SELL: SupportTopic = {
  title: 'How to Sell',
  sections: [
    { type: 'heading', content: 'Selling on ValClassifieds', level: 2 },
    { type: 'numbered_steps', steps: [
      'Create an account or sign in.',
      'Tap "+" to create a new listing.',
      'Add clear photos and a detailed description.',
      'Set a competitive price (check similar listings for reference).',
      'Respond to buyer inquiries promptly.',
      'Meet in a safe location and complete the transaction.',
    ]},
    { type: 'info_section', title: 'Seller Tips', items: [
      'Listings with photos get 5x more views.',
      'Price competitively — overpriced items sit longer.',
      'Respond within 24 hours to keep buyers engaged.',
      'Mark items as sold promptly to maintain trust.',
    ]},
  ],
  suggestedActions: [
    { label: 'Pricing Help', value: 'pricing help' },
    { label: 'Photo Tips', value: 'photo tips' },
  ],
}

const PRICING_GUIDE: SupportTopic = {
  title: 'Pricing Help',
  sections: [
    { type: 'heading', content: 'How to Price Your Item', level: 2 },
    { type: 'text', content: 'Good pricing is key to selling quickly. Here\'s how to set the right price:' },
    { type: 'numbered_steps', steps: [
      'Search for similar items currently listed on the platform.',
      'Note the price range for similar condition items.',
      'Factor in age, condition, and any included accessories.',
      'Consider starting slightly above your minimum to leave room for negotiation.',
      'Use round numbers (e.g., ₹5,000 instead of ₹4,999) for easier negotiation.',
    ]},
    { type: 'info_section', title: 'Pricing Benchmarks', items: [
      'New (unused): 80–100% of original retail price.',
      'Like New (< 1 month): 70–85% of retail.',
      'Good (3–12 months): 50–70% of retail.',
      'Fair (1+ year): 30–50% of retail.',
      'Poor/Well-used: 15–30% of retail.',
    ]},
  ],
  suggestedActions: [
    { label: 'Browse Similar Items', value: 'similar items' },
    { label: 'Listing Tips', value: 'listing tips' },
  ],
}

const PHOTO_TIPS: SupportTopic = {
  title: 'Photo Tips',
  sections: [
    { type: 'heading', content: 'Taking Great Listing Photos', level: 2 },
    { type: 'numbered_steps', steps: [
      'Use natural daylight — avoid flash and dark rooms.',
      'Shoot from multiple angles (front, back, sides).',
      'Capture any defects or wear honestly.',
      'Include a reference object for scale if needed.',
      'Upload at least 3 photos per listing.',
    ]},
    { type: 'info_section', title: 'Photo Don\'ts', items: [
      'Don\'t use blurry or dark photos.',
      'Don\'t use stock images from the internet.',
      'Don\'t hide defects — disclose them in the description.',
    ]},
  ],
}

// ─── Favorites & Messaging ─────────────────────────────────────────────────────

const FAVORITES: SupportTopic = {
  title: 'Using Favorites',
  sections: [
    { type: 'heading', content: 'Managing Your Favorites', level: 2 },
    { type: 'numbered_steps', steps: [
      'Tap the heart icon on any listing to save it to your favorites.',
      'View all saved listings from your profile under "Favorites".',
      'Remove a listing from favorites by tapping the heart icon again.',
    ]},
    { type: 'text', content: 'You\'ll receive notifications if a favorited listing drops in price or is about to expire.' },
  ],
}

const MESSAGING: SupportTopic = {
  title: 'Messaging Sellers',
  sections: [
    { type: 'heading', content: 'How to Message a Seller', level: 2 },
    { type: 'numbered_steps', steps: [
      'Open the listing you\'re interested in.',
      'Tap "Contact Seller" or "Send Message".',
      'Type your question or offer.',
      'Wait for the seller to respond — they typically reply within 24 hours.',
    ]},
    { type: 'info_section', title: 'Messaging Tips', items: [
      'Be specific about what you want to know.',
      'Mention your budget if negotiating.',
      'Keep all communication on the platform for your protection.',
    ]},
  ],
}

const NOTIFICATIONS: SupportTopic = {
  title: 'Notifications',
  sections: [
    { type: 'heading', content: 'Notification Settings', level: 2 },
    { type: 'text', content: 'ValClassifieds sends notifications for:' },
    { type: 'info_section', title: 'Notification Types', items: [
      'New messages from buyers or sellers.',
      'Price drops on favorited listings.',
      'Listing status updates (approved, expiring, sold).',
      'Account security alerts.',
    ]},
    { type: 'text', content: 'Manage your notification preferences in Settings > Notifications.' },
  ],
}

// ─── Safety & Reporting ────────────────────────────────────────────────────────

const SAFETY_GUIDE: SupportTopic = {
  title: 'Safety Guide',
  sections: [
    { type: 'safety_banner', variant: 'general_safety', title: 'Stay Safe on ValClassifieds', message: 'Follow these guidelines for a safe marketplace experience.', tips: [
      'Always meet in public, well-lit places.',
      'Bring a friend when meeting strangers.',
      'Verify the item before making any payment.',
      'Never share OTPs, UPI PINs, or bank details.',
      'Communicate through the platform for your protection.',
      'Report suspicious activity immediately.',
    ]},
    { type: 'heading', content: 'Common Scams to Watch For', level: 2 },
    { type: 'info_section', title: 'Red Flags', items: [
      'Seller asks for payment before you see the item.',
      'Price is too good to be true.',
      'Seller refuses to meet in person.',
      'Request to communicate outside the platform.',
      'Pressure to complete the transaction quickly.',
    ]},
  ],
  suggestedActions: [
    { label: 'Report Issue', value: 'report scam' },
    { label: 'Contact Support', value: 'contact support' },
  ],
}

const REPORT: SupportTopic = {
  title: 'Reporting Issues',
  sections: [
    { type: 'heading', content: 'How to Report a Problem', level: 2 },
    { type: 'numbered_steps', steps: [
      'Open the listing or profile you want to report.',
      'Tap the three-dot menu (⋮) and select "Report".',
      'Choose the reason (scam, inappropriate, spam, other).',
      'Add any additional details or evidence.',
      'Submit the report — our team reviews within 24 hours.',
    ]},
    { type: 'text', content: 'Your report is confidential. The reported user will not know who filed the report.' },
  ],
  suggestedActions: [
    { label: 'Safety Tips', value: 'safety tips' },
    { label: 'Contact Support', value: 'contact support' },
  ],
}

// ─── Platform Help ─────────────────────────────────────────────────────────────

const PLATFORM_FEES: SupportTopic = {
  title: 'Fees & Pricing',
  sections: [
    { type: 'heading', content: 'ValClassifieds Fees', level: 2 },
    { type: 'text', content: 'ValClassifieds is free to use for browsing and buying. Here\'s what applies:' },
    { type: 'info_section', title: 'Fee Structure', items: [
      'Posting listings: Free.',
      'Browsing and searching: Free.',
      'Messaging sellers: Free.',
      'Platform transaction fee: 2% of sale price (charged to seller on completed sales).',
      'Featured listings: Starting at ₹99/week.',
    ]},
    { type: 'text', content: 'There are no hidden charges. You only pay when you successfully sell an item.' },
  ],
}

const CONTACT_SUPPORT: SupportTopic = {
  title: 'Contact Support',
  sections: [
    { type: 'heading', content: 'Get Help', level: 2 },
    { type: 'text', content: 'Our support team is available Monday–Saturday, 9 AM – 6 PM IST.' },
    { type: 'info_section', title: 'Ways to Reach Us', items: [
      'In-app chat: Use this chat for quick questions.',
      'Email: support@valclassifieds.com',
      'Response time: Within 24 hours for most queries.',
    ]},
  ],
}

// ─── Greeting & Small Talk ─────────────────────────────────────────────────────

const _GREETING_VISITOR: SupportTopic = {
  title: 'Welcome',
  sections: [
    { type: 'text', content: 'Welcome to ValClassifieds! I\'m ValBot, your Marketplace Assistant. I can help you find what you\'re looking for, learn about the platform, and get started. What brings you here today?' },
  ],
  suggestedActions: [
    { label: 'What is ValClassifieds?', value: 'what is valclassifieds' },
    { label: 'Browse Categories', value: 'show categories' },
    { label: 'How do I buy something?', value: 'how to buy' },
    { label: 'Search Listings', value: 'search listings' },
  ],
}

const _GREETING_BUYER: SupportTopic = {
  title: 'Welcome Back',
  sections: [
    { type: 'text', content: 'Welcome back! I\'m ValBot, your Marketplace Assistant. I can help you search listings, understand buying processes, and answer marketplace questions. What can I help you find?' },
  ],
  suggestedActions: [
    { label: 'Find Phones Under 20000', value: 'search phones under 20000' },
    { label: 'How to Buy Safely?', value: 'how to buy safely' },
    { label: 'Popular Categories', value: 'show categories' },
    { label: 'Contact Seller Help', value: 'contact seller help' },
  ],
}

const _GREETING_SELLER: SupportTopic = {
  title: 'Welcome Back',
  sections: [
    { type: 'text', content: 'Welcome back! I\'m ValBot, your Marketplace Assistant. I can help you create better listings, reach buyers, and manage your sales. What would you like help with?' },
  ],
  suggestedActions: [
    { label: 'How to Post a Listing?', value: 'how to list' },
    { label: 'Pricing Suggestions', value: 'pricing help' },
    { label: 'Photo Tips', value: 'photo tips' },
    { label: 'Promote My Listing', value: 'promote listing' },
  ],
}

const _GREETING_ADMIN: SupportTopic = {
  title: 'Welcome',
  sections: [
    { type: 'text', content: 'Welcome! I\'m ValBot. I can help you review platform activity, check system status, and manage administrative tasks. What would you like to review?' },
  ],
  suggestedActions: [
    { label: 'Show Active Conversations', value: 'show active conversations' },
    { label: 'Recent Feedback', value: 'recent feedback' },
    { label: 'System Health', value: 'system status' },
    { label: 'Pending Escalations', value: 'pending escalations' },
  ],
}

const GOODBYE: SupportTopic = {
  title: 'Goodbye',
  sections: [
    { type: 'text', content: 'Goodbye! Happy buying and selling on ValClassifieds. Come back anytime!' },
  ],
  suggestedActions: [
    { label: 'Start New Chat', value: 'hello' },
  ],
}

const THANKS: SupportTopic = {
  title: 'Thanks',
  sections: [
    { type: 'text', content: 'You\'re welcome! Let me know if you need anything else.' },
  ],
  suggestedActions: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
}

const _SMALL_TALK: SupportTopic = {
  title: 'Chat',
  sections: [
    { type: 'text', content: 'Nice chatting with you! How can I help with your marketplace needs today?' },
  ],
  suggestedActions: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
}

// ─── Admin ─────────────────────────────────────────────────────────────────────

const ADMIN_DASHBOARD: SupportTopic = {
  title: 'Admin Dashboard',
  sections: [
    { type: 'heading', content: 'Admin Dashboard', level: 2 },
    { type: 'info_section', title: 'Available Admin Actions', items: [
      'System health and status monitoring',
      'User management and moderation',
      'Listing review and approval',
      'Reported content handling',
      'Analytics and usage statistics',
    ]},
  ],
  suggestedActions: [
    { label: 'System Health', value: 'system status' },
    { label: 'Recent Activity', value: 'recent activity' },
    { label: 'Pending Reports', value: 'pending reports' },
  ],
}

// ─── Fallback Topics ──────────────────────────────────────────────────────────

const LISTING_DETAILS_FALLBACK: SupportTopic = {
  title: 'Listing Details',
  sections: [
    { type: 'heading', content: 'Listing Details', level: 2 },
    { type: 'text', content: 'Which listing would you like to know more about? You can share the listing ID or name.' },
  ],
  suggestedActions: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
}

const BROWSE_FALLBACK: SupportTopic = {
  title: 'Browse Categories',
  sections: [
    { type: 'heading', content: 'Browse Categories', level: 2 },
    { type: 'subheading', content: 'Explore our marketplace categories' },
    { type: 'info_section', title: 'Popular Categories', items: [
      'Vehicles — Cars, Bikes, Scooters',
      'Mobiles & Tablets — Phones, Tablets, Accessories',
      'Electronics — Laptops, TVs, Cameras, Gaming',
      'Property — Rent, Buy, Commercial',
      'Jobs — Full-time, Part-time, Freelance',
      'Services — Home, Tech, Education, Events',
      'Home & Furniture — Sofas, Beds, Decor',
      'Fashion — Clothing, Shoes, Watches',
      'Pets — Dogs, Cats, Supplies',
      'Kids & Baby — Toys, Gear, Clothing',
      'Sports & Hobbies — Fitness, Outdoor, Music',
    ]},
  ],
  suggestedActions: [
    { label: 'Search Specific', value: 'search' },
    { label: 'Popular Items', value: 'popular items' },
  ],
}

const SEARCH_FALLBACK: SupportTopic = {
  title: 'Search Help',
  sections: [
    { type: 'heading', content: 'Search Help', level: 2 },
    { type: 'text', content: 'I\'d be happy to help you search. What type of item are you looking for, and do you have a budget in mind?' },
  ],
  suggestedActions: [
    { label: 'Browse Categories', value: 'show categories' },
    { label: 'Search Listings', value: 'search' },
  ],
}

const CONTACT_SELLER_FALLBACK: SupportTopic = {
  title: 'Contact Seller',
  sections: [
    { type: 'heading', content: 'Contacting a Seller', level: 2 },
    { type: 'text', content: 'To contact the seller, open the listing and tap "Contact Seller" or "Send Message".' },
    { type: 'info_section', title: 'Messaging Tips', items: [
      'Be specific about what you want to know.',
      'Mention your budget if negotiating.',
      'Keep all communication on the platform for your protection.',
      'Sellers typically respond within 24 hours.',
    ]},
    { type: 'safety_banner', variant: 'general_safety', title: 'Safety First', message: 'Never share personal financial details or pay before seeing the item.', tips: [
      'Meet in public places only.',
      'Inspect the item before paying.',
      'Use platform messaging only.',
    ]},
  ],
  suggestedActions: [
    { label: 'Safety Tips', value: 'safety tips' },
    { label: 'Report Seller', value: 'report seller' },
  ],
}

const COMPARISON_FALLBACK: SupportTopic = {
  title: 'Comparing Listings',
  sections: [
    { type: 'heading', content: 'Comparing Listings', level: 2 },
    { type: 'text', content: 'Comparing similar items helps you find the best value. Here\'s what to look for:' },
    { type: 'info_section', title: 'Comparison Checklist', items: [
      'Price — is it competitive for the condition?',
      'Condition — new, like new, good, fair, poor',
      'Location — closer means easier inspection',
      'Seller reputation — check ratings and response time',
      'Photos — clear, multiple angles, honest about defects',
    ]},
  ],
  suggestedActions: [
    { label: 'Refine Search', value: 'refine search' },
    { label: 'Buying Tips', value: 'buying tips' },
  ],
}

const RECOMMENDATION_FALLBACK: SupportTopic = {
  title: 'Recommendations',
  sections: [
    { type: 'heading', content: 'Recommendations', level: 2 },
    { type: 'text', content: 'Browse our featured listings or search for something specific.' },
    { type: 'empty_state', variant: 'no_results', title: 'No recommendations yet', description: 'Explore categories to find items you like.', action: { label: 'Browse Categories', value: 'show categories' } },
  ],
  suggestedActions: [
    { label: 'Browse Categories', value: 'show categories' },
    { label: 'Search Listings', value: 'search' },
  ],
}

// ─── Topic Registry ────────────────────────────────────────────────────────────

const TOPICS: Record<string, SupportTopic> = {
  // Registration & Account
  register: REGISTER,
  signup: REGISTER,
  'create account': REGISTER,
  login: LOGIN,
  'sign in': LOGIN,
  'forgot password': FORGOT_PASSWORD,
  'reset password': FORGOT_PASSWORD,
  'delete account': DELETE_ACCOUNT,

  // Listings Management
  'post listing': POST_LISTING,
  'create listing': POST_LISTING,
  'how to list': POST_LISTING,
  'how to post': POST_LISTING,
  'edit listing': EDIT_LISTING,
  'update listing': EDIT_LISTING,
  'delete listing': DELETE_LISTING,
  'remove listing': DELETE_LISTING,
  'listing advice': LISTING_ADVICE,

  // Buying & Selling
  'how to buy': _HOW_TO_BUY,
  'buying tips': _HOW_TO_BUY,
  'how to sell': _HOW_TO_SELL,
  'pricing help': PRICING_GUIDE,
  'pricing guide': PRICING_GUIDE,
  'how to price': PRICING_GUIDE,
  'photo tips': PHOTO_TIPS,
  'listing tips': PHOTO_TIPS,

  // Favorites & Messaging
  favorites: FAVORITES,
  'saved items': FAVORITES,
  messaging: MESSAGING,
  'contact seller': MESSAGING,
  'contact seller help': MESSAGING,
  notifications: NOTIFICATIONS,

  // Safety & Reporting
  'safety tips': SAFETY_GUIDE,
  'safety guide': SAFETY_GUIDE,
  'is it safe': SAFETY_GUIDE,
  scam: SAFETY_GUIDE,
  otp: SAFETY_GUIDE,
  upi: SAFETY_GUIDE,
  payment: SAFETY_GUIDE,
  pay: SAFETY_GUIDE,
  fake: SAFETY_GUIDE,
  fraud: SAFETY_GUIDE,
  report: REPORT,
  'report scam': REPORT,
  'report seller': REPORT,

  // Platform Help
  'platform fees': PLATFORM_FEES,
  fees: PLATFORM_FEES,
  'contact support': CONTACT_SUPPORT,
  help: CONTACT_SUPPORT,

  // Greeting & Small Talk
  greeting: _GREETING_VISITOR,
  hello: _GREETING_VISITOR,
  hi: _GREETING_VISITOR,
  bye: GOODBYE,
  goodbye: GOODBYE,
  'see you': GOODBYE,
  thank: THANKS,
  thanks: THANKS,
  'thank you': THANKS,

  // Admin
  admin: ADMIN_DASHBOARD,
  'system status': ADMIN_DASHBOARD,
  'recent activity': ADMIN_DASHBOARD,
  'pending reports': ADMIN_DASHBOARD,
  'admin access denied': ADMIN_DASHBOARD,
  'admin dashboard': ADMIN_DASHBOARD,

  // Greeting roles
  'greeting buyer': _GREETING_BUYER,
  'greeting seller': _GREETING_SELLER,
  'greeting admin': _GREETING_ADMIN,

  // Small Talk
  'small talk': _SMALL_TALK,

  // Fallbacks
  'listing details': LISTING_DETAILS_FALLBACK,
  'listing details fallback': LISTING_DETAILS_FALLBACK,
  'browse categories': BROWSE_FALLBACK,
  'browse categories fallback': BROWSE_FALLBACK,
  search: SEARCH_FALLBACK,
  'search help': SEARCH_FALLBACK,
  'contact seller fallback': CONTACT_SELLER_FALLBACK,
  comparison: COMPARISON_FALLBACK,
  'comparison fallback': COMPARISON_FALLBACK,
  recommendation: RECOMMENDATION_FALLBACK,
  'recommendation fallback': RECOMMENDATION_FALLBACK,
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Look up a support topic by keyword(s).
 * Searches through topic keys for the best match.
 */
export function getSupportTopic(query: string): SupportTopic | undefined {
  const lower = query.toLowerCase().trim()

  // Exact key match
  if (TOPICS[lower]) return TOPICS[lower]

  // Partial match — find the longest matching key
  let bestMatch: SupportTopic | undefined
  let bestLength = 0

  for (const [key, topic] of Object.entries(TOPICS)) {
    if (lower.includes(key) || key.includes(lower)) {
      if (key.length > bestLength) {
        bestLength = key.length
        bestMatch = topic
      }
    }
  }

  return bestMatch
}

/**
 * Get all available support topic keys.
 */
export function getSupportTopics(): string[] {
  return [...new Set(Object.keys(TOPICS))]
}