const navbar = document.querySelector(".navbar");
const navbarTemplate = document.querySelector("#navbar-template").content;
const productTemplate = document.querySelector("#product-template").content;
const backetTemplate = document.querySelector("#backet-template").content;

const productList = document.querySelector(".main__content__flex");
const search = document.querySelector(".header__search");
const next = document.querySelector(".page__next");
let page = 0;

let BacketArr = JSON.parse(localStorage.getItem("product")) || [];

function createProduct(product) {
  let elProduct = productTemplate.cloneNode(true);
  elProduct.querySelector(".product__img").src = product?.images[0];
  elProduct.querySelector(".product__title").textContent = product?.title;
  elProduct.querySelector(".product__text").textContent = product?.price + "$";
  elProduct.querySelector(".product__btn").dataset.id = product.id;
  productList.appendChild(elProduct);
}

function createMovie(category) {
  let elcategory = navbarTemplate.cloneNode(true);
  elcategory.querySelector(".navbar__text").textContent = category;
  navbar.appendChild(elcategory);
}

fetch(`https://dummyjson.com/products?limit=10&skip=${page}`)
  .then((res) => res.json())
  .then((data) => {
    data?.products?.forEach((element) => {
      createProduct(element);
    });
  });

fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      createMovie(element);
    });
  });

navbar.addEventListener("click", function (evt) {
  evt.preventDefault();
  productList.innerHTML = "";
  fetch(`https://dummyjson.com/products/category/${evt.target.textContent}`)
    .then((res) => res.json())
    .then((data) => {
      data?.products?.forEach((element) => {
        createProduct(element);
      });
    });
});

next.addEventListener("click", function () {
  page += 1;

  fetch(`https://dummyjson.com/products?limit=20&skip=${page}`)
    .then((res) => res.json())
    .then((data) => {
      data?.products?.forEach((element) => {
        createProduct(element);
      });
    });
});

search.addEventListener("input", (event) => {
  productList.innerHTML = "";
  fetch(`https://dummyjson.com/products/search?q=${event.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      data?.products?.forEach((element) => {
        createProduct(element);
      });
    });
});

productList.addEventListener("click", (event) => {
  if (event.target.matches(".product__btn")) {
    madalProduct.classList.add("modal__open");

    fetch(`https://dummyjson.com/products/${event.target.dataset.id}`)
      .then((res) => res.json())
      .then((data) => {
        madalProduct.querySelector(".madalProduct__title").textContent =
          data.title;
        madalProduct.querySelector(".madalProduct__price").textContent =
          data.price + "$";
        madalProduct.querySelector(".madalProduct__dicr").textContent =
          data.description;
        madalProduct.querySelector(".madalProduct__brent").textContent =
          data.brand;
        madalProduct.querySelector(".madalProduct__category").textContent =
          data.category;
        madalProduct.querySelector(".madalProduct__img1").src = data.images[0];
        madalProduct.querySelector(".madalProduct__img2").src =
          data.images[1] || data.images[0];
        madalProduct.querySelector(".madalProduct__img3").src =
          data.images[2] || data.images[0];
        madalProduct.querySelector(".madalProduct__btn2").dataset.id = data.id;
      });
  }
  madalProduct.addEventListener("click", function (evt) {
    if (evt.target === madalProduct) {
      madalProduct.classList.remove("modal__open");
    }
  });
  madalProductClose.addEventListener("click", function () {
    madalProduct.classList.remove("modal__open");
  });
  madalProductClose2.addEventListener("click", function () {
    madalProduct.classList.remove("modal__open");
  });
  document.addEventListener("keyup", function (evt) {
    if (evt.keyCode === 27) {
      madalProduct.classList.remove("modal__open");
    }
  });
});

backendBtn.addEventListener("click", (event) => {
  madalList.innerHTML = "";
  madal.classList.add("modal__open");
  madal.addEventListener("click", function (evt) {
    if (evt.target === madal) {
      madal.classList.remove("modal__open");
    }
  });

  document.addEventListener("keyup", function (evt) {
    if (evt.keyCode === 27) {
      madal.classList.remove("modal__open");
    }
  });

  let newArr = [];
  BacketArr.forEach((e) => {
    if (!newArr.includes(e?.id)) {
      newArr.push(e?.id);
      let elbrProduct = backetTemplate.cloneNode(true);
      elbrProduct.querySelector(".backet__img").src = e?.images[0];
      elbrProduct.querySelector(".backet__title").textContent = e?.title;
      elbrProduct.querySelector(".backet__text").textContent = e?.price + "$";
      elbrProduct.querySelector(".backet__remove").dataset.id = e.id;

      madalList.appendChild(elbrProduct);
    }
  });
});

addBacked.addEventListener("click", function (evt) {
  fetch(`https://dummyjson.com/products/${evt.target.dataset.id}`)
    .then((res) => res.json())
    .then((data) => {
      BacketArr.push(data);
      localStorage.setItem("product", JSON.stringify(BacketArr));
      alert("add");
    });

  madal.classList.remove("modal__open");
});

madalRemoveAll.addEventListener("click", function () {
  localStorage.clear();
  madalList.innerHTML = "";
});

madalList.addEventListener("click", function (evt) {
  if (evt.target.matches(".backet__remove")) {
    madalList.innerHTML = "";
    const index = BacketArr.findIndex((e) => e?.id == evt.target.dataset.id);
    BacketArr.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(BacketArr));
    let newArr1 = [];
    BacketArr.forEach((e) => {
      if (!newArr1.includes(e?.id)) {
        newArr1.push(e?.id);
        let elbrProduct = backetTemplate.cloneNode(true);
        elbrProduct.querySelector(".backet__img").src = e?.images[0];
        elbrProduct.querySelector(".backet__title").textContent = e?.title;
        elbrProduct.querySelector(".backet__text").textContent = e?.price + "$";
        elbrProduct.querySelector(".backet__remove").dataset.id = e.id;

        madalList.appendChild(elbrProduct);
      }
    });
  }
});
