import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { SAFETY } from './scenarioData'

describe('conversation QA: safety', () => {
  it.each(SAFETY)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
