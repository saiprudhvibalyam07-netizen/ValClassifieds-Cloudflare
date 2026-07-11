import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { MESSAGING } from './scenarioData'

describe('conversation QA: messaging', () => {
  it.each(MESSAGING)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
