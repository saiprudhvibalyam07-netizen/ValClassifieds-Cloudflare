import type { Intent } from '../../types'

export type Scenario = [message: string, intent: Intent]

export const GREETINGS: Scenario[] = [
  ['hello', 'GREETING'],
  ['hi', 'GREETING'],
  ['hey', 'GREETING'],
  ['good morning', 'GREETING'],
  ['good evening', 'GREETING'],
  ['hi there', 'GREETING'],
  ['hey valbot', 'GREETING'],
  ['greetings', 'GREETING'],
  ['yo', 'GREETING'],
  ['hello friend', 'GREETING'],
]

export const BUYING: Scenario[] = [
  ['Need a car', 'SEARCH_LISTINGS'],
  ['Looking for bike', 'SEARCH_LISTINGS'],
  ['Buy laptop', 'SEARCH_LISTINGS'],
  ['Apartment', 'SEARCH_LISTINGS'],
  ['how to buy a phone', 'SEARCH_LISTINGS'],
  ['I want to purchase a sofa', 'SEARCH_LISTINGS'],
  ['buy a used car', 'SEARCH_LISTINGS'],
  ['cheap bikes', 'SEARCH_LISTINGS'],
  ['buy tablet', 'SEARCH_LISTINGS'],
  ['find a good camera', 'SEARCH_LISTINGS'],
  ['should I buy new or used', 'SEARCH_LISTINGS'],
  ['budget smartphone', 'SEARCH_LISTINGS'],
  ['I am looking for a scooter', 'SEARCH_LISTINGS'],
  ['how to inspect a used vehicle', 'SEARCH_LISTINGS'],
  ['Compare products', 'COMPARISON'],
  ['best laptop under 50000', 'COMPARISON'],
  ['Negotiation tips', 'LISTING_ADVICE'],
  ['Photo tips', 'LISTING_ADVICE'],
  ['how to write description', 'LISTING_ADVICE'],
  ['what photos attract buyers', 'BUYING_HELP'],
  ['Advance payment', 'BUYING_HELP'],
  ['payment before delivery', 'BUYING_HELP'],
  ['how to verify buyer', 'BUYING_HELP'],
  ['payment failed', 'BUYING_HELP'],
]

export const SELLING: Scenario[] = [
  ['Sell my bike', 'SELLING_HELP'],
  ['Sell my phone', 'SELLING_HELP'],
  ['Post ad', 'SELLING_HELP'],
  ['Create listing', 'SELLING_HELP'],
  ['how to sell my sofa', 'SELLING_HELP'],
  ['write a good listing title', 'SELLING_HELP'],
  ['sell my car fast', 'SELLING_HELP'],
  ['best time to sell', 'SELLING_HELP'],
  ['sell my apartment', 'SELLING_HELP'],
  ['sell my furniture', 'SELLING_HELP'],
  ['list my bike for sale', 'SELLING_HELP'],
  ['pricing strategy', 'PRICING_HELP'],
  ['boost my advertisement', 'SELLING_HELP'],
  ['pause advertisement', 'SELLING_HELP'],
  ['republish listing', 'SELLING_HELP'],
  ['my post is hidden', 'SELLING_HELP'],
  ['how to remove my post', 'SELLING_HELP'],
  ['modify listing', 'SELLING_HELP'],
  ['relist my item', 'SELLING_HELP'],
]

