import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { ACCOUNT } from './scenarioData'

describe('conversation QA: account', () => {
  it.each(ACCOUNT)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
