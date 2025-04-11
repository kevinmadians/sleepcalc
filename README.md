# Sleep Calculator Web Application

A modern web application built with Next.js and React that helps users calculate optimal sleep and wake-up times based on 90-minute sleep cycles.

## Features

- Sleep time calculator (bedtime or wake-up time)
- Nap calculator for power naps and REM cycle naps
- Sleep Quality Tracker with visual data analysis and personalized recommendations
- Smart Alarm Calculator with chronotype optimization and morning routine planning
- Caffeine Calculator with half-life visualization and optimal caffeine cutoff times
- Sleep debt calculator
- Chronotype analyzer
- Sleep assessment tool
- Comprehensive sleep tips and science
- Mobile-responsive design with dark theme
- Fully SEO optimized with metadata and structured data

## Technology Stack

- **Frontend Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion 12
- **Visualization**: Chart.js with React-ChartJS-2
- **State Management**: React Hooks
- **Deployment**: Vercel

## Project Structure

The project follows a modular structure to ensure maintainability and scalability:

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx            # Home page
│   ├── sleep-results/      # Sleep calculation results page
│   ├── nap-calculator/     # Nap calculator page
│   ├── sleep-tracker/      # Sleep quality tracking and analysis page
│   ├── smart-alarm/        # Smart alarm calculator page
│   ├── caffeine-calculator/ # Caffeine calculator page
│   ├── sleep-debt/         # Sleep debt calculator page
│   ├── chronotype-analyzer/ # Chronotype analyzer page  
│   ├── sleep-assessment/   # Sleep assessment page
│   ├── sleep-tips/         # Sleep tips page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-use/       # Terms of use page
│   ├── cookie-policy/      # Cookie policy page
│   ├── not-found.tsx       # 404 page
│   └── metadata.ts         # Root metadata configuration
│
├── components/             # React components organized by domain
│   ├── layout/             # Layout components (Navbar, Footer, etc.)
│   ├── sleep-calculator/   # Sleep calculator specific components
│   ├── nap-calculator/     # Nap calculator specific components
│   ├── sleep-tracker/      # Sleep tracker specific components
│   ├── smart-alarm/        # Smart alarm specific components
│   ├── caffeine-calculator/ # Caffeine calculator specific components
│   └── ui/                 # Reusable UI components (CustomTimePicker, etc.)
│
├── constants/              # Application constants and configuration
│   ├── sleepCalculator.ts  # Sleep calculator constants
│   ├── napCalculator.ts    # Nap calculator constants
│   └── smartAlarm.ts       # Smart alarm calculator constants
│
└── utils/                  # Utility functions
    ├── date/               # Date formatting and calculation utilities
    ├── chart/              # Chart.js configuration utilities
    └── schema/             # JSON-LD schema generation utilities
```

## Key Features in Detail

### Sleep Quality Tracker
- Log sleep duration, quality, and mood
- Visualize sleep patterns with interactive charts
- Get personalized recommendations based on sleep data
- Track progress over time with sleep history

### Smart Alarm Calculator
- Calculate optimal wake times based on sleep cycles
- Factor in chronotype (Lion, Bear, Wolf, Dolphin) for personalized recommendations
- Account for sleep inertia in wake-up planning
- Visualize sleep stages and generate a customized morning routine

### Caffeine Calculator
- Track caffeine intake from various sources
- Visualize caffeine metabolism and half-life
- Get personalized recommendations for bedtime caffeine cutoff
- Learn about caffeine's effects on sleep through educational content

## SEO Optimization

The application is fully optimized for search engines with:

- Consistent branding: "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times"
- Standardized page titles and meta descriptions
- OpenGraph and Twitter card metadata for better social sharing
- JSON-LD structured data for rich search results
- Metadata exports for server components
- Client-side document.title setting for client components
- Canonical URLs and proper indexing directives

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sleep-calculator.git
   cd sleep-calculator
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To build the application for production:

```
npm run build
# or
yarn build
```

The optimized production build will be generated in the `.next` directory.

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and apply the appropriate build settings
4. Environment variables are configured in the Vercel dashboard or through the `.env` file

For more detailed instructions, see `VERCEL-DEPLOYMENT.md`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.