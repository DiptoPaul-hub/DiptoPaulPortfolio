// Check if user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

// Save All Changes and Redirect
document.getElementById('save-btn').addEventListener('click', () => {
    // Save About Text
    const aboutText = document.getElementById('about-text-input').value;
    localStorage.setItem('aboutText', aboutText);

    // Save Skills
    localStorage.setItem('skills', JSON.stringify(skills));

    // Save Portfolio Items
    localStorage.setItem('portfolioItems', JSON.stringify(portfolioItems));

    alert('All changes saved successfully!');
    window.location.href = 'index.html';
});

// Track skills and portfolio items in memory
let skills = JSON.parse(localStorage.getItem('skills') || '[]');
let portfolioItems = JSON.parse(localStorage.getItem('portfolioItems') || '[]');

// Load About Text
const aboutTextInput = document.getElementById('about-text-input');
const savedAboutText = localStorage.getItem('aboutText');
if (savedAboutText) {
    aboutTextInput.value = savedAboutText;
}

// Update About Text
function updateAboutText() {
    const text = document.getElementById('about-text-input').value;
    localStorage.setItem('aboutText', text);
    alert('About text updated!');
}

// Load Skills
function loadSkills() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    skills.forEach((skill, index) => {
        const li = document.createElement('li');
        li.textContent = skill;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteSkill(index);
        li.appendChild(deleteBtn);
        skillsList.appendChild(li);
    });
}

// Add Skill
function addSkill() {
    const newSkill = document.getElementById('new-skill').value;
    if (newSkill) {
        skills.push(newSkill);
        localStorage.setItem('skills', JSON.stringify(skills));
        document.getElementById('new-skill').value = '';
        loadSkills();
    }
}

// Delete Skill
function deleteSkill(index) {
    skills.splice(index, 1);
    localStorage.setItem('skills', JSON.stringify(skills));
    loadSkills();
}

// Load Portfolio Items
function loadPortfolioItems() {
    const portfolioList = document.getElementById('portfolio-list');
    portfolioList.innerHTML = '';
    portfolioItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <img src="${item.image}" alt="${item.title}" style="width: 100px;">
            </div>
        `;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deletePortfolioItem(index);
        div.appendChild(deleteBtn);
        portfolioList.appendChild(div);
    });
}

// Add Portfolio Item
function addPortfolioItem() {
    const title = document.getElementById('portfolio-title').value;
    const description = document.getElementById('portfolio-description').value;
    const image = document.getElementById('portfolio-image').value;
    if (title && description && image) {
        portfolioItems.push({ title, description, image });
        localStorage.setItem('portfolioItems', JSON.stringify(portfolioItems));
        document.getElementById('portfolio-title').value = '';
        document.getElementById('portfolio-description').value = '';
        document.getElementById('portfolio-image').value = '';
        loadPortfolioItems();
    }
}

// Delete Portfolio Item
function deletePortfolioItem(index) {
    portfolioItems.splice(index, 1);
    localStorage.setItem('portfolioItems', JSON.stringify(portfolioItems));
    loadPortfolioItems();
}

// Initial Load
loadSkills();
loadPortfolioItems();