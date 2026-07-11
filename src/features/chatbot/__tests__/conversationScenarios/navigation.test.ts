import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { NAVIGATION } from './scenarioData'

describe('conversation QA: navigation', () => {
  it.each(NAVIGATION)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
