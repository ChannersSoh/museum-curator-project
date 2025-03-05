# Museum Curator

Museum Curator is a web application that lets users explore museum exhibits from two major sources: the Harvard Art Museums and the Smithsonian Institution. The app aggregates data from both external APIs and allows users to filter and search through exhibits, view detailed information, and manage personal collections.

## Live Demo

[Museum Curator](https://museum-curator-project-lmmq.vercel.app/)

## Test Account

- **Email:** test@fakeemail.com  
- **Password:** password

## Features

- **Browse Exhibits:**  
  Explore a wide variety of museum exhibits sourced from the Harvard Art Museums and Smithsonian Institution APIs.

- **Search & Filter:**  
  Use built-in search and filtering options to quickly locate exhibits by title, creator, culture, medium, and more.

- **Pagination:**  
  Navigate through pages of exhibits seamlessly.

- **Exhibit Details:**  
  View detailed information for each exhibit including images, descriptions, and historical context.

- **User Authentication:**  
  Sign up and log in to manage your personal collections.

- **Collection Management:**  
  Create collections, view collections (even if they are empty), add exhibits to collections, and remove exhibits from your collections.  
  *Note:* If you attempt to remove an exhibit that is not in a collection, the backend now returns a proper error message.

## How It Works

The project is divided into two main parts:

**Frontend:**  
Built with React, Tailwind CSS, and React Router, the frontend handles:
- Displaying exhibit data.
- Providing search, filtering, and pagination.
- Managing user authentication and collection operations.

**Backend:**  
An Express server that connects to a PostgreSQL database and integrates with external APIs from Harvard Art Museums and Smithsonian Institution. The backend:
- Fetches and caches exhibit data.
- Manages user accounts and collections.
- Provides endpoints for exhibit details, collection management, and more.

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Express, PostgreSQL, External APIs (Harvard Art Museums & Smithsonian Institution)
- **Hosting:** Vercel (Frontend), Render (Backend)

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/museum-curator-project.git
cd museum-curator-project/museum-curator

For more details about the backend implementation, please check out the Museum Curator Backend repository.
