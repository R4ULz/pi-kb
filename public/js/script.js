// Funcionamento Menu Mobile
const btnMenu = document.getElementById("cesta");
const menuMobile = document.getElementById("menu-mobile");

const handleOutsideClick = (event) => {
  const target = event.target;
  if (menuMobile.contains(target) || btnMenu.contains(target)) return;
  menuMobile.classList.remove("active-menu");
  menuMobile.classList.add("disable-menu");
  document.removeEventListener("click", handleOutsideClick);
};

btnMenu.addEventListener("click", () => {
  menuMobile.classList.toggle("disable-menu");
  menuMobile.classList.toggle("active-menu");
  
  (menuMobile.classList.contains('active-menu')) ? setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0) : document.removeEventListener("click", handleOutsideClick);
});

//Funcionamento Produtos
const lancheImg = document.querySelector('.lanche-item--img');
const lancheTitle = document.querySelector('.lanche-item--title');
const lancheDesc = document.querySelector('.lanche-item--desc');
const lanchePrice = document.querySelector('.lanche-item--price');

let data = [
  {id: 1, title: "Hamburguer 1", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80},
  {id: 2, title: "Hamburguer 2", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80},
  {id: 3, title: "Hamburguer 3", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80},
  {id: 4, title: "Hamburguer 4", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80},
  {id: 5, title: "Hamburguer 5", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80},
  {id: 6, title: "Hamburguer 6", body: "Testo bem legla aleatório e tudo mais", link: "/images/teste-card.jpg", price: 19.80}
];



