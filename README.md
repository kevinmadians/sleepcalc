# 😴 Sleep Calculator

<div align="center">
  <img src="https://i.imgur.com/YbYWiRi.png" alt="Sleep Calculator Logo" width="180" />
  <h3>Calculate Your Ideal Sleep & Wake Times</h3>

  ![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=flat&logo=tailwind-css)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
  ![Chart.js](https://img.shields.io/badge/Chart.js-4.0-ff6384?style=flat&logo=chart.js)
  
  <a href="https://sleepcalc.net">View Demo</a> · 
  <a href="https://github.com/yourusername/sleep-calculator/issues">Report Bug</a> · 
  <a href="https://github.com/yourusername/sleep-calculator/issues">Request Feature</a>
</div>

## 📋 Overview

A modern, feature-rich web application that helps users optimize their sleep by calculating ideal sleep and wake times based on 90-minute sleep cycles. The app provides personalized recommendations for improving sleep quality and overall well-being.

## ✨ Features

- **📱 Sleep Time Calculator** - Calculate optimal bedtime or wake-up time based on sleep cycles
- **💤 Nap Calculator** - Plan perfect power naps and REM cycle naps
- **📊 Sleep Quality Tracker** - Visualize sleep patterns with interactive charts
- **⏰ Smart Alarm Calculator** - Optimize wake times based on chronotype
- **☕ Caffeine Calculator** - Track caffeine intake and visualize its impact on sleep
- **💭 Sleep Debt Calculator** - Track and recover from accumulated sleep debt
- **🧠 Chronotype Analyzer** - Discover your natural sleep-wake tendency
- **📝 Sleep Assessment Tool** - Evaluate your sleep habits and get recommendations
- **📚 Comprehensive Sleep Tips** - Evidence-based advice for better sleep
- **🌙 Dark Theme** - Eye-friendly dark interface for nighttime use
- **🔍 SEO Optimized** - Full metadata and structured data implementation

## 🚀 Technology Stack

<table>
  <tr>
    <td align="center">Next.js 15</td>
    <td align="center">React 19</td>
    <td align="center">Tailwind CSS 3.3</td>
    <td align="center">TypeScript</td>
  </tr>
  <tr>
    <td align="center">Chart.js</td>
    <td align="center">Framer Motion 12</td>
    <td align="center">Vercel</td>
    <td align="center">React Hooks</td>
  </tr>
</table>

## 🗂️ Project Structure

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
│   └── [other pages]       # Additional pages
│
├── components/             # React components organized by domain
│   ├── layout/             # Layout components (Navbar, Footer, etc.)
│   ├── sleep-calculator/   # Sleep calculator specific components
│   ├── nap-calculator/     # Nap calculator specific components
│   ├── sleep-tracker/      # Sleep tracker specific components
│   ├── smart-alarm/        # Smart alarm specific components
│   ├── caffeine-calculator/ # Caffeine calculator specific components
│   └── ui/                 # Reusable UI components
│
├── constants/              # Application constants and configuration
│
└── utils/                  # Utility functions
    ├── date/               # Date formatting and calculation utilities
    ├── chart/              # Chart.js configuration utilities
    └── schema/             # JSON-LD schema generation utilities
```

## 🔍 Key Tools in Detail

### 🛌 Sleep Quality Tracker
- Log sleep duration, quality, and mood
- Visualize sleep patterns with interactive charts
- Get personalized recommendations based on sleep data
- Track progress over time with sleep history

### ⏰ Smart Alarm Calculator
- Calculate optimal wake times based on sleep cycles
- Factor in chronotype (Lion, Bear, Wolf, Dolphin) for personalized recommendations
- Account for sleep inertia in wake-up planning
- Visualize sleep stages and generate a customized morning routine

### ☕ Caffeine Calculator
- Track caffeine intake from various sources
- Visualize caffeine metabolism and half-life
- Get personalized recommendations for bedtime caffeine cutoff
- Learn about caffeine's effects on sleep through educational content

## 🔧 Installation

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/sleep-calculator.git
   cd sleep-calculator
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build settings
3. Set environment variables in the Vercel dashboard
4. Deploy with a single click

## 🔍 SEO Optimization

The application is fully optimized for search engines:

- Consistent branding: "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times"
- Standardized metadata across all pages
- OpenGraph and Twitter card metadata for social sharing
- JSON-LD structured data for rich search results
- Complete sitemap.xml implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ for better sleep</p>
</div>