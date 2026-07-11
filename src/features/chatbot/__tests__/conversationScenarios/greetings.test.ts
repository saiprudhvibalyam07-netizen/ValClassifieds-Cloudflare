import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { GREETINGS } from './scenarioData'

describe('conversation QA: greetings', () => {
  it.each(GREETINGS)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
