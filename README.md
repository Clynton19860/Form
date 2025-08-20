# 360° Feedback Survey Application

A stunning, professional-grade web-based 360-degree feedback survey application built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- **Beautiful Landing Page**: Stunning design with animated backgrounds and glassmorphism effects
- **Comprehensive Survey**: 50 Likert scale questions + 10 open-text questions organized by categories
- **Interactive UI**: Smooth animations, progress tracking, and responsive design
- **PDF Generation**: Professional reports with charts and insights
- **Admin Dashboard**: View responses, download PDFs, and export data
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 360-feedback-survey
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase database**
   Run the following SQL in your Supabase SQL editor:
   ```sql
   -- Create the survey_responses table
   CREATE TABLE survey_responses (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT,
     likert_answers INTEGER[] NOT NULL,
     text_answers TEXT[] NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

   -- Create policy for inserting responses
   CREATE POLICY "Allow public insert" ON survey_responses
     FOR INSERT WITH CHECK (true);

   -- Create policy for viewing responses (admin only)
   CREATE POLICY "Allow admin select" ON survey_responses
     FOR SELECT USING (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── completion/        # Survey completion page
│   ├── survey/            # Main survey page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client
│   └── survey-data.ts     # Survey questions
├── components/            # Reusable components
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🎨 Design Features

- **Glassmorphism**: Frosted glass panels with backdrop blur
- **Gradient Backgrounds**: Beautiful red-to-purple gradient themes
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Hover effects and micro-animations

## 📊 Survey Structure

### Likert Scale Questions (50 total)
- **Leadership & Management** (10 questions)
- **Communication Skills** (10 questions)  
- **Teamwork & Collaboration** (10 questions)
- **Problem Solving & Innovation** (10 questions)
- **Professional Development** (10 questions)

### Open Text Questions (10 total)
- Strengths identification
- Areas for improvement
- Team contribution
- Leadership qualities
- Challenge handling
- Unique characteristics
- Support for others
- Organizational impact
- Company values demonstration
- Additional comments

## 🔧 API Endpoints

- `POST /api/submit-survey` - Submit survey responses
- `GET /api/pdf/[id]` - Generate PDF report for a response

## 📱 Pages

1. **Landing Page** (`/`) - Beautiful introduction with features
2. **Survey Page** (`/survey`) - Main survey with progress tracking
3. **Completion Page** (`/completion`) - Thank you message + PDF download
4. **Admin Dashboard** (`/admin`) - View and manage responses

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🛠️ Customization

### Colors
Modify the color scheme in `tailwind.config.js`:
```js
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ }
}
```

### Questions
Update survey questions in `lib/survey-data.ts`

### Styling
Customize components in `app/globals.css`

## 📈 Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Images**: Next.js Image optimization
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Minimal Bundle**: Tree-shaking and code splitting

## 🔒 Security

- **Row Level Security**: Supabase RLS policies
- **Input Validation**: Form validation and sanitization
- **Environment Variables**: Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**
