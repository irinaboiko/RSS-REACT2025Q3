export default function About() {
  return (
    <div className="mx-auto w-full px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">About the Author</h1>

      <div className="text-lg">
        <h2 className="text-2xl">
          Hi there! My name is <span className="text-accent">Iryna Baiko.</span>
        </h2>
        <p>
          I&apos;m a <span className="text-accent">frontend developer</span>{' '}
          based in <span className="text-accent">Minsk, Belarus</span>.
        </p>

        <br />

        <p>
          This app was built as part of the{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            RS School React Course
          </a>
          .
        </p>

        <br />

        <p>
          Feel free to contact me via{' '}
          <a
            href="https://github.com/irinaboiko"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            GitHub
          </a>{' '}
          or{' '}
          <a
            href="https://discordapp.com/users/673453318076366849/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            Discord
          </a>
          !
        </p>
      </div>

      <div className="fixed right-1 bottom-2">
        <img src="/images/about-baby-yoda.webp" alt="Baby Yoda" />
      </div>
    </div>
  );
}
