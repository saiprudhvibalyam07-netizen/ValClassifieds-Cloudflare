import { describe, it, beforeEach } from 'vitest'
import { runScenario, assertScenario } from './helpers'
import { END_TO_END_FLOWS } from './scenarioData'

describe('conversation QA: end-to-end multi-turn flows', () => {
  beforeEach(() => {})
  it.each(END_TO_END_FLOWS.map((f) => [f.name, f.turns] as [string, typeof f.turns]))(
    '%s',
    async (_name, turns) => {
      for (const [msg, intent] of turns) {
        const r = await runScenario(msg)
        assertScenario(r, intent)
      }
    }
  )
})
