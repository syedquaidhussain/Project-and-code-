let counterOfCart = 0;
let counterOfWishList = localStorage.length;
let cartStatus = false;
let wishlistStatus = false;


getAllItemFromCart();
getAllItemFromWishList();

function getAllItemFromCart() {

  const element = document.getElementById("cart"); // element is span
   element.innerHTML = sessionStorage.length?sessionStorage.length-1:0

}

function getAllItemFromWishList() {

  const element = document.getElementById("wish"); // element is span
   element.innerHTML = localStorage.length

}


function clearUI() {

  const parentDiv= document.getElementById("second")


      while (parentDiv.firstChild) {
          parentDiv.removeChild(parentDiv.firstChild);
      
  }
    

}



function toggleCart(id,product) {
  const element = document.getElementById("cart"); // element is span
  // console.log(id);
  

  const oldElement = document.querySelector(`#${id}.AddTC`)
  // console.log(oldElement);
  
  const newbuttonAdd = document.createElement("button");
  newbuttonAdd.classList.add("AddTC");
  newbuttonAdd.id=id;

// Find can be optimsed listener function alag bhi bana  sakte h
  newbuttonAdd.addEventListener("click",(event)=>{
      

    toggleCart(event.target.id,product);
    
  });


  if (oldElement.innerText === "Add To Cart") {
    console.log("inisdee");
    oldElement.replaceWith(newbuttonAdd);
    
    newbuttonAdd.textContent = "Remove From Cart"
    sessionStorage.setItem(`${product.id}`,`${product}`)
  
      
    // oldElement.remove();
      element.innerHTML = sessionStorage.length?sessionStorage.length-1:0
      cartStatus = true;
      
    
  }
    else{
      newbuttonAdd.textContent = "Add To Cart"
      oldElement.replaceWith(newbuttonAdd);
      sessionStorage.removeItem(`${product.id}`)
      element.innerHTML=  sessionStorage.length?sessionStorage.length-1:0
      

      cartStatus= false;///////////////////////////////////////not use 



  }

}


function toggleWishList(id,product) {
  
  // console.log(id);
  const element = document.getElementById("wish"); // element is span

  // same code as wishlist 

  const oldElement = document.querySelector(`#${id}.AddTW`);
  // console.log(oldElement);

  
  const newbuttonAdd = document.createElement("button");
  newbuttonAdd.classList.add("AddTW");
  // newbuttonAdd.setAttribute("data-type","wishlist")
  newbuttonAdd.id=`btn-${id}`;

// Find can be optimsed listener function alag bhi bana  sakte h
  newbuttonAdd.addEventListener("click",(event)=>{
      

    
    element.innerHTML = localStorage.length ? sessionStorage.length:0;
    
    toggleWishList(event.target.id,product);
    
  });
  
  
  if (oldElement.innerText.trim() === "Add To WishList") {
    console.log("inisdee");
    
    newbuttonAdd.textContent = "Remove From WishList"

    
    // localStorage.setItem(`${product.id}`,`${product}`)

    oldElement.replaceWith(newbuttonAdd);
    localStorage.setItem(`${product.id}`,`${product}`)
    element.innerHTML = localStorage.length;
    // oldElement.remove();
    
    cartStatus = true; /////////////////not in use 
    
    
  }
  else{
      // localStorage.removeItem(`${id}`)
      newbuttonAdd.textContent = "Add To WishList"

    oldElement.replaceWith(newbuttonAdd);
    localStorage.removeItem(`${product.id}`)
    element.innerHTML = localStorage.length;
    // e.textContent= "Add To Cart";
    cartStatus= false; //////////////////////not in use 

  }

}

