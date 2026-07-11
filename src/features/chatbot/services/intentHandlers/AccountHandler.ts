import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement, pickEmpathyPhrase, pickNextActionIntro } from '../../services/responseQuality'

export class AccountHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()

    if (text.includes('password') || text.includes('login') || text.includes('sign in') || text.includes('forgot')) {
      return {
        sections: [
          { type: 'heading', content: 'Reset Your Password', level: 2 },
          { type: 'numbered_steps', title: 'Steps to reset your password', steps: [
            'Go to the Sign In page on the app or website',
            'Tap "Forgot Password" below the login button',
            'Enter your registered email address',
            'Check your inbox for a password reset link',
            'Click the link and create a new password',
            'Sign in with your new password',
          ]},
          { type: 'text', content: 'If you continue to have trouble, our support team can help.' },
        ],
        suggestedActions: [
          { label: 'Sign In', value: 'sign in' },
          { label: 'My Profile', value: 'profile' },
          { label: 'Contact Support', value: 'contact support' },
        ],
        intent: 'ACCOUNT_HELP',
        role,
      }
    }

    if (text.includes('delete') || text.includes('remove') || text.includes('close')) {
      return {
        sections: [
          { type: 'heading', content: 'Delete Your Account', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} ${pickEmpathyPhrase()} Before proceeding, please be aware of the following:\n\n• All your listings will be removed from the marketplace\n• Active conversations will be closed\n• This action cannot be undone\n\nTo delete your account, go to Account Settings from your Profile page and follow the instructions. If you need assistance, our support team is here to help.` },
        ],
        suggestedActions: [
          { label: 'My Profile', value: 'profile' },
          { label: 'My Listings', value: 'my listings' },
          { label: 'Contact Support', value: 'contact support' },
        ],
        intent: 'ACCOUNT_HELP',
        role,
      }
    }

    if (text.includes('register') || text.includes('signup') || text.includes('create account') || text.includes('new account')) {
      return {
        sections: [
          { type: 'heading', content: 'Create an Account', level: 2 },
          { type: 'numbered_steps', title: 'How to sign up', steps: [
            'Open the ValClassifieds app or website',
            'Tap "Sign Up" or "Create Account"',
            'Enter your name, email, and phone number',
            'Create a strong password (8 or more characters)',
            'Verify your email or phone with the OTP sent to you',
            'Complete your profile — add a photo and your location',
          ]},
          { type: 'text', content: 'Once registered, you can browse listings, save favourites, and contact sellers.' },
        ],
        suggestedActions: [
          { label: 'Sign Up', value: 'sign up' },
          { label: 'Browse Listings', value: 'search' },
          { label: 'How to Buy', value: 'how to buy' },
        ],
        intent: 'ACCOUNT_HELP',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Account Help', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} I can help you manage your account. Here are the topics I can assist with:\n\n• Reset your password to regain access to your account\n• Sign up to create a new account\n• Update your profile information\n• View and manage your listings\n• Access your saved favourites\n• Adjust your account settings and notifications` },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Reset Password', value: 'forgot password' },
        { label: 'My Profile', value: 'profile' },
        { label: 'My Listings', value: 'my listings' },
        { label: 'Favorites', value: 'view favorites' },
        { label: 'Account Settings', value: 'account settings' },
      ],
      intent: 'ACCOUNT_HELP',
      role,
    }
  }
}
