export function pickAcknowledgement(): string {
  const phrases = [
    'Certainly.',
    'I can help with that.',
    'Of course.',
    "I'd be happy to help.",
    'Let me look into that for you.',
    'Thanks for reaching out.',
    'Great question.',
    "Let's find the right option.",
    'Thanks for the details.',
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function pickSearchAcknowledgement(category?: string): string {
  const withCat = [
    `I'd be happy to help you find a ${category}.`,
    `Let me help you find the right ${category}.`,
    `I can help you find a ${category} that matches your needs.`,
    `Let's search for ${category} listings together.`,
  ]
  const generic = [
    "I'd be happy to help you find what you're looking for.",
    "Let me help you search through available listings.",
    "I can help you find the right item.",
  ]
  const pool = category ? withCat : generic
  return pool[Math.floor(Math.random() * pool.length)]
}

export function pickEmpathyPhrase(): string {
  const phrases = [
    "I understand that can be frustrating.",
    "I'm sorry you're experiencing that.",
    "I appreciate your patience.",
    "That's completely understandable.",
    "I can see why that would be concerning.",
    "I understand how frustrating that can be.",
    "Let's work through it together.",
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function pickNoResultPhrase(desc: string): string {
  const phrases = [
    `No exact matches were found for ${desc}.`,
    `There aren't any matching ${desc} listings right now.`,
    `I couldn't find an exact match for ${desc}.`,
    `I didn't find any ${desc} listings that match those filters.`,
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function isFrustratedQuery(text: string): boolean {
  const frustratedPatterns = [
    /(not\s+)?(getting|have|received?)\s+(no|zero|any|few)\s+(views?|reply|response|interest|inquiry|lead)/i,
    /(nobody|no\s+one)\s+(reply|responded|contacted|messaged)/i,
    /(i'?m?\s+)?(disappointed|frustrated|annoyed|upset|sad|tired|fed\s+up)/i,
    /(got|get|received?)\s+(scammed|cheated|fraud)/i,
    /(can'?t|cannot|couldn'?t)\s+sell/i,
    /(can'?t|cannot|couldn'?t)\s+find\s+(anything|something)\s+(after|despite)/i,
    /searched?\s+(all\s+day|for\s+hours|everywhere|whole\s+day)/i,
    /waste\s+(of\s+)?(time|money)/i,
    /not\s+(selling|working|getting)\s+(well|fast|quickly)/i,
    /why\s+(is\s+)?(no\s+one|nobody)/i,
  ]
  return frustratedPatterns.some(p => p.test(text))
}

export function pickGuidancePhrase(): string {
  const phrases = [
    'Here are a few things to consider:',
    'Let me share some helpful information:',
    'Here is what I would recommend:',
    'Consider the following:',
    'Here are some useful details:',
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function pickSuggestionPrefix(): string {
  const phrases = [
    'Based on what you have shared',
    'From the available information',
    'Looking at the current listings',
    'Considering your preferences',
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function redirectMessage(capability?: string): string {
  if (capability) {
    return `I can't perform that action, but I can help you ${capability}.`
  }
  return "I'm here to help with marketplace-related questions, such as buying, selling, searching, or managing your account."
}

export function gracefulError(): string {
  return "I'm having trouble retrieving information right now. Please try again in a moment. In the meantime, I can help refine your search or answer questions about the marketplace."
}

export function qualifyRecommendation(text: string): string {
  const qualifiers = [
    'Based on your preferences',
    'From the available listings',
    'This appears to match what you are looking for',
    'Here are a few options to consider',
  ]
  const q = qualifiers[Math.floor(Math.random() * qualifiers.length)]
  return `${q}, ${text.charAt(0).toLowerCase() + text.slice(1)}`
}

export function pickNextActionIntro(): string {
  const phrases = [
    'Here are some helpful next steps:',
    'What would you like to do next?',
    'Consider taking one of these actions:',
    'Here is what you can do from here:',
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}
