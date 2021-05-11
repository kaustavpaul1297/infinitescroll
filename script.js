const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash API

let count = 5;
const apiKey = "kfjyU4xVLlWn9F6mXW_5lOYLyeKCvWTmxQYGqiKwZew";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images is loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    count = 30;
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attribute to DOM elements //

function setAttributes(elements, attributes) {
  for (const key in attributes) {
    elements.setAttribute(key, attributes[key]);
  }
}

//Create elements for links and photos, Add to DOM

function diplayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photos array

  photosArray.forEach(photo => {
    // create <a> to link unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      alt: photo.alt_description,
    });

    //Event listener, check if each image is finished loading
    img.addEventListener("load", imageLoaded);
    //put <img> inside <a>, then put both inside image container element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    diplayPhotos();
  } catch (error) {
    //catch error here
  }
}

//check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

//onLoad

getPhotos();
