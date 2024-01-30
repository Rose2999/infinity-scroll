const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imagesLoaded=0;
let totalImages=0;


// Unsplash API
const count=30;
let photosArray=[];
const apiKey='gWamq0Zf3LuJ__b0pz-ZWBsX-FTsurwNQCkB6tM0iec';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// get photos from Unplash API
// check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded==totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
}
//helper function to set attributes on DOM elements
function setAttributes(element,attributes){
    for (const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}

// create elements for links and Photos,add to Dom
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log(totalImages);
    photosArray.forEach((photo)=>{
//    create <a> to link to unplash
     const item=document.createElement('a');
    //  item.setAttribute('href',photo.links.html);
    //  item.setAttribute('target','_blank');
     setAttributes(item,{href:photo.links.html,target:'_blank'});
    //  create image for photo
    const img=document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.url.regular);
    // put<img> inside<a>,then put both inside imageContainer
    setAttributes(img,{src:photo.urls.regular,alt:photo.slug,title:photo.slug});
    // event listener,check when each is finished loading
    img.addEventListener('load',imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
async function getPhotos(){
    try{
    const response=await fetch(apiUrl);
     photosArray=await response.json();
    console.log(photosArray);
    displayPhotos();
   

    }catch(error){
    // catch error
}}
// check to see if scrolling near bottom of page,load more photos
window.addEventListener('scroll',()=>{
  
    console.log('hai');
    ready=false;
    getPhotos();
  
});

