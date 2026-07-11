import type { Intent, IntentHandler } from '../../types'
import { GreetingHandler } from './GreetingHandler'
import { FarewellHandler } from './FarewellHandler'
import { ThankYouHandler } from './ThankYouHandler'
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
import { ListingManagementHandler } from './ListingManagementHandler'
import { OffTopicHandler } from './OffTopicHandler'
import { UnsupportedHandler } from './UnsupportedHandler'
import { SmallTalkHandler } from './SmallTalkHandler'
import { AdminHandler } from './AdminHandler'
import { ListingAdvisorHandler } from './ListingAdvisorHandler'
import { NavigationHandler } from './NavigationHandler'

const handlers: Record<Intent, IntentHandler> = {
  GREETING: new GreetingHandler(),
  FAREWELL: new FarewellHandler(),
  THANK_YOU: new ThankYouHandler(),
  SEARCH_LISTINGS: new SearchHandler(),
  BROWSE_CATEGORIES: new BrowseHandler(),
  LISTING_DETAILS: new ListingHandler(),
  BUYING_HELP: new BuyingHandler(),
  SELLING_HELP: new SellingHandler(),
  LISTING_ADVICE: new ListingAdvisorHandler(),
  PRICING_HELP: new PricingHandler(),
  SAFETY: new SafetyHandler(),
  CONTACT_SELLER: new ContactSellerHandler(),
  PLATFORM_HELP: new PlatformHandler(),
  ACCOUNT_HELP: new AccountHandler(),
  LISTING_MANAGEMENT: new ListingManagementHandler(),
  COMPARISON: new ComparisonHandler(),
  RECOMMENDATION: new RecommendationHandler(),
  SMALL_TALK: new SmallTalkHandler(),
  OFF_TOPIC: new OffTopicHandler(),
  NAVIGATION: new NavigationHandler(),
  ADMIN_ACTION: new AdminHandler(),
  OFFENSIVE: new UnsupportedHandler(),
  UNSUPPORTED: new UnsupportedHandler(),
  UNKNOWN: new UnsupportedHandler(),
}

export function getHandler(intent: Intent): IntentHandler {
  return handlers[intent] ?? handlers.UNKNOWN
}
