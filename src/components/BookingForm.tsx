import { useMemo, useState } from 'react';

type Status = { type: 'success' | 'error'; message: string } | null;

interface Captcha {
  first: number;
  second: number;
  answer: number;
}

interface FormDataState {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  website: string;
  businessChallenge: string;
  captcha: string;
}

const createCaptcha = (): Captcha => {
  const first = Math.floor(Math.random() * 8) + 1;
  const second = Math.floor(Math.random() * 8) + 1;
  return { first, second, answer: first + second };
};

const initialFormState: FormDataState = {
  name: '',
  businessName: '',
  phone: '',
  email: '',
  website: '',
  businessChallenge: '',
  captcha: ''
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [captcha, setCaptcha] = useState<Captcha>(() => createCaptcha());
  const [errors, setErrors] = useState<Partial<Record<keyof FormDataState, string>>>({});
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(initialFormState);
    setCaptcha(createCaptcha());
    setErrors({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validationMessages = useMemo(
    () => ({
      name: 'Please enter your name.',
      businessName: 'Please enter your business name.',
      phone: 'Please provide a phone number.',
      email: 'Enter a valid email address.',
      website: 'Enter a valid website URL (include https:// if available).',
      businessChallenge: 'Tell me about the main challenge you want help with.',
      captcha: 'Solve the captcha to verify you are human.'
    }),
    []
  );

  const validate = () => {
    const newErrors: Partial<Record<keyof FormDataState, string>> = {};

    if (!formData.name.trim()) newErrors.name = validationMessages.name;
    if (!formData.businessName.trim()) newErrors.businessName = validationMessages.businessName;
    if (!formData.phone.trim()) newErrors.phone = validationMessages.phone;

    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = validationMessages.email;
    }

    if (!formData.website.trim()) {
      newErrors.website =
        'Please share your current website URL or let me know if you do not have one yet.';
    } else if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(formData.website.trim())) {
      newErrors.website = validationMessages.website;
    }

    if (!formData.businessChallenge.trim()) {
      newErrors.businessChallenge = validationMessages.businessChallenge;
    }

    if (!formData.captcha.trim()) {
      newErrors.captcha = validationMessages.captcha;
    } else if (Number.parseInt(formData.captcha, 10) !== captcha.answer) {
      newErrors.captcha = 'Captcha answer is incorrect. Please try again.';
      setCaptcha(createCaptcha());
      setFormData((prev) => ({ ...prev, captcha: '' }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new URLSearchParams();
      formPayload.append('Name', formData.name);
      formPayload.append('Business Name', formData.businessName);
      formPayload.append('Phone', formData.phone);
      formPayload.append('Email', formData.email);
      formPayload.append('Current Website', formData.website);
      formPayload.append('Business Challenge', formData.businessChallenge);
      formPayload.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ajax/admin@evanparra.ai', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formPayload
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      let submissionMessage = 'Thanks for reaching out! I will be in touch within one business day.';

      try {
        const data: { success?: boolean | string; message?: string } = await response.json();
        if (data.message) {
          submissionMessage = data.message;
        }
        const wasSuccessful = data.success === true || data.success === 'true';
        if (!wasSuccessful) {
          throw new Error(data.message ?? 'Form submission failed');
        }
      } catch (parseError) {
        // If the response is not JSON or cannot be parsed, assume success because the request completed without errors.
        if (parseError instanceof Error) {
          console.info('Received non-JSON response from form submission endpoint:', parseError.message);
        }
      }

      setStatus({
        type: 'success',
        message: submissionMessage
      });
      window.gtag?.('event', 'generate_lead', {
        value: 1,
        currency: 'USD',
        event_label: 'booking_form'
      });
      window.gtag_report_conversion?.();
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message:
          'Something went wrong while sending your message. Please try again in a moment or email me directly at admin@evanparra.ai.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-2 text-left">
        <label htmlFor="name" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.name ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          }`}
          placeholder="Jane Smith"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="grid gap-2 text-left">
        <label
          htmlFor="businessName"
          className="text-sm font-semibold text-slate-700 uppercase tracking-wider"
        >
          Business Name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          value={formData.businessName}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.businessName
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-200'
          }`}
          placeholder="St. Augustine Creative Co."
          aria-invalid={Boolean(errors.businessName)}
          aria-describedby={errors.businessName ? 'business-name-error' : undefined}
        />
        {errors.businessName && (
          <p id="business-name-error" className="text-sm text-red-600">
            {errors.businessName}
          </p>
        )}
      </div>

      <div className="grid gap-2 text-left">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.phone ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          }`}
          placeholder="(904) 555-1234"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && <p id="phone-error" className="text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="grid gap-2 text-left">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.email ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          }`}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="grid gap-2 text-left">
        <label htmlFor="website" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Current Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.website ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          }`}
          placeholder="https://yourbusiness.com"
          aria-invalid={Boolean(errors.website)}
          aria-describedby={errors.website ? 'website-error' : undefined}
        />
        {errors.website && <p id="website-error" className="text-sm text-red-600">{errors.website}</p>}
      </div>

      <div className="grid gap-2 text-left">
        <label
          htmlFor="businessChallenge"
          className="text-sm font-semibold text-slate-700 uppercase tracking-wider"
        >
          What challenge should we tackle first?
        </label>
        <textarea
          id="businessChallenge"
          name="businessChallenge"
          value={formData.businessChallenge}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.businessChallenge
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-200'
          }`}
          rows={4}
          placeholder="Share a quick overview of your goals, pain points, or the systems you use today."
          aria-invalid={Boolean(errors.businessChallenge)}
          aria-describedby={errors.businessChallenge ? 'business-challenge-error' : undefined}
        />
        {errors.businessChallenge && (
          <p id="business-challenge-error" className="text-sm text-red-600">
            {errors.businessChallenge}
          </p>
        )}
      </div>

      <div className="grid gap-2 text-left">
        <label htmlFor="captcha" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Quick math check ({captcha.first} + {captcha.second})
        </label>
        <input
          id="captcha"
          name="captcha"
          type="text"
          inputMode="numeric"
          value={formData.captcha}
          onChange={handleChange}
          className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.captcha ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          }`}
          placeholder="Answer"
          aria-invalid={Boolean(errors.captcha)}
          aria-describedby={errors.captcha ? 'captcha-error' : undefined}
        />
        {errors.captcha && <p id="captcha-error" className="text-sm text-red-600">{errors.captcha}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send My Free Assessment'}
      </button>

      {status && (
        <p
          role={status.type === 'success' ? 'status' : 'alert'}
          className={
            status.type === 'success'
              ? 'text-sm text-green-600 font-medium'
              : 'text-sm text-red-600 font-medium'
          }
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
