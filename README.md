# School Management System

A modern, full-stack school management platform built with Next.js 16, React 19, and MongoDB. Provides dedicated dashboards for administrators, teachers, students, and parents with real-time data management.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (Turbopack) |
| UI | React 19, shadcn/ui, Tailwind CSS 4 |
| Components | @base-ui/react, Lucide Icons |
| Database | MongoDB + Mongoose 9 |
| Date | date-fns, react-day-picker |
| Notifications | Sonner |

## Features

### Admin Dashboard
- Full CRUD for students, teachers, classes, and subjects
- Fee management and financial tracking
- Attendance monitoring and reports
- Grade oversight and academic analytics
- School-wide announcements

### Teacher Dashboard
- Class schedule viewing
- Attendance marking and tracking
- Grade entry and management
- Announcements

### Student Dashboard
- Personal grades and academic progress
- Attendance history
- Fee status and payment tracking
- Class schedule

### Parent Dashboard
- Child profile and academic overview
- Grade tracking across subjects
- Attendance monitoring
- Fee management

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB connection string

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd school-management

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

### Environment Variables

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/school-management
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

### Database Seed

```bash
# Via API (requires admin session)
curl -X POST http://localhost:3000/api/seed

# Via script
node scripts/seed.mjs
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard routes by role
│   │   ├── admin/           # Admin pages
│   │   ├── teacher/         # Teacher pages
│   │   ├── student/         # Student pages
│   │   └── parent/          # Parent pages
│   └── api/                 # API routes
├── components/
│   ├── layout/              # Header, Sidebar, DashboardLayout
│   ├── shared/              # Reusable components
│   └── ui/                  # shadcn/ui primitives
├── lib/
│   ├── auth.js              # Authentication helpers
│   ├── mongodb.js           # Database connection
│   └── utils.js             # Utility functions
└── models/                  # Mongoose schemas
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/session` | Get current user session |
| GET/POST | `/api/students` | List or create students |
| GET/POST | `/api/teachers` | List or create teachers |
| GET/POST | `/api/classes` | List or create classes |
| GET/POST | `/api/subjects` | List or create subjects |
| GET/POST | `/api/grades` | List or create grades |
| GET/POST | `/api/attendance` | List or record attendance |
| GET/POST | `/api/fees` | List or create fee records |
| POST | `/api/seed` | Seed database with sample data |

## License

MIT
