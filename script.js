// Resume Builder Application - Core Functionality

// DOM Elements
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    
    // Forms
    personalForm: document.getElementById('personalForm'),
    workForm: document.getElementById('workForm'),
    educationForm: document.getElementById('educationForm'),
    skillsForm: document.getElementById('skillsForm'),
    
    // Preview Elements
    resumeName: document.getElementById('resumeName'),
    resumeTitle: document.getElementById('resumeTitle'),
    resumeEmail: document.getElementById('resumeEmail'),
    resumePhone: document.getElementById('resumePhone'),
    resumeLinkedIn: document.getElementById('resumeLinkedIn'),
    resumeSummary: document.getElementById('resumeSummary'),
    workExperience: document.getElementById('workExperience'),
    educationHistory: document.getElementById('educationHistory'),
    skillsList: document.getElementById('skillsList'),
    
    // Buttons
    printBtn: document.getElementById('printBtn'),
    downloadPdfBtn: document.getElementById('downloadPdfBtn'),
    addWorkBtn: document.getElementById('addWork'),
    addEducationBtn: document.getElementById('addEducation'),
    addSkillBtn: document.getElementById('addSkill')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation item
    setActiveNav();
    
    // Load saved data if available
    loadSavedData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render preview if on preview page
    if (window.location.pathname.includes('preview.html')) {
        renderResumePreview();
    }
});

// Set active navigation based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Load saved data from localStorage
function loadSavedData() {
    // Personal Information
    const personalData = JSON.parse(localStorage.getItem('personal')) || {};
    if (personalData.fullName) {
        document.getElementById('fullName')?.value = personalData.fullName;
        document.getElementById('email')?.value = personalData.email;
        document.getElementById('phone')?.value = personalData.phone;
        document.getElementById('linkedin')?.value = personalData.linkedin;
        document.getElementById('github')?.value = personalData.github;
        document.getElementById('summary')?.value = personalData.summary;
    }
    
    // Work Experience
    const workData = JSON.parse(localStorage.getItem('work')) || [];
    if (workData.length > 0 && document.getElementById('workEntries')) {
        // Clear existing entries except template
        const container = document.getElementById('workEntries');
        const template = container.firstElementChild;
        container.innerHTML = '';
        container.appendChild(template);
        
        // Add saved work entries
        workData.forEach((job, index) => {
            if (index === 0) {
                // Fill template with first job
                document.getElementById('jobTitle').value = job.jobTitle;
                document.getElementById('company').value = job.company;
                document.getElementById('startDate').value = job.startDate;
                document.getElementById('endDate').value = job.endDate;
                document.getElementById('currentJob').checked = job.currentJob;
                document.getElementById('jobDescription').value = job.description;
            } else {
                // Clone template for additional jobs
                addWorkEntry(job);
            }
        });
    }
    
    // Education
    const educationData = JSON.parse(localStorage.getItem('education')) || [];
    if (educationData.length > 0 && document.getElementById('educationEntries')) {
        // Clear existing entries except template
        const container = document.getElementById('educationEntries');
        const template = container.firstElementChild;
        container.innerHTML = '';
        container.appendChild(template);
        
        // Add saved education entries
        educationData.forEach((edu, index) => {
            if (index === 0) {
                // Fill template with first education
                document.getElementById('institution').value = edu.institution;
                document.getElementById('degree').value = edu.degree;
                document.getElementById('field').value = edu.field;
                document.getElementById('gpa').value = edu.gpa;
                document.getElementById('startDate').value = edu.startDate;
                document.getElementById('endDate').value = edu.endDate;
                document.getElementById('achievements').value = edu.achievements;
            } else {
                // Clone template for additional education
                addEducationEntry(edu);
            }
        });
    }
    
    // Skills
    const skillsData = JSON.parse(localStorage.getItem('skills')) || [];
    if (skillsData.length > 0 && document.getElementById('skillsContainer')) {
        const container = document.getElementById('skillsContainer');
        container.innerHTML = '';
        
        skillsData.forEach(skill => {
            addSkillTag(skill);
        });
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Form Submissions
    if (elements.personalForm) {
        elements.personalForm.addEventListener('submit', savePersonalData);
    }
    
    if (elements.workForm) {
        elements.workForm.addEventListener('submit', saveWorkData);
    }
    
    if (elements.educationForm) {
        elements.educationForm.addEventListener('submit', saveEducationData);
    }
    
    if (elements.skillsForm) {
        elements.skillsForm.addEventListener('submit', saveSkillsData);
    }
    
    // Add Entry Buttons
    if (elements.addWorkBtn) {
        elements.addWorkBtn.addEventListener('click', () => addWorkEntry());
    }
    
    if (elements.addEducationBtn) {
        elements.addEducationBtn.addEventListener('click', () => addEducationEntry());
    }
    
    if (elements.addSkillBtn) {
        elements.addSkillBtn.addEventListener('click', addSkillFromInput);
    }
    
    // Skill Input Field
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillFromInput();
            }
        });
    }
    
    // Preview Page Actions
    if (elements.printBtn) {
        elements.printBtn.addEventListener('click', printResume);
    }
    
    if (elements.downloadPdfBtn) {
        elements.downloadPdfBtn.addEventListener('click', downloadPdf);
    }
    
    // Remove Entry Buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.remove-entry')) {
            e.target.closest('.work-entry, .education-entry').remove();
        }
        
        if (e.target.closest('.skill-tag .fa-times')) {
            e.target.closest('.skill-tag').remove();
        }
    });
}

