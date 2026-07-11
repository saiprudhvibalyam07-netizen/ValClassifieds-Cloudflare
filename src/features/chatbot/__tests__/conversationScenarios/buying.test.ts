import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { BUYING } from './scenarioData'

describe('conversation QA: buying', () => {
  it.each(BUYING)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
