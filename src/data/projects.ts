/**
 * All project content lives here. The Work section and the case study pages
 * (/work/<slug>) both read from this file. Edit text and images here only.
 *
 * image / cover: files live in /public/project/ (e.g. /public/project/project-1.jpg)
 *        and are written as "/project/project-1.jpg" (no "public", and the
 *        extension must match the real file: .jpeg, .jpg or .png).
 *        Leave image out to show the placeholder tile.
 */
export type Project = {
  slug: string; // used for the case study URL: /work/<slug>
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  image?: string;
  blur?: string; // tiny blurred preview shown while the image loads (optional)
  tone: string; // placeholder tile colour
  caseStudy?: CaseStudy; // full case study page content (leave out until ready)
};

export type CaseStudy = {
  title: string; // big title on the case study page
  intro: string;
  client?: string; // leave out to hide it on the page
  role: string;
  duration?: string; // leave out to hide it on the page
  year: string;
  cover?: string; // large image under the intro, e.g. "/project/project-1.jpg"
  overview?: string;
  challenge?: string;
  whatIDid?: string[];
  outcome?: { value: string; label: string }[];
  gallery?: GalleryItem[]; // image collection (used for the graphic design project)
  tags: string[];
};

export type GalleryItem = {
  src?: string; // e.g. "/work/graphic-design/post-01.jpg" (leave out to show a placeholder tile)
  alt: string;
  shape?: "square" | "portrait" | "landscape"; // 1:1, 4:5 or 16:9. Default: square
};

export const projects: Project[] = [
  {
    slug: "yourofficeship",
    title: "Ship Chartering",
    client: "Hilfship",
    category: "SaaS Platform",
    year: "2026",
    summary: "Ship chartering and fleet operations platform, with voyages, vessels and charter deals in one workspace.",
    tags: ["UI/UX Design", "Web App", "Dashboard"],
    image: "/project/project-1.jpg",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDovtmnzymDU38uOP51YtjLA9Kzpmtpb9xp5LxAjbwR29+ax9TZiJX3HcW6596v2k0kMqiIhQQOwrFs2SP/2Q==",
    tone: "#ECEAF4",
    caseStudy: {
      title: "Ship Chartering",
      intro:
        "A voyage estimation and fleet operations dashboard built for a UAE based ship chartering company, designed to simplify complex maritime workflows into a clean, usable interface.",
      client: "Hilfship",
      role: "Product Designer",
      duration: "2 weeks",
      year: "2026",
      cover: "/project/project-1.jpg",
      overview:
        "The dashboard needed to bring four separate workflows (Vessels, Cargo Orders, Voyage Estimator, and Report & Bunker Cost) into a single, coherent system. Each module served a different part of the chartering desk, and the brief was to design an interface that let traders move between them without losing context or hunting for information they relied on.",
      challenge:
        "Going in, I had no background in ship chartering. The terminology, the workflows, none of it. The client walked our team through how the desk actually operated in a series of meetings, and once that picture was clear, we worked through what new features the dashboard needed on top of it. Understanding the product turned out to be a bigger part of the job than designing it.",
      whatIDid: [
        "Joined walkthrough sessions with the client to learn the chartering workflow from zero",
        "Reviewed the HTML reference file the client provided to understand how the existing screens were structured",
        "Worked with the team to translate the client's explanation into a set of new features for the dashboard",
        "Designed the UI/UX on top of that structure, prioritising clarity given how unfamiliar the domain was",
        "Prototyped the screen to screen navigation and interactions so the client could walk through the flow before development",
      ],
      outcome: [
        { value: "15+", label: "Screens designed" },
        { value: "80%", label: "Overall user experience" },
        { value: "92%", label: "Client satisfaction" },
      ],
      tags: ["Product Design", "UI/UX", "Web App"],
    },
  },
  {
    slug: "ezone-hr-dashboard",
    title: "Your Office HR",
    client: "EZONE Corporate Services",
    category: "Dashboard Redesign",
    year: "2025",
    summary: "Redesign of an HR dashboard for a UAE corporate services provider, focused on clarity and daily workflows.",
    tags: ["UI/UX Design", "Redesign", "HR Tech"],
    image: "/project/project-2-ezone.jpg",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCh4XjtNTNyl3cND5W0rggbgc561keJ7ZbPWHit5fOh2gowIPUc5x75p8sj4+9VCaRyfvGtG9LNiP/Z",
    tone: "#EEF0EC",
    caseStudy: {
      title: "HR Software Dashboard",
      intro:
        "A redesign of an HR web application covering payroll, attendance, leave and reporting, replacing a dated, cluttered interface with one that makes routine tasks feel routine.",
      client: "Internal & External Business",
      role: "UI/UX Designer",
      duration: "6 months",
      year: "2025",
      cover: "/project/project-2-ezone.jpg",
      overview:
        "An HR software web application with strong core functionality but a dated, cluttered interface. Payroll, attendance tracking, leave management, and reporting all worked, but the experience made routine tasks feel harder than they needed to be. The brief was to redesign the dashboard's UI and improve the overall user experience across these workflows.",
      challenge:
        "Partway through the redesign, a new organisation chart feature was added to the scope. Building the visual hierarchy turned out to be harder than expected. The underlying role structure was inconsistent across the organisation, so the reporting lines the chart depended on weren't clearly defined for every role, which made it difficult to represent cleanly.",
      whatIDid: [
        "Redesigned the core dashboard screens covering payroll, attendance tracking, leave approval workflows, and reports",
        "Rebuilt the visual design system, applying the client's own brand colours in place of the previous generic theme",
        "Designed a new organisation chart feature, working through the inconsistent role hierarchy to arrive at a structure that could be visualised clearly",
        "Collaborated with developers on a GPS based check in/check out system, restricting attendance logging to within a 50m radius of the office location",
      ],
      outcome: [
        { value: "20+", label: "Screens designed" },
        { value: "60%", label: "Overall user experience" },
        { value: "88%", label: "Client satisfaction" },
      ],
      tags: ["UI/UX", "Web Redesign", "New Feature"],
    },
  },
  {
    slug: "yourofficehr-app",
    title: "YourOfficeHR",
    client: "YourOffice",
    category: "Mobile App",
    year: "2025",
    summary: "HR mobile app designed and built end to end, from first screens to launch and ongoing support.",
    tags: ["Product Design", "Mobile", "iOS & Android"],
    image: "/project/project-3-hr-app.jpg",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDnPCtjDf69bW9zGHhkD5B6HCk1P4osbOw1KeCBFRkxhU6dAc8njrVQXc2niKW0cxyRDCMOoznP86o3d1Ne3DXFw5klfG5j1OOKAP/Z",
    tone: "#F2ECEA",
    caseStudy: {
      title: "HR Mobile Application",
      intro:
        "A comprehensive HR management solution designed for seamless mobile integration and improved employee engagement.",
      client: "Internal & External Business",
      role: "Lead Product Designer",
      duration: "2 months",
      year: "2025",
      cover: "/project/project-3-hr-app.jpg",
      overview:
        "The HR software's web dashboard worked well, but the company also needed a mobile app covering the same core functionality (leave balance, requests, approvals, and company info) in a form employees could use from their phones. I designed this end to end, from information architecture through to developer handoff.",
      challenge:
        "The web dashboard's table heavy layout, with multiple columns of data per screen, didn't translate directly to mobile. Fields that sat comfortably side by side on a desktop screen had to be rethought as stacked, scannable cards without losing any of the information density users relied on.",
      whatIDid: [
        "Designed the mobile app end to end, from navigation structure through to final screens",
        "Restructured multi column web tables into card based layouts suited to a single column mobile screen",
        "Built the UI using Material UI components, so the design language matched what developers could implement directly from the library",
        "Handed off the design to the development team, with Material UI as the shared reference reducing back and forth on implementation",
      ],
      outcome: [
        { value: "100+", label: "Screens designed" },
        { value: "85%", label: "Overall user experience" },
        { value: "90%", label: "Client satisfaction" },
      ],
      tags: ["Design System", "End to End Design", "User Experience"],
    },
  },
  {
    slug: "real-estate-website",
    title: "Real Estate Website",
    client: "Internal Business",
    category: "Website",
    year: "2025",
    summary: "A property sales and rentals site for a UAE business, designed and built end to end with React.",
    tags: ["Website", "React", "SEO"],
    image: "/project/project-4.jpg",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB/inUtXh1CNNNuZ4o/KyVjh35bJ74NR+E9U1m41GRNUluGjERKiSMKM5Ht1romcujDaoyOoUZFSQBEt0xGmQvUjmkM/9k=",
    tone: "#EAEEF2",
    caseStudy: {
      title: "Real Estate Website",
      intro:
        "A property sales and rentals site for a UAE business, designed and built end to end with React. My first project taking a site from layout through to a live domain.",
      client: "Internal Business",
      role: "Frontend Developer and UI/UX Designer",
      duration: "2 weeks",
      year: "2025",
      cover: "/project/project-4.jpg",
      overview:
        "A real estate website for a UAE based business, built for the MD to list and manage property sales and rentals covering both buyers and sellers. The site was developed largely with AI assistance, using React and JavaScript as the core stack.",
      challenge:
        "I didn't come in with a development background, just a working knowledge of basic front end concepts, and built the site using AI tooling on top of that. The main challenge was debugging the unexpected issues that came up along the way: tracking down bugs, understanding what was actually causing them, and resolving them before the site was ready to go live. I deployed to Vercel first to test everything, then moved it onto the live domain once it was stable.",
      whatIDid: [
        "Designed a modern layout and UI for the site from scratch",
        "Built the site using React and JavaScript, with AI tools supporting the development process",
        "Debugged and resolved issues surfaced during development before moving to production",
        "Deployed to Vercel for staging and testing, then migrated to the live domain",
        "Implemented technical SEO to improve search visibility",
      ],
      outcome: [
        { value: "80%", label: "Overall user experience" },
        { value: "95%", label: "Technical SEO score" },
        { value: "97%", label: "PageSpeed Insights score" },
      ],
      tags: ["Website", "Research", "React & JavaScript"],
    },
  },
  {
    slug: "ecommerce-mobile-app",
    title: "Ecommerce Mobile App",
    client: "Local Super Market",
    category: "Mobile App",
    year: "2026",
    summary: "A grocery shopping app for a local supermarket, taken from research to an MVP prototype in a week.",
    tags: ["Ecommerce", "UI/UX", "UI Interaction"],
    image: "/project/project-5.jpg",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDkdG0S11TVxb3Fy8Ucqt5ZQAkvjgc1k6jYT6dfS2dyuJYmwwp9tPLE6mN2Ug5Ug8g+oqG6eSadpZ5Xkkc5Z3bJJ9zQCP/Z",
    tone: "#F5F5F7",
    caseStudy: {
      title: "Ecommerce Mobile App Design",
      intro:
        "A grocery shopping app for a local supermarket covering browsing, categories and recommendations, taken from research to an MVP prototype in a week.",
      client: "Local Super Market",
      role: "UI/UX Designer",
      duration: "1 week",
      year: "2026",
      cover: "/project/project-5.jpg",
      overview:
        "An ecommerce mobile app for a local supermarket client, covering product browsing, categories, and recommendations. The project was scoped down early. The client paused it after a few screens due to budget constraints, so the work stayed at design stage without moving into development.",
      challenge:
        "This project drew directly on prior ecommerce design experience, so the design process itself moved smoothly without any major obstacles. The main constraint was working within a short one week timeline before the client put the project on hold.",
      whatIDid: [
        "Researched existing ecommerce apps to inform UI direction and identify useful patterns",
        "Started with wireframes and reviewed them with developers, adjusting the layout based on their feedback",
        "Built out high fidelity screens once the wireframe direction was approved",
        "Connected the screens into a prototype to present an MVP structure to the client",
      ],
      outcome: [
        { value: "5", label: "Screens designed" },
        { value: "55%", label: "Overall user experience" },
        { value: "70%", label: "Client satisfaction" },
      ],
      tags: ["Ecommerce", "UI/UX", "UI Interaction"],
    },
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    client: "Various clients",
    category: "Social Media Posts",
    year: "2025 – 2026",
    summary: "A collection of social media post designs.",
    tags: ["Graphic Design", "Social Media", "Branding"],
    tone: "#EDEFF1",
    caseStudy: {
      title: "Graphic Design",
      // ↓ Placeholder text: replace with your own words
      intro: "A collection of social media post designs created for brands and businesses.",
      role: "Graphic Designer",
      year: "2025 – 2026",
      // Posts live in /public/work/graphic-design/. Add or remove items freely.
      // The first six also appear inside the folder thumbnail on the home page Work section.
      gallery: [
        { src: "/work/graphic-design/post-01.jpg", alt: "Visa and compliance post for Your Office Partners", shape: "portrait" },
        { src: "/work/graphic-design/post-02.jpg", alt: "UAE Golden Visa post", shape: "portrait" },
        { src: "/work/graphic-design/post-03.jpg", alt: "UAE visa services post for Your Office Partners", shape: "portrait" },
        { src: "/work/graphic-design/post-04.jpg", alt: "Business setup in UAE post for Your Office Partners", shape: "portrait" },
        { src: "/work/graphic-design/post-05.jpg", alt: "Eid ul Fitr greeting post for Hafship", shape: "portrait" },
        { src: "/work/graphic-design/post-06.jpg", alt: "Corporate tax return post for Your Office Partners", shape: "portrait" },
      ],
      tags: ["Graphic Design", "Social Media", "Branding"],
    },
  },
];