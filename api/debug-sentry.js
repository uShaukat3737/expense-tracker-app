import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default function handler(req, res) {
  const error = new Error("Sentry backend test!");
  Sentry.captureException(error);
  res.status(200).json({ message: "Sentry test captured!" });
}