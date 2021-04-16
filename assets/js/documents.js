document.addEventListener('DOMContentLoaded', () => {
    
    const DOCUMENT_FOLDER_PATH = 'https://github.com/kkolodziej-dev/imcspoland/raw/add_galery/images/documents/';
    //ToDo get list of available documents to loop through
    const DOCUMENT_NAMES_ARRAY = ['document1.pdf', 'document1.docx'];
    
    let documentListElement = document.getElementById('documentList');
    let documentsArray = [];
    
    //construct the documents
    DOCUMENT_NAMES_ARRAY.forEach(e => {
        let tempSpan = document.createElement("span");
        tempSpan.className = "icon minor style6 fad fa-file-alt";
        tempSpan.innerText = e;
        setEventListeners(tempSpan);
        let tempLi = document.createElement("li");
        tempLi.appendChild(tempSpan);
        documentsArray.push(tempLi);
    })
    
    //append ready document objects to the document list element
    documentsArray.forEach(e => {
        documentListElement.appendChild(e);
    })
    
    function setEventListeners(e) {
        e.addEventListener('click', () =>  {
            download(e.innerText);
        });
        
        e.addEventListener('mouseover', () => {
            e.style.cursor = 'pointer';
        })
    }
    
    function download(documentName) {
        let element = document.createElement('a');
        element.setAttribute('href', DOCUMENT_FOLDER_PATH + documentName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    });
    
    