// Find Can be optimsed 
function displayProductOnUi(product){

    const newDiv = document.createElement("div");

    // newDiv.id = `${product.id}`;  -----------------------div and button inside div has same id 

    newDiv.className = "image-class";
    
    const img = document.createElement("img");
    
    img.src= product.thumbnail
    img.width = 150; // Set width (optional)
    img.height = 150;

    
    const iconsDiv = document.createElement("div");
    iconsDiv.id = "nav-icons-container"

    const buttonAdd = document.createElement("button");

    const buttonAddToWish = document.createElement("button");

    buttonAdd.textContent="Add To Cart";
    buttonAdd.classList.add("AddTC");
    buttonAdd.id = `btn-${product.id}` ////////////////////////////////////
      
  

    // Add To Cart Functionality
    buttonAdd.addEventListener("click",(event)=>{
      
    

      toggleCart(event.target.id,product);
      
    });


    // Add To WishList
    buttonAddToWish.textContent="Add To WishList";
    buttonAddToWish.classList.add("AddTW");
    // buttonAddToWish.setAttribute("data-type","wishlist")


        buttonAddToWish.id=`btn-${product.id}`;  //card button and wish list button has same id 

      // console.log(buttonAddToWish);
    
    
    // Add To wishlist Functionality
    buttonAddToWish.addEventListener("click",(event)=>{
      
    
      toggleWishList(event.target.id,product)
      
 
    })



    
      iconsDiv.append(buttonAdd)

      iconsDiv.append(buttonAddToWish)

    newDiv.appendChild(img);

    
    newDiv.appendChild(iconsDiv);

    const e =  document.getElementById("second")
    e.append(newDiv)

}


// limit lagai h is function m 
async function getProducts(limit,skip) {

    
    const res = await fetch(`https://dummyjson.com/products?limit=${limit*10}&`);
    const  data =  await res.json()
     const products =  await data.products;
    //  console.log(products);

    //  products.map((product)=>{
        
    //  })
    products.map(displayProductOnUi)
     
     
}

// getProducts();
    



// Making category list
async function categoryList(){

   const res =  await fetch('https://dummyjson.com/products/category-list')

   const data = await res.json();
  //  console.log(data);
   

   data.map((item)=>{

       const options = document.createElement("option");
       
       options.value= item;
       options.textContent = `${item}`;

       const element =  document.getElementById("categories")
      element.append(options)

       
    })


}
  
categoryList();



   


async function getSelectedValue() {

    const element =  document.getElementById("categories")
    // console.log(element.value);

    const res = await fetch(`https://dummyjson.com/products/category/${element.value}`)
  const data = await res.json();
  const product = data.products
    // console.log(product);
  
    // clearing the previous products in ui 
    const parentDiv= document.getElementById("second")

     if(product){

         // Find Alternative 
         while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
     }

    product.map(displayProductOnUi)
      


}

// To change the color of selected button on pagination 
function highlightActive(button) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll('.page-rep');
  // console.log(buttons);
  
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  button.classList.add('active');
}






let currentStart = 1; // The first visible page number
const maxPages = 10; // Total number of pages
const visibleButtons = 2; // Number of buttons visible at a time

// Function to update pagination
async function updatePagination(direction,flag) {
  // Showing the offset that will get disappeared when infinite scrolling takes place 
    const offsetDiv = document.querySelector(".offset")


  // Update the current start page based on direction
  currentStart += direction;

  // Ensure valid ranges for page numbers
  if (currentStart < 1) {
    currentStart = 1;
  } else if (currentStart > maxPages) {
    currentStart = maxPages;
  }

  // Clear current pagination buttons
  const pageNumbersDiv = document.getElementById("pageNumbers");
  while (pageNumbersDiv.firstChild) {
    pageNumbersDiv.removeChild(pageNumbersDiv.firstChild);
  }

  // Create the page buttons dynamically
  for (let i = 0; i < visibleButtons; i++) {
    const pageNumber = currentStart + i;

    if (pageNumber <= maxPages) {
      const button = document.createElement("button");
      button.classList.add("page-btn");
      button.textContent = pageNumber;
      button.id = `${pageNumber}`; // Assign ID to the button
      button.setAttribute("onclick", `getProductByPagination(${pageNumber})`);
      pageNumbersDiv.appendChild(button);
    }
  }

  // Adding dots and the last page button
  if (currentStart + visibleButtons < maxPages) {
    const dots = document.createElement("span");
    dots.id = "dots";
    dots.textContent = "...";
    pageNumbersDiv.appendChild(dots);

    const lastPageButton = document.createElement("button");
    lastPageButton.classList.add("page-btn");
    lastPageButton.textContent = maxPages;
    lastPageButton.setAttribute("onclick", `getProductByPagination(${maxPages})`);
    pageNumbersDiv.appendChild(lastPageButton);
  }

  // Highlight the active page
  highlightActive(currentStart);

  // Trigger API call for the current page
  if(flag===1){

    await getProductByPagination(currentStart);
  }
  else{
    const newPara = document.createElement("p");
    newPara.textContent = `Showing 1 to ${currentStart*10} out of 100 results`;
  
    const offsetElement = document.querySelector(".offset");
  
    if (offsetElement.firstChild) {
      offsetElement.firstChild.remove();
    }
    offsetElement.insertAdjacentElement("afterbegin", newPara);
  
  }

  // Enable/Disable Prev and Next buttons
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (prevButton) {
    prevButton.disabled = currentStart === 1;
  }
  if (nextButton) {
    nextButton.disabled = currentStart === maxPages;
  }
}


















