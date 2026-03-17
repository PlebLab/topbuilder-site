import Image from "next/image";
import { siteContent, type Person } from "@/data/topbuilder-content";

function PersonCard({ person }: { person: Person }) {
  const content = (
    <article className="tb-person-card">
      <div className="tb-person-image-wrap">
        <Image
          className="tb-person-image"
          src={person.image}
          alt={person.name}
          fill
          sizes="(max-width: 780px) 100vw, (max-width: 1080px) 50vw, 25vw"
        />
      </div>
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </article>
  );

  if (!person.link) return content;

  return (
    <a className="unstyled-link" href={person.link} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

export default function RebuildPage() {
  return (
    <main className="tb-page">
      <header className="tb-topbar">
        <div className="container tb-topbar-inner">
          <a className="tb-brand" href="#">
            TOP BUILDER
          </a>
          <nav className="tb-nav">
            <a href="#prize">Prize</a>
            <a href="#judges">Judges</a>
            <a href="#mentors">Mentors</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="tb-chip" href={siteContent.hero.primaryCta.href} target="_blank" rel="noreferrer">
            Apply
          </a>
        </div>
      </header>

      <section className="tb-hero">
        <div className="container">
          <div className="tb-hero-shell">
            <div className="tb-hero-grid">
              <article>
                <p className="tb-eyebrow">{siteContent.hero.label}</p>
                <h1>{siteContent.hero.heading}</h1>
                <p className="tb-lead">{siteContent.hero.subheading}</p>
                <p className="tb-prize">{siteContent.hero.prize}</p>
                <div className="tb-cta-row">
                  <a
                    className="tb-btn tb-btn-primary"
                    href={siteContent.hero.primaryCta.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {siteContent.hero.primaryCta.text}
                  </a>
                  <a className="tb-btn tb-btn-secondary" href="#prize">
                    Learn More
                  </a>
                </div>
              </article>
              <article className="tb-hero-visual">
                <div className="tb-hero-image-wrap">
                  <Image
                    src={siteContent.hero.visual}
                    alt="Top Builder visual"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
              </article>
            </div>
            <div className="tb-highlight-grid">
              {siteContent.highlights.map((item) => (
                <article key={item.title} className="tb-highlight-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="prize" className="tb-section">
        <div className="container">
          <p className="tb-section-kicker">Season Recap</p>
          <div className="tb-winner-shell">
            <article className="tb-winner-copy">
              <h2>{siteContent.winner.title}</h2>
              <p>{siteContent.winner.body}</p>
              <div className="tb-perk-grid">
                {siteContent.perks.map((perk) => (
                  <article key={perk.title} className="tb-perk-card">
                    <h3>{perk.title}</h3>
                    <p>{perk.body}</p>
                  </article>
                ))}
              </div>
            </article>
            <article className="tb-winner-image-wrap">
              <Image
                src={siteContent.winner.image}
                alt={siteContent.winner.title}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </article>
          </div>
        </div>
      </section>

      <section id="judges" className="tb-section tb-section-dark">
        <div className="container">
          <p className="tb-section-kicker">Judges</p>
          <h2>Meet this season&apos;s judges</h2>
          <div className="tb-people-grid">
            {siteContent.judges.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      <section id="mentors" className="tb-section">
        <div className="container">
          <p className="tb-section-kicker">Mentors</p>
          <h2>Builder mentors in your corner</h2>
          <div className="tb-people-grid">
            {siteContent.mentors.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
          <div className="tb-link-grid">
            {siteContent.linkCards.map((item) => (
              <article className="tb-link-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="tb-section tb-section-dark">
        <div className="container">
          <p className="tb-section-kicker">FAQ</p>
          <h2>Questions before you apply</h2>
          <div className="tb-faq">
            {siteContent.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section">
        <div className="container">
          <div className="tb-final-cta">
            <h2>Are you the next Top Builder? Prove it.</h2>
            <a
              className="tb-btn tb-btn-primary"
              href={siteContent.hero.primaryCta.href}
              target="_blank"
              rel="noreferrer"
            >
              Apply now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
