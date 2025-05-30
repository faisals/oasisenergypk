Layer	Choice	Why
Repo	GitHub (private or public)	single‑source‑of‑truth; enables PRs & CI
Build & Hosting	Netlify (pulls from that GitHub repo)	you get ✔ server‑side form parsing, ✔ global CDN, ✔ SSL, ✔ one‑click custom‑domain, ✔ e‑mail notifications  – none of which GitHub Pages offers natively
Front‑end	Plain HTML5 + Tailwind CDN for styling + a 15‑line vanilla JS file for UX sugar	keeps the bundle < 50 kB; zero build step if you like, but you can add Vite later
Forms	Netlify Forms (automatic detection)	no JS or backend to write; 100 submissions / site / month on the free plan in 2025
E‑mail alerts	Netlify “Form notifications” (+ optional Zapier / Resend if you outgrow it)	one toggle in the Netlify UI
Custom domain	Bring your domain, delegate DNS to Netlify or leave DNS where it is and add an A+CNAME record	Netlify UI walks you through either path — SSL cert auto‑provisioned



One‑time Netlify setup
New site → Import from Git → pick the repo → build command “None” → publish directory “/”.
Forms appear under Site → Forms after the first successful submission.
Forms → Notifications → E‑mail → add your address.
Site → Domain management → Add domain → type yourdomain.com → follow the DNS instructions.
Wait for DNS to propagate; Netlify auto‑issues a Let’s Encrypt cert and forces HTTPS.
