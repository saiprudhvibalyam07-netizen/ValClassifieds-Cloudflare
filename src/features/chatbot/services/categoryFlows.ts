import type { MarketplaceEntities } from '../types'

export interface CategoryClarificationField {
  key: string
  questions: string[]
  explanation: string
  mandatory: boolean
  entityKey: keyof MarketplaceEntities
}

export interface CategoryFlowConfig {
  categorySlug: string
  fields: CategoryClarificationField[]
  minMandatoryFields: number
  nearbyCategories: string[]
  progressiveSearch: boolean
}

const CATEGORY_FLOWS: Record<string, CategoryFlowConfig> = {
  vehicles: {
    categorySlug: 'vehicles',
    fields: [
      {
        key: 'category',
        questions: [
          'Are you looking for a car, bike, or another type of vehicle?',
          'What type of vehicle interests you?',
        ],
        explanation: 'to find the right type of vehicle for you',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget range for this vehicle?",
          'How much are you looking to spend on the vehicle?',
        ],
        explanation: "so I can show vehicles within your price range",
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'brand',
        questions: [
          'Any preferred brand? (Toyota, Honda, Hyundai, etc.)',
          'Do you have a specific brand in mind?',
        ],
        explanation: 'to narrow down the options',
        mandatory: false,
        entityKey: 'brand',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking in?',
          'Where are you searching for a vehicle?',
        ],
        explanation: 'to find vehicles available near you',
        mandatory: false,
        entityKey: 'location',
      },
      {
        key: 'condition',
        questions: [
          'Are you looking for a new or used vehicle?',
          'What condition are you looking for?',
        ],
        explanation: 'to match your preference on condition',
        mandatory: false,
        entityKey: 'condition',
      },
    ],
    minMandatoryFields: 1,
    nearbyCategories: ['vehicles'],
    progressiveSearch: true,
  },
  property: {
    categorySlug: 'property',
    fields: [
      {
        key: 'category',
        questions: [
          'Are you looking for a house, apartment, or land?',
          'What type of property interests you?',
        ],
        explanation: 'to find the right type of property',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'location',
        questions: [
          'Which city or area are you looking in?',
          'Where are you searching for property?',
        ],
        explanation: "since property is all about location",
        mandatory: true,
        entityKey: 'location',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget for this property?",
          'What price range are you considering?',
        ],
        explanation: 'to find properties within your range',
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'condition',
        questions: [
          'Are you looking for a new property or a resale?',
          'What type of property condition?',
        ],
        explanation: 'to match your preference',
        mandatory: false,
        entityKey: 'condition',
      },
    ],
    minMandatoryFields: 2,
    nearbyCategories: ['property', 'furniture-home'],
    progressiveSearch: false,
  },
  electronics: {
    categorySlug: 'electronics',
    fields: [
      {
        key: 'category',
        questions: [
          'What type of electronics? (laptop, phone, TV, camera, etc.)',
          'Which gadget are you interested in?',
        ],
        explanation: 'to find the right electronics for you',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget for this item?",
          'How much are you looking to spend?',
        ],
        explanation: 'so I can find options within your price range',
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'brand',
        questions: [
          'Any preferred brand? (Apple, Samsung, Sony, etc.)',
          'Do you have a brand preference?',
        ],
        explanation: 'to narrow down the best options',
        mandatory: false,
        entityKey: 'brand',
      },
      {
        key: 'condition',
        questions: [
          'Do you want new, used, or refurbished?',
          'What condition are you looking for?',
        ],
        explanation: 'to match your preference',
        mandatory: false,
        entityKey: 'condition',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking in?',
          'Where are you searching?',
        ],
        explanation: 'to check availability in your area',
        mandatory: false,
        entityKey: 'location',
      },
    ],
    minMandatoryFields: 1,
    nearbyCategories: ['electronics', 'mobiles-tablets', 'fashion-lifestyle'],
    progressiveSearch: true,
  },
  jobs: {
    categorySlug: 'jobs',
    fields: [
      {
        key: 'category',
        questions: [
          'What type of job are you looking for?',
          'Which field or industry?',
        ],
        explanation: 'to match you with the right opportunities',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking for work in?',
          'Where are you searching for jobs?',
        ],
        explanation: 'to find opportunities near you',
        mandatory: true,
        entityKey: 'location',
      },
      {
        key: 'budget',
        questions: [
          'What salary range are you expecting?',
          'Do you have a salary expectation?',
        ],
        explanation: 'to show jobs matching your expectations',
        mandatory: false,
        entityKey: 'budget',
      },
    ],
    minMandatoryFields: 2,
    nearbyCategories: ['jobs', 'education', 'services'],
    progressiveSearch: false,
  },
  services: {
    categorySlug: 'services',
    fields: [
      {
        key: 'category',
        questions: [
          'What type of service? (plumber, tutor, photographer, etc.)',
          'What kind of service do you need?',
        ],
        explanation: 'to connect you with the right service provider',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'location',
        questions: [
          'Which city do you need this service in?',
          'Where are you located?',
        ],
        explanation: 'to find service providers near you',
        mandatory: true,
        entityKey: 'location',
      },
    ],
    minMandatoryFields: 2,
    nearbyCategories: ['services', 'jobs', 'education'],
    progressiveSearch: false,
  },
  'fashion-lifestyle': {
    categorySlug: 'fashion-lifestyle',
    fields: [
      {
        key: 'category',
        questions: [
          'Are you looking for clothing, shoes, accessories, or something else?',
          'What type of fashion item?',
        ],
        explanation: 'to find the right fashion items',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget?",
          'How much are you looking to spend?',
        ],
        explanation: 'to show items within your price range',
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'brand',
        questions: [
          'Any preferred brand? (Nike, Adidas, H&M, etc.)',
          'Do you have a brand preference?',
        ],
        explanation: 'to find items from your preferred brands',
        mandatory: false,
        entityKey: 'brand',
      },
      {
        key: 'condition',
        questions: [
          'Looking for new or gently used items?',
          'What condition are you looking for?',
        ],
        explanation: 'to match your preference',
        mandatory: false,
        entityKey: 'condition',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking in?',
          'Where are you searching?',
        ],
        explanation: 'to find items available in your area',
        mandatory: false,
        entityKey: 'location',
      },
    ],
    minMandatoryFields: 1,
    nearbyCategories: ['fashion-lifestyle', 'kids', 'sports-hobbies'],
    progressiveSearch: true,
  },
  pets: {
    categorySlug: 'pets',
    fields: [
      {
        key: 'category',
        questions: [
          'Are you looking for a dog, cat, or another type of pet?',
          'What type of pet are you interested in?',
        ],
        explanation: 'to find the perfect pet for you',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget for the pet or pet supplies?",
          'How much are you looking to spend?',
        ],
        explanation: 'to find options within your range',
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking in?',
          'Where are you searching for a pet?',
        ],
        explanation: 'to find pets available near you',
        mandatory: false,
        entityKey: 'location',
      },
    ],
    minMandatoryFields: 1,
    nearbyCategories: ['pets'],
    progressiveSearch: true,
  },
  'furniture-home': {
    categorySlug: 'furniture-home',
    fields: [
      {
        key: 'category',
        questions: [
          'What type of furniture? (sofa, bed, table, chair, etc.)',
          'Which furniture item do you need?',
        ],
        explanation: 'to find the right furniture for you',
        mandatory: true,
        entityKey: 'category',
      },
      {
        key: 'budget',
        questions: [
          "What's your budget for this item?",
          'How much are you looking to spend?',
        ],
        explanation: 'to show options within your price range',
        mandatory: false,
        entityKey: 'budget',
      },
      {
        key: 'condition',
        questions: [
          'Are you looking for new or used furniture?',
          'What condition works for you?',
        ],
        explanation: 'to match your preference',
        mandatory: false,
        entityKey: 'condition',
      },
      {
        key: 'location',
        questions: [
          'Which city are you looking in?',
          'Where are you searching?',
        ],
        explanation: 'to find furniture available near you',
        mandatory: false,
        entityKey: 'location',
      },
    ],
    minMandatoryFields: 1,
    nearbyCategories: ['furniture-home', 'property', 'electronics'],
    progressiveSearch: true,
  },
}

