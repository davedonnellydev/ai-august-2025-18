# Project 18 #AIAugustAppADay: Daily Affirmations App (React Native)

![Last Commit](https://img.shields.io/github/last-commit/davedonnellydev/ai-august-2025-18)  

**📆 Date**: 18/Aug/2025  
**🎯 Project Objective**: Mobile app for daily AI-generated affirmations.  
**🚀 Features**: Get new affirmation each day; Option to generate custom ones; Save favourites  
**🛠️ Tech used**: React Native, TypeScript, OpenAI APIs  
**▶️ Live Demo**: [https://dave-donnelly-ai-august-18.netlify.app/](https://dave-donnelly-ai-august-18.netlify.app/)  
  

## 🗒️ Summary

Project 18 was my first time working with **React Native**. I built a mobile app that generates daily affirmations using AI.  

The app itself was fairly simple: I created a serverless endpoint that the mobile app could call, which then hit the OpenAI API to generate the affirmation. Most of the challenge came from learning the **structure and syntax of React Native**, which is similar to React but with some important differences in how components, styling, and navigation work.  

I didn’t have enough time to explore testing tools for React Native (something I’d like to revisit), but overall this was a great introduction to a new framework and a different way of thinking about app development.  

**Lessons learned**  
- React Native feels familiar to React devs, but its component system and styling approach require a mindset shift.  
- Serverless endpoints remain a clean way to handle API calls securely from mobile clients.  
- Even simple projects can provide a valuable introduction to new frameworks.  

**Final thoughts**  
A straightforward but rewarding project. It gave me my first taste of React Native development, and I’m excited to explore more mobile builds in the future.  

This project has been built as part of my AI August App-A-Day Challenge. You can read more information on the full project here: [https://github.com/davedonnellydev/ai-august-2025-challenge](https://github.com/davedonnellydev/ai-august-2025-challenge).  

## 🧪 Testing

![CI](https://github.com/davedonnellydev/ai-august-2025-18/actions/workflows/npm_test.yml/badge.svg)  
*Note: Test suite runs automatically with each push/merge.*  

## Quick Start

1. **Clone and install:**
   ```bash
   git clone https://github.com/davedonnellydev/ai-august-2025-18.git
   cd ai-august-2025-18
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API (for AI features)
OPENAI_API_KEY=your_openai_api_key_here

```

### Key Configuration Files

- `next.config.mjs` – Next.js config with bundle analyzer  
- `tsconfig.json` – TypeScript config with path aliases (`@/*`)  
- `theme.ts` – Mantine theme customization  
- `eslint.config.mjs` – ESLint rules (Mantine + TS)  
- `jest.config.cjs` – Jest testing config  
- `.nvmrc` – Node.js version  

### Path Aliases

```ts
import { Component } from '@/components/Component'; // instead of '../../../components/Component'
```

## 📦 Available Scripts
### Build and dev scripts

- `npm run dev` – start dev server
- `npm run build` – bundle application for production
- `npm run analyze` – analyze production bundle

### Testing scripts

- `npm run typecheck` – checks TypeScript types
- `npm run lint` – runs ESLint
- `npm run jest` – runs jest tests
- `npm run jest:watch` – starts jest watch
- `npm test` – runs `prettier:check`, `lint`, `typecheck` and `jest`

### Other scripts

- `npm run prettier:check` – checks files with Prettier
- `npm run prettier:write` – formats files with Prettier


## 📜 License
![GitHub License](https://img.shields.io/github/license/davedonnellydev/ai-august-2025-18)  
This project is licensed under the MIT License.  

## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).  

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a  

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).  

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:  

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).  
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.  

## Join the community

Join our community of developers creating universal apps.  

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.  
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.  
