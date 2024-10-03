# Frontend-TS: Next.js Web3 Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14.2.14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)
![ethers.js](https://img.shields.io/badge/ethers.js-6.13.3-3C3C3D)
![wagmi](https://img.shields.io/badge/wagmi-2.12.16-3C3C3D)
![viem](https://img.shields.io/badge/viem-2.21.16-3C3C3D)

A modern, feature-rich Web3 dashboard built with Next.js, TypeScript, and cutting-edge technologies.

## 🚀 Features

- **Next.js 14**: Leveraging the latest features of Next.js for optimal performance and developer experience.
- **TypeScript**: Ensuring type safety and improved code quality.
- **Web3 Integration**: Built-in support for Ethereum interactions using ethers.js, viem, and wagmi.
- **RainbowKit**: Seamless wallet connection experience for users.
- **React Query**: Efficient data fetching and state management.
- **Tailwind CSS**: Rapid UI development with a utility-first CSS framework.
- **Radix UI**: Accessible and customizable UI components.
- **Dark Mode**: Built-in dark mode support using next-themes.
- **Data Visualization**: Integrated Recharts for beautiful, responsive charts.
- **Toast Notifications**: User-friendly notifications with Sonner.

## 🏗️ Project Structure

The project follows a feature-based scaffolding approach, organizing code by functionality rather than type. This structure promotes modularity and scalability:

```
frontend-ts/
├── src/
│   ├── addresses/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   ├── ui/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
├── public/
└── ...
```

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ftarantuviez/trm-frontend.git
   cd trm-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧰 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.
- `npm run lint`: Runs the linter to check for code quality issues.

## 🎨 Customization

- **Styling**: Tailwind CSS is pre-configured. Customize the `tailwind.config.js` file to match your design system.
- **Theme**: Modify the theme in `src/styles/globals.css` and use `next-themes` for dark mode toggling.
- **Components**: Leverage Radix UI components and customize them to fit your needs.

## 📚 Learn More

To dive deeper into the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ethers.js](https://docs.ethers.org/v6/)
- [wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/docs/introduction)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
