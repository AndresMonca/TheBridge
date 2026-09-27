export const aboutSections = [
  {
    eyebrow: "The problem",
    title: "Book access is scattered across chats",
    body:
      "University students often have books they no longer use while other students need those same books for classes, personal reading, or academic activities. These exchanges usually happen through chats, social media groups, or individual messages. Information becomes difficult to discover, availability is unclear, and it is not easy to tell whether a book is being exchanged, loaned, rented, or sold.",
  },
  {
    eyebrow: "Target users",
    title: "Students in small academic communities",
    body:
      "The first users are university students and members of small academic communities who are physically close enough to coordinate delivery in person. Milestone 1 is not intended for public marketplaces, logistics management, payments, or large communities.",
  },
  {
    eyebrow: "Why a web application",
    title: "One consistent place to discover and decide",
    items: [
      {
        label: "Structured discovery",
        text: "every publication shows its title, owner, condition, and sharing modality in one consistent place.",
      },
      {
        label: "Clear interaction",
        text: "users can tell Exchange, Loan, Rental, and Sale offers apart without searching through unrelated chat messages.",
      },
      {
        label: "Accessible delivery",
        text: "students can use the prototype from a computer or phone browser without installing a native application.",
      },
      {
        label: "Focused academic scope",
        text: "a static frontend prototype can demonstrate the core experience before future backend and persistence decisions are made.",
      },
    ],
  },
  {
    eyebrow: "Proposed solution",
    title: "A searchable marketplace of simulated listings",
    body:
      "TheBridge presents a searchable marketplace of simulated physical book publications. A user can review available books, register a book they own, choose how to share it, and send or review simulated requests. The prototype uses local data and frontend state only — there is no real backend, payment processing, or persistence yet.",
  },
];

export const aboutFlow = [
  { icon: "🔎", label: "Find a book" },
  { icon: "📚", label: "Add your book" },
  { icon: "🔄", label: "Choose how to share" },
  { icon: "✍️", label: "Publish" },
  { icon: "🤝", label: "Receive requests" },
  { icon: "🎓", label: "Connect with a student" },
];

export const userStories = [
  {
    id: "US-01",
    text: "As a student, I want to explore publications to find books that interest me.",
  },
  {
    id: "US-02",
    text: "As a user, I want to search and filter publications to quickly find books under the modality I need.",
  },
  {
    id: "US-03",
    text: "As an owner, I want to register a book I own so I can offer it on the platform.",
  },
  {
    id: "US-04",
    text: "As an owner, I want to create a publication and choose whether I want to exchange, loan, rent, or sell my book.",
  },
  {
    id: "US-05",
    text: "As a student, I want to send a request about a publication to express my interest.",
  },
  {
    id: "US-06",
    text: "As an owner, I want to review received requests and accept or reject them.",
  },
];

export const teamMembers = [
  {
    name: "Edwin Andrés Montaño",
    role: "Shared UI system, Home & Marketplace",
  },
  {
    name: "Juan Esteban González",
    role: "Personal library & listing flows",
  },
  {
    name: "Jorge Fontalvo",
    role: "Personal library & listing flows",
  },
  {
    name: "Daniel Orozco",
    role: "Requests, About & documentation",
  },
];
