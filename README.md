
Built by https://www.blackbox.ai

---

```markdown
# Professional Resume Builder

## Project Overview
The Professional Resume Builder is a web application designed for users to create, customize, and download their resumes effortlessly. The application features a user-friendly interface that guides users through the process of inputting personal information, work experience, education, and skills, culminating in a polished resume that can be printed or downloaded as a PDF.

## Installation
To run the Resume Builder locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd resume-builder
   ```
3. Open the `index.html` file in a web browser.

## Usage
1. Open the application by loading `index.html` in your browser.
2. Click on "Start Building" to navigate to the Personal Information form.
3. Fill out your personal information, then click "Next: Work Experience".
4. Continue through the forms by adding your Work Experience, Education, and Skills.
5. Once all details are entered, click "Next" to preview your resume.
6. From the preview page, you can print or download your resume as a PDF.

## Features
- User-friendly interface with navigation for easy progress through forms.
- Dynamic form entries for multiple work experiences and educational records.
- Preview feature that lets users see how their resume will look.
- Ability to download the completed resume as a PDF or print directly.
- Use of local storage to persist data entered by users across sessions.
- Responsive design compatible with various screen sizes.

## Dependencies
This project utilizes the following libraries:
- [Tailwind CSS](https://tailwindcss.com) for styling.
- [Font Awesome](https://fontawesome.com) for icons.
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation.
- [html2canvas](https://github.com/niklasvh/html2canvas) for capturing DOM elements as images.

## Project Structure
```
resume-builder/
│
├── index.html           # Main entry page for the application
├── personal.html        # Page for entering personal information
├── work.html            # Page for entering work experience
├── education.html       # Page for entering educational background
├── preview.html         # Page for reviewing resume and options to print/download
├── styles.css           # Tailwind CSS and custom styles for the application
├── script.js            # JavaScript containing main functionality
```

## Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request. 

## License
This project is open-source and available under the [MIT License](LICENSE).
```