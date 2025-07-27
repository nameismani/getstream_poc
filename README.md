# GetStream Video Call Application

This is a Next.js application that demonstrates how to implement video calling functionality using GetStream's Video API. The application includes user authentication, video call creation, and joining video calls with a link.

## Features

- User authentication (sign up, sign in, sign out)
- Create new video meetings with unique IDs
- Join existing meetings by ID
- Real-time video and audio communication
- Responsive UI for desktop and mobile devices

## Prerequisites

- Node.js (version 18 or higher)
- MongoDB database
- GetStream account with Video API access

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB Connection String
MONGOOSE_URL=mongodb+srv://username:password@cluster.mongodb.net/your_database

# Authentication URL
NEXT_PUBLIC_AUTH_URL=http://localhost:3000

# Stream API Keys
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

Replace the placeholder values with your actual credentials.

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Sign up or sign in to access the application
2. Navigate to the "Video Meetings" page
3. To create a new meeting, click "Create Meeting"
4. To join an existing meeting, enter the meeting ID and click "Join Meeting"
5. Share the meeting ID with others to invite them to your meeting

## Folder Structure

- `src/app`: Next.js application routes
- `src/components`: React components
  - `src/components/video`: Video-related components
- `src/contexts`: React context providers
- `src/models`: MongoDB models
- `src/lib`: Utility functions

## Technologies Used

- Next.js
- React
- GetStream Video API
- MongoDB
- Tailwind CSS
- TypeScript

## License

This project is licensed under the MIT License.
