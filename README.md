An exercise in NextJS, recreating [my exercise in Angular](https://github.com/haemaenpaa/fm-character-sheet) in NextJS. The package.json currently presumes that that project is in the path `../fm-character-sheet` in order to include the transfer-model.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, start the `fm-character sheet` server in another console:

```bash
export PORT=3001
cd ../fm-character-sheet/server
npx tsx src/index.ts
```

Ensure that there is a `.env.local` file in the project root that contains `BACKEND_URL="http://localhost:3001/api"`, or otherwise set the environment variable.

Finally, run the development server:

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
