const loadCatagory = async () => {
    try {
        const req = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const res = await req.json();
        return res;
    }
    catch {
        console.log(error)
    }
}
const showAllCatagory = async () => {
    const data = await loadCatagory();
    const allData = data.data.news_category;
    // console.log(allData.length);
    const ul = document.getElementById('catagory-ul');
    allData.forEach(singleData => {
        // console.log(singleData.category_name)
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.classList.add('mx-3')
        li.innerHTML = `
        <a onclick="loadDetailId('${singleData.category_id}')" class="nav-link" href="#">${singleData.category_name}</a>
        `;
        ul.appendChild(li);
    })
}
showAllCatagory();
const loadDetailId = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayMenu(data.data));
}
const displayMenu = (menu) => {
    toggleSpinner(true)
    const len = menu.length;
    const lenSetup = document.getElementById("array-lentgh")
    lenSetup.innerText = len;
    const mainDiv = document.getElementById('adding-news')
    mainDiv.textContent = '';
    menu.forEach(singleMenu => {
        // toggleSpinner(true)
        // console.log(singleMenu.category_name)
        // console.log(singleMenu.lentgh)
        const div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML = `
        <div class="col-md-4 p-3">
                            <img src="${singleMenu.thumbnail_url}"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${singleMenu.title}</h5>
                                <p class="card-text">${singleMenu.details.slice(0, 350,).concat('.....')}</p>
                                <div class=" d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <img src="${singleMenu.author.img}"
                                            class="custom-width-10 img-fluid rounded-circle">
                                        <div>
                                            <h5>${singleMenu.author.name !== null ? singleMenu.author.name : "No Data Found"}</h5>
                                            <h6>${singleMenu.author.published_date !== null ? singleMenu.author.published_date : "No Data"}</h6>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-eye"></i>
                                        <h4 class="px-2">${singleMenu.total_view !== null ? singleMenu.total_view : "No Data Founed"}</h4>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-star text-warning"></i>
                                        <i class="fa-solid fa-star text-warning"></i>
                                        <i class="fa-solid fa-star text-warning"></i>
                                        <i class="fa-solid fa-star text-warning"></i>
                                        <i class="fa-regular fa-star text-warning"></i>
                                    </div>
                                    <div><a onclick="loadDetails('${singleMenu._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"><i class="fa-solid fa-arrow-right"></i></a></div>
                                </div>
                            </div>
                        </div>

        `;
        mainDiv.appendChild(div);
    })
    toggleSpinner(false)
}
const loadDetails = async identy => {
    const url = `https://openapi.programming-hero.com/api/news/${identy}`
    const req = await fetch(url);
    const res = await req.json();
    displayDetals(res.data[0])
}
const displayDetals = detail => {
    console.log(detail)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = detail.title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div>
    <div>
        <img src="${detail.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${detail.details}</p>
        </div>

    </div>
    <div class=" my-3 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <img src="${detail.author.img}"
                class="custom-width-10 img-fluid rounded-circle">
            <div>
                <h5>${detail.author.name !== null ? detail.author.name : "No Data Found"}</h5>
        <h6> ${detail.author.published_date !== null ? detail.author.published_date : "No Data"}</h6>
            </div >
        </div >
        <div class="d-flex align-items-center">
            <i class="fa-solid fa-eye"></i>
            <h4 class="px-2">${detail.total_view !== null ? detail.total_view : "No Data Founed"}</h4>
        </div>
        <div class="d-flex align-items-center">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
    </div >
</div > `
}
// Spinner Adding
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
    // console.log(loaderSection)
}