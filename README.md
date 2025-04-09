# Clerk Middleware & Playwright Demo

This project demonstrates an issue encountered when using Clerk's `clerkMiddleware` with Playwright tests in a Next.js application.

The current setup in `src/middleware.tsx` causes Playwright tests to fail because the middleware attempts to redirect or protect routes even during the test execution environment, interfering with Playwright's ability to navigate and interact with the application.

## Setup

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Configure Environment:**
    - Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    - Edit `.env` and add your Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) and credentials for a test user (`E2E_CLERK_USER_EMAIL`, `E2E_CLERK_USER_PASSWORD`). Ensure this test user exists in your Clerk instance.

## Running Tests

To observe the issue, run the Playwright tests:

```bash
pnpm test:e2e
```

The tests are expected to fail with an error similar to this:

```
Error: Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware(). Please ensure the following:
- Your Middleware exists at ./src/middleware.(ts|js)
- clerkMiddleware() is used in your Next.js Middleware.
- Your Middleware matcher is configured to match this route or page.
- If you are using the src directory, make sure the Middleware file is inside of it.
```

This happens because the `auth()` helper used in `src/app/layout.tsx` cannot detect the `clerkMiddleware` when executed within the Playwright test environment under the current configuration. A potential workaround involves conditionally disabling `auth.protect()` in the middleware when running in a test environment (e.g., by checking an environment variable like `IS_PLAYWRIGHT_ENV`), but this is just a workaround if one wants to abandon the testing of protection mechanism completely.
