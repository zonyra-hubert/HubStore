# HubStay

HubStay is a rental discovery platform for students and tenants to find hostels, rooms, and houses.

## Features

- Browse rental listings with images and room type variants
- Search listings with Algolia
- Filter by listing category (hostel, room, house)
- View listing details, reviews, and monthly rent
- Contact hosts and request a viewing
- Admin dashboard to create and manage listings

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS + shadcn/ui
- Drizzle ORM
- NextAuth
- Algolia

## Notes

The existing backend models still use product-oriented naming in parts of the codebase. The UI and primary user flow are now adapted for rental listings, while preserving compatibility with the current schema.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Accommodation and hostel listing platform using Next.js 14.2: Learn the latest features and best practices of Next.js. Tailwind CSS: A utility-first CSS framework for rapid UI development. shadcn: Beautifully designed components for your apps. Next Auth V5: Implement OAuth2, Email, Password, 2FA, password resets, and more. Drizzle ORM: High-speed queries and mutations with full type safety. Algolia Search: Utilize powerful and fast search capabilities. Framer Motion: Create smooth and responsive animations. zustand: Small, fast, and scalable state management library. Resend: Effortlessly manage transactional emails. React-Hook-Form: Handle form validation and submission efficiently. Postgres with NeonDB: Serverless PostgreSQL for scalable and efficient database management.
