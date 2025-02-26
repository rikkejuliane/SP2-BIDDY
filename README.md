# SP2 BIDDY - Rikkejuliane  
<img src="https://github.com/user-attachments/assets/ce8c56d8-4e2b-49e8-8c0e-43a505886284" alt="Logo for Biddy" width="200px">  


## Table of Contents 📚  
1. [Project Overview](#project-overview-)  
2. [Client](#client-)  
3. [Demo](#demo-)  
4. [Key Features](#key-features-) 
5. [Installation](#installation-) 
6. [Usage](#usage-) 
7. [Tech Used](#tech-used-) 
8. [Contact Me](#contact-me-)
9. [Other](#other-)

## Project Overview 🌍   
Biddy is an auction platform where users can list items for bidding and place bids on other users' listings. Users start with 1000 credits, which they can use to bid or earn by selling items. The platform is designed to be user-friendly, accessible, and fully responsive.  

This project is developed as part of the Semester Project 2 for Noroff, demonstrating full front-end development with API integration.  


## Live demo 🎥    


## Key Features ✨    
**User Authentication:**  
* Register with a stud.noroff.no email  
* Login/logout functionality  

**Auction Listings:** 
* Create, Read, Update, and Delete (CRUD) listings  
* Set a bidding deadline
* Add media and descriptions  
* View highest bid and total bids 

**Bidding System:**  
* Users can place bids on active auctions
* View bid history with avatars and usernames
* Prevents users from bidding against themselves

**Dynamic UI Elements:**  
* Search Bar: Filter listings in real-time
* Tag Bar: Display categories with icons
* Logged In vs Logged Out Views
* Responsive Design: Works on all screen sizes

**Admin Functionality:**
* Single authentication page for login and registration with animations
* Secure profile editing and listing management

**Accessibility & WCAG Compliance:**  
* Uses semantic HTML for better screen reader compatibility
* Ensures contrast and readability with tools like WAVE
* Responsive UI optimized for all devices


## Tech Used 💻 
* HTML5
* Tailwind CSS
* CSS
* Vite
* Prettier
* IconScout (for icons)
* Netlify
* RESTful API (Nofoff)


## Installation ⚙️
Click the link to access the project: 🔗 [Biddy](https://biddy-sp2.netlify.app/)

To set up the project locally, follow these steps:
**1. Clone the repository:**
```bash
git clone https://github.com/rikkejuliane/SP2-BIDDY.git
```

**2. Navigate to the project directory:** 
```bash
cd SP2-BIDDY
```

**3. Install dependencies:**
Ensure you have Node.js installed. Then, run:
```bash
npm install
```

**4. Environment Setup**
Copy the .env_template File:
```bash
cp .env
```

Add Your API Key:  
Open the newly created .env file in your code editor.  
Add your API key in place of your-api-key-here:  
```bash
VITE_API_KEY=your-api-key-here
```

and add your API base:
```bash
VITE_API_BASE=your-base-here
```

The base is the url of the api: https://v2.api.noroff.dev
You can get your API key here: Noroff API Key Documentation.  

**5. Start the development server:**
```bash
npm run dev
```

**6. Open the project:**
The application will be accessible at http://localhost:5173/ in your preferred web browser.  


## Contact me 🙋🏽‍♀️  
Don’t hesitate to reach out to me or connect with me on social media if you have any questions, collaboration ideas, or an exciting new project in mind. I’m always open to new opportunities!   
🩷 [Instagram](https://www.instagram.com/rikkejuliane/)  
💙 [Linkedin](https://www.linkedin.com/in/rikkejuliane/)  


## Other 📌  
**Gantt Chart:** [View the timeline](https://github.com/users/rikkejuliane/projects/4/views/4)  
**Figma wireframes:** [View wireframes](https://www.figma.com/design/fNR6E8ekUupJbTT0VyehOK/SP2---BIDDY?node-id=158-2917&t=spsQtI6Mz9Os0l3K-1)  
**GitHub Kanban Board:** [View the board](https://github.com/users/rikkejuliane/projects/4/views/1)  
**Style Guide:** [View the styleguide](https://www.figma.com/design/fNR6E8ekUupJbTT0VyehOK/SP2---BIDDY?node-id=0-1)  
