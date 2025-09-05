# **Naveeg Platform Redesign & Marketing Plan**

## **UI/UX Design Overhaul – Enterprise-Grade yet User-Friendly**

As a **UX/UI designer**, the goal is to transform Naveeg’s design into a polished, enterprise-grade SaaS look (inspired by Stripe and Shopify) while keeping it **accessible for non-technical users**. The current interfaces (marketing site and dashboard) should evolve from a basic look into a modern, intuitive experience that instills confidence and is easy to navigate. Key design refactoring recommendations:

### **Marketing Site UI Redesign**

* **Clean, Professional Aesthetics:** Adopt a minimalist design with ample white space, high-quality typography, and a cohesive color scheme. Use a neutral or soft color palette with one accent color for CTAs (calls-to-action) – similar to Stripe’s bright yet clean style. Ensure consistency in fonts and colors across the site for a polished feel. A simple, elegant logo (even a well-styled text logo) should be placed prominently to establish brand identity.  
* **Engaging Hero Section:** The homepage should immediately communicate Naveeg’s value proposition with a bold headline, subtext, and a strong CTA button (“Start Free Trial”). For example, a headline like *“Generate a custom WordPress website in minutes with AI – no technical knowledge needed.”* gets the message across quickly. Pair this with a relevant image/illustration – perhaps a small business owner character alongside a preview of a beautiful website – to emotionally connect with the target audience.  
* **Outcome-Focused Messaging:** Emphasize the **outcomes** Naveeg delivers (e.g. *“Get more customers online without the hassle”*). Every section of copy should tie features to benefits for the user. For instance, instead of just saying “AI website builder”, phrase it as *“Your website is ready in minutes, thanks to AI – so you can focus on your business, not on coding.”* This ensures even a hairdresser or plumber immediately understands **what they gain** (time saved, professional web presence) rather than how the tech works.  
* **Visual Feature Highlights:** Use icons or illustrations to represent key features in an easy-to-skim format. A section of the homepage (or a dedicated **Features** page) can present 3-5 core features with simple icons (e.g. a robot icon for AI content generation, a globe or domain icon for custom domain/SEO, a chat bubble for the AI chatbot, a shield for security, etc.). Each feature blurb should stress the benefit: e.g. *“**AI Content Creation:**Instantly get text and images tailored to your business – no writing required.”* Keep the language jargon-free (avoid technical terms like “API” or “embedding”) so non-tech users grasp it.  
* **Responsive & Fast:** Ensure the marketing site is fully responsive and fast-loading. Many small business owners may be browsing on mobile; the site should look just as professional on a phone. Use Tailwind CSS and Shadcn UI components (already in the tech stack) to maintain design consistency and responsiveness across breakpoints. Test the site’s usability on different devices to confirm everything (menus, CTAs, forms) is easy to tap and read.  
* **Trust and Credibility:** Incorporate trust signals to give an enterprise feel. For example, include a few testimonials or quotes from beta users (“Naveeg made it easy – I had a website for my salon in a day\!”). If available, show logos of known integrations (e.g., “Powered by WordPress and AI” or small logos like Stripe, OpenAI, Google – but subtle and only if allowed, since end-users don’t need to know 10Web or technical details). An “About Us” section or page can share a brief mission statement to humanize the brand (e.g., *“Founded by a team of web experts, our mission is to empower local businesses online without the technical headaches.”*).  
* **Prominent CTAs:** Follow the Stripe/Shopify practice of **persistent call-to-action buttons**. The primary CTA (“Start Free Trial” or “Get Started for Free”) should appear in the hero and repeated in strategic places (after a features section, in the pricing section, and at the page bottom). Use a contrasting accent color and slightly larger button style so it stands out. Make sure the CTA scrolls or links into the signup flow in the app subdomain properly. Secondary CTAs like “See How It Works” can scroll to a demo section or open a video.  
* **Demo Preview:** Adding visuals of the product outcome is crucial. Consider creating a *sample website* for a fictitious business (e.g., *“Jane’s Bakery”*) using Naveeg, and showcase it on the landing page. This could be an interactive link to a live demo site on a Naveeg subdomain (ensuring no admin bar or sensitive info visible), or simply screenshots of the site’s homepage. Showcasing a real example adds credibility (“See what a Naveeg-generated site looks like\!”). Also, include a screenshot of the Naveeg dashboard interface to highlight how simple the site creation process is. These visuals help users quickly understand the product with minimal reading.  
* **Content Polish:** Eliminate any placeholder text or “lorem ipsum” – all marketing copy should be finalized and proofread. Use a friendly, **conversational tone** in copy, as if speaking to a busy small business owner. Headlines should be short and bold; supporting text can be one to two sentences maximum. Bullet points or checklists are great for feature lists so readers can skim. Ensure the site’s footer has the necessary links (FAQ, Contact, Privacy Policy, Terms) properly set up (no broken links) for completeness.

### **Dashboard UI Redesign**

