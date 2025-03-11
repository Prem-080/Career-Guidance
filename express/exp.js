const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Questions and answers
const questions = [
  {
    question: "What type of work excites you the most?",
    options: [
      "Solving complex problems and analyzing data",
      "Creating something new and expressing ideas",
      "Helping people and making a difference",
      "Managing projects, leading teams, and making decisions"
    ]
  },
  {
    question: "How do you prefer to work?",
    options: [
      "Alone, focusing on deep thinking and analysis",
      "In a creative and dynamic environment",
      "Collaborating with and supporting people",
      "Leading a team and organizing tasks"
    ]
  },
  {
    question: "What is your approach to solving problems?",
    options: [
      "Using logic, facts, and data",
      "Thinking outside the box and experimenting",
      "Understanding people’s needs and emotions",
      "Planning, organizing, and making strategic moves"
    ]
  }
];

const careerPaths = {
  A: "Engineer, Scientist, Data Analyst, Software Developer, Researcher",
  B: "Graphic Designer, Writer, Filmmaker, Marketing, Entrepreneur",
  C: "Psychologist, Teacher, Social Worker, Healthcare Professional, HR Manager",
  D: "Business Executive, Entrepreneur, Project Manager, Consultant, Lawyer"
};

// Endpoint to get questions
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

// Endpoint to submit answers and get career guidance
app.post("/api/submit", (req, res) => {
  const { answers } = req.body;
  if (!answers || answers.length !== questions.length) {
    return res.status(400).json({ error: "Please provide answers for all questions." });
  }

  // Count responses and determine dominant choice
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answer => {
    if (answer === 0) counts.A++;
    else if (answer === 1) counts.B++;
    else if (answer === 2) counts.C++;
    else if (answer === 3) counts.D++;
  });

  // Find the dominant category
  const maxCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  res.json({ careerRecommendation: careerPaths[maxCategory] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
