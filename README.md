# 🎯 CareerForge

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## AI-Powered Resume Analyzer & Career Optimization Platform

**Where Careers Take Shape** — Transform your resume into a career-winning document with AI-powered insights, ATS optimization, and executive-level feedback.

---

## 📋 Table of Contents

- [✨ Introduction](#-introduction)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔋 Features](#-features)
- [🤸 Quick Start](#-quick-start)
- [🎨 Theme Customization](#-theme-customization)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Introduction

**CareerForge** is an advanced AI-powered resume analysis platform that helps professionals optimize their resumes for Applicant Tracking Systems (ATS) and human recruiters. Built with React, React Router v7, and OpenAI's GPT-4, it provides instant, actionable feedback on your resume's content, structure, tone, and keyword optimization.

### What Makes CareerForge Special?

- **🎯 Professional Theme**: Emerald-navy-gold color scheme with dark, executive aesthetics
- **🤖 AI-Powered Analysis**: Leverages OpenAI GPT-4 for intelligent resume evaluation
- **📊 ATS Optimization**: Ensures your resume passes automated screening systems
- **⚡ Instant Feedback**: Get comprehensive analysis in under 30 seconds
- **💼 Executive-Grade Insights**: Professional-level recommendations for career advancement
- **🎨 Modern UI/UX**: Glass-morphism, glowing effects, and smooth animations

Perfect for job seekers, career changers, and professionals looking to land their dream role.

---

## ⚙️ Tech Stack

### Frontend

- **[React 18](https://react.dev/)** - A JavaScript library for building user interfaces with reusable components and efficient rendering through a virtual DOM.

- **[React Router v7](https://reactrouter.com/)** - The latest routing library for React with enhanced data loading, nested routes, and SSR support.

- **[TypeScript](https://www.typescriptlang.org/)** - Adds static typing to JavaScript for better code quality, tooling, and developer experience.

- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapidly building custom user interfaces with low-level utility classes.

- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool providing instant server start and lightning-fast HMR.

### Backend & AI

- **[Node.js](https://nodejs.org/)** - JavaScript runtime for building the API server.

- **[Express.js](https://expressjs.com/)** - Minimal and flexible Node.js web application framework for building APIs.

- **[OpenAI API](https://openai.com/)** - GPT-4o-mini for intelligent resume analysis and feedback generation.

### Storage & State

- **[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Browser-based storage for resume history and user data.

- **React Hooks** - Built-in state management using useState, useEffect, and custom hooks.

### Additional Libraries

- **[react-dropzone](https://react-dropzone.js.org/)** - Drag-and-drop file upload with validation.

- **[pdfjs-dist](https://mozilla.github.io/pdf.js/)** - PDF text extraction and preview generation.

- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management.

---

## 🔋 Features

### 👉 **Professional AI Analysis**
Comprehensive resume evaluation using OpenAI's GPT-4, analyzing:
- Content quality and relevance
- Tone and professional language
- Structure and organization
- Skills presentation
- ATS compatibility

### 👉 **ATS Optimization Score**
Get a detailed ATS compatibility score (0-100) with specific recommendations to improve your resume's chances of passing automated screening systems.

### 👉 **Multi-Category Feedback**
Receive targeted feedback across five key categories:
- **Tone & Style**: Professional language and communication
- **Content**: Relevance, achievements, and impact
- **Structure**: Layout, sections, and organization
- **Skills**: Technical and soft skills presentation
- **ATS**: Keyword optimization and formatting

### 👉 **Resume Portfolio Management**
- Upload and store multiple resume versions
- Track improvements over time
- Compare different versions
- Access your resume history anytime

### 👉 **Job-Specific Analysis**
Tailor your analysis by providing:
- Target company name
- Job title
- Complete job description
Get feedback customized to the specific role you're applying for.

### 👉 **Beautiful Dark Theme**
- Emerald-navy-gold color scheme
- Glass-morphism effects
- Glowing animations
- Dark professional aesthetic
- Fully responsive design

### 👉 **Instant Results**
- Analysis completes in 10-30 seconds
- Real-time progress tracking
- Step-by-step visual feedback
- Downloadable results

### 👉 **Cross-Device Compatibility**
Fully responsive design that works seamlessly across:
- Desktop computers
- Laptops
- Tablets
- Mobile devices

And many more features including code reusability, modular architecture, and extensible design.

---

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/yourusername/careerforge.git
cd careerforge
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Environment Setup

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Add your OpenAI API key to the `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

**Note**: You can get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### Starting the API Server

In a **separate terminal**, start the Express API server:

```bash
node server.mjs
```

You should see:
```
🚀 API Server running on http://localhost:3001
✅ CORS enabled for all localhost ports
⚡ Ready to accept requests!
```

### Running the Development Server

In your **main terminal**, start the React development server:

```bash
npm run dev
```

Open [http://localhost:5192](http://localhost:5192) in your browser to view the project.

### Testing the Application

1. **Navigate to Upload Page**: Click "New Analysis" or "Get Started"
2. **Fill in Details**:
   - Company Name (optional)
   - Job Title (required)
   - Job Description (recommended)
3. **Upload Resume**: Drag and drop your PDF resume
4. **Analyze**: Click "Begin Professional Analysis"
5. **View Results**: See your comprehensive feedback and scores

---

## 🎨 Theme Customization

CareerForge uses a professional emerald-navy-gold theme. To customize:

### Change Primary Colors

Find and replace in all component files:

```jsx
// Change primary gradient
from-emerald-500 to-teal-500  →  from-blue-500 to-cyan-500

// Change glow effects
shadow-emerald-500/50  →  shadow-blue-500/50

// Change borders
border-emerald-400  →  border-blue-400
```

### Adjust Theme Darkness

In component files, modify opacity values:

```jsx
// Lighter backgrounds
bg-slate-800/80  →  bg-slate-800/60

// Darker backgrounds
from-slate-900  →  from-slate-950
```

### Change Brand Name

Replace in all files:
- "CareerForge" → "Your Brand Name"
- "Where Careers Take Shape" → "Your Tagline"

---

## 📁 Project Structure

```
careerforge/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Summary.tsx
│   │   ├── ATS.tsx
│   │   ├── Details.tsx
│   │   ├── Accordion.tsx
│   │   └── ResumeCard.tsx
│   ├── routes/              # Page routes
│   │   ├── home.tsx         # Dashboard/landing page
│   │   ├── upload.tsx       # Resume upload page
│   │   ├── resume.tsx       # Results page
│   │   └── api.analyze.ts   # Analysis API route
│   ├── lib/                 # Utility functions
│   │   ├── storage.ts       # LocalStorage management
│   │   ├── pdfText.ts       # PDF text extraction
│   │   ├── pdf2img.ts       # PDF to image conversion
│   │   └── utils.ts         # Helper functions
│   ├── root.tsx             # App root component
│   └── routes.ts            # Route configuration
├── constants/               # App constants
│   └── index.ts             # AI prompt templates, types
├── public/                  # Static assets
│   ├── images/
│   └── icons/
├── server.mjs               # Express API server
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## 🔧 Configuration

### React Router Configuration

File: `react-router.config.ts`

```typescript
export default {
  ssr: false,  // SSR disabled for API compatibility
} satisfies Config;
```

### Tailwind Configuration

File: `tailwind.config.ts`

Customize colors, spacing, and theme in this file.

### TypeScript Configuration

File: `tsconfig.json`

Adjust TypeScript compiler options as needed.

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
4. Deploy!

### Deploy API Separately

For production, deploy the API as a serverless function:

**Vercel:**
- Move API logic to `/api` folder
- Deploy as Vercel Serverless Functions

**Netlify:**
- Move API logic to `/netlify/functions`
- Deploy as Netlify Functions

**Railway/Render:**
- Deploy `server.mjs` as a standalone Node.js service
- Update frontend API URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use Tailwind utility classes
- Maintain consistent formatting
- Add comments for complex logic
- Write meaningful commit messages

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **React Router Team** for the excellent routing library
- **Tailwind CSS** for the utility-first CSS framework
- **Mozilla** for PDF.js library
- The open-source community for inspiration and support

---

## 📧 Contact

Have questions or suggestions? Reach out:

- **Email**: your.email@example.com
- **Twitter**: [@yourusername](https://twitter.com/yourusername)
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

<div align="center">

**Built with 💚 by [Your Name](https://yourwebsite.com)**

*Empowering careers, one resume at a time.*

</div>
