# Schritte Trainer v7 — cloud sync is configured

The Supabase project and database are already configured.

Project URL:
`https://rxurrxbdmamghqxipjhk.supabase.co`

Database:
- table: `public.user_progress`
- primary key: `user_id`
- RLS: enabled
- authenticated users can read/write only the row where `user_id = auth.uid()`
- anonymous users have no table privileges

The public frontend key is already present in `sync-config.js`.
It is intentionally safe to publish; do not replace it with a secret/service-role key.

## Recommended one-time Auth setting

In Supabase Dashboard open:

**Authentication → URL Configuration**

Set:

**Site URL**
`https://supportop.github.io/schritte-trainer/`

Add the same value to **Redirect URLs** if that field is shown.

This makes email-confirmation redirects return to the trainer.

## Optional: easier signup for a small class

In **Authentication → Providers → Email**, you may disable email confirmation
if you want classmates to enter the app immediately after registering.

Keeping email confirmation enabled is more secure; both modes are supported by the app.

## Deploy

Upload the contents of this package to the root of:
`supportop/schritte-trainer`

Replace existing files when GitHub asks.

After Pages rebuilds, open:
`https://supportop.github.io/schritte-trainer/`

The top bar should show **☁ Увійти**.