* **Intuitive Layout (Shopify-Style):** Organize the dashboard with a clear navigation sidebar and content area, similar to familiar SaaS dashboards. A left-hand menu with icons and labels for each major section (e.g., **Dashboard** overview, **My Website**, **Analytics**, **Leads**, **Domains**, **AI Assistant**, **Settings**, etc.) provides a consistent anchor for users as they explore features. Keep navigation labels non-technical (e.g., use “My Website” instead of “Instance” or “10Web site”) and relevant to tasks. The overall structure is already akin to a “Shopify-style dashboard” running on Next.js – now we refine the visuals and flow.  
* **Onboarding Wizard:** Since the target users have **no tech skills and little time**, guide them step-by-step when they first log in. Implement a friendly onboarding wizard or checklist on the main **Dashboard** page (this can also be the “Main dashboard with usage overview” page). For example, upon first login, show steps: **1\) Enter Business Details** (so the AI can generate content), **2\) Choose a Template** (maybe a style or industry-specific template for the WordPress site), **3\) AI Generates Your Site**, **4\) Preview & Publish**. Visually indicate progress (a progress bar or checkmarks) and congratulate them when the site is live. This reduces overwhelm and makes the process feel manageable.  
* **Simplified Forms & Language:** Any form in the dashboard (whether it’s creating the site, connecting a domain, or integrating Google) should use plain language and helpful defaults. For example, when creating a site, instead of a technical field like “Subdomain”, label it *“Choose your free Naveeg address”* with help text: *“e.g., mybusiness.naveeg.online”*. Provide examples in form fields and validate inputs with clear error messages (non-tech users need guidance on format). Use tooltips (small “i” info icons) to explain anything that might be unfamiliar – e.g., on the **Domains** page, a tooltip for “DNS” could say “Domain Name System – settings you update where you bought your domain. We’ll guide you through it.” Ensuring all content in the app is understandable is key to accessibility.  
* **Visual Feedback & Status:** The dashboard should always inform users about their website’s status and next steps. For instance, if a site is being created via the 10Web API, show a progress indicator or messages (“Generating your site content…”) so users aren’t left guessing. On the **My Website** page, display the site’s current status (Active, In Trial, etc.) clearly. If the trial is active, highlight “X days left in trial” prominently, with a nudge to upgrade (perhaps an alert banner or a countdown, styled in a non-alarming way). Once published, if on a free subdomain, prompt “Your site is live on *mysite.naveeg.online*. Want to use your own domain? Upgrade to Pro to connect it.” This ties the UI into upsells at appropriate moments without being too salesy – it’s presented as a helpful next step.  
* **Enterprise-Grade Polish:** Incorporate design details that give a robust, professional feel: consistent spacing and padding, aligned cards and lists, and use of high-quality icons (perhaps the Lucide or Material icons that match Tailwind’s aesthetic). Use the shared Shadcn/UI components for inputs, tables, modals for consistency. Ensure all interactive elements have hover states, etc., for a refined look. Add subtle animations/transitions on interactions (e.g., sliding panels, fading modals) to give that smooth SaaS experience (Stripe’s dashboard is known for its slick interactions). All pages (dashboard, analytics, billing, etc.) should handle loading states gracefully with spinners or skeleton screens, so the user is never staring at a blank screen.  
* **Dashboard Overview & Analytics:** The **Dashboard Home** should give a quick snapshot of the site’s performance once data is available – because small business owners value results. Include a simple metric or two like **Site Visits This Week**, **Leads This Week**, etc., perhaps in a card format. If Google Analytics integration is connected (a Pro feature), surface a couple of key stats (e.g., total visitors or search impressions) in layman’s terms. Use simple charts or big numbers with labels – avoid requiring the user to interpret complex analytics. A sparklines graph or a bar chart over time can show growth without overwhelming. If a feature is not available on their plan (like advanced analytics on Starter), show the section with a lock icon and an explanation like “Upgrade to Pro to see in-depth analytics from Google.” This approach both educates and markets the upgrade.  
* **Website Management & Editing:** In the **Website** section (likely listing the user’s site details), clearly display the site preview (perhaps a thumbnail screenshot) and important controls: a “View Site” button, an “Edit Site” button, and status info. Since the platform uses WordPress under the hood, provide a one-click secure login to the WordPress editor (Naveeg can leverage 10Web’s auto-login) labeled in a friendly way (*“Edit in Editor” or “Customize Content”* rather than “WP-Admin”). If possible, integrate basic edits in-app: for example, allow the user to change their site title or business name directly in Naveeg and sync it. But if deep edits require WordPress, ensure the transition is smooth (open in a new tab with instructions, or embed the editor in an iframe if feasible). The key is to **hide complexity** – users should feel like they never left Naveeg. If an AI content generation feature is available for creating pages or blog posts, guide the user with a button: “Generate a new page with AI” – which triggers an easy form instead of making them navigate WordPress menus.  
* **Domain Management Simplified:** The **Domains** page should walk the user through connecting their own domain step by step, given this can be daunting. If custom domains are only allowed on Pro, for Starter users simply explain the feature is available on upgrade. For Pro users, when they go to add a domain, use a wizard:  
  1. **Step 1:** Enter your domain name (with validation).  
  2. **Step 2:** Show clear DNS instructions – e.g., “Create a CNAME record for **www.yourdomain.com**pointing to **your-site.naveeg.online**” along with a copyable value and maybe an illustration of where to input this (could just be textual now, but leave room for a help video or link).  
  3. **Step 3:** Verification – display status (“Pending verification – this may take up to 24 hours. We’ll email you when it’s live”). Also ensure the UI polls or updates the domain status field from the database and shows “Verified” with a green check when done. By making domain setup a sequence with clear language, non-technical users are more likely to succeed. Include a note in plain terms: *“Don’t worry if you haven’t done this before – it’s like telling the internet where to find your site. We’re here to help\!”*.  
* **AI & Chatbot Features:** If the platform offers an **AI chatbot** on the user’s site (for answering visitor questions), the dashboard should allow the user to easily configure it. For example, in an **AI Assistant** or **FAQ** section, let them upload their FAQ document or type Q\&A pairs. The UI should be very straightforward: a simple text area to input an FAQ or a button “Upload FAQ file”. Once uploaded, display the file status (processed, or any errors). Use non-technical language to explain what this does: *“Upload a list of common questions, and our AI will instantly answer them on your website 24/7.”* After uploading, show a confirmation like “✅ Your AI assistant is now active on your site\!” The user can test it (maybe provide a link to a chatbot preview). Again, highlight outcome: this feature *“helps your visitors get answers instantly, saving you time on customer inquiries.”* The design should make it feel like a cool bonus feature rather than something complicated.  
* **Lead Management:** Provide a simple CRM-like table for **Leads** captured from the website’s contact form. Each lead (name, email, message, date) should be listed in a clean table with perhaps an icon if new/unread. Allow basic actions like marking as contacted or adding a note. For busy SMEs, even showing the leads with a “Follow up” checkbox could help them keep track. If integrated with automation (n8n workflows that maybe push leads to email or Google Sheets), mention on the UI that *“All your inquiries also go straight to your email for convenience.”* The design here should prioritize readability – larger text for names, maybe an icon for the source (if multiple forms or pages), and filters for “unread vs all leads”.  
* **Team Collaboration:** If team member functionality is enabled, have a **Team** or **Users** section where the owner can invite others (e.g., a business partner or an employee) to help edit the site. Keep this super simple: just an “Invite team member” field for email with a role dropdown (Admin/Editor). Provide guidance like *“Invite someone to help manage your website”*. Since many small SMEs might not use this initially, it’s okay to tuck it in Settings or a small section, but ensure that if they do need it, it’s straightforward (one step invites with an automated email link to join).  
* **Consistent Help & Support:** Add a persistent help element in the dashboard – for example, a “Help” menu or tooltip in the corner that lists support options: “💬 Chat with support” (if live chat exists in the future), “📖 Documentation” (link to a simple guide or FAQ), and “✉️ Contact support” (an email link to support@naveeg.com). Given the target users, having readily accessible help is crucial. Even if it’s just an email form for now, label it clearly: *“Questions? Need help? We’re one click away.”* This gives users confidence that even if they hit a roadblock, support is available (aligning with enterprise-grade service expectations).

