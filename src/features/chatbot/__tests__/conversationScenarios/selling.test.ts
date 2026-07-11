import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { SELLING } from './scenarioData'

describe('conversation QA: selling', () => {
  it.each(SELLING)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
