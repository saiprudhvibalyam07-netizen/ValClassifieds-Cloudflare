import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface AccountArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface AccountArticle {
  id: string
  version: number
  title: string
  intent: 'ACCOUNT_HELP'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: AccountArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: AccountArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const ACCOUNT_ACTIONS: SuggestedAction[] = [
  { label: 'My Profile', value: 'profile' },
  { label: 'Account Settings', value: 'account settings' },
  { label: 'Contact Support', value: 'contact support' },
]

const articles: AccountArticle[] = [
  // ───────────────────────── LOGIN & AUTHENTICATION (8) ─────────────────────────
  {
    id: 'ACC-LOG-001',
    version: VERSION,
    title: 'Account Help',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['account', 'account help', 'manage my account', 'help with account', 'my account'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Account Help', level: 2 },
      { type: 'text', content: 'ValClassifieds support can help you manage your account. Here are the topics we cover:\n\n• Reset your password to regain access\n• Sign up to create a new account\n• Update your profile and photo\n• Verify or change your email\n• Adjust notifications and privacy settings\n• Delete or deactivate your account\n\nChoose a topic below, or tell us what you need.' },
    ],
    actions: [
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'My Profile', value: 'profile' },
      { label: 'My Listings', value: 'my listings' },
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-002',
    version: VERSION,
    title: "Can't Log In",
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ["can't log in", "can't login", 'cannot log in', 'not logging in', 'login problem', 'log in issue', "unable to log in"],
    response: [
      { type: 'heading', content: "Can't Log In", level: 2 },
      { type: 'text', content: 'If you cannot sign in, try these steps:\n\n• Check that your email and password are typed correctly, with no extra spaces\n• Use "Forgot Password" to reset it if you are unsure\n• Clear the app cache or try a different browser\n• Make sure your account has not been locked after several failed attempts\n\nIf the problem continues, our support team can check your account.' },
    ],
    actions: [
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'Sign In', value: 'sign in' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-003',
    version: VERSION,
    title: 'Wrong Credentials or Sign-In Error',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['wrong password', 'incorrect password', 'invalid credentials', 'sign in error', 'login error', 'password incorrect'],
    response: [
      { type: 'heading', content: 'Wrong Credentials or Sign-In Error', level: 2 },
      { type: 'text', content: 'A "wrong password" message means the details do not match our records. Confirm the email is the one you registered with, check for caps lock, and retry. If it still fails, reset your password — the link arrives at the registered email only.' },
    ],
    actions: [
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-004',
    version: VERSION,
    title: 'Create an Account',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['register', 'signup', 'sign up', 'create account', 'new account', 'join', 'how to sign up'],
    response: [
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
    actions: [
      { label: 'Sign Up', value: 'sign up' },
      { label: 'Browse Listings', value: 'search' },
      { label: 'How to Buy', value: 'how to buy' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-005',
    version: VERSION,
    title: 'OTP and Two-Factor Login',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['otp login', 'two factor', '2fa', 'verification code login', 'login code', 'code not received'],
    response: [
      { type: 'heading', content: 'OTP and Two-Factor Login', level: 2 },
      { type: 'text', content: 'We send a one-time code to confirm it is you. To sign in with the code:\n\n• Enter the code from your SMS or email within the time limit\n• Request a new code if the old one expired\n• Make sure the phone number or email on file is current\n• Never share the code with anyone — our team will not ask for it\n\nIf codes never arrive, check your network and spam folder, then contact support.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-006',
    version: VERSION,
    title: 'Account Locked or Suspended',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['locked', 'suspended', 'account locked', 'blocked account', 'disabled', 'locked out'],
    response: [
      { type: 'heading', content: 'Account Locked or Suspended', level: 2 },
      { type: 'text', content: 'Accounts can be temporarily locked after repeated failed sign-ins, or suspended if our policies are breached. If you are locked out:\n\n• Wait a few minutes and retry, or reset your password\n• Check your email for a notice explaining a suspension\n• Contact support to appeal or verify your identity\n\nWe review every case and restore access where appropriate.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Reset Password', value: 'forgot password' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-007',
    version: VERSION,
    title: 'Keep Your Account Secure',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['secure my account', 'account security', 'protect account', 'safe account', 'account safety'],
    response: [
      { type: 'heading', content: 'Keep Your Account Secure', level: 2 },
      { type: 'text', content: 'A few habits keep your account safe:\n\n• Use a unique, strong password you do not reuse elsewhere\n• Enable OTP or two-factor login where available\n• Never share your password or codes with another person\n• Sign out on shared or public devices\n• Review your account activity regularly for anything unfamiliar' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-LOG-008',
    version: VERSION,
    title: 'Switch or Use Multiple Accounts',
    intent: 'ACCOUNT_HELP',
    category: 'login',
    triggers: ['switch account', 'multiple accounts', 'second account', 'another account', 'use two accounts'],
    response: [
      { type: 'heading', content: 'Switch or Use Multiple Accounts', level: 2 },
      { type: 'text', content: 'You can keep more than one ValClassifieds account, but each needs its own email and phone. To switch, sign out and sign in with the other details, or use the account menu if your app supports quick switching. Keep your login details separate for each account.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PASSWORD RECOVERY (8) ─────────────────────────
  {
    id: 'ACC-PWD-001',
    version: VERSION,
    title: 'Forgot or Reset Your Password',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['forgot password', 'forgot my password', 'reset password', 'reset my password', 'password reset', 'lost password'],
    response: [
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
    actions: [
      { label: 'Sign In', value: 'sign in' },
      { label: 'My Profile', value: 'profile' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-002',
    version: VERSION,
    title: 'Using the Reset Link',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['how to reset', 'reset link', 'password reset link', 'steps to reset', 'where is reset'],
    response: [
      { type: 'heading', content: 'Using the Reset Link', level: 2 },
      { type: 'text', content: 'The reset link in your email opens a secure page to set a new password. Open it on the same device and browser if possible, and make sure you are signed in to the correct email. The link is single-use — once you set a new password, it expires.' },
    ],
    actions: [
      { label: 'Sign In', value: 'sign in' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-003',
    version: VERSION,
    title: 'No Reset Email Received',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['no email', "didn't get email", 'reset email', 'not receiving email', 'spam', 'email not arriving'],
    response: [
      { type: 'heading', content: 'No Reset Email Received', level: 2 },
      { type: 'text', content: 'If the reset email has not arrived:\n\n• Check your spam or junk folder and any tabs (Promotions, Updates)\n• Confirm you entered the exact email on your account\n• Wait a minute or two — delivery can be delayed\n• Request a new link from the Forgot Password screen\n• Add our address to your contacts so future mail lands in your inbox' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Reset Password', value: 'forgot password' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-004',
    version: VERSION,
    title: 'Change Your Password',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['change password', 'update password', 'new password', 'set password', 'choose password'],
    response: [
      { type: 'heading', content: 'Change Your Password', level: 2 },
      { type: 'text', content: 'To change your password while signed in:\n\n1. Open Account Settings from your Profile\n2. Choose "Password" or "Security"\n3. Enter your current password, then a new one\n4. Save the change and sign in again on other devices\n\nPick a password you do not use on other sites.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-005',
    version: VERSION,
    title: 'Password Requirements',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['password requirements', 'strong password', 'password policy', 'weak password', 'password length'],
    response: [
      { type: 'heading', content: 'Password Requirements', level: 2 },
      { type: 'text', content: 'A strong ValClassifieds password:\n\n• Is at least 8 characters long\n• Mixes letters, numbers, and symbols\n• Avoids common words, names, or "password123"\n• Is not reused from another account\n\nA password manager can help you create and store a unique one.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-006',
    version: VERSION,
    title: 'New Password Not Working',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['password not working', "still can't log in", "reset didn't work", 'new password rejected', 'cannot sign in after reset'],
    response: [
      { type: 'heading', content: 'New Password Not Working', level: 2 },
      { type: 'text', content: 'If your new password is rejected, a few things may be happening:\n\n• The reset link may have expired before you used it — request a fresh one\n• You may be typing the old password by habit; use the new one\n• Caps lock or autofill could be altering the entry\n• The link may have opened a different account\'s email\n\nTry resetting once more, then contact support if it persists.' },
    ],
    actions: [
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-007',
    version: VERSION,
    title: 'Reset Link Expired',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['expired', 'link expired', 'reset link invalid', 'old link', 'link no longer works'],
    response: [
      { type: 'heading', content: 'Reset Link Expired', level: 2 },
      { type: 'text', content: 'Reset links are valid for a short time for security. If yours expired, return to the Forgot Password screen and request a new link — it will arrive at the same registered email. Use it promptly to set your new password.' },
    ],
    actions: [
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PWD-008',
    version: VERSION,
    title: 'Recover a Lost Email or Account',
    intent: 'ACCOUNT_HELP',
    category: 'password',
    triggers: ['forgot email', 'lost access', 'recover account', 'no longer have email', 'old email'],
    response: [
      { type: 'heading', content: 'Recover a Lost Email or Account', level: 2 },
      { type: 'text', content: 'If you no longer have the email on your account, account recovery needs verification. Contact support with details such as your registered phone number, recent listings, or past transactions so we can confirm ownership. We will never ask for your password — only proof that the account is yours.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PROFILE MANAGEMENT (8) ─────────────────────────
  {
    id: 'ACC-PRO-001',
    version: VERSION,
    title: 'Update Your Profile',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['update profile', 'edit profile', 'change profile', 'my profile', 'profile info', 'manage profile'],
    response: [
      { type: 'heading', content: 'Update Your Profile', level: 2 },
      { type: 'text', content: 'Keeping your profile current builds trust with buyers and sellers. To edit it:\n\n1. Open your Profile from the menu\n2. Tap "Edit Profile"\n3. Update your name, location, and bio\n4. Save your changes\n\nA complete profile with a real photo gets more replies.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-002',
    version: VERSION,
    title: 'Change Your Profile Photo',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['profile photo', 'change photo', 'profile picture', 'add photo', 'avatar', 'update picture'],
    response: [
      { type: 'heading', content: 'Change Your Profile Photo', level: 2 },
      { type: 'text', content: 'A clear photo helps others recognise you. From Edit Profile, tap the photo area to upload a new image, then save. Use a friendly, well-lit picture of your face — avoid group shots or unrelated images.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-003',
    version: VERSION,
    title: 'Change Your Name or Display Name',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['change name', 'display name', 'username', 'edit name', 'nickname'],
    response: [
      { type: 'heading', content: 'Change Your Name or Display Name', level: 2 },
      { type: 'text', content: 'You can update the name shown on your profile in Edit Profile. Use your real name where possible — buyers and sellers trust verified identities. Display names used for business accounts can be set there too.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-004',
    version: VERSION,
    title: 'Update Your Location',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['change location', 'update location', 'my city', 'location settings', 'change city'],
    response: [
      { type: 'heading', content: 'Update Your Location', level: 2 },
      { type: 'text', content: 'Your location helps show nearby listings and lets local buyers find you. In Edit Profile, set your city or area, then save. Listings you post will use this location by default.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-005',
    version: VERSION,
    title: 'Add or Edit Your Bio',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['bio', 'description', 'about me', 'edit bio', 'about section'],
    response: [
      { type: 'heading', content: 'Add or Edit Your Bio', level: 2 },
      { type: 'text', content: 'A short bio tells others what you are buying or selling. In Edit Profile, add a few lines about yourself or your shop, then save. Keep it relevant to the marketplace and free of contact details — those belong in messages.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-006',
    version: VERSION,
    title: 'Manage Your Listings',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['my listings', 'manage listings', 'view my ads', 'my posts', 'my advertisements'],
    response: [
      { type: 'heading', content: 'Manage Your Listings', level: 2 },
      { type: 'text', content: 'All listings you post appear under "My Listings" in your Profile. From there you can edit, renew, mark as sold, or delete them, and see how many views each has received. Keep sold items updated so buyers are not misled.' },
    ],
    actions: [
      { label: 'My Listings', value: 'my listings' },
      { label: 'My Profile', value: 'profile' },
      { label: 'Sell an Item', value: 'sell' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-007',
    version: VERSION,
    title: 'Saved Favourites',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['favorites', 'saved', 'wishlist', 'bookmarks', 'saved listings'],
    response: [
      { type: 'heading', content: 'Saved Favourites', level: 2 },
      { type: 'text', content: 'Tap the heart on any listing to save it to your Favourites. Find them later under "Favourites" in your Profile. You will get a nudge if a saved item drops in price or sells, so check back often.' },
    ],
    actions: [
      { label: 'View Favorites', value: 'view favorites' },
      { label: 'Browse Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-PRO-008',
    version: VERSION,
    title: 'View Account Activity',
    intent: 'ACCOUNT_HELP',
    category: 'profile',
    triggers: ['activity', 'login history', 'account activity', 'recent logins', 'see my activity'],
    response: [
      { type: 'heading', content: 'View Account Activity', level: 2 },
      { type: 'text', content: 'Reviewing your activity helps spot anything unusual. Under Account Settings, you can see recent sign-ins and key changes. If you notice a login you do not recognise, reset your password and contact support right away.' },
    ],
    actions: [
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── EMAIL VERIFICATION & NOTIFICATIONS (6) ─────────────────────────
  {
    id: 'ACC-EMA-001',
    version: VERSION,
    title: 'Verify Your Email',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['verify email', 'email verification', 'confirm email', 'verify my email', 'email not verified'],
    response: [
      { type: 'heading', content: 'Verify Your Email', level: 2 },
      { type: 'numbered_steps', title: 'How to verify', steps: [
        'Open the verification email we sent at sign-up',
        'Tap the "Verify Email" button or link',
        'Return to the app — your account is confirmed',
        'Request a new link if the first one expired',
      ]},
      { type: 'text', content: 'A verified email keeps your account secure and ensures you receive important updates.' },
    ],
    actions: [
      { label: 'Resend Verification', value: 'resend verification' },
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-EMA-002',
    version: VERSION,
    title: 'No Verification Email Received',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['no verification email', "didn't receive verification", 'verification not received', 'resend verification', 'verification email missing'],
    response: [
      { type: 'heading', content: 'No Verification Email Received', level: 2 },
      { type: 'text', content: 'If the verification mail is missing:\n\n• Check spam, junk, and promotion tabs\n• Confirm the email address on your account is correct\n• Tap "Resend Verification" from the prompt in the app\n• Allow a few minutes for delivery\n\nStill nothing? Contact support and we will confirm your address manually.' },
    ],
    actions: [
      { label: 'Resend Verification', value: 'resend verification' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-EMA-003',
    version: VERSION,
    title: 'Change Your Email',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['change email', 'change my email', 'update email', 'new email', 'email address', 'edit email'],
    response: [
      { type: 'heading', content: 'Change Your Email', level: 2 },
      { type: 'text', content: 'To use a new email:\n\n1. Open Account Settings and choose "Email"\n2. Enter the new address and your password\n3. Confirm the verification link sent to the new email\n\nUntil the new address is verified, we still send mail to the old one. Keep both accessible during the change.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-EMA-004',
    version: VERSION,
    title: 'Email Already in Use',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['email already', 'email taken', 'email in use', 'account exists', 'email registered'],
    response: [
      { type: 'heading', content: 'Email Already in Use', level: 2 },
      { type: 'text', content: 'Each email can belong to one ValClassifieds account. If you see "already in use," you may have registered before — try signing in or resetting the password for that address. To merge or recover the old account, contact support with proof of ownership.' },
    ],
    actions: [
      { label: 'Sign In', value: 'sign in' },
      { label: 'Reset Password', value: 'forgot password' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-EMA-005',
    version: VERSION,
    title: 'Notification Settings',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['notification settings', 'notifications', 'alerts', 'email alerts', 'manage notifications', 'change notifications'],
    response: [
      { type: 'heading', content: 'Notification Settings', level: 2 },
      { type: 'text', content: 'Control what we message you about. In Account Settings, open "Notifications" to turn on or off:\n\n• New messages from buyers and sellers\n• Replies and offers on your listings\n• Price-drop alerts on saved items\n• Promotions and marketplace news\n\nPick the channels — push, email, or both — that suit you.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-EMA-006',
    version: VERSION,
    title: 'Types of Notifications',
    intent: 'ACCOUNT_HELP',
    category: 'email',
    triggers: ['what notifications', 'types of notifications', 'message alerts', 'listing alerts', 'which alerts'],
    response: [
      { type: 'heading', content: 'Types of Notifications', level: 2 },
      { type: 'text', content: 'ValClassifieds can alert you about activity that matters: new messages, offers, saved-item price drops, listing views, and occasional safety or product news. Turn off any category you do not need from Notification Settings — we keep promotional mail to a minimum.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── ACCOUNT SETTINGS & PRIVACY (6) ─────────────────────────
  {
    id: 'ACC-SET-001',
    version: VERSION,
    title: 'Account Settings Overview',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['account settings', 'settings', 'preferences', 'manage settings', 'options'],
    response: [
      { type: 'heading', content: 'Account Settings Overview', level: 2 },
      { type: 'text', content: 'Most account tools live under Account Settings, reached from your Profile. There you can update your password, email, and profile, manage notifications, review privacy, and close your account. Explore each section to tailor ValClassifieds to you.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-SET-002',
    version: VERSION,
    title: 'Privacy Settings',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['privacy', 'privacy settings', 'manage privacy', 'private account', 'privacy options'],
    response: [
      { type: 'heading', content: 'Privacy Settings', level: 2 },
      { type: 'text', content: 'Your privacy is yours to control. In Privacy Settings you can:\n\n• Choose what shows on your public profile\n• Decide who can message you\n• Limit how your listings and activity appear\n• Opt out of optional promotional mail\n\nReview these any time your needs change.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-SET-003',
    version: VERSION,
    title: 'Control Who Can Message You',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['who can message', 'block messages', 'message privacy', 'restrict messages', 'limit messages'],
    response: [
      { type: 'heading', content: 'Control Who Can Message You', level: 2 },
      { type: 'text', content: 'To reduce unwanted contact, use Privacy Settings to limit messages to verified users or people with active listings. You can also block specific users at any time — blocked contacts can no longer reach you, and the chat is hidden.' },
    ],
    actions: [
      { label: 'Privacy Settings', value: 'privacy settings' },
      { label: 'Block User', value: 'block user' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-SET-004',
    version: VERSION,
    title: 'Profile and Listing Visibility',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['profile visibility', 'hide profile', 'public profile', 'show listings', 'hide my activity'],
    response: [
      { type: 'heading', content: 'Profile and Listing Visibility', level: 2 },
      { type: 'text', content: 'Decide how visible you are. In Privacy Settings you can hide parts of your profile, keep your exact location general, or limit who sees your past activity. Your active listings remain visible to buyers while they are live, but you control the rest of your footprint.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-SET-005',
    version: VERSION,
    title: 'Connected and Linked Accounts',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['connected', 'linked account', 'social login', 'google login', 'facebook login', 'link account'],
    response: [
      { type: 'heading', content: 'Connected and Linked Accounts', level: 2 },
      { type: 'text', content: 'If you signed in with Google or another provider, that link is shown under Connected Accounts. You can unlink a provider there, but you will need a password set on your ValClassifieds account first so you can still sign in directly.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-SET-006',
    version: VERSION,
    title: 'Language and Region',
    intent: 'ACCOUNT_HELP',
    category: 'settings',
    triggers: ['language', 'region', 'country', 'currency', 'timezone', 'locale'],
    response: [
      { type: 'heading', content: 'Language and Region', level: 2 },
      { type: 'text', content: 'Set ValClassifieds to your preference under Language & Region in Settings. Choose your display language, country, and the currency shown on listings. Changing region updates the listings and categories you see first.' },
    ],
    actions: ACCOUNT_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── ACCOUNT DELETION & DEACTIVATION (4) ─────────────────────────
  {
    id: 'ACC-DEL-001',
    version: VERSION,
    title: 'Delete Your Account',
    intent: 'ACCOUNT_HELP',
    category: 'deletion',
    triggers: ['delete account', 'delete my account', 'remove account', 'close account', 'permanently delete'],
    response: [
      { type: 'heading', content: 'Delete Your Account', level: 2 },
      { type: 'text', content: 'Before you delete, please note:\n\n• All your listings are removed from the marketplace\n• Active conversations are closed\n• This action cannot be undone\n\nTo delete, go to Account Settings from your Profile, choose "Delete Account," and follow the prompts. If you need a hand, our support team is here to help.' },
    ],
    actions: [
      { label: 'My Profile', value: 'profile' },
      { label: 'My Listings', value: 'my listings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-DEL-002',
    version: VERSION,
    title: 'Deactivate Your Account',
    intent: 'ACCOUNT_HELP',
    category: 'deletion',
    triggers: ['deactivate', 'temporarily disable', 'pause account', 'hide account', 'take a break'],
    response: [
      { type: 'heading', content: 'Deactivate Your Account', level: 2 },
      { type: 'text', content: 'If you need a break rather than a permanent exit, deactivate instead. Your profile and listings are hidden while you are away, and you can return any time by signing back in. Deactivation keeps your data until you return.' },
    ],
    actions: [
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-DEL-003',
    version: VERSION,
    title: 'What Happens When You Delete',
    intent: 'ACCOUNT_HELP',
    category: 'deletion',
    triggers: ['what happens', 'before deleting', 'delete consequences', 'lose my listings', 'after deletion'],
    response: [
      { type: 'heading', content: 'What Happens When You Delete', level: 2 },
      { type: 'text', content: 'Deleting is final. Once completed:\n\n• Your profile, photos, and bio are removed\n• Your listings are taken down and cannot be restored\n• Message history is closed\n• Any favourites or drafts are lost\n\nIf you might return, consider deactivating instead. We keep limited records only as required by law.' },
    ],
    actions: [
      { label: 'Deactivate Instead', value: 'deactivate' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ACC-DEL-004',
    version: VERSION,
    title: 'Reactivate or Recover Your Account',
    intent: 'ACCOUNT_HELP',
    category: 'deletion',
    triggers: ['reactivate', 'recover account', 'restore account', 'undo delete', 'came back'],
    response: [
      { type: 'heading', content: 'Reactivate or Recover Your Account', level: 2 },
      { type: 'text', content: 'Deactivated accounts return the moment you sign in again. Permanently deleted accounts cannot be restored, but if the deletion was recent and you changed your mind, contact support quickly — in some cases we can help recover limited data before it is purged.' },
    ],
    actions: [
      { label: 'Sign In', value: 'sign in' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
]

export default articles

function scoreTriggerMatch(query: string, trigger: string): number {
  const q = query.toLowerCase().trim()
  const t = trigger.toLowerCase().trim()
  if (!t) return 0
  if (q === t) return 3
  if (q.startsWith(t)) return 2
  if (q.includes(t)) return 1
  return 0
}

function matchArticles(pool: AccountArticle[], query: string): AccountArticle | null {
  let best: { article: AccountArticle; score: number; triggerLen: number } | null = null
  for (const article of pool) {
    for (const trigger of article.triggers) {
      const score = scoreTriggerMatch(query, trigger)
      if (score > 0) {
        if (
          best === null ||
          score > best.score ||
          (score === best.score && trigger.length > best.triggerLen)
        ) {
          best = { article, score, triggerLen: trigger.length }
        }
      }
    }
  }
  return best ? best.article : null
}

export function selectAccountArticle(
  classification: IntentClassification
): AccountArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}
