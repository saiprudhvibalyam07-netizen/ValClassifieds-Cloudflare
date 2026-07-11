import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { ERRORS } from './scenarioData'

describe('conversation QA: errors and technical issues', () => {
  it.each(ERRORS)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
