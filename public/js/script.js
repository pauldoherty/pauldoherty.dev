    /* Toggle menu */
    const menuToggleBtn = document.querySelector('.icon-menu');
    const menuContainer = document.querySelector('.aside__main');

    menuToggleBtn.addEventListener('click', () => {
        menuContainer.classList.toggle('active');
    })

    /* Back to top */
    const scrollBtn = document.querySelector('.back-to-top');

    function scrollToTop() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    scrollBtn.addEventListener('click', () => {
        scrollToTop();
    })

    /* Toggle projects */

    const projectToggles = document.querySelectorAll('.project-show');

    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', (e)=>{
            e.preventDefault();
            let newText = (toggle.innerText === 'Show Projects')
                ? 'Hide Projects'
                : 'Show Projects'
            toggle.innerText = newText;
            let projectDetails = document.getElementById(toggle.dataset.projects);
            projectDetails.classList.toggle('d-none')
        })
    })
