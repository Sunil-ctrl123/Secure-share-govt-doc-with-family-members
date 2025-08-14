# Secure & Share Govt Document with Family Members

A lightweight web app to store, manage, and securely share government documents with family members using **Firebase**.

## Features
- Email/password auth (Firebase)
- Mock OTP (demo only)
- Upload files to Firebase Storage
- Save document metadata in Firestore
- Share document access by email list (stored in `sharedWith`)
- Profile management and action logging

## Quick Start
1. Create a Firebase project; enable **Auth (Email/Password)**, **Firestore**, **Storage**.
2. Copy your config into `js/firebaseConfig.js`.
3. Serve locally with any static server (e.g., VS Code Live Server) or Firebase Hosting.
4. Open `register.html` to create an account (use **Send OTP** then paste code from console).

## Deploy (Firebase Hosting)
```bash
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

> ⚠️ Replace the **mock OTP** with a compliant provider for production.
