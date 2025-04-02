// export const BACKEND_URL = "http://localhost:3000/api/v1";

export const BACKEND_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/api/v1" // Local Backend
        : "https://mastermind-academix.onrender.com/api/v1"; // Render Backend