// Function to highlight the active button
function highlightActive(pageNumber) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll('.page-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  const activeButton = document.getElementById(pageNumber);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Function to fetch products based on the page number
async function getProductByPagination(pageNumber) {
  
  //  Showing the offset div 
  //  const offsetDiv = document.querySelector(".offset");
  //  offsetDiv.classList.remove("hidden")

    highlightActive(pageNumber);

  const skipValue = (pageNumber - 1) * 10; // Assuming 10 products per page
  const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipValue}`);
  const data = await res.json();
  const products = data.products;

  const parentDiv = document.getElementById("second");

  if (products) {
    // Clear previous products
    while (parentDiv.firstChild) {
      parentDiv.removeChild(parentDiv.firstChild);
    }

    // Display new products
    products.map(displayProductOnUi);
  }
  offset(skipValue);
}

// Function to update the offset display
function offset(skipValue) {
  const newPara = document.createElement("p");
  newPara.textContent = `Showing ${skipValue + 1} to ${skipValue + 10} out of 100 results`;

  const offsetElement = document.querySelector(".offset");

  if (offsetElement.firstChild) {
    offsetElement.firstChild.remove();
  }
  offsetElement.insertAdjacentElement("afterbegin", newPara);
}

// Load the first page on window load
window.onload = () => {
  getProductByPagination(1);
};




let debounceTimer;

function searchProduct(event) {
  const inputValue = event.target.value.trim();
// console.log(inputValue);

  // Clear the previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new timer
  debounceTimer = setTimeout(async () => {
    console.log("Searching for:", inputValue);

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${inputValue}`);
      const data = await res.json();
      const products = data.products;
      console.log("Fetched data:", data);

 
       if(products) {
        clearUI();
       products.map(displayProductOnUi);

       }
    } 
    catch (error) {
      console.error("Error fetching search results:", error);
    }
  },400); 
}



let pageCount=0;
let limit=0;

 function infiniteScrolling() {
     
  const element = document.getElementById("second");
 const e =  document.getElementById(pageCount) ;
 let flag =0;
 console.log("inside infinite",e);
 
 
 // Make sure the scroll event listener is inside the function and is properly added
 element.addEventListener("scroll", async() => {
  // to toggle the visibilty of offset
   const offsetDiv = document.querySelector('.offset')
   const { scrollTop, clientHeight, scrollHeight } = element;
    
  //  console.log("scrollTop", scrollTop);
  //  console.log("clientHeight", clientHeight);
  //  console.log("scrollHeight", scrollHeight);

   // Check if the scroll position is near the bottom to trigger loading new content
   if (scrollTop + clientHeight >= scrollHeight ) {
     console.log("Scrolled to bottom, loading more products...");
     if(pageCount<=10)
      { 
        // hiding the offset div 
      //  offsetDiv.classList.add('hidden')
     
       
        // offsetDiv.classList.add('hidden')

        pageCount++;
        limit++;
         getProducts(limit,pageCount);
          updatePagination(1,flag)
        //  await getProductByPagination(pageCount);
       
      }
    }
  });
}

infiniteScrolling();
