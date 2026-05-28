'use server'

import type { ContactFormState } from '@/lib/types'

export async function submitContact(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, message: 'Please fill in all fields.' }
  }

  if (!email.includes('@') || !email.includes('.')) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  // Placeholder: Replace with your email service (Resend, SendGrid, etc.)
  // await sendEmail({ name, email, message })

  console.log('Contact form submission:', { name, email, message })

  return {
    success: true,
    message: "Thanks for reaching out! I'll get back to you soon.",
  }
}
