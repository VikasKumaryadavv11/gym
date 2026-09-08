import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const requestLog = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s\d]{7,20}$/;

function clean(value, maxLength) {
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

  let data;
  try { data = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (clean(data.website, 200)) return NextResponse.json({ success: true });

  const name = clean(data.name, 100);
  const phone = clean(data.phone, 30);
  const email = clean(data.email, 254).toLowerCase();
  const program = clean(data.program, 100);
  const message = clean(data.message, 2000);
  if (!name || !phone || !email || !program || !message || !emailPattern.test(email) || !phonePattern.test(phone)) return NextResponse.json({ error: 'Please provide valid contact details.' }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const receiver = 'VY6519380@GMAIL.COM';
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });

  try {
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } });
    const submittedAt = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'long', timeZone: 'Asia/Kolkata' }).format(new Date());
    await transporter.sendMail({ from: `IronPeak Fitness Club <${SMTP_USER}>`, to: receiver, replyTo: email, subject: 'New Gym Consultation Request', text: `New consultation request received.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterested Program: ${program}\n\nMessage:\n${message}\n\nSubmission date/time: ${submittedAt}\nWebsite: IronPeak Fitness Club` });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 500 });
  }
}