export const SEARCH: Scenario[] = [
  ['car', 'SEARCH_LISTINGS'],
  ['bike', 'SEARCH_LISTINGS'],
  ['phone', 'SEARCH_LISTINGS'],
  ['laptop', 'SEARCH_LISTINGS'],
  ['house', 'SEARCH_LISTINGS'],
  ['Honda City', 'SEARCH_LISTINGS'],
  ['MacBook', 'SEARCH_LISTINGS'],
  ['iPhone', 'SEARCH_LISTINGS'],
  ['Bike under 1 lakh', 'SEARCH_LISTINGS'],
  ['House in Hyderabad', 'SEARCH_LISTINGS'],
  ['search for phones', 'SEARCH_LISTINGS'],
  ['find cars in Delhi', 'SEARCH_LISTINGS'],
  ['show me laptops under 30000', 'SEARCH_LISTINGS'],
  ['villas in Bangalore', 'SEARCH_LISTINGS'],
  ['jobs in Mumbai', 'SEARCH_LISTINGS'],
  ['services near me', 'SEARCH_LISTINGS'],
  ['used bikes', 'SEARCH_LISTINGS'],
  ['tablets', 'SEARCH_LISTINGS'],
  ['sedan cars', 'SEARCH_LISTINGS'],
  ['find mobiles', 'SEARCH_LISTINGS'],
  ['used cars', 'SEARCH_LISTINGS'],
  ['apartments for rent', 'SEARCH_LISTINGS'],
  ['tablet under 10000', 'SEARCH_LISTINGS'],
  ['camera', 'SEARCH_LISTINGS'],
  ['sofa', 'SEARCH_LISTINGS'],
  ['vehicles', 'SEARCH_LISTINGS'],
  ['electronics', 'SEARCH_LISTINGS'],
  ['furniture', 'SEARCH_LISTINGS'],
  ['search bikes', 'SEARCH_LISTINGS'],
  ['cheap laptops', 'SEARCH_LISTINGS'],
]

export const MESSAGING: Scenario[] = [
  ['Contact seller', 'CONTACT_SELLER'],
  ['Seller not replying', 'CONTACT_SELLER'],
  ['message the seller', 'CONTACT_SELLER'],
  ['how do I message a seller', 'CONTACT_SELLER'],
  ['how to message a buyer', 'NAVIGATION'],
  ['message a buyer', 'NAVIGATION'],
  ['forward message', 'NAVIGATION'],
  ['seller is rude', 'SELLING_HELP'],
  ['can I call the seller', 'SELLING_HELP'],
  ['is this seller legit', 'SELLING_HELP'],
  ['chat with seller', 'SELLING_HELP'],
  ['chat safety', 'SAFETY'],
  ['Send attachment', 'SEARCH_LISTINGS'],
  ['Report conversation', 'SEARCH_LISTINGS'],
  ['share photos in chat', 'SEARCH_LISTINGS'],
]

export const SAFETY: Scenario[] = [
  ['Fake seller', 'SAFETY'],
  ['OTP scam', 'SAFETY'],
  ['Report seller', 'SAFETY'],
  ['scam warning', 'SAFETY'],
  ['fake listing', 'SAFETY'],
  ['safety tips', 'SAFETY'],
  ['OTP scam warning', 'SAFETY'],
  ['upi fraud', 'SEARCH_LISTINGS'],
  ['meet in public', 'SEARCH_LISTINGS'],
  ["don't share OTP", 'SEARCH_LISTINGS'],
  ['escrow', 'SEARCH_LISTINGS'],
  ['serial number check', 'SEARCH_LISTINGS'],
]

export const ACCOUNT: Scenario[] = [
  ['Forgot password', 'ACCOUNT_HELP'],
  ['Reset my password', 'ACCOUNT_HELP'],
  ["Can't log in", 'ACCOUNT_HELP'],
  ['Delete account', 'ACCOUNT_HELP'],
  ['update profile picture', 'ACCOUNT_HELP'],
  ['how to sign up', 'ACCOUNT_HELP'],
  ['login issues', 'ACCOUNT_HELP'],
  ['change password', 'ACCOUNT_HELP'],
  ['I forgot my password', 'ACCOUNT_HELP'],
  ['how to reset password', 'ACCOUNT_HELP'],
  ['login problem', 'ACCOUNT_HELP'],
  ['recover my password', 'ACCOUNT_HELP'],
  ['my login is not working', 'ACCOUNT_HELP'],
  ['how to change my password', 'ACCOUNT_HELP'],
  ['sign in issue', 'ACCOUNT_HELP'],
  ['Verify email', 'SEARCH_LISTINGS'],
  ['two factor', 'SEARCH_LISTINGS'],
]

