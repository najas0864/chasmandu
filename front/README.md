# start
. steps order,delivered,fulfilled,pop or cancle order.[place order and store in db] create page after place order butten in cart.
. create function to mail users about new offers and products.
. signup fix with token using express-session
. use passport to sign easy
14 good dashboard,

**DUE**
*FOOTER*
[Legal_Links_in_footer]
Privacy Policy
Terms of Service
Cookie Policy
[Copyright_&_Credits]
“© [Year] [Company Name]. All rights reserved.”
Website designed by [Your Company] (if applicable).


my-app/
│
├── public/                 # Static files (favicon, robots.txt, etc.)
│   └── ...
│
├── src/                    # Source code
│   ├── assets/             # Images, fonts, static assets
│   │   └── logo.svg
│
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Buttons, inputs, cards (atomic components)
│   │   └── layout/         # Layout-related (Navbar, Sidebar, etc.)
│
│   ├── features/           # Feature-specific modules (domain-driven)
│   │   ├── auth/           # Auth feature (e.g. LoginForm, authSlice)
│   │   ├── dashboard/      # Dashboard feature
│   │   └── users/          # User management
│
│   ├── hooks/              # Custom React hooks
│
│   ├── lib/                # Utilities, API clients, and third-party wrappers
│   │   ├── axios.ts
│   │   └── dateFormatter.ts
│
│   ├── routes/             # All app routes and route config
│   │   └── AppRoutes.tsx
│
│   ├── pages/              # Page-level components (linked from routes)
│   │   ├── Home.tsx
│   │   └── Dashboard.tsx
│
│   ├── store/              # Global state (Redux/Zustand/Jotai)
│   │   └── index.ts
│
│   ├── styles/             # Global styles (Tailwind, SCSS, etc.)
│   │   └── globals.css
│
│   ├── types/              # Global TypeScript types/interfaces
│   │   └── user.ts
│
│   ├── App.tsx             # Root component
│   ├── main.tsx            # App entry point (Vite-specific)
│   └── vite-env.d.ts       # Vite TS support
│
├── .env                   # Environment variables
├── .gitignore
├── index.html             # HTML entry point
├── package.json
├── tailwind.config.js     # Tailwind config (if used)
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite config