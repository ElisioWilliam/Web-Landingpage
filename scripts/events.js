document.addEventListener('DOMContentLoaded', () => {
    const eventsPerPage = 8;
    let currentPage = 1;    
    let totalPages = 1;

    function createCard(event) {
        const atag = document.createElement('a');
        atag.style.textDecoration = 'none';
        atag.href = "register.html"

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'text-white', 'custom-bg', 'mb-3');
        cardDiv.style.width = '18rem';

        const cardImgDiv = document.createElement('div');
        cardImgDiv.classList.add('card-img-container');

        const img = document.createElement('img');
        img.src = event.url;
        img.classList.add('card-img-top');
        img.alt = event.title;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = event.title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = event.description;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardDiv.appendChild(cardImgDiv);
        cardImgDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        atag.appendChild(cardDiv);

        return atag;
    }

    async function loadEvents() {
        try {
            const response = await fetch('events.json');
            const events = await response.json();
            totalPages = Math.ceil(events.length / eventsPerPage);

            function displayEvents(page) {
                const eventCardsContainer = document.getElementById('eventCards');
                eventCardsContainer.innerHTML = '';

                const startIndex = (page - 1) * eventsPerPage;
                const endIndex = Math.min(startIndex + eventsPerPage, events.length);

                for (let i = startIndex; i < endIndex; i++) {
                    const card = createCard(events[i]);
                    eventCardsContainer.appendChild(card);
                }

                updatePagination(page);
            }

            function updatePagination(page) {
                const pagination = document.getElementById('pagination');
                pagination.innerHTML = '';

                const firstPageLi = document.createElement('li');
                firstPageLi.classList.add('page-item');
                if (page === 1) firstPageLi.classList.add('disabled');
                const firstPageBtn = document.createElement('button');
                firstPageBtn.classList.add('page-link');
                firstPageBtn.innerHTML = '&laquo;';
                firstPageBtn.addEventListener('click', () => displayEvents(1));
                firstPageLi.appendChild(firstPageBtn);
                pagination.appendChild(firstPageLi);

                const prevPageLi = document.createElement('li');
                prevPageLi.classList.add('page-item');
                if (page === 1) prevPageLi.classList.add('disabled');
                const prevPageBtn = document.createElement('button');
                prevPageBtn.classList.add('page-link');
                prevPageBtn.textContent = 'Anterior';
                prevPageBtn.addEventListener('click', () => displayEvents(page - 1));
                prevPageLi.appendChild(prevPageBtn);
                pagination.appendChild(prevPageLi);

                for (let i = 1; i <= totalPages; i++) {
                    const pageLi = document.createElement('li');
                    pageLi.classList.add('page-item');
                    if (i === page) pageLi.classList.add('active');
                    const pageBtn = document.createElement('button');
                    pageBtn.classList.add('page-link');
                    pageBtn.textContent = i;
                    pageBtn.addEventListener('click', () => displayEvents(i));
                    pageLi.appendChild(pageBtn);
                    pagination.appendChild(pageLi);
                }

                const nextPageLi = document.createElement('li');
                nextPageLi.classList.add('page-item');
                if (page === totalPages) nextPageLi.classList.add('disabled');
                const nextPageBtn = document.createElement('button');
                nextPageBtn.classList.add('page-link');
                nextPageBtn.textContent = 'Próxima';
                nextPageBtn.addEventListener('click', () => displayEvents(page + 1));
                nextPageLi.appendChild(nextPageBtn);
                pagination.appendChild(nextPageLi);

                const lastPageLi = document.createElement('li');
                lastPageLi.classList.add('page-item');
                if (page === totalPages) lastPageLi.classList.add('disabled');
                const lastPageBtn = document.createElement('button');
                lastPageBtn.classList.add('page-link');
                lastPageBtn.innerHTML = '&raquo;';
                lastPageBtn.addEventListener('click', () => displayEvents(totalPages));
                lastPageLi.appendChild(lastPageBtn);
                pagination.appendChild(lastPageLi);
            }

            displayEvents(currentPage);

        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        }
    }

    loadEvents();
});