export const LISTING: Scenario[] = [
  ['edit my listing', 'LISTING_MANAGEMENT'],
  ['delete my ad', 'LISTING_MANAGEMENT'],
  ['view my listings', 'LISTING_MANAGEMENT'],
  ['pause my listing', 'LISTING_MANAGEMENT'],
  ['edit ad title', 'LISTING_MANAGEMENT'],
  ['activate my listing', 'LISTING_MANAGEMENT'],
  ['renew my ad', 'SEARCH_LISTINGS'],
  ['extend my ad', 'SEARCH_LISTINGS'],
  ['feature my advertisement', 'PLATFORM_HELP'],
  ['listing expired', 'SELLING_HELP'],
  ['how to repost', 'SELLING_HELP'],
  ['change listing category', 'SELLING_HELP'],
  ['extend listing duration', 'SELLING_HELP'],
  ['remove listing', 'SELLING_HELP'],
  ['listing status', 'SELLING_HELP'],
  ['duplicate listing', 'SELLING_HELP'],
]

export const NAVIGATION: Scenario[] = [
  ['messages', 'NAVIGATION'],
  ['favorites', 'NAVIGATION'],
  ['my profile', 'NAVIGATION'],
  ['open messages', 'NAVIGATION'],
  ['view favorites', 'NAVIGATION'],
  ['go to profile', 'NAVIGATION'],
  ['show my saved items', 'NAVIGATION'],
  ['where are my messages', 'NAVIGATION'],
  ['my favorites', 'NAVIGATION'],
  ['open my messages', 'NAVIGATION'],
  ['Profile', 'NAVIGATION'],
]

export const PLATFORM: Scenario[] = [
  ['notification settings', 'PLATFORM_HELP'],
  ['privacy settings', 'PLATFORM_HELP'],
  ['feature my advertisement', 'PLATFORM_HELP'],
]

export const ERRORS: Scenario[] = [
  ['something went wrong', 'SEARCH_LISTINGS'],
  ['page not loading', 'SEARCH_LISTINGS'],
  ['error 500', 'SEARCH_LISTINGS'],
  ['search not working', 'SEARCH_LISTINGS'],
  ['app crashed', 'SEARCH_LISTINGS'],
  ['button not responding', 'SEARCH_LISTINGS'],
  ['loading forever', 'SEARCH_LISTINGS'],
  ['404 error', 'SEARCH_LISTINGS'],
  ['images not loading', 'SEARCH_LISTINGS'],
  ['the app is stuck', 'UNKNOWN'],
  ["can't see my messages", 'NAVIGATION'],
  ['listing not found', 'SELLING_HELP'],
]

export const OFF_TOPIC: Scenario[] = [
  ['what is the weather today', 'OFF_TOPIC'],
  ['who won the cricket match', 'OFF_TOPIC'],
  ['what is the capital of France', 'OFF_TOPIC'],
  ['how to learn python', 'OFF_TOPIC'],
  ['best movie 2024', 'OFF_TOPIC'],
  ['recipe for pasta', 'OFF_TOPIC'],
  ['explain quantum physics', 'OFF_TOPIC'],
  ['who is the president', 'OFF_TOPIC'],
  ['tell me a joke', 'UNSUPPORTED'],
  ['write me a poem', 'UNSUPPORTED'],
]

export const ALL_SCENARIOS: Scenario[] = [
  ...GREETINGS,
  ...BUYING,
  ...SELLING,
  ...SEARCH,
  ...MESSAGING,
  ...SAFETY,
  ...ACCOUNT,
  ...LISTING,
  ...NAVIGATION,
  ...PLATFORM,
  ...ERRORS,
  ...OFF_TOPIC,
]

export interface Flow {
  name: string
  turns: Scenario[]
}

export const END_TO_END_FLOWS: Flow[] = [
  {
    name: 'browse then search',
    turns: [
      ['hello', 'GREETING'],
      ['car in Delhi', 'SEARCH_LISTINGS'],
      ['find cars in Delhi', 'SEARCH_LISTINGS'],
    ],
  },
  {
    name: 'sell a bike end to end',
    turns: [
      ['Sell my bike', 'SELLING_HELP'],
      ['list my bike for sale', 'SELLING_HELP'],
    ],
  },
  {
    name: 'compare products then buying help',
    turns: [
      ['Compare products', 'COMPARISON'],
      ['payment before delivery', 'BUYING_HELP'],
    ],
  },
  {
    name: 'report a scam',
    turns: [
      ['OTP scam', 'SAFETY'],
      ['Report seller', 'SAFETY'],
    ],
  },
  {
    name: 'navigate to messages then profile',
    turns: [
      ['messages', 'NAVIGATION'],
      ['go to profile', 'NAVIGATION'],
    ],
  },
]
