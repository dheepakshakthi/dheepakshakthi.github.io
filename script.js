document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.checked = false;
        }
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    // GitHub Projects
    const projectContainer = document.querySelector('.project-container');
    const username = 'dheepakshakthi';
    const featuredProjects = [
        'DevO',
        'Biopsy_and_Abnormality_reporting_system_in_Endoscopy',
        'ReWear',
        'SIH-FRA',
        '168',
        'Custom_LLM'
    ];

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            const filteredRepos = repos.filter(repo => featuredProjects.includes(repo.name));

            if (filteredRepos.length === 0) {
                projectContainer.innerHTML = '<p>No public projects found.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                projectCard.innerHTML = `
                    <h3>${repo.name.replace(/_/g, ' ').replace(/-/g, ' ')}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                projectContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            projectContainer.innerHTML = '<p>Could not load projects. Please try again later.</p>';
        });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
