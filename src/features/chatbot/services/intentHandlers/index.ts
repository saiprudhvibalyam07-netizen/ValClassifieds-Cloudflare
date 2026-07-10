import type { Intent, IntentHandler } from '../../types'
import { GreetingHandler } from './GreetingHandler'
import { SearchHandler } from './SearchHandler'
import { BrowseHandler } from './BrowseHandler'
import { ListingHandler } from './ListingHandler'
import { BuyingHandler } from './BuyingHandler'
import { SellingHandler } from './SellingHandler'
import { PricingHandler } from './PricingHandler'
import { SafetyHandler } from './SafetyHandler'
import { ContactSellerHandler } from './ContactSellerHandler'
import { PlatformHandler } from './PlatformHandler'
import { AccountHandler } from './AccountHandler'
import { RecommendationHandler } from './RecommendationHandler'
import { ComparisonHandler } from './ComparisonHandler'
import { UnsupportedHandler } from './UnsupportedHandler'
import { SmallTalkHandler } from './SmallTalkHandler'
import { AdminHandler } from './AdminHandler'

const handlers: Record<Intent, IntentHandler> = {
  GREETING: new GreetingHandler(),
  SEARCH_LISTINGS: new SearchHandler(),
  BROWSE_CATEGORIES: new BrowseHandler(),
  LISTING_DETAILS: new ListingHandler(),
  BUYING_HELP: new BuyingHandler(),
  SELLING_HELP: new SellingHandler(),
  LISTING_ADVICE: new SellingHandler(),
  PRICING_HELP: new PricingHandler(),
  SAFETY: new SafetyHandler(),
  CONTACT_SELLER: new ContactSellerHandler(),
  PLATFORM_HELP: new PlatformHandler(),
  ACCOUNT_HELP: new AccountHandler(),
  COMPARISON: new ComparisonHandler(),
  RECOMMENDATION: new RecommendationHandler(),
  SMALL_TALK: new SmallTalkHandler(),
  ADMIN_ACTION: new AdminHandler(),
  OFFENSIVE: new UnsupportedHandler(),
  UNSUPPORTED: new UnsupportedHandler(),
  UNKNOWN: new UnsupportedHandler(),
}

export function getHandler(intent: Intent): IntentHandler {
  return handlers[intent] ?? handlers.UNKNOWN
}
