import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="mx-auto w-full px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{t('title')}</h1>

      <div className="text-lg">
        <h2 className="text-2xl">
          {t.rich('intro', {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </h2>
        <p>
          {t.rich('roleLocation', {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </p>

        <br />

        <p>
          {t.rich('course', {
            link: (chunks) => (
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                {chunks}
              </a>
            ),
          })}
        </p>

        <br />

        <p>
          {t.rich('contact', {
            gh: (chunks) => (
              <a
                href="https://github.com/irinaboiko"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                {chunks}
              </a>
            ),
            dc: (chunks) => (
              <a
                href="https://discordapp.com/users/673453318076366849/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="fixed right-1 bottom-2">
        <img src="/images/about-baby-yoda.webp" alt="Baby Yoda" />
      </div>
    </div>
  );
}