In summary, the **dashboard design** should feel as slick as a Shopify admin panel yet as approachable as a simple website builder. By guiding users through each task with clear language, providing visual feedback (progress bars, checkmarks, status labels), and removing any unnecessary complexity, Naveeg’s app will cater to non-technical users while exuding the professionalism of a high-end SaaS platform.

## **Supabase Database & Backend Audit**

As a **database specialist**, we need to ensure Naveeg’s Supabase backend is correctly configured for **security, multi-tenancy, and performance**. The good news is the core database schema and functions have been set up, but a careful review ensures nothing is missed:

* **Database Schema & Tables:** All essential tables have been created in Supabase to support the application’s features. Key tables include users, websites, plans, entitlements, team\_members, domains, faq\_docs (for AI FAQ data), leads (for captured leads), settings, billing\_sessions, etc.. Each table has appropriate relationships (foreign keys linking back to the websites or users table) to maintain referential integrity. For example, each website record references an owner in the users table, and tables like domains, leads, and FAQ docs reference their corresponding website. This ensures data is properly scoped per user’s site.  
* **Row-Level Security (RLS):** Supabase’s Row-Level Security is enabled on all multi-tenant tables to enforce that users can only access their own data. Reviewing the RLS policies implemented, we confirm they are correctly set:  
  * On the **users** table: Each user can `SELECT` or update only their own profile row, matching `auth.uid()` to the users.id.  
  * On **websites**: Users can select/insert/update only websites where they are the owner (owner\_id matches their uid).  
  * For related tables like **team\_members, domains, entitlements, faq\_docs, leads, settings** – policies use the website\_id to ensure a user can access those records only if the website belongs to them. For example, a `leads` entry can be viewed or managed only if its website\_id is in a website owned by the user. These cascading RLS rules effectively isolate each customer’s data.  
  * On billing\_sessions (used for Stripe checkout tracking), policies tie access to the user\_id field (only the user who initiated a checkout can see its session).  
* We should verify if any new tables (like a potential **google\_integrations** or **team\_invitations** table) exist and if so, that RLS is enabled for them too. The current RLS script covers the major ones; if *google\_integrations* stores OAuth tokens per user/site, it must also have RLS (e.g., only the user or site owner can select their Google credentials). The same goes for *team\_invitations* if present – likely it should be accessible if you own the site or have admin role. If those tables were added later, we’ll add similar policies to maintain the tenant isolation.  
* **Edge Functions & Security:** Supabase Edge Functions (written in TypeScript, as `.ts` files) have been set up for server-side operations (like provisioning a new WordPress site via 10Web API). We should double-check that these functions use the proper security context:  
  * Ensure they are invoked with a service role key or appropriate JWT so they can perform privileged actions (like calling external APIs or inserting into multiple tables) securely. The environment variables configuration shows a `SUPABASE_SERVICE_ROLE_KEY` is provided to the Dashboard app, which is likely used by edge functions for server-to-server calls.  
  * Validate that any secrets (Stripe secret key, 10Web API key, OpenAI key, etc.) are only used server-side (never exposed to client). The .ts functions and Next.js API routes should be handling these operations. For example, the Stripe webhook handler and site provisioning calls should be protected and not callable by the client directly except via secure function endpoints.  
  * Logging and error handling: it's good practice that the edge functions log important events (like “Site created for user X” or errors during site creation) perhaps into a Supabase log table or at least console (which can be viewed in Supabase function logs). This will assist in monitoring post-launch.  
* **Performance & Indexing:** Given the nature of the data (each user will have relatively small sets of sites, leads, etc.), the database is not huge, but we still apply best practices:  
  * Verify that primary keys (UUIDs) are in place on each table (as they are) and that foreign key fields (like owner\_id in websites, website\_id in child tables) have indexes. In PostgreSQL, foreign keys do not automatically create indexes, so we should manually create indexes on columns like `websites.owner_id`, `team_members.website_id`, `team_members.user_id`, etc., for faster joins and lookups. This will help performance as data grows, especially when listing all leads for a site, or all team members, etc.  
  * Check that the `plans` table’s primary key (id like 'starter', 'pro') is used in websites, and that we might index websites.plan\_id if we often query by plan (not critical now, but possibly for analytics or listing all trial sites).  
  * The **faq\_docs** table uses a JSONB field for embeddings. Ensure that any queries on this (if performing vector-like searches with the embedding) are handled either via Supabase’s PG extensions or by our application logic with the OpenAI API. If in the future we add a vector index (pgvector extension), we’d adjust the schema – but for now JSONB is fine and avoids an extension issue.  
* **Data Seeding & Plans:** The initial plan data has been inserted correctly, defining the Free Trial, Starter, and Pro plans. We have updated plan features to reflect the latest decisions:  
  * Trial: 7-day free, all features enabled so users can try everything (except custom domain).  
  * Starter (€49/mo): core features for one site, advanced features off, custom domain not allowed on this plan. The features JSON indicates “max\_sites”: 1 on Starter, aligning with the intent to focus on single-site owners (no multi-site on Starter).  
  * Pro (€99/mo): all features unlocked (e-commerce via WooCommerce integration, advanced analytics, automations, AI chatbot, team collaboration, custom domain) and support for up to 5 sites. Reducing from the earlier notion of 50 sites to 5 ensures this plan serves power users or small multi-location businesses, but not large agencies. These limits and flags will be enforced in the application (e.g., the app should prevent a Starter user from adding a second site, perhaps with a friendly message to upgrade if they try).  
