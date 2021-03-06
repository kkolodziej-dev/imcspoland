let windowSize = window.innerWidth;
const DOCUMENT_FOLDER_PATH = './entities/documents/';
const DOCUMENT_NAMES = 'documentNames.txt'
// const DOCUMENT_FOLDER_PATH = './entities/documents/';
const PHOTO_FOLDER_PATH = './entities/gallery/';
// const PHOTO_FOLDER_PATH = './entities/gallery/';
const PHOTO_NAMES = 'imageNames.txt'

let DOCUMENT_NAMES_ARRAY = [];
let PHOTO_NAMES_ARRAY = [];

let currentURL = window.location.href;

let documentListElement = document.getElementById('documentList');
let galleryContainerElement = document.getElementById('galleryContainer');

window.addEventListener('resize', () => {
    if(!currentURL.includes("gallery.html")) return;
    windowSize = window.innerWidth;
    console.log(windowSize)
    if (windowSize > 736) {
        galleryContainerElement.childNodes.forEach(element => {
            element.className = "col-4"
        })
    } else {
        galleryContainerElement.childNodes.forEach(element => {
            element.className = "col-10"
        })
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    //populate elements
    if(currentURL.includes('references')) {
        await setElementsArray('documents');
        populateElementFields('documents');
    } else if(currentURL.includes('gallery')) {
        await setElementsArray('gallery');
        populateElementFields('gallery');
        $('#galleryContainer').magnificPopup({type:'image', delegate:'img'});
    }
    
    function populateElementFields(flag) {
        let folderPath, elementList;
        switch (flag) {
            case 'documents':
                folderPath = DOCUMENT_FOLDER_PATH;
                elementList = DOCUMENT_NAMES_ARRAY;
                break;
            case 'gallery':
                folderPath = PHOTO_FOLDER_PATH;
                elementList = PHOTO_NAMES_ARRAY;
                break;
        }
        let elementArray = [];
        //construct the documents
        elementList.forEach(e => {
            let tempContainerMember;
            switch (flag) {
                case 'documents':
                    tempContainerMember = document.createElement("span");
                    tempContainerMember.innerText = e;
                    tempContainerMember.setAttribute('title', e);
                    tempContainerMember.className = "icon minor style6 fad fa-file-alt";

                    let tempLi = document.createElement("li");
                    setEventListeners(folderPath, tempContainerMember, e);
                    tempLi.appendChild(tempContainerMember);
                    elementArray.push(tempLi);
                    break;
                case 'gallery':
                    //create single image
                    let tempImg = document.createElement("img");
                    tempImg.setAttribute('src', folderPath + e);
                    tempImg.setAttribute('href', folderPath + e);
                    tempImg.setAttribute('alt', e);
                    tempImg.className = 'galleryImage';
                    // $(tempImg).magnificPopup({type:'image'});
                    
                    //append image to span
                    let tempInnerSpan = document.createElement("span");
                    tempInnerSpan.className = "image fit";
                    tempInnerSpan.appendChild(tempImg);

                    //append span to div
                    tempContainerMember = document.createElement("div");
                    tempContainerMember.className = windowSize > 736 ? "col-4" : "col-10";
                    tempContainerMember.id = e;
                    tempContainerMember.setAttribute('title', e);
                    tempContainerMember.appendChild(tempInnerSpan);
                    setEventListeners(folderPath, tempInnerSpan, e);
                    elementArray.push(tempContainerMember);
                    break;
            }
        })

        //append ready document objects to the document list element
        elementArray.forEach(e => {
            switch (flag) {
                case 'documents':
                    documentListElement.appendChild(e);
                    break;
                case 'gallery':
                    galleryContainerElement.appendChild(e);
                    break;
            } 
        })
    }
    
    function setEventListeners(folderPath, e, text) {
        e.addEventListener('mouseover', () => {
            e.style.cursor = 'pointer';
        })
        
        if (folderPath === DOCUMENT_FOLDER_PATH) {
        e.addEventListener('click', () =>  {
            download(folderPath, text);
        });
        }
    }
    
    function download(folderPath, elementName) {
        let element = document.createElement('a');
        element.setAttribute('href', folderPath + elementName);
        element.setAttribute('target', '_blank');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

    async function setElementsArray(flag) {
        let lFolderPath;
        let lNamesFile;
        switch (flag) {
            case 'documents':
                lFolderPath = DOCUMENT_FOLDER_PATH;
                lNamesFile = DOCUMENT_NAMES;
                break;
            case 'gallery':
                lFolderPath = PHOTO_FOLDER_PATH;
                lNamesFile = PHOTO_NAMES;
                break;
        }

        let rawText = await fetch(lFolderPath + lNamesFile)
        .then(response => response.text());

        const parsedArr = rawText.split('\n');
        let filteredArr = parsedArr.filter(e => {
            if (e === lNamesFile || e === "") return;
            return e;
        })

        switch (flag) {
            case 'documents':
                DOCUMENT_NAMES_ARRAY = filteredArr;
                break;
            case 'gallery':
                PHOTO_NAMES_ARRAY = filteredArr;
                break;
        }
    }
    });
