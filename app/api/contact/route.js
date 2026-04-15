import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, company, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Boldo Contact Form <onboarding@resend.dev>',
      to: 'gam301005@gmail.com',
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'not specified'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email.trim(),
    });

    if (data.error) {
      return Response.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: 'Request sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