* The pricing page on the marketing site should reflect these plan differences clearly, which we’ll cover in the copy section.  
* **Security & Compliance:** Aside from RLS, ensure other security measures:  
  * **Supabase Auth** is correctly set up with email/password and Google OAuth providers. Test that email verification and password reset flows work (these are handled by Supabase’s built-in mechanisms). For GDPR compliance, it’s noted data is kept in EU regions (Supabase in Frankfurt) which is great to mention on the legal page for user trust.  
  * The database also has some compliance-related tables (if implemented, e.g., consent\_preferences, audit\_logs as mentioned in earlier documentation). If those are in place (the first recap lists GDPR tables), verify they are properly integrated (e.g., when a user signs up, do we log a consent record, etc.). If not yet implemented, it’s okay for launch, but plan to add at least a basic audit log of critical actions (site created, site deleted, subscription changed) for internal monitoring.  
  * **Backups:** Ensure the Supabase database has a backup schedule (Supabase can do automated backups). Also, the 10Web platform likely handles website backups. We might expose that to users down the line (like a “backup now” button or a restore option), but for now it can be an internal safety net.  
* **Supabase to Frontend Integration:** All environment variables for connecting the frontend to Supabase are set (we have the URL, anon key for client-side, service key for server). Confirm that the front-end uses Supabase’s client library correctly with RLS (most queries from the client will use the user’s JWT, which RLS will enforce). Any data fetching in the dashboard (like listing leads or FAQ docs) should use the logged-in Supabase client – which is by design, since the dashboard app has the anon key and the user is authenticated via Supabase Auth. Test a few queries as a normal user to ensure you cannot ever retrieve another user’s data (RLS should prevent it – for instance, try to fetch a website by ID that isn’t yours, it should return nothing).  
* **Edge Case Checks:** Ensure that things like deleting a user or website cascade properly. For instance, if a user deletes their account (or if we implement user deletion for GDPR), the `ON DELETE CASCADE` on websites and related tables will remove those entries. Similarly, removing a website will cascade to team\_members, domains, leads, etc. (as set in foreign keys). Quick tests or a careful review of the schema confirms cascades are in place (the SQL shows ON DELETE CASCADE on many foreign keys). This prevents orphaned records and keeps the DB clean.

In summary, the Supabase backend appears **well-configured**: the multi-tenant data model is secure with RLS isolation, the crucial functions (auth, site provisioning, payments) are supported by the schema, and seed data for plans is in place. My recommendations are to double-check RLS on any new tables, add indexes for scalability, and thoroughly test the edge functions (e.g., simulate a full user signup \-\> site create \-\> upgrade \-\> data retrieval flow) to ensure the database rules and functions all work together seamlessly. By doing so, we uphold **enterprise-grade security** on the backend, matching the front-end’s professional quality.

## **Marketing Site Copywriting & Content Strategy**

Now, putting on the **marketing expert** hat, we will craft compelling copy for all key pages of the marketing site. The copy will be **outcome-driven**, speaking directly to SME owners (hairdressers, restaurant owners, tradespeople, etc.) who have no time or technical skills but know they need an online presence. The tone will be **simple, confident, and empathetic** to their situation – focusing on how Naveeg solves their problems and makes their lives easier. Below is detailed copy for each essential section/page of the marketing site:

### **Home Page – Value Proposition & Key Benefits**

**Headline (H1):** *“Get Your Business Online in Minutes – No Tech Skills Needed.”*  
This immediately addresses the biggest outcome: a fast online launch, and the biggest concern: “I don’t know how to do it.” It’s clear and benefit-oriented.

**Subheadline (H2):** *“Naveeg’s AI-powered platform builds and manages your website, so you can focus on your business.”*  
This one-line elaboration introduces AI help and the idea of ongoing management – reassuring the user that it’s not just initial setup, but that their website will be taken care of continuously (which is important to someone who has “no time to manage digital marketing”).

**Call-to-Action:** A prominent button labeled **“Start Your 7-Day Free Trial”**. Below it or on it, can add a note “No credit card required” if that’s the case – to remove sign-up friction. The CTA should scroll users to sign-up or direct to the app’s sign-up page.

**Hero Image:** Show an example of success: possibly a screenshot of a beautiful sample website on a laptop next to a smiling business owner image (e.g., a hairdresser standing in their salon). This visual combo conveys *“This could be you and your website, live and professional.”* Keep the imagery positive and relatable.

**Key Benefits Section (below hero):** Use either three columns or a horizontal row of icons with short descriptions, highlighting the top three outcomes Naveeg provides:

* **“Website in Minutes”:** *Launch a professional WordPress website faster than making a cup of coffee.* – Emphasize speed and ease. (Icon: rocket or stopwatch).  
* **“More Customers, Less Effort”:** *Attract new clients online without any marketing expertise – we handle the tech.* – Emphasize business growth outcome. (Icon: upward graph or people).  
* **“All-in-One Management”:** *Your website, SEO, leads, and even AI chat support – all managed from one simple dashboard.* – Emphasize convenience and comprehensiveness. (Icon: all-in-one toolbox or dashboard screen).

Each benefit blurb focuses on what the user *gets*. For example, instead of saying “AI content generation,” the copy says *“Don’t worry about writing – AI fills your site with relevant text and images tailored to your business.”* Instead of “Integrated analytics,” say *“See how many people visit your site and from where – no setup required.”* We translate features into real-world value.

**How Naveeg Works (Process Section):** Many non-tech users will ask “Okay, but what do I actually have to do?”. A short **“How It Works”** section in 3 steps can answer this:

1. **Sign Up & Tell Us About Your Business** – *“Create your free account and answer a few simple questions (like your business name and industry).”*  
2. **AI Builds Your Website** – *“Our platform instantly generates a customized WordPress website with design, images, and text just for you. No coding, no drag-and-drop needed.”*  
3. **You’re Live & Growing** – *“Your site goes live on a free domain (e.g. mybusiness.naveeg.online). View your site, tweak anything if needed, or connect your own domain when you’re ready.”*

Under these, have a secondary CTA like **“See a Live Example”** or **“Watch a 2-min Demo”** which could link to the Demo page or play an overview video (since the plan is to have a full guided walkthrough video).

