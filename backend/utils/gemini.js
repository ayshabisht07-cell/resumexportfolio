const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractResumeData(resumeText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//ayesha
    const blankTemplate = {
      "basics": {
        "name": "Abhishek Dabas",
        "label": "Full-stack web developer",
        "image": "my-avatar.png",
        "email": "abhishekdabas2005@gmail.com",
        "phone": "8708250109",
        "birthday": "Updated Soon",
        "location": "Pune Maharashtra",
        "about": [
          "Full-stack web developer with hands- on experience in building responsive and real-time applications using React, Node.js, Firebase, and Tailwind CSS. Known for delivering clean UI/UX and scalable solutions. Eager to contribute to innovative teams in startups or growth-focused tech companies."
        ]
      },
      "contactInfo": [
        {
          "icon": "mail-outline",
          "title": "Email",
          "link": "mailto:abhishekdabas2005@gmail.com",
          "value": "abhishekdabas2005@gmail.com"
        },
        {
          "icon": "phone-portrait-outline",
          "title": "Phone",
          "link": "tel:8708250109",
          "value": "8708250109"
        },
        {
          "icon": "calendar-outline",
          "title": "Birthday",
          "value": "Updated Soon"
        },
        {
          "icon": "location-outline",
          "title": "Location",
          "value": "Pune Maharashtra"
        }
      ],
      "socials": [
        {
          "icon": "logo-linkedin",
          "url": "https://linkedin.com/in/dabas-abhishek"
        },
        {
          "icon": "logo-github",
          "url": "https://github.com/abhishek972986"
        },
        {
          "icon": "logo-facebook",
          "url": "https://facebook.com/abhishek-dabas"
        },
        {
          "icon": "logo-instagram",
          "url": "https://instagram.com/abhishek.dabas"
        }
      ],
      "services": [
        {
          "icon": "https://placehold.co/40x40/cccccc/333333?text=FD",
          "title": "Frontend Development",
          "description": "Building beautiful and responsive user interfaces with modern frameworks like React and Tailwind CSS."
        },
        {
          "icon": "https://placehold.co/40x40/cccccc/333333?text=BD",
          "title": "Backend Development",
          "description": "Crafting robust and scalable server-side logic and APIs using Node.js and Express.js."
        },
        {
          "icon": "https://placehold.co/40x40/cccccc/333333?text=DB",
          "title": "Database Management",
          "description": "Managing real-time databases and data storage solutions with Firebase and other platforms."
        },
        {
          "icon": "https://placehold.co/40x40/cccccc/333333?text=DS",
          "title": "Deployment Solutions",
          "description": "Deploying applications to cloud services and ensuring smooth, continuous operation."
        }
      ],
      "testimonials": [
        {
          "name": "Jane Doe",
          "company": "Tech Innovations Inc.",
          "quote": "Abhishek is a talented and dedicated developer. His work on our project was exceptional, and he delivered a high-quality, scalable solution ahead of schedule.",
          "avatar": "./images/avatar-2.png"
        },
        {
          "name": "John Smith",
          "company": "Growth Partners Co.",
          "quote": "I was consistently impressed with Abhishek's problem-solving skills and his ability to quickly grasp complex requirements. A great asset to any team.",
          "avatar": "./images/avatar-1.png"
        }
      ],
      "clients": [
        {
          "name": "Startup Alpha",
          "logo": "./images/logo-1-color.png"
        },
        {
          "name": "Beta Labs",
          "logo": "./images/logo-2-color.png"
        }
      ],
      "education": [
        {
          "title": "B.Tech in Computer Science",
          "dates": "2023 - Present",
          "description": "Army Institute of Technology Pune"
        },
        {
          "title": "CBSE, Class 12th",
          "dates": "2023",
          "description": "GPA: 89.9%"
        },
        {
          "title": "CBSE, Class 10th",
          "dates": "2021",
          "description": "GPA: 96%"
        }
      ],
      "experience": [
        {
          "title": "Freelance Web Developer",
          "dates": "2024 - Present",
          "description": "Developed and deployed multiple full-stack applications for various clients, focusing on clean code, responsive design, and robust functionality. Managed projects from conception to completion."
        },
        {
          "title": "Full-Stack Intern",
          "dates": "Summer 2024",
          "description": "Assisted in the development of a real-time chat application. Gained hands-on experience with Firebase for authentication and database management. Contributed to UI/UX design and implementation."
        }
      ],
      "skills": [
        { "title": "JavaScript", "percentage": 90 },
        { "title": "TypeScript", "percentage": 75 },
        { "title": "React", "percentage": 85 },
        { "title": "Node.js", "percentage": 80 },
        { "title": "Express.js", "percentage": 70 },
        { "title": "Firebase", "percentage": 95 },
        { "title": "Tailwind CSS", "percentage": 90 }
      ],
      "achievements": [
        {
          "title": "Winner, Techelevate",
          "description": "Secured first position in a campus-wide technology innovation competition with a project focused on sustainable tech solutions."
        },
        {
          "title": "Selected Participant, Startup Saga",
          "description": "Chosen to present a business pitch and product prototype among top innovators at AIT Pune."
        }
      ],
      "portfolio": [],
      "blogPosts": []
    };

    const prompt = `
You are a resume parser AI. Your task is to extract information from the provided resume text.
⚠️ Rules:
- Do NOT change any image link in the given template.
- Do NOT put null values if info is missing → use "Updated Soon".
- Do NOT change testimonials or clients data.
- In "basics", update values from resume text if available.
- In "portfolio", update projects from resume (assign images sequentially like ./images/project-1.jpg etc.).
- Only update URLs of projects if given.
- Blog posts: adapt topics to the resume's domain.
- Skills percentages remain unchanged.

Blank Template:
${JSON.stringify(blankTemplate, null, 2)}

Resume Text:
${resumeText}
`;

    const result = await model.generateContent(prompt);

    let raw = result.response.text();
    raw = raw.replace(/```json|```/g, "").trim();

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return {
        success: false,
        message: "Error parsing AI response as JSON",
        error: e.message,
        raw,
      };
    }

    const outputPath = path.join(
      __dirname,
      "../vcard-personal-portfolio-master/assets/data/resume-data.json"
    );

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    return { success: true, data, file: outputPath };
  } catch (err) {
    return { success: false, message: "Unexpected error", error: err.message };
  }
}

module.exports = extractResumeData;
