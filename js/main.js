// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PROGRAMMES DATA =====
const programmesData = [
    {
        id: 1,
        category: "foundation",
        number: "01",
        title: "Emerging Leaders Programme",
        subtitle: "0–5 Years Experience",
        description: "Build strong professional foundations and accelerate career readiness for early-career professionals.",
        features: [
            "Self-leadership, discipline and workplace confidence",
            "Communication skills (emails, meetings and presentations)",
            "Emotional intelligence and professionalism",
            "Personal branding and career planning",
            "Ethics, integrity and workplace conduct"
        ],
        audience: "Graduate trainees, associates, interns and newly qualified professionals."
    },
    {
        id: 2,
        category: "management",
        number: "02",
        title: "First-Time Managers Programme",
        subtitle: "Transitioning to Leadership",
        description: "Equip new supervisors and team leaders with essential people management and performance skills.",
        features: [
            "Transitioning from peer to manager",
            "Delegation, accountability and team discipline",
            "Performance management and feedback conversations",
            "Conflict resolution and difficult conversations",
            "Coaching and motivation for team performance"
        ],
        audience: "Supervisors, team leaders and first-time managers."
    },
    {
        id: 3,
        category: "management",
        number: "03",
        title: "Management & Strategy Execution",
        subtitle: "Middle Management Excellence",
        description: "Strengthen leadership capability for managers responsible for departmental results and cross-functional delivery.",
        features: [
            "Strategy execution, KPIs and operational excellence",
            "Budgeting, resource planning and cost control",
            "Stakeholder management and influence",
            "Risk awareness and decision-making",
            "Change leadership and managing uncertainty"
        ],
        audience: "Department heads, middle managers and project leaders."
    },
    {
        id: 4,
        category: "executive",
        number: "04",
        title: "Executive Leadership Programme",
        subtitle: "Senior Leadership / C-Suite",
        description: "Support senior leaders to drive enterprise performance while strengthening governance, culture and accountability.",
        features: [
            "Executive decision-making and leadership maturity",
            "Corporate governance for executives",
            "Strategic risk, compliance and reputational management",
            "Crisis leadership and organisational resilience",
            "Culture, ethics and tone at the top"
        ],
        audience: "Senior executives, executive management teams and business unit leaders."
    },
    {
        id: 5,
        category: "executive",
        number: "05",
        title: "Board Excellence Programme",
        subtitle: "Directors & Non-Executive Directors",
        description: "Build high-performing boards with directors who understand their responsibilities and provide effective oversight.",
        features: [
            "Roles, duties and fiduciary responsibilities of directors",
            "Board oversight vs management responsibilities",
            "Reading board packs and asking the right questions",
            "Risk governance, audit and internal controls",
            "Strategy oversight and performance monitoring"
        ],
        audience: "Board members, NEDs, committee members and aspiring directors."
    },
    {
        id: 6,
        category: "executive",
        number: "06",
        title: "Specialist Governance Masterclasses",
        subtitle: "Targeted Sessions",
        description: "Targeted sessions that strengthen governance capability in specific environments and industries.",
        features: [
            "Governance for Cooperatives, Associations and Member Bodies",
            "Governance for NGOs and Donor-Funded Projects",
            "Financial Oversight for Board Members",
            "Risk & Compliance for Non-Risk Professionals",
            "Women in Leadership & Governance Masterclass"
        ],
        audience: "Boards, leadership teams and specialised governance committees."
    }
];

// ===== RENDER PROGRAMMES =====
const programmeGrid = document.getElementById('programmeGrid');

function renderProgrammes(filter = 'all') {
    programmeGrid.innerHTML = '';
    
    const filteredProgrammes = filter === 'all' 
        ? programmesData 
        : programmesData.filter(p => p.category === filter);
    
    filteredProgrammes.forEach(programme => {
        const programmeCard = document.createElement('div');
        programmeCard.className = 'programme-card';
        programmeCard.setAttribute('data-category', programme.category);
        
        programmeCard.innerHTML = `
            <div class="programme-header">
                <div class="programme-number">${programme.number}</div>
                <h3>${programme.title}</h3>
                <p style="color: var(--secondary); font-weight: 500;">${programme.subtitle}</p>
            </div>
            <div class="programme-body">
                <p>${programme.description}</p>
                
                <ul class="programme-features">
                    ${programme.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                
                <div class="programme-audience">
                    <strong>Ideal for:</strong> ${programme.audience}
                </div>
                
                <a href="#contact" class="btn btn-primary" style="margin-top: 24px; width: 100%;">
                    <i class="fas fa-info-circle"></i>
                    Inquire About This Programme
                </a>
            </div>
        `;
        
        programmeGrid.appendChild(programmeCard);
    });
}

// ===== PROGRAMME FILTERING =====
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        renderProgrammes(filter);
    });
});

// ===== FORM VALIDATION =====
function validateForm() {
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    // Validate name
    const name = document.getElementById('contactName').value.trim();
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('contactEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate interest
    const interest = document.getElementById('contactInterest').value;
    if (!interest) {
        showError('interest', 'Please select an area of interest');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('contactMessage').value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(field, message) {
    const errorElement = document.querySelector(`.form-error[data-field="${field}"]`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showFormMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
    formMessage.style.color = type === 'success' ? '#155724' : '#721c24';
    formMessage.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== FORM SUBMISSION WITH EMAILJS =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log("📨 Form submission started...");
    
    // Validate form
    if (!validateForm()) {
        console.log("❌ Form validation failed");
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Prepare email parameters
        const templateParams = {
            from_name: document.getElementById('contactName').value.trim(),
            from_email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('contactPhone').value.trim() || 'Not provided',
            organization: document.getElementById('contactOrganization').value.trim() || 'Not provided',
            interest: document.getElementById('contactInterest').value,
            message: document.getElementById('contactMessage').value.trim(),
            timestamp: new Date().toLocaleString()
        };
        
        console.log("📧 Sending email with params:", templateParams);
        
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_j0dk718',
            'template_xcasnru',
            templateParams
        );
        
        console.log('✅ Email sent successfully!', response);
        
        // Show success message
        showFormMessage('✅ Message sent successfully! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('❌ Failed to send email:', error);
        
        // Show error message
        showFormMessage('❌ Failed to send message. Please try again or email us directly at info@alphaacuity.com', 'error');
        
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        console.log("📬 Form submission completed");
    }
});

// ===== INITIAL RENDER =====
document.addEventListener('DOMContentLoaded', () => {
    renderProgrammes();
    
    // Quick EmailJS test
    console.log("🔍 Testing EmailJS...");
    console.log("EmailJS loaded:", typeof emailjs !== 'undefined');
    if (typeof emailjs !== 'undefined') {
        console.log("EmailJS User ID:", emailjs.UserID);
        console.log("✅ EmailJS is ready!");
    } else {
        console.error("❌ EmailJS not loaded");
    }
});