// Save personal data to localStorage
function savePersonalData(e) {
    e.preventDefault();
    
    const personalData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        summary: document.getElementById('summary').value
    };
    
    localStorage.setItem('personal', JSON.stringify(personalData));
    window.location.href = 'work.html';
}

// Save work experience data
function saveWorkData(e) {
    e.preventDefault();
    
    const workEntries = [];
    document.querySelectorAll('.work-entry').forEach(entry => {
        workEntries.push({
            jobTitle: entry.querySelector('#jobTitle').value,
            company: entry.querySelector('#company').value,
            startDate: entry.querySelector('#startDate').value,
            endDate: entry.querySelector('#endDate').value,
            currentJob: entry.querySelector('#currentJob').checked,
            description: entry.querySelector('#jobDescription').value
        });
    });
    
    localStorage.setItem('work', JSON.stringify(workEntries));
    window.location.href = 'education.html';
}

// Save education data
function saveEducationData(e) {
    e.preventDefault();
    
    const educationEntries = [];
    document.querySelectorAll('.education-entry').forEach(entry => {
        educationEntries.push({
            institution: entry.querySelector('#institution').value,
            degree: entry.querySelector('#degree').value,
            field: entry.querySelector('#field').value,
            gpa: entry.querySelector('#gpa').value,
            startDate: entry.querySelector('#startDate').value,
            endDate: entry.querySelector('#endDate').value,
            achievements: entry.querySelector('#achievements').value
        });
    });
    
    localStorage.setItem('education', JSON.stringify(educationEntries));
    window.location.href = 'skills.html';
}

// Save skills data
function saveSkillsData(e) {
    e.preventDefault();
    
    const skills = [];
    document.querySelectorAll('.skill-tag span').forEach(tag => {
        skills.push(tag.textContent.trim());
    });
    
    localStorage.setItem('skills', JSON.stringify(skills));
    window.location.href = 'preview.html';
}

// Add new work experience entry
function addWorkEntry(data = {}) {
    const container = document.getElementById('workEntries');
    const template = container.firstElementChild.cloneNode(true);
    
    // Clear values
    template.querySelectorAll('input, textarea').forEach(field => {
        field.value = '';
    });
    template.querySelector('#currentJob').checked = false;
    
    // Fill with data if provided
    if (data.jobTitle) {
        template.querySelector('#jobTitle').value = data.jobTitle;
        template.querySelector('#company').value = data.company;
        template.querySelector('#startDate').value = data.startDate;
        template.querySelector('#endDate').value = data.endDate;
        template.querySelector('#currentJob').checked = data.currentJob;
        template.querySelector('#jobDescription').value = data.description;
    }
    
    container.appendChild(template);
}

