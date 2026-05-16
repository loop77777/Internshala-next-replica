# Internshala Internship Search Replica (Next.js)

A replica of the Internshala internship search page built with **Next.js** and **plain CSS**, with frontend-only filtering.

## Tech Stack

- Next.js (App Router)
- React
- Plain CSS (`app/globals.css`)

## Features

- Internship list fetched from Internshala search API
- Frontend filtering (no extra filter API calls)
- Filters:
  - Profile
  - Location
  - Work from home
  - Part-time
  - Minimum stipend
  - Maximum duration
  - Keyword search
- Sorting:
  - Relevance
  - Highest stipend
- Responsive UI layout (filter panel + results list)
- Custom logo in navbar

## Project Structure

- `app/internships/page.js` - main internships page and filtering logic
- `app/internships/components/SearchHeader.js` - navbar and top search
- `app/internships/components/FilterPanel.js` - filter sidebar
- `app/internships/components/InternshipCard.js` - internship card UI
- `app/globals.css` - styling
- `public/image/logo.png` - logo asset

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000/internships
```

## Build for Production

```bash
npm run build
npm run start
```

## Notes

- Filtering is handled entirely on the frontend.
- Internship data is loaded from `https://internshala.com/hiring/search` (multiple pages merged).

## Submission Links

- GitHub Repository: `<[Internshala-next-replica](https://github.com/loop77777/Internshala-next-replica)>`
- Hosted App: `<[Internshala Next.js Replica](https://internshala-next-deepreplica.netlify.app/internships)>`

## Author

- `<Deepanshu Malviya>` - Internshala Next.js Replica
