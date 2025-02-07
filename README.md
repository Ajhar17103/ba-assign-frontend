# API Specification

## Short Summary
- **Implements user authentication (login, register, token handling, social login with Google).**
- **Uses Parallel and Intercepting Routing for authentication modals.**
- **Fetches hotel data with Server-Side Rendering (SSR) for better performance.**
- **Displays hotels with pagination (max 8 properties per page).**
- **Provides CRUD operations for hotels (create, edit, delete).**
- **Includes social media sharing for property details.**
- **Ensures error handling for not found and failure scenarios.**

## Project Structure

```
BA-ASSIGN-FRONTEND
│── src
│   ├── assets                # Static assets like images, icons, and styles
│   ├── Component             # Main UI components
│   │   ├── Auth              # Authentication components (Login, Register, Layouts)
│   │   │   ├── Layout        # Auth Layout Wrapper
│   │   │   ├── Login         # Login Component
│   │   │   ├── Register      # Signup Component
│   │   ├── Home              # Home Component
│   │   ├── Hotel             # Hotel management components
│   │   │   ├── HotelCreateUpdate      # Create & Update Forms
│   │   │   ├── HotelDetails           # Hotel Details Page
│   │   │   ├── HotelList              # Hotel Listings
│   ├── Redux                # Redux state management
│   │   ├── Hotels           # Hotel-related Redux actions, reducers, and types
│   ├── Services             # API handlers & interceptors
│   ├── App.jsx              # Root App Component
│   ├── index.scss           # Global styles
│   ├── main.jsx             # Entry point for React
│── public                   # Static public files
│── .env                     # Environment variables
│── package.json             # Project dependencies
│── eslint.config.js         # Linter Configuration
```

## Functionality Implementation

### Authentication
- Uses JWT-based authentication with tokens stored in `localStorage`.
- Implements `Login.jsx` and `Signup.jsx` for authentication UI.
- Uses `AuthLayout.jsx` for wrapping authentication routes.

### Hotel Management
- CRUD operations are handled in `HotelCreateUpdateForm.jsx`.
- `HotelListShowcase.jsx` renders paginated hotel listings.
- `HotelDetails.jsx` shows detailed hotel information.
- API calls for hotels are managed in `Redux/Hotels/action.js`.

### API Configuration
#### Create a centralized API service using Axios
```js
const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${authTokens}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
```

### Additional Considerations
- **Centralized API Handling using Axios for better reusability.**
- **Authentication Handling via JWT tokens stored in localStorage.**
- **Error Handling with meaningful messages.**
- **Pagination support when fetching hotel lists.**
- **CRUD Operations for managing hotels.**
- **Reusable API Functions to keep the frontend clean and modular.**

## Contributing

**Md Azharul Islam**  
Software Engineer  
📧 contact.ajharislam@gmail.com

