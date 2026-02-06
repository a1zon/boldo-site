import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, company, email, message } = await request.json();

    // Валидация
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Пожалуйста заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Валидация формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: 'Пожалуйста введите корректный email адрес' },
        { status: 400 }
      );
    }

    // Отправляем на ящик
    const data = await resend.emails.send({
      from: 'Boldo Contact Form <onboarding@resend.dev>',
      to: 'gam301005@gmail.com',
      subject: `Новая заявка от ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Компания:</strong> ${company || 'не указана'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
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
      { success: true, message: 'Заявка отправлена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
