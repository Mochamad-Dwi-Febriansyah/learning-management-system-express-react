// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
)
