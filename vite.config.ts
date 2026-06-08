{ 
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "framework": "vite",
  "functions": { 
    "dist/server/index.js": { 
      "runtime": "nodejs20.x"

    } 
  },
  "routes": [ 
    { 
      "src": "/_server/(.*)",
      "dest" "/dist/server/index.js"
    },
    { 
      "src": "/favicon.ico",
      "dest": "/dist/client/favicon.ico"
    },
    { 
      "src": "/assets/(.*)",
      "dest": "/dist/client/assets/$1"
    },
    { 
      "src": "/(.*)",
      "dest": "/dist/client/index.html" 
    } 
  ]
} 
