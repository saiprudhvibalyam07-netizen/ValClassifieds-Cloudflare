# ValBot QA & Stabilization — Working Memory

## Objective
- Stabilize ValBot intent classification (Phases 12A–12B) and build a Conversation QA test suite (Phase 13) that verifies the full pipeline (intent → handler → KB → response) for ~180 real customer scenarios, WITHOUT modifying any chatbot behavior.

## Phase Constraints (frozen boundaries)
- 12A: only intent classification (types.ts, intentClassifier.ts, NavigationHandler). NOT: KB, Search logic, DB, Supabase, UI, Conversation Memory, Auth.
- 12B: only marketplace search mapping (liveCategoryMapping.ts, marketplaceSearch.ts). NOT: KB, Intent Classification, Conversation Memory, Auth, UI.
- 13: only tests. NOT: KB, Intent Classification, Search logic, Conversation Pipeline, UI, DB, Auth, Response wording.

## Key Facts (verified)
- Live DB `categories.slug` = `community | housing | jobs | services | vehicles | items-for-sale`. canonicalCategories.ts slugs (mobiles-tablets, electronics, property, …) are NOT in DB. liveCategoryMapping: property→housing, vehicles→vehicles, jobs→jobs, services→services, community→community, else→items-for-sale.
- Pipeline guard: `intent = isOffTopic(msg) ? 'OFF_TOPIC' : classifyIntent(msg).intent`. `Swift` collides with Swift-language pattern → OFF_TOPIC (regression from guard, not classifier).
- `runConversationPipeline(msg, role)` sets intent, then runs getHandler(intent).handle. Handler derived via `getHandler(intent).constructor.name` (handler exists for every Intent).
- `conversationContext.reset()` (no arg) sets context = {...initialContext} → fully clears lastIntent/lastEntities. No leakage. Always reset before a scenario.
- searchListings params: `MarketplaceSearchParams { categories?: string[]; maxPrice?: number; location?: string; ... }`. Structured search responses carry `structuredResponse.sections[]` with `type: 'listing_grid'` (NOT `blocks`).
- marketplaceSearch must be MOCKED in tests that assert search results/grid: real Supabase hangs outside a test runner; with mock, search is instant and deterministic.

## Done
- Phase 12A: NAVIGATION intent + NavigationHandler; strongKeywords logic; product-category shortcut guard. Build + tests green.
- Phase 12B: liveCategoryMapping.ts; wired into marketplaceSearch.searchListings (translate categories, skip text ILIKE for pure-category queries). Build + tests green.
- Post-12B classifier: search-intent fallback before UNKNOWN (category/brand present, or residual ≤3-word noun phrase) → SEARCH_LISTINGS.
- Phase 13 QA suite: `src/features/chatbot/__tests__/conversationScenarios/` — helpers.ts, scenarioData.ts, 13 test files (greetings, buying, selling, search, messaging, safety, account, listing, navigation, platform, errors, offTopic, endToEndFlows). Built from an authoritative pipeline-intent probe (diag.test.ts, since deleted) so every expected intent matches real behavior.

## Current Status (verified 2026-07-11)
- `npx vitest run` → 692 passed (53 files). Conversation QA subset: 190 passed / 190.
- `npm run build` → success (chunk-size warning only).
- No outstanding failures. diag.test.ts deleted.

## Gotchas
- Do NOT assert Chatbot behavior by calling real Supabase in plain node/tsx; only the vitest runner context + a mocked searchListings work.
- vitest swallows console.log; write diagnostics to /tmp instead.
- If a QA assertion fails on intent, re-probe via a temp diag test (mock marketplaceSearch) rather than guessing.

## Next (optional)
- Extend scenarioData.ts with more multi-turn flows or edge cases if desired (add to END_TO_END_FLOWS; keep both turns diag-confirmed).
- If classifier/search behavior legitimately changes later, regenerate expected intents via the diag probe approach.
