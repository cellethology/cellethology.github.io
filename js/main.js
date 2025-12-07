const imageMeta = {
    "/asset/tissue_resized.webp": { width: 500, height: 500 },
    "/asset/cajal_neuron_resized.webp": { width: 500, height: 375 },
    "/asset/cube.webp": { width: 263, height: 263 },
    "/asset/pub/CIFM.webp": { width: 215, height: 220 },
    "/asset/pub/counterfactual.webp": { width: 220, height: 220 },
    "/asset/pub/receptor.webp": { width: 220, height: 220 },
    "/asset/pub/pre_2021.webp": { width: 220, height: 220 },
    "/asset/pub/spatial_computation.webp": { width: 220, height: 220 },
    "/asset/pub/tokenization.webp": { width: 220, height: 220 },
    "/asset/pub/nullsettes.webp": { width: 220, height: 220 },
    "/asset/pub/vitally.webp": { width: 220, height: 220 },
    "/asset/pub/mcvae.webp": { width: 220, height: 220 },
    "/asset/pub/pmlr.webp": { width: 220, height: 220 },
    "/asset/team/jerry_wang.webp": { width: 571, height: 600 },
    "/asset/team/jiahao_zhang.webp": { width: 511, height: 600 },
    "/asset/team/lanning_liu.webp": { width: 583, height: 600 },
    "/asset/team/shiyu_jiang.webp": { width: 465, height: 600 },
    "/asset/team/xuyin_liu.webp": { width: 400, height: 600 },
    "/asset/team/zelun_li.webp": { width: 450, height: 600 }
};

function buildImageAttributes(src, alt = "", options = {}) {
    const meta = imageMeta[src] || {};
    const attrs = [`src="${src}"`, `alt="${alt.replace(/"/g, '&quot;')}"`];
    if (meta.width && meta.height) {
        attrs.push(`width="${meta.width}"`, `height="${meta.height}"`);
    }
    const loading = options.loading ?? "lazy";
    if (loading) {
        attrs.push(`loading="${loading}"`);
    }
    if (options.decoding !== "auto") {
        attrs.push(`decoding="async"`);
    }
    if (options.fetchpriority) {
        attrs.push(`fetchpriority="${options.fetchpriority}"`);
    }
    return attrs.join(" ");
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Update header content
    const labNameElement = document.getElementById('lab-name');
    const labTaglineElement = document.getElementById('lab-tagline');
    
    if (labNameElement) {
        labNameElement.textContent = siteContent.labName;
    }
    
    if (labTaglineElement) {
        labTaglineElement.textContent = siteContent.tagline;
    }
    
    // Update mission statement
    const missionElement = document.getElementById('mission-statement');
    if (missionElement) {
        missionElement.textContent = siteContent.mission;
    }
    
    // Load research areas
    const researchAreasContainer = document.getElementById('research-areas');
    if (researchAreasContainer) {
        researchAreasContainer.innerHTML = ''; // Clear existing content
        siteContent.researchAreas.forEach(area => {
            const areaElement = document.createElement('div');
            areaElement.className = 'research-card';
            const areaImageAttrs = buildImageAttributes(area.image, area.title);
            areaElement.innerHTML = `
                <img ${areaImageAttrs}>
                <h3>${area.title}</h3>
                <p>${area.description}</p>
            `;
            researchAreasContainer.appendChild(areaElement);
        });
    }
    
    // Load publications
    loadPublications();
    
    // Load team members
    loadTeamMembers();
    
    // Update footer
    const footerLabName = document.getElementById('footer-lab-name');
    const footerDepartment = document.getElementById('footer-department');
    
    if (footerLabName) {
        footerLabName.textContent = siteContent.footer.labName;
    }
    
    if (footerDepartment) {
        footerDepartment.textContent = siteContent.footer.department;
    }
});

function loadPublications() {
    const publicationsList = document.getElementById('publications-list');
    if (publicationsList) {
        publicationsList.innerHTML = '';
        
        const isAllPublications = document.body.classList.contains('publications-page');
        const publications = isAllPublications ? siteContent.allPublications : siteContent.selectedPublications;

        publications.forEach(pub => {
            const pubElement = document.createElement('a');
            pubElement.className = 'publication-item';
            pubElement.href = pub.url;
            pubElement.target = "_blank";
            
            const pubImageAttrs = buildImageAttributes(pub.image, pub.title);
            let innerContent = `
                <img ${pubImageAttrs}>
                <div class="publication-text">
                    <h3>${pub.title}</h3>`;

            if (isAllPublications) {
                innerContent += `
                    <p class="authors">${pub.authors}</p>
                    <p class="journal">${pub.journal}`;
                if (pub.pdf) {
                    innerContent += ` <a href="${pub.pdf}" target="_blank" class="pdf-link">(PDF)</a>`;
                }
                innerContent += `</p>`;
            } else {
                innerContent += `
                    <p class="description">${pub.description}</p>
                `;
            }

            innerContent += `</div>`;
            pubElement.innerHTML = innerContent;
            publicationsList.appendChild(pubElement);
        });
    }
}

function loadTeamMembers() {
    const teamMembersContainer = document.getElementById('team-members');
    if (teamMembersContainer) {
        teamMembersContainer.innerHTML = ''; // Clear existing content
        siteContent.teamMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            const memberImageAttrs = buildImageAttributes(member.image, member.name);
            memberElement.innerHTML = `
                <img ${memberImageAttrs}>
                <h3>${member.name}</h3>
                <p>${member.title}</p>
            `;
            teamMembersContainer.appendChild(memberElement);
        });
    }
}

// Add scroll handler for nav bar transparency
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function getNavHeight() {
      const nav = document.querySelector('nav');
      return nav ? nav.offsetHeight : 0;
    }
  
    function smoothScroll(target, duration) {
      var targetElement = document.querySelector(target);
      var navHeight = getNavHeight();
      var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var startTime = null;
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
  
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }

    // Function to check if we need to scroll to a section
    function checkForHashAndScroll() {
        if (window.location.hash) {
            const target = window.location.hash;
            const targetElement = document.querySelector(target);
            if (targetElement) {
                setTimeout(() => {
                    smoothScroll(target, 1000);
                }, 100); // Small delay to ensure page is loaded
            }
        }
    }

    // Add click event listeners to all links with hash
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Check for hash in URL when page loads
    checkForHashAndScroll();

    // Listen for hash changes (in case of back/forward navigation)
    window.addEventListener('hashchange', checkForHashAndScroll);
  
    // Add click event listeners to the navigation links
    var links = document.querySelectorAll('nav a[href^="#"]');
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('href');
        smoothScroll(target, 1000); // 1000ms for the scroll duration
      });
    });
  });