**Social Proof/Testimonial:** If possible, include a testimonial slider or quote after the process. Even one or two short quotes from beta users or a fictitious persona adds trust. For example:  
“*I always delayed making a website because I’m not tech-savvy. Naveeg got my salon online in a day\!*” – **Sofia, Salon Owner**.  
Make sure testimonials (if real) are concise and focus on outcomes (speed, ease, getting customers).

### **Features & Benefits Page**

This page will expand on all the **capabilities of Naveeg**, but still framed as benefits. It’s a chance to list everything the platform does in an organized way. We can use sections or bullet lists for each major feature category:

**1\. AI-Powered Website Builder** – *“Our AI creates a personalized website for you, complete with pages, images, and text relevant to your business. Simply provide a few details and watch Naveeg build your site automatically.*” Emphasize that even the content is handled (e.g., *“No need to write a single line or hire a designer – your site comes ready-made.”*). If 10Web’s specific tech is behind it, we don’t mention it by name, we just call it our AI builder. Benefit: *saves enormous time and money on development.*

**2\. WordPress Foundation** – *“Built on WordPress – the world’s leading website platform – so you truly own your site. You can export it, extend it, or move it anytime.”* This addresses the concern “Do I own the website?” Answer clearly: **Yes, it’s a standard WordPress site under the hood that you have full ownership of**. Benefit: *freedom and flexibility*, unlike some site builders that lock you in. (We can cite: *“Yes, it’s a WordPress site you can export or connect your domain to.”*).

**3\. Hosting & Security Managed** – *“Your site is hosted on fast, secure servers (included for free in trial and with any paid plan). We manage all the technical stuff – uptime, updates, SSL security, backups – so you don’t have to.”*Emphasize *zero maintenance* for the user. Perhaps phrase as “enterprise-grade security and reliability” to impart trust (drawing from the fact it’s 10Web’s infrastructure, but user just hears enterprise-level hosting).

**4\. Custom Domain Connection** – *“Use your own .com or any domain – Naveeg makes it easy to connect. If you don’t have a domain yet, your site can run on a free **naveeg.online** address.”* Here we clarify: on trial and Starter, they use a subdomain; on Pro, they can connect their custom domain. We might note **(Pro feature)** for custom domains. Benefit: *professional branding with your own domain*.

**5\. SEO & Google Integration** – *“Appear on Google and track your growth. Naveeg helps with basic SEO out-of-the-box (fast loading, mobile-friendly, proper tags). Upgrade to Pro and you can integrate Google Analytics and Google Search Console to see how you’re doing right from your dashboard.”* This tells them: even if they don’t understand SEO, we’ve got the basics covered, and for those who care to see numbers, the Pro plan shows data inside Naveeg. Possibly also mention integration with Google Business Profile (GMB) for Pro: *“Easily connect your Google Business Profile – manage your online presence in search and maps alongside your site.”* (If that integration exists as planned).

**6\. AI Chatbot for Your Site** – *“Give your website a 24/7 assistant. Our AI chatbot can answer common questions from your customers instantly. Upload your FAQs or business info, and the chatbot will help visitors find answers (available on Pro).”* Benefit: *improve customer service and engagement without effort*. This feature differentiator (likely Pro plan) should excite users about the high-tech capability *made simple* for them.

**7\. Automatic Lead Capture** – *“Convert visitors into customers. Your Naveeg site comes with a contact form by default – any inquiries or messages from your site are automatically logged in your dashboard and forwarded to your email. Never miss a lead\!”* This assures them they’ll actually get tangible business value (customer inquiries). It implies: *Naveeg helps you get business, not just a pretty site*. We can mention leads go to their email or CRM (if using Google Sheets integration via automations, but keep it simple – likely just email for now or a list in dashboard).

**8\. E-commerce Ready (WooCommerce)** – If e-commerce (online store capability) is supported (the plans JSON shows `"woocommerce": true` for Pro), mention it: *“Want to sell products or accept payments on your site? Your Naveeg site is e-commerce ready. With the Pro plan, we can enable an online store for you via WooCommerce – start selling online without technical setup.”* Benefit: *new revenue stream, easy online sales.* (If this is not fully implemented yet, we might list it as “coming soon” or so, but the plan suggests it’s intended as a feature toggle).

**9\. Team Collaboration** – *“Not going solo? Invite a colleague or team member to help you manage the website (Pro feature). You can safely grant access for others to edit or view the site without sharing passwords.”* Benefit: *share the workload, delegate updates to someone else*. Although many small businesses might not use it, it’s good to list if it exists, especially for slightly larger small businesses or if an owner wants their assistant to handle it.

**10\. Automations & Integrations** – *“Save time with automation. Naveeg connects with tools you already use – automatically send new leads to a Google Sheet or get email notifications for sign-ups. (Pro feature, more integrations coming).”* Here we hint at n8n’s capability without naming it. Benefit: *streamlines their workflow*, making Naveeg not just a site, but part of their business process.

On the Features page, each of these items can be formatted with a subheading and a short paragraph (similar to above). Use checkmarks or ✅ in a list for Starter vs Pro if needed to clarify what’s included where, but that might be more for the Pricing page. The Features page itself can assume Pro-level to show everything Naveeg can do, with notes on what’s Pro-only.

Throughout, use **simple terms** and emphasize *“you”* (the user) and *“your business”*. E.g., *“We take care of the tech, so **you** can take care of **your customers**.”* Always bring it back to their perspective.

### **Solutions for Small Businesses**

To really connect with our target audience, include a **Solutions** section or page that speaks to different types of businesses (hairdressers, restaurants, artisans, plumbers, etc.) in their own language. The idea is to show we understand their unique needs and how Naveeg helps in those contexts. This can either be a single page with multiple short sections for each industry, or a section on the homepage that highlights a few and links to more details. For now, here’s how we can address a few key segments:

**For Local Services (Plumbers, Electricians, Contractors):**  
“**Be the go-to pro in your area.** When someone in your city searches for a plumber, make sure they find **you** first. Naveeg creates a clean, informative website that showcases your services and credentials. We’ll help you get listed on Google search/maps and capture inquiries through your site’s contact form – so potential clients can reach you instantly for quotes or emergencies. No need to know anything about SEO or web design; we’ve optimized everything for local search. You just get more calls and bookings, without the hassle.”

