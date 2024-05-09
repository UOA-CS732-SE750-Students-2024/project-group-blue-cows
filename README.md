# COMPSCI 732 / SOFTENG 750 project - Team Blue Cows (renamed because of some WDCC in-joke, apparently...)

Welcome to the project! I look forward to seeing your progress and your final results this semester!

Your team members are:

- Lucy Zhu
- Naren Rohan
- Alex Hope
- Nate Williamson
- Luca Eastwood
- Tristan Mona
- Vishva Dave

![](./public/Blue%20Cows.webp)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Our Application: Cowmunity

<img width="1280" alt="Cowmunity Banner" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-blue-cows/assets/84960461/b3e946ac-c0bf-467f-af09-844fe94b5c51">

Cowmunity provides a single site to streamline the club searching, reigstration, and information-dissemination process for both club executives and students.

Key features include:
- Search function to find clubs of interest.
- Streamlined club membership registration (including payment), achieved by pre-populating registration form fields from user profile data and integrated payment methods.
- Club information managed by club admins, with ability for further customisation (e.g. viewing membership numbers, adding custom fields to registration forms).
- Easy portability of data to other applications (e.g. exporting membership data).

The app may be extended with other convenience features related to member administration (e.g. emailing announcements). Clubs can create their own branded portal.

## How To Run

First, run the development server:

```bash
yarn
```
```bash
yarn dev
```

## Testing

**How To Run**

For unit test using React Testing Library and Jest

```bash
yarn
```

```bash
yarn test
```

For End-To-End Testing using Playwright

```bash
yarn
```
```bash
yarn playwright install --with-deps
```
```bash
yarn build 
```
```bash
yarn playwright:test 
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
