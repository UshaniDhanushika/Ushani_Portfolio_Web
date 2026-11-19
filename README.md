# Ushani Dhanushika Ganhewage — Portfolio

A responsive personal portfolio built with HTML, CSS, JavaScript, and Vite. The site uses a deep navy, teal, and cool-blue theme, with accessible project detail dialogs, a mobile navigation menu, lightweight scroll reveals, and a validated contact form. The form sends through Formspree when configured and otherwise prepares an email draft.

The blue-themed CV is available at `/cv.html` (or through **View CV** in the portfolio navigation). Use **Download / Print CV** and choose **Save as PDF** in the browser print dialog to create a PDF copy. The CV includes the profile photo supplied for this project.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`). Create a production build with:

```sh
npm run build
npm run preview
```

## Contact form

The contact form validates its fields and posts to a Formspree endpoint when configured. Formspree emails accepted messages to the verified recipient; success and failure feedback are shown on the page. Until the endpoint is configured, the form falls back to an email draft.

### Enable real contact-form delivery

1. Create a form in [Formspree](https://formspree.io/) and verify the recipient address `ushanidhanushika2000@gmail.com` in its dashboard.
2. Copy the form endpoint URL (it looks like `https://formspree.io/f/your-form-id`). The form ID is public; do not put private credentials in frontend code.
3. For local development, copy `.env.example` to `.env.local` and replace the sample endpoint. Restart Vite after editing the environment file.
4. For GitHub Pages deployments, add a repository Actions variable named `VITE_FORMSPREE_ENDPOINT` with the endpoint URL under **Settings → Secrets and variables → Actions → Variables**. The deploy workflow injects this value during the build.
5. Submit a test message from the live site and check the verified inbox.

## Deploy to Vercel

1. Push the project to a Git provider such as GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Vite. Set the build command to `npm run build` and output directory to `dist` if it does not fill them in automatically.
4. Deploy. Future pushes to the connected production branch trigger deployments.

## Deploy to Netlify

1. Push the project to a Git provider such as GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Deploy the site. Future pushes to the connected branch trigger builds.

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows` for publishing the Vite build. Push the project to the `main` branch, then open the repository's **Settings → Pages** and choose **GitHub Actions** as the build and deployment source. The workflow builds and publishes the site when changes are pushed to `main`.