*(Outcome focus: get more local customers. Address pain: they don’t show up online, or they have a Facebook page at best. Highlight: we make them visible and reachable.)*

**For Retail & Restaurants:**  
“**Attract more diners & shoppers.** Whether you run a cozy café, a trendy boutique, or a family restaurant, Naveeg helps you put your best foot forward online. Show off your menu or products with a beautiful gallery on your site. Share your opening hours, location (with an integrated Google Map), and allow customers to contact or reserve easily. We can even integrate basic online ordering or booking if you need (through simple plugins). Most importantly, we ensure your business appears on Google when locals search for “\[Your Cuisine\] near me” or “\[Product\] in \[Town\]”. Naveeg’s all-in-one platform means you don’t have to juggle Yelp, Facebook, and a dozen apps – manage your online presence in one place and turn more browsers into loyal customers.”

*(Outcome focus: foot traffic & reservations. Pain: disjointed online info, trouble updating menus/hours in multiple places – here we promise one place to manage.)*

**For Health & Beauty (Salons, Gyms, Spas):**  
“**Let your brand shine online.** In the beauty and wellness industry, first impressions matter. Naveeg will create a stunning website that reflects the style and vibe of your salon, spa, or fitness studio. Upload photos of your work or facility, and our AI can generate engaging descriptions for your services. We’ll help you integrate a booking widget or contact form so clients can easily book appointments or consultations. Busy running your shop? Naveeg ensures your site stays up-to-date and can even greet visitors with an AI chatbot to answer FAQs (like “Do you accept walk-ins?” or “What are your prices?”) while you’re with clients. It’s like having a virtual receptionist on your website 24/7, freeing you to focus on the client in front of you.”

*(Outcome: more appointments, better client engagement. Pain: marketing takes time away from serving clients – we free them from that.)*

**For Professionals & Consultants:**  
“**Build credibility and get leads.** If you’re an independent consultant, accountant, or any professional service provider, a solid website is your digital business card. Naveeg will create a clean, modern site where you can showcase your expertise, testimonials, and services. Position yourself as the expert in your field with blog posts – don’t worry, our AI can help draft articles or insights to keep your site active and insightful. With built-in SEO, potential clients will find you via Google when searching for the services you offer. When they do, your site’s contact form and AI chatbot ensure you capture their inquiry and respond with information even while you’re busy working. It’s like having a personal marketing assistant that works around the clock.”

*(Outcome: credibility, inbound leads. Pain: need to appear professional, share knowledge but don’t have time to blog – AI helps.)*

We should list maybe 3-4 of these on the Solutions page. The approach is to use **headings named after the audience**(“For Restaurants”, etc.), and then a short paragraph as above focusing on their outcome (more customers, easier bookings, credibility, etc.). This helps the user self-identify: “Yes, this speaks to my business.”

Each solution could subtly mention features relevant to that segment (like booking integrations for salons, or photo galleries for restaurants) to show we thought of their needs. The copy remains non-technical and benefit-driven.

If not separate pages, these could be toggle tabs or expanding sections on one page. But to start, a single **Solutions** page with all is fine.

### **Pricing Page**

The Pricing page needs to clearly present the **Free Trial, Starter plan, and Pro plan**, highlighting the value of each and nudging users towards the appropriate plan (likely many will start trial, then ideally choose Pro if they need the custom domain and advanced features).

Structure it as a comparison table or individual plan cards:

**Free 7-Day Trial** – *“Test drive all of Naveeg’s features free for 7 days.”*

* Price: **€0** for 7 days.  
* Bullet points:  
  * Full access to Starter or Pro features during trial (specify if any limitation: from the data, trial includes all advanced features except custom domain, so basically it’s like Pro without custom domain).  
  * A site on a free subdomain (`yourname.naveeg.online`).  
  * No credit card required to start.  
  * **Outcome emphasis:** *“Get online risk-free and see how it works before you commit.”*  
* CTA: “Start Free Trial” (this is main CTA anyway).

After trial info, mention “After 7 days, choose a plan to keep your site live. If you decide not to upgrade, you can still retrieve your site content or choose to export it.” (This addresses “What if I don’t upgrade after trial?” – from the FAQ, likely site will be archived if not upgraded, we can state that clearly or in FAQ.)

**Starter – €49/month** (or annual option if any, but none mentioned, stick monthly):

* Tagline: *“Core features for getting online”* or *“Everything you need for a basic online presence.”*  
* Ideal for: single-site businesses on a budget (small note: “Best for solo business owners starting out”).  
* Features included:  
  * **1 website** (on Naveeg subdomain). (Max 1 site as per plan features.)  
  * AI website builder & hosting included.  
  * SEO basics & mobile-friendly design.  
  * Contact form & lead collection (emails to you).  
  * **Ongoing updates & support.**  
  * (If custom domain is NOT included: do **not** list custom domain here, or mark it as “–”. It’s important to clarify: Starter sites would remain on a \*.naveeg.online address. We might add: “Use free Naveeg subdomain (custom domain available on Pro)”.)  
  * Exclude advanced features: maybe list “AI chatbot – **Not included** (available on Pro)” to show what they miss, or use a comparison checkmark system. But since copy should focus on outcome, perhaps don’t emphasize missing things, except custom domain likely must be mentioned as not included.  
* Outcome framing: *“Get your professional site online and maintained at an affordable price.”* The idea is that even without fancy extras, they get the core outcome: a live website they don’t have to fuss with.

**Pro – €99/month**:

* Tagline: *“Advanced features for growing businesses”* or *“Maximize your online presence and capabilities.”*  
* Ideal for: those who want full control and premium features (multi-location businesses, those serious about marketing).  
* Features included **(everything in Starter, plus)**:  
  * **Up to 5 websites** on one account (if a user has multiple businesses or projects).  
  * **Connect your custom domain** (use your own .com, included).  
  * **AI chatbot** on your site to handle FAQs.  
  * **Advanced analytics dashboard** (Google Analytics and Search Console integration) for deeper insights.  
  * **Automations & Integrations** (e.g., lead forwarding to spreadsheets, email marketing integrations as available).  
  * **E-commerce ready** (add an online store or bookings via WooCommerce).  
  * **Team collaboration** (invite team members to manage the site).  
  * Priority support (if applicable, often Pro plans tout better support – even if it’s just faster email response).  