const DEFAULT_FLOW: CategoryFlowConfig = {
  categorySlug: 'general',
  fields: [
    {
      key: 'category',
      questions: [
        'What type of item are you looking for?',
        'Which category interests you?',
      ],
      explanation: 'to help narrow down the search',
      mandatory: true,
      entityKey: 'category',
    },
    {
      key: 'budget',
      questions: [
        "What's your budget?",
        'How much are you looking to spend?',
      ],
      explanation: 'to find options within your price range',
      mandatory: false,
      entityKey: 'budget',
    },
    {
      key: 'location',
      questions: [
        'Which city or area?',
        'Where are you looking?',
      ],
      explanation: 'to check availability in your area',
      mandatory: false,
      entityKey: 'location',
    },
  ],
  minMandatoryFields: 0,
  nearbyCategories: [],
  progressiveSearch: true,
}

export function getCategoryFlow(categorySlug?: string): CategoryFlowConfig {
  if (categorySlug && CATEGORY_FLOWS[categorySlug]) {
    return CATEGORY_FLOWS[categorySlug]
  }
  return DEFAULT_FLOW
}

export function getNearbyCategories(categorySlug?: string): string[] {
  if (categorySlug && CATEGORY_FLOWS[categorySlug]) {
    return CATEGORY_FLOWS[categorySlug].nearbyCategories
  }
  return []
}

