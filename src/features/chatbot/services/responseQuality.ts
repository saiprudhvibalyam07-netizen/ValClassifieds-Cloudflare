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
