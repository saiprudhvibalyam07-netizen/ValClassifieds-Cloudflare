import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { LISTING } from './scenarioData'

describe('conversation QA: listing management', () => {
  it.each(LISTING)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
