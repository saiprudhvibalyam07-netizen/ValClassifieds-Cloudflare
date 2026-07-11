import { describe, it } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { OFF_TOPIC } from './scenarioData'

describe('conversation QA: off-topic and unsupported', () => {
  it.each(OFF_TOPIC)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})
