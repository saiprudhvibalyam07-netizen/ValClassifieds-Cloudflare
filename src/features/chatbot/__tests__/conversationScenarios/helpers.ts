import { runConversationPipeline } from '../../services/conversationPipeline'
import { conversationContext } from '../../services/conversationContext'
import { getHandler } from '../../services/intentHandlers'
import type { Intent } from '../../types'

export interface ScenarioResult {
  classification: { intent: Intent; entities?: unknown; missingInformation?: string[] }
  response: string
  structuredResponse?: unknown
  strategy?: string
  context?: unknown
  searchCalls?: { args: unknown[] }[]
}

export function runScenario(message: string, role: 'visitor' | 'user' = 'visitor'): Promise<ScenarioResult> {
  conversationContext.reset()
  return runConversationPipeline(message, role).then((r) => ({
    classification: {
      intent: r?.classification?.intent as Intent,
      entities: r?.classification?.entities,
      missingInformation: r?.classification?.missingInformation,
    },
    response: r?.response ?? '',
    structuredResponse: r?.structuredResponse,
    strategy: r?.strategy,
    context: r?.context,
  }))
}

const handlerName = (intent: Intent) => getHandler(intent).constructor.name

export function assertScenario(r: ScenarioResult, intent: Intent): void {
  expect(r.classification.intent).toBe(intent)
  expect(handlerName(r.classification.intent)).toBe(handlerName(intent))
  const marker = KB_MARKER[intent]
  expect(r.response).toMatch(marker)
}

export function assertListingGrid(r: ScenarioResult): void {
  const sr = (r.structuredResponse ?? {}) as { sections?: Array<{ type?: string }> }
  const sections = Array.isArray(sr.sections) ? sr.sections : []
  const hasGrid = sections.some((b) => b.type === 'listing_grid' || b.type === 'listings')
  expect(hasGrid).toBe(true)
}

export function assertNoListingGrid(r: ScenarioResult): void {
  const sr = (r.structuredResponse ?? {}) as { sections?: Array<{ type?: string }> }
  const sections = Array.isArray(sr.sections) ? sr.sections : []
  const hasGrid = sections.some((b) => b.type === 'listing_grid' || b.type === 'listings')
  expect(hasGrid).toBe(false)
}

export const KB_MARKER: Record<Intent, RegExp> = {
  GREETING: /hello|hi|hey|yo|good|welcome|marketplace|help|val/i,
  FAREWELL: /bye|take care|goodbye|see you/i,
  THANK_YOU: /welcome|glad|happy|thank/i,
  SEARCH_LISTINGS:
    /listing|category|search|popular|found|result|price|car|bike|phone|city|area|looking|located|prefer|salary|find|which|property|available|want|tell|scooter|tablet|camera|laptop|vehicle|job|service|seller/i,
  BROWSE_CATEGORIES: /browse|category|section|explore|popular/i,
  LISTING_DETAILS: /listing|detail|found|view|price|contact/i,
  BUYING_HELP: /buy|payment|safe|deliver|verify|photo|inspect|negotiat|price|advice|seller|tip|fraud/i,
  SELLING_HELP: /sell|list|advice|post|create|title|description|photo|price|boost|renew|advert|category/i,
  LISTING_ADVICE: /tip|advice|photo|description|title|attract|write|best time|negotiat/i,
  PRICING_HELP: /price|value|worth|market|advice|pricing|mean/i,
  SAFETY: /safe|scam|otp|fraud|meet|payment|trust|phish|listing|fake|verify|report/i,
  CONTACT_SELLER: /contact|seller|message|chat|reply|reach|forward/i,
  PLATFORM_HELP: /help|valclassifieds|platform|feature|notification|privacy|setting|promote|boost|highlight/i,
  ACCOUNT_HELP: /account|password|login|profile|sign|email|verify|delete|reset/i,
  LISTING_MANAGEMENT: /manage|listing|edit|delete|pause|activate|renew|boost|republish|extend|view|hidden/i,
  COMPARISON: /compar|versus|vs|difference|better|spec/i,
  RECOMMENDATION: /recommend|suggest|best|popular|top/i,
  SMALL_TALK: /nice|great|cool|awesome|weather|weekend/i,
  NAVIGATION: /open|go to|messages|favorite|profile|saved|navigat|inbox/i,
  ADMIN_ACTION: /admin|dashboard|manage|settings/i,
  OFF_TOPIC: /outside|wheelhouse|buy|sell|classified|focus|sorry|help you|chat|expert/i,
  OFFENSIVE: /respect|inappropriate|guidelines|kind/i,
  UNSUPPORTED: /buy|sell|chat|classifieds|not|help|unable|instead|marketplace/i,
  UNKNOWN: /help|find|need|sorry|clarif|didn't|get|more|tell me|could you|confused|quite|understand/i,
  ERROR: /error|something|wrong|issue|problem|sorry/i,
}
