'use client';

import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s\d]{7,20}$/;

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const validationErrors = {};
    ['name', 'phone', 'email', 'program', 'message'].forEach((field) => {
      if (!String(data[field] || '').trim()) validationErrors[field] = 'Required';
    });
    if (data.email && !emailPattern.test(String(data.email).trim())) validationErrors.email = 'Enter a valid email';
    if (data.phone && !phonePattern.test(String(data.phone).trim())) validationErrors.phone = 'Enter a valid phone number';
    setErrors(validationErrors);
    setStatus('');
    if (Object.keys(validationErrors).length) return;

    setSending(true);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Contact request failed');
      setStatus('Thank you! Your consultation request has been sent successfully.');
      form.reset();
    } catch {
      setStatus('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate>
    <input name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: 'none' }}/>
    <div className="form-row"><Field label="Name" name="name" error={errors.name}/><Field label="Phone" name="phone" type="tel" error={errors.phone}/></div>
    <div className="form-row"><Field label="Email" name="email" type="email" error={errors.email}/><label>Interested program<select name="program"><option>Strength Systems</option><option>HIIT Engine</option><option>Personal Training</option><option>Not sure yet</option></select>{errors.program && <small>{errors.program}</small>}</label></div>
    <label>Tell us what you’re working toward<textarea name="message" rows="4"/>{errors.message && <small>{errors.message}</small>}</label>
    <button className="button primary" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Request consultation'}</button>
    {status && <p className="form-success" role="status">{status}</p>}
  </form>;
}

function Field({ label, name, type = 'text', error }) {
  return <label>{label}<input name={name} type={type}/>{error && <small>{error}</small>}</label>;
}
