# Sleep Cycle Calculator

A modern web application that helps users calculate optimal sleep and wake-up times based on 90-minute sleep cycles. This application replicates the functionality of SleepCalculator.com with enhanced design, user experience, and feature set.

## Features

- **Sleep Cycle Calculation**: Calculate optimal times to sleep or wake up based on 90-minute sleep cycles
- **Modern UI/UX**: Dark-themed UI with smooth animations and responsive design
- **Nap Calculator**: Plan effective nap times (coming soon)
- **Sleep Quality Tips**: Get advice on improving sleep quality (coming soon)
- **Time Zone Support**: Automatically detects local time zones
- **Share Results**: Easily share or copy sleep schedule

## Tech Stack

- **Frontend**: Next.js (React) with Tailwind CSS
- **State Management**: React Context API and local React state
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with custom components
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Deployment

### Deploying to Vercel

This project is configured for seamless deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com/new)
3. Select the repository and click "Import"
4. Vercel will automatically detect Next.js and apply the optimal build settings
5. Click "Deploy" and your app will be live in minutes

Alternatively, you can use the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy from the project directory
vercel
```

## License

ISC #   s l e e p c a l c  
 