export function isFieldMandatory(fieldKey: string, categorySlug?: string): boolean {
  const flow = getCategoryFlow(categorySlug)
  const field = flow.fields.find(f => f.key === fieldKey)
  return field?.mandatory ?? false
}

export function getMandatoryFields(categorySlug?: string): string[] {
  const flow = getCategoryFlow(categorySlug)
  return flow.fields.filter(f => f.mandatory).map(f => f.key)
}

export function hasEnoughInformation(
  entities: MarketplaceEntities,
  categorySlug?: string
): boolean {
  const flow = getCategoryFlow(categorySlug)
  // Only progressive-search-ready categories get the shortcut.
  // The default/general flow always needs full clarification.
  if (flow.categorySlug === 'general' || !flow.progressiveSearch || !entities.category) {
    return false
  }
  const mandatoryPresent = flow.fields
    .filter(f => f.mandatory)
    .filter(f => entityHasValue(entities, f.entityKey)).length
  return mandatoryPresent >= flow.minMandatoryFields
}

function entityHasValue(
  entities: MarketplaceEntities,
  key: keyof MarketplaceEntities
): boolean {
  const val = entities[key]
  if (val === undefined || val === null) return false
  if (typeof val === 'string' && val.trim() === '') return false
  if (typeof val === 'object' && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>
    return Object.keys(obj).length > 0
  }
  return true
}

export function getCategoryQuestion(
  fieldKey: string,
  categorySlug: string | undefined,
  askedCount: number
): string {
  const flow = getCategoryFlow(categorySlug)
  const field = flow.fields.find(f => f.key === fieldKey)
  if (!field || field.questions.length === 0) return ''
  const idx = Math.min(askedCount, field.questions.length - 1)
  return field.questions[idx]
}

export function getCategoryExplanation(
  fieldKey: string,
  categorySlug?: string
): string {
  const flow = getCategoryFlow(categorySlug)
  const field = flow.fields.find(f => f.key === fieldKey)
  return field?.explanation ?? ''
}