// Add new education entry
function addEducationEntry(data = {}) {
    const container = document.getElementById('educationEntries');
    const template = container.firstElementChild.cloneNode(true);
    
    // Clear values
    template.querySelectorAll('input, textarea').forEach(field => {
        field.value = '';
    });
    
    // Fill with data if provided
    if (data.institution) {
        template.querySelector('#institution').value = data.institution;
        template.querySelector('#degree').value = data.degree;
        template.querySelector('#field').value = data.field;
        template.querySelector('#gpa').value = data.gpa;
        template.querySelector('#startDate').value = data.startDate;
        template.querySelector('#endDate').value = data.endDate;
        template.querySelector('#achievements').value = data.achievements;
    }
    
    container.appendChild(template);
}

// Add skill from input field
function addSkillFromInput() {
    const input = document.getElementById('skillInput');
    if (input.value.trim()) {
        addSkillTag(input.value.trim());
        input.value = '';
    }
}

// Add skill tag
function addSkillTag(skill) {
    const container = document.getElementById('skillsContainer');
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `
        <span>${skill}</span>
        <button type="button" class="ml-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(tag);
}

// Print resume
function printResume() {
    window.print();
}

// Download resume as PDF
function downloadPdf() {
    if (!window.jspdf || !window.html2canvas) {
        console.error('PDF generation libraries not loaded');
        alert('PDF generation requires jsPDF and html2canvas libraries');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        
        html2canvas(document.getElementById('resumeTemplate')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = doc.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            doc.save('resume.pdf');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            alert('Error generating PDF. Please try again.');
        });
    } catch (err) {
        console.error('PDF generation error:', err);
        alert('Error generating PDF. Please try again.');
    }
}

// Render resume preview with saved data
function renderResumePreview() {
    if (!elements.resumeName) return;
    
    // Personal Information
    const personalData = JSON.parse(localStorage.getItem('personal')) || {};
    if (personalData.fullName) {
        if (elements.resumeName) elements.resumeName.textContent = personalData.fullName;
        elements.resumeEmail.innerHTML = personalData.email ? 
            `<i class="fas fa-envelope mr-2 text-indigo-600"></i> ${personalData.email}` : '';
        elements.resumePhone.innerHTML = personalData.phone ? 
            `<i class="fas fa-phone mr-2 text-indigo-600"></i> ${personalData.phone}` : '';
        elements.resumeLinkedIn.innerHTML = personalData.linkedin ? 
            `<i class="fab fa-linkedin mr-2 text-indigo-600"></i> ${personalData.linkedin}` : '';
        elements.resumeSummary.textContent = personalData.summary || '';
    }

    // Work Experience
    const workData = JSON.parse(localStorage.getItem('work')) || [];
    elements.workExperience.innerHTML = workData.map(job => `
        <div class="work-entry mb-6">
            <div class="flex justify-between items-start">
                <h3 class="text-xl font-semibold text-gray-800">${job.jobTitle}</h3>
                <p class="text-gray-500">${formatDate(job.startDate)} - ${job.currentJob ? 'Present' : formatDate(job.endDate)}</p>
            </div>
            <p class="text-gray-600 font-medium">${job.company}</p>
            <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1">
                ${job.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    // Education
    const educationData = JSON.parse(localStorage.getItem('education')) || [];
    elements.educationHistory.innerHTML = educationData.map(edu => `
        <div class="education-entry mb-6">
            <div class="flex justify-between items-start">
                <h3 class="text-xl font-semibold text-gray-800">${edu.degree}</h3>
                <p class="text-gray-500">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
            </div>
            <p class="text-gray-600 font-medium">${edu.institution}</p>
            ${edu.field ? `<p class="text-gray-600">${edu.field}</p>` : ''}
            ${edu.gpa ? `<p class="text-gray-500">GPA: ${edu.gpa}</p>` : ''}
            ${edu.achievements ? `
                <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    ${edu.achievements.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');

    // Skills
    const skillsData = JSON.parse(localStorage.getItem('skills')) || [];
    elements.skillsList.innerHTML = skillsData.map(skill => `
        <span class="skill-tag">${skill}</span>
    `).join('');
}

// Format date from YYYY-MM to Month YYYY
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}