export type Person = {
  name: string;
  role: string;
  image: string;
  link?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FeatureItem = {
  title: string;
  body: string;
};

export type LinkCard = {
  title: string;
  body: string;
  href: string;
  cta: string;
};

export const siteContent = {
  title: "Top Builder Season 2 by PlebLab | Bitcoin Innovation Event Presented by Timestamp",
  description:
    "Join Top Builder Season 2, a PlebLab event presented by Timestamp. Compete, innovate, and showcase projects advancing the Bitcoin and Lightning Network ecosystems.",
  hero: {
    label: "Top Builder",
    heading: "Are you the next Top Builder? Prove It.",
    subheading:
      "All builders win by gaining exposure, mentorship, and collaboration opportunities in the Bitcoin ecosystem. Only one can be Top Builder.",
    primaryCta: {
      text: "Apply now and start building",
      href: "https://bit.ly/topbuilder2",
    },
    secondaryCta: {
      text: "Learn More",
      href: "#prize",
    },
    prize: "Bitcoin Prize of $15,000",
    visual: "https://framerusercontent.com/images/S9ljv2xv8Y13BJ7qQBViJ2i41MI.png",
  },
  winner: {
    title: "Winner of Top Builder 2024: Yopaki",
    body: "The final round saw standout teams like Clams, Coracle, BitScript, Shopstr, and CASCDR, each pushing innovation in the Bitcoin ecosystem.",
    image: "https://framerusercontent.com/images/O7uCTkVYDPLYiOHUv9KOCr5cXQ.jpg?scale-down-to=1024",
  },
  perks: [
    {
      title: "Mentorship",
      body: "Build with experienced Bitcoin founders, operators, and engineers.",
    },
    {
      title: "Community Exposure",
      body: "Get in front of builders, operators, and ecosystem contributors.",
    },
    {
      title: "VC Network",
      body: "Pitch to ecosystem investors and high-signal decision makers.",
    },
    {
      title: "Weekend Workshops",
      body: "Hands-on sessions to accelerate product and go-to-market execution.",
    },
  ],
  highlights: [
    {
      title: "140+ builders",
      body: "Builders and operators participating in high-signal sessions and project updates.",
    },
    {
      title: "Project Mentors",
      body: "Direct feedback loops with experienced founders and engineers.",
    },
    {
      title: "Startup Day",
      body: "Final presentations in front of judges, ecosystem teams, and investors.",
    },
  ] satisfies FeatureItem[],
  judges: [
    {
      name: "Dr. Arman Meguerian",
      role: "Founder and CEO of Timestamp",
      image: "https://framerusercontent.com/images/zxIPJDVZkLvQIxrs69tygLsFU.png?scale-down-to=512",
      link: "https://x.com/DrBitcoinMD",
    },
    {
      name: "Lisa Neigut",
      role: "Advisor at Ego Death Capital, Base58",
      image: "https://framerusercontent.com/images/de4AT4Rczo8pmspcYYPbhLrzPA.jpeg",
      link: "https://x.com/niftynei",
    },
    {
      name: "Marty Bent",
      role: "Managing Partner at Ten31, TFTC",
      image: "https://framerusercontent.com/images/w5IjrMDQxMVAHjs55gNRSEeR8U.jpeg",
      link: "https://x.com/MartyBent",
    },
    {
      name: "Danny Knowles",
      role: "Venture Partner, Epoch VC",
      image: "https://framerusercontent.com/images/L1TcW83BX6598Kkt3uX0qh8yno.jpg",
      link: "https://x.com/btctechsupport",
    },
    {
      name: "TBA",
      role: "CTO of BitEscrow, FOSS Engineer at PlebLab",
      image: "https://framerusercontent.com/images/GVYvvrQsfQSMz4bdjKKrANOnPQg.png?scale-down-to=512",
    },
  ] satisfies Person[],
  mentors: [
    {
      name: "Topher Scott",
      role: "Co-Founder and CEO of PlebLab",
      image: "https://framerusercontent.com/images/0M6vwZ4lzSasXA0ysz4ugWcwJwY.png",
      link: "https://x.com/FlipCatLLC",
    },
    {
      name: "Car Gonzalez",
      role: "COO of PlebLab",
      image: "https://framerusercontent.com/images/AA904a5r1yRrhp69s9A5IMrHQg.jpeg",
      link: "https://x.com/k00bideh",
    },
    {
      name: "Keyan Kousha",
      role: "Engineer at Zaprite, FOSS Engineer at PlebLab",
      image: "https://framerusercontent.com/images/tDhBddP4wJ6r5X6FGEDHCDWaTE.jpg",
      link: "https://x.com/StephenDeLorme",
    },
    {
      name: "Stephen DeLorme",
      role: "CTO of BitEscrow, FOSS Engineer at PlebLab",
      image: "https://framerusercontent.com/images/fblK8CZFwbw1ErdCozPi2KXinc.jpg",
      link: "https://x.com/StephenDeLorme",
    },
    {
      name: "Teresa Martin",
      role: "COO PlebLab",
      image: "https://framerusercontent.com/images/6B8zMw4SHwlIT6qGD4H5jJ7TM.jpeg",
    },
    {
      name: "nicktee",
      role: "Founder & CEO of Stacker News",
      image: "https://framerusercontent.com/images/6B8zMw4SHwlIT6qGD4H5jJ7TM.jpeg",
    },
    {
      name: "Phil",
      role: "Founder & CEO of 21M Communications",
      image: "https://framerusercontent.com/images/IYe3jIiwH1kT6OfRWVxbI2YEkRw.jpg?scale-down-to=512",
    },
    {
      name: "Austin Kelsay",
      role: "UX/UI of Voltage, Co-Founder of ATL BitLab",
      image: "https://framerusercontent.com/images/ELuDbgbUE4aNWNlNAFXs6LlpYA.jpg",
    },
    {
      name: "Darren",
      role: "Engineer at PlebLab",
      image: "https://framerusercontent.com/images/5obXKIsd3PyxdP4vT6C6gYUR9e4.jpg",
    },
    {
      name: "Nick Theile",
      role: "Developer Relations Engineer at Voltage / Founder & Instructor of PlebDevs",
      image: "https://framerusercontent.com/images/mPFDg8gV6SmOvfcYrn7gLmU4LFk.jpg",
      link: "https://x.com/nickteecee",
    },
  ] satisfies Person[],
  linkCards: [
    {
      title: "Read more",
      body: "The final showdown at Startup Day and how the champion emerged.",
      href: "https://www.pleblab.dev/blog-detail/the-final-showdown-at-startup-day-unveiling-the-champion-of-top-builder",
      cta: "Read recap",
    },
    {
      title: "Watch recap",
      body: "Catch the playlist and review key moments from the event.",
      href: "https://www.plebtv.com/PLvxf1TpXqCAKE9lEZassxskd8QnOj7DS7/6R0V-szyzqo",
      cta: "Watch now",
    },
  ] satisfies LinkCard[],
  faq: [
    {
      question: "Who is eligible to apply for Top Builder?",
      answer:
        "Builders and teams working on Bitcoin or Lightning products are encouraged to apply.",
    },
    {
      question: "What kind of projects is Top Builder looking for?",
      answer:
        "Projects that advance Bitcoin and Lightning with strong technical execution and clear user value.",
    },
    {
      question: "Are international teams allowed to participate?",
      answer: "Yes. Top Builder welcomes global applications.",
    },
    {
      question: "Are there any fees associated with participating in Top Builder?",
      answer:
        "No participation fee is required based on the currently published event information.",
    },
    {
      question: "Is this competition designed for teams, individuals, or both?",
      answer: "Both. Individuals and teams can participate.",
    },
  ] satisfies FaqItem[],
};
