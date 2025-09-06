'use client';

import { FormEvent, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your User ID
// Replace 'YOUR_USER_ID' with your actual EmailJS User ID
const EMAILJS_USER_ID = 'YOUR_USER_ID';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    try {
      // For demo purposes, we'll use a conditional to either send a real email or simulate it
      if (EMAILJS_USER_ID === 'YOUR_USER_ID') {
        // If EmailJS is not configured, simulate sending
        console.log('EmailJS not configured. Simulating email send.');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Send the email using EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: name,
            reply_to: email,
            message: message,
          }
        );
      }
      
      setFormStatus(`Thank you ${name}! Your message has been sent. We'll respond to ${email} as soon as possible.`);
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xl text-gray-300 mb-2">Contact Information</p>
        <p className="text-lg text-gray-400">☎️: +917078827522</p>
        <p className="text-lg text-gray-400">📧: Princedobriyal326@gmail.com</p>
      </div>
      
      {formStatus ? (
        <div className="animate-fade-in p-4 mb-8 rounded-md bg-green-900 bg-opacity-50 border border-green-500">
          <p className="text-center text-white">{formStatus}</p>
          <button 
            onClick={() => setFormStatus(null)}
            className="mt-4 mx-auto block trading-button py-2 px-4 text-sm font-medium"
          >
            Send Another Message
          </button>
        </div>
      ) : error ? (
        <div className="animate-fade-in p-4 mb-8 rounded-md bg-red-900 bg-opacity-50 border border-red-500">
          <p className="text-center text-white">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 mx-auto block trading-button py-2 px-4 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      ) : (
        <form className="space-y-8 animate-fade-in" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="trading-input"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="trading-input"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="trading-input"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="trading-button w-full py-3 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}