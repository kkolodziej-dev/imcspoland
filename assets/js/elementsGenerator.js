document.addEventListener('DOMContentLoaded', () => {
    
    const DOCUMENT_FOLDER_PATH = './entities/documents/';
    const PHOTO_FOLDER_PATH = './entities/gallery/';
    //ToDo get list of available documents to loop through
    getDocumentNames();
    const DOCUMENT_NAMES_ARRAY = ['document1.pdf', 'document1.docx'];
    const PHOTO_NAMES_ARRAY = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg'];

    let documentListElement = document.getElementById('documentList');
    let galleryContainerElement = document.getElementById('galleryContainer');

    let currentURL = window.location.href;
    
    //populate elements
    if(currentURL.includes('references.html')) {
        populateElementFields('documents');
    } else if(currentURL.includes('gallery.html')) {
        populateElementFields('gallery');
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
                    let tempLi;
                    tempLi = document.createElement("li");
                    setEventListeners(folderPath, tempContainerMember, e);
                    tempLi.appendChild(tempContainerMember);
                    elementArray.push(tempLi);
                    break;
                case 'gallery':
                    //create single image
                    let tempImg = document.createElement("img");
                    tempImg.setAttribute('src', folderPath + e);
                    tempImg.setAttribute('alt', e);
                    //append image to span
                    let tempInnerSpan = document.createElement("span");
                    tempInnerSpan.className = "image fit";
                    tempInnerSpan.appendChild(tempImg);
                    //append span to div
                    tempContainerMember = document.createElement("div");
                    tempContainerMember.className = "col-4";
                    tempContainerMember.id = e;
                    tempContainerMember.setAttribute('title', e);
                    tempContainerMember.appendChild(tempInnerSpan);
                    setEventListeners(folderPath, tempContainerMember, e);
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
        e.addEventListener('click', () =>  {
            download(folderPath, text);
        });
        
        e.addEventListener('mouseover', () => {
            e.style.cursor = 'pointer';
        })
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

    function getDocumentNames() {
        fetch("./entities/documents/documentNames.txt")
        .then(response => response.text())
        .then(data => console.log(data));
    }
    });
    
    