* Outcome framing: *“All the tools you need to grow your business online – from custom branding to customer engagement.”* Essentially, “Pro helps you go further: custom domain to build your brand, AI and analytics to optimize your growth.”

We will include a note like **“All prices VAT-inclusive”** if targeting EU and you want to communicate that (docs mentioned pricing is VAT-inclusive for EU). Or mention currency if needed (assuming € as used in docs, but if targeting globally perhaps show $ vs € options; for now stick to Euro since docs did).

Beneath the plan cards or table, have a small FAQ or note:

* *“Not sure which plan? Start with the free trial – you’ll experience Pro features for 7 days. Downgrade to Starter if you only need the basics.”* This encourages trial and implies you won’t lose your work if you pick Starter later (just some features will turn off).  
* Payment info: *“We support all major credit cards via Stripe secure checkout. Upgrade, downgrade, or cancel any time.”* – To ease concerns about commitment.

Also include a CTA under pricing: “**Start your free trial**” (the primary action anyway) or “Contact us for any questions about plans” maybe.

*(Citations for pricing: Starter €49, Pro €99, trial 7 days for accuracy.)*

### **Demo & Walkthrough**

This section/page is all about showing, not just telling. We plan to include a **video walkthrough** of the dashboard and site creation process (as the user mentioned a full guided video). The content around that video should set it up and reinforce the outcomes.

**Page title:** “See Naveeg in Action” or “How Naveeg Works (Video)”

**Intro text:** *“In under 2 minutes, see how Naveeg takes you from sign-up to a live website. Watch as a site for ‘Jane’s Bakery’ is created using our platform:”* – This sets context for the demo example. (We reference the idea from docs to have a Jane’s Bakery sample.)

Embed the **demo video** or a large thumbnail linking to it (the user will add the video). Ensure it’s above the fold on this page so people immediately can play it. Some people prefer visuals to reading text, especially non-tech folks.

**What to highlight in the video/captions:** If we control captions or accompanying text, point out key moments: “Jane fills in her bakery name… the AI suggests a template… and boom, her site is generated with photos of cupcakes and text about her bakery. All in 60 seconds\!” This drives home the magic and speed.

Below the video, include **screenshots or a mini-gallery**:

* One screenshot of the *Naveeg dashboard interface* (like the site creation page or the dashboard home with some data) – caption: “Your simple dashboard for managing everything.”  
* One screenshot of the *sample website homepage* (Jane’s Bakery) – caption: “A live website created by Naveeg’s AI – customize it or use it as-is.”  
* Possibly a screenshot of an *analytic chart or lead notification* – caption: “Get insights and leads without extra setup (Pro plan shown).”

These visuals with captions serve those who might skim rather than watch the full video, and reinforce features.

**Call to Action after seeing demo:** “Impressed? You can do it too. In fact, why not **try it free for 7 days** and see your own website come to life?” – followed by a CTA button.

Additionally, mention: *“We’re happy to do a personal demo for you – **contact us** to schedule a walkthrough.”* This makes it feel like a high-touch enterprise service (even if at small scale it would just be a Zoom the founder might do). It adds to the enterprise-grade vibe, that we’re willing to guide them.

### **About Us**

The About page should build trust and connection. It’s less about features, more about **why Naveeg exists and who’s behind it**. For a small business owner audience, seeing that the team understands their pain can be motivating.

**Our Mission/Story:**  
*“Naveeg was created with a simple belief: small business owners shouldn’t need to be tech experts to succeed online. After working with many local businesses (hairdressers, cafés, plumbers – you name it), our founding team saw the same problem over and over: entrepreneurs spending time and money they can’t spare on websites and digital marketing, or worse – neglecting it and missing out on customers. We built Naveeg to change that.*

*With a blend of smart technology and real-world insight, we aim to give every local business owner a stress-free path to a great online presence. Your time should be spent doing what you love – running your business – not wrestling with website builders or algorithms. Naveeg is here to handle the heavy lifting for you.”*

This kind of narrative shows empathy. It positions Naveeg as a solution born out of genuine understanding (maybe the founder was one of these people or helped them). If there’s a specific founder story, include it: e.g., *“Our founder \[Name\] grew up in a family of small business owners and witnessed how hard it was for his parents to adapt to the digital age. Naveeg is our way of helping business owners like you avoid that struggle.”* – Only include if true/known; if not, the generic mission above suffices.

**The Team and Values:**  
If the company is small/new, highlight dedication: *“We’re a small team of designers, developers, and marketers based in \[Location\] who are passionate about helping small businesses thrive. We believe in being your partner in growth, which means we’re here to support you at every step – from onboarding to scaling up.”*  
Mention values like *“simplicity, customer success, and continuous improvement”* – it lends an enterprise feel of professionalism, yet friendly.

**Maybe some numbers or social proof:**  
If possible, mention: *“Trusted by X beta users”* or *“Already powering businesses in \[some city/country\]”* if there is any early traction. Or a goal: *“Our goal is to help 1,000 small businesses get online by next year.”*

Keep the tone humble and supportive. End the About page with a personal touch: *“We’d love for you to be part of our story. If you have any questions, feel free to reach out directly – you’ll find we’re very approachable\! Together, let’s navigate the online world and help your business shine.”* (Play on *navigate* since the name “Naveeg” suggests navigation.)

### **FAQ**

A Frequently Asked Questions page (or section on home) is vital for addressing common concerns and reducing signup friction. We already have some key FAQs from the docs suggestions:

1. **“What happens after the 7-day trial?”** – Answer: *“You can choose a paid plan (Starter or Pro) to keep your site live. If you decide not to continue, don’t worry – your site will be saved (archived) for a short period so you can still retrieve your content. However, it won’t remain publicly accessible unless you pick a plan.”* (This sets expectation that they won’t lose everything immediately at trial end, but also encourages upgrading.)  
2. **“Do I own the website you create?”** – Answer: *“Yes, absolutely. The website is 100% yours. It’s a standard WordPress website under the hood, which means you can export it, back it up, or even move it to another host if you ever needed to. Our platform does the heavy lifting to create and manage it, but you’re the owner.”* This addresses lock-in fears.  
3. **“Can I use my own domain name?”** – Answer: *“Yes, you can connect your custom domain. During the free trial, your site will be on a temporary Naveeg subdomain. Custom domains are available on the Pro plan – it’s a one-click setup when you upgrade, and we’ll handle the SSL certificate and configuration for you.”* (We clarify that Starter doesn’t include it without bluntly saying “not on Starter” – but it’s implied by saying it’s on Pro. If someone on Starter asks, we’d address that maybe: “Starter plans use a free Naveeg domain like yourbiz.naveeg.online. To use a custom domain, you’ll need to upgrade to Pro.”)  
4. **“I’m not tech-savvy… can I really do this?”** – Answer: *“Definitely. Naveeg was built for people who have no technical background. If you can fill a short form and click a button, you can build your site with Naveeg. Everything is either automated or very clearly explained. Plus, we’re here to help if you get stuck – just contact us\!”* Encourage them that many users are like them and succeeded.  
5. **“What if I already have a website/domain?”** – Answer: *“That’s fine\! If you have a domain, you can connect it (Pro plan) to the new Naveeg site we create for you. If you already have a website but want to switch to Naveeg for the automation and ease, we can help migrate your content. Our goal is to make your life easier, even if it means helping you move from an old setup.”* (This addresses people who might have, say, a DIY Wix site or a very old page and are considering switching.)  
6. **“Is the content really generated by AI? Will it be relevant to my business?”** – Answer: *“Our AI is quite clever\! It takes the details you give (industry, business name, keywords about what you do) and searches a knowledge base to draft text and suggest images that fit. We’ve trained it with information about various small businesses. In the Jane’s Bakery demo, for example, it wrote about fresh cupcakes and custom cakes because we told it it’s a bakery. You can always tweak the content, but most users find it’s a great starting point and saves them lots of time.”* (Basically reassure it’s not generic gibberish, and they can edit if needed.)  
7. **“Can I edit my website after it’s generated?”** – Answer: *“Yes, you have full control to edit and update your website. Naveeg provides an easy editor interface (and you can also use the standard WordPress editor if you’re familiar with it). Change text, add pictures, create new pages – it’s all possible. And if you’re not comfortable doing it yourself, you can always ask us or invite a team member to help via the Team feature.”*  
8. **“How do payments work for the subscription?”** – Answer: *“We use Stripe for secure payments. When you’re ready to upgrade, you’ll be taken to a Stripe checkout page to enter your payment info safely. Stripe is a trusted payment processor (used by millions of businesses). You can use any major credit/debit card. Subscriptions are billed monthly (cancel anytime), and you can also choose an annual plan for a discount (if we offer one). After payment, your site’s features upgrade instantly.”* (Include the part about cancel anytime, no long-term contract, etc., to alleviate fear of commitment.)  
9. **“Is Naveeg really all I need? What about social media/Google/etc.?”** – Answer: *“Naveeg’s aim is to be your central online hub. The website we create will be the cornerstone of your online presence. We also make it easy to integrate with other channels: for example, you can embed your Instagram feed on your site, link out to your Facebook page, and connect Google Analytics to track traffic. For Google Search and Maps, just having a Naveeg site with good SEO will improve your discoverability, but we always recommend claiming your Google Business Profile too – which Naveeg can help with (on Pro plans we’ll guide you through it in the dashboard). In short, Naveeg covers the website and integrations, and we’ll advise you on leveraging other online channels effectively.”*

This kind of answer shows we’re not ignoring the broader digital presence, and positions Naveeg as an assistant in that journey, not just a siloed website builder.

The FAQ should ideally be on a separate page or expandable section so as not to clutter the main pages. Each question can be a dropdown. We have addressed the major ones relevant to trial, ownership, domain, ease of use, etc., which align with the doc suggestions.

### **Contact Us**

It’s important to provide an easy way for users to reach out, given our audience might prefer talking to a human for reassurance.

**Contact Page/Form:**  
A simple friendly intro: *“Questions? We're here to help. Whether you want a personal demo, have a question about Naveeg, or need assistance, feel free to reach out.”*

Provide a **contact form** with fields: Name, Email, and Message. Keep it short and simple (no one wants to fill a long form). Add a note: *“We typically respond within 1 business day.”* The form on submission should ideally integrate to send to a support email or create a lead entry (maybe it populates the `leads` table or a separate `contact_leads`).

Also list alternative contacts: *“Prefer email? Write to us at support@naveeg.com.”* If a phone or chat were available, mention those (likely not at this stage).

**Full Guided Walkthrough Offer:** Reiterate that they can schedule a one-on-one walkthrough. Possibly embed a Calendly link if available for booking a demo call, or just say *“Email us to set up a live demo via Zoom.”*

For credibility, include the business address (if there is a physical office or at least a city, for legitimacy) and perhaps company registration info if needed (some users look for that on contact or about pages, especially in EU).

---

Finally, ensure that the **footer** of the marketing site links to all these pages: Home, Features, Pricing, Solutions, About, FAQ, Contact, as well as Terms of Service and Privacy Policy (which should be in place even as boilerplate). The Terms and Privacy can use standard templates (the docs suggested to use a template just to have them, which is fine). They add to the site’s completeness and trustworthiness.

**Conclusion / Recap in Marketing Tone:**  
Throughout all pages, maintain the tone that *Naveeg is your partner in navigating (pun intended) the online world*. Emphasize that it’s **easy, reliable, and built for people like you (the SME owner)**. By refactoring the design as described and using outcome-driven copy, the Naveeg website and app will present as an **enterprise-grade solution**with the approachability that instills confidence in non-tech users. The end result should be that a visitor quickly understands:

1. What Naveeg is and the value it provides (in their terms, e.g., *“website without the headache”*).  
2. That it’s professional and comprehensive (so they trust it can grow with them, not a flimsy tool).  
3. That there’s real support behind it (so they won’t be left stranded).  
4. Exactly what to do next: start a free trial (with the assurance they can always back out if they’re not satisfied).

By implementing the above design and copy recommendations, Naveeg will be well-positioned to attract and convert its target audience – busy small business owners – into happy customers who finally have an online presence they’re proud of, with minimal effort on their part. Let’s build a marketing site and dashboard that truly reflect the power and ease-of-use of the Naveeg platform, turning a currently basic setup into a **world-class SaaS experience**. 🚀

