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
  "Find a book",
  "Add your book",
  "Choose how to share",
  "Publish",
];
