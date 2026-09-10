# ☁️ How to Enable Global Cross-Device Sync (Laptop ↔ Phone)

Currently, when you change a price or add a vehicle on your laptop, it saves to that browser's storage. To make changes sync **globally in real-time** so you see them on your phone immediately:

---

## ⚡ 2-Minute Setup in Vercel

### Step 1: Open Your Vercel Dashboard
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Click on your project (**Rideit** or **ride-it**).
3. Go to **Settings** (top navigation tab) $\rightarrow$ **Environment Variables** (left sidebar).

### Step 2: Add Your Supabase Credentials
Add these two environment variables:

| Variable Name | Value | Where to Find in Supabase |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Supabase Dashboard $\rightarrow$ Project Settings $\rightarrow$ API $\rightarrow$ Project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` | Supabase Dashboard $\rightarrow$ Project Settings $\rightarrow$ API $\rightarrow$ Project API Keys (`anon` `public`) |

*Make sure to check all 3 environments: **Production**, **Preview**, and **Development**.*

### Step 3: Trigger a Redeploy
1. In Vercel, go to the **Deployments** tab.
2. Click the three dots `...` next to the latest deployment and select **Redeploy**.
3. Once finished, open your website on both your **laptop** and **phone**.

---

## 🗄️ Step 4: Run the Database Schema in Supabase (1-Click)
1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **SQL Editor** in the left sidebar $\rightarrow$ **New query**.
3. Copy the contents of the [`supabase_schema.sql`](file:///f:/Webdesign/Ride%20it/supabase_schema.sql) file in your codebase and paste it into the editor.
4. Click **Run** (green button).

---

🎉 **Done!** From now on, any price edit or new vehicle added from your laptop Admin Studio will update on your phone instantly!
