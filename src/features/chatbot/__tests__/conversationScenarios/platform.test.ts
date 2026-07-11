import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { PLATFORM } from './scenarioData'

describe('conversation QA: platform help', () => {
  it.each(PLATFORM)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
