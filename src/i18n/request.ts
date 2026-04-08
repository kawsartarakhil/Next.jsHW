import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

const locales = ['en', 'ru', 'tj'];
const defaultLocale = 'tj';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  console.log('REQUESTED:', requested);
  
  const locale = requested && hasLocale(locales, requested)
    ? requested
    : defaultLocale;

  console.log('USING LOCALE:', locale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});