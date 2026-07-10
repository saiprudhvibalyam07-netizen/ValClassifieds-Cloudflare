import type { Intent, MarketplaceEntities, ClarificationResult } from '../types'

const CLARIFICATION_QUESTIONS: Record<string, string[]> = {
  category: [
    'What type of item are you looking for?',
    'Which category interests you?',
    'What kind of product do you need?',
  ],
  budget: [
    "What's your budget?",
    'How much are you willing to spend?',
    'Do you have a budget in mind?',
  ],
  location: [
    'Which city or area are you looking in?',
    'Where would you like to find this?',
    'What location works for you?',
  ],
  listing: [
    'Which listing are you asking about?',
    'Do you have the listing ID or name?',
    'Can you tell me which item you mean?',
  ],
  item: [
    'What item would you like pricing help with?',
    'Which product do you need a price estimate for?',
    'What are you trying to price?',
  ],
  'items to compare': [
    'Which items would you like to compare?',
    'What products should I compare for you?',
    'Tell me the items you want to compare.',
  ],
  'what you need': [
    'What are you looking for?',
    'Tell me what you need help finding.',
    'What kind of recommendation do you need?',
  ],
}

const SEARCH_MISSING_QUESTIONS: Record<string, string[]> = {
  category: [
    'What type of item are you looking for?',
    'Which category should I search in?',
  ],
  budget: [
    "What's your budget?",
    'How much are you looking to spend?',
  ],
  location: [
    'Which city or area should I search in?',
    'Where are you looking?',
  ],
}

function pickQuestion(field: string): string {
  const questions = CLARIFICATION_QUESTIONS[field] ?? SEARCH_MISSING_QUESTIONS[field]
  if (!questions || questions.length === 0) return `Could you provide more details about the ${field}?`
  return questions[Math.floor(Math.random() * questions.length)]
}

export function getClarification(
  intent: Intent,
  _entities: MarketplaceEntities,
  missingInformation: string[]
): ClarificationResult {
  if (missingInformation.length === 0) {
    return { shouldClarify: false, question: '', missingFields: [] }
  }

  if (intent === 'SEARCH_LISTINGS') {
    const priorityOrder = ['category', 'budget', 'location']
    for (const field of priorityOrder) {
      if (missingInformation.includes(field)) {
        const questions = SEARCH_MISSING_QUESTIONS[field]
        const question = questions?.[0] ?? pickQuestion(field)
        return {
          shouldClarify: true,
          question,
          missingFields: [field],
        }
      }
    }
  }

  const field = missingInformation[0]
  return {
    shouldClarify: true,
    question: pickQuestion(field),
    missingFields: [field],
  }
}
