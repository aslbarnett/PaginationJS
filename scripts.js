/* -+-+-+----------------------+-+-+-
Basic Data - Student List
-+-+-+----------------------+-+-+- */

var studentList = document.getElementById('student-list').children;

/* -+-+-+----------------------+-+-+-
Calling functions at load time
-+-+-+----------------------+-+-+- */

addSearchBox(searchBoxCreater());
appendPageLinks(studentList);
showPage(studentList, 1);

/* -+-+-+----------------------+-+-+-
Main Functions
-+-+-+----------------------+-+-+- */

// Displays page of 10 students based on page number selected
function showPage(aStudentList, pageNumber) {
    removeStudents();
    var upperBound = (pageNumber * 10) - 1;
    var lowerBound = (pageNumber - 1) * 10;
    var selectionArray = [];
    for (var k = lowerBound; k <= upperBound; k++) {
        if (aStudentList[k]) {
            selectionArray.push(aStudentList[k]);
        }
    }
    for (var j = 0; j < selectionArray.length; j++) {
        selectionArray[j].style.display = "block";
        if (j === selectionArray.length - 1) {
            selectionArray[j].style.borderBottom = "none";
        }
    }

}

// Creates the links to the different pages
function appendPageLinks(aStudentList) {
    var numberOfPages = Math.ceil(aStudentList.length / 10);

    // page link section
    var pageLinkContainer = document.createElement('div');
    pageLinkContainer.className = 'pagination';

    var linkList = document.createElement('ul');
    pageLinkContainer.appendChild(linkList);

    for (var i = 0; i < numberOfPages; i++) {
        var pageLinkListElement = document.createElement('li');
        var pageLinkAnchor = document.createElement('a');
        pageLinkAnchor.href = "#";
        pageLinkAnchor.innerHTML = i + 1;

        if (i === 0) {
            pageLinkAnchor.className = "active";
        }

        pageLinkListElement.appendChild(pageLinkAnchor);
        pageLinkContainer.appendChild(pageLinkListElement);

        pageLinkAnchor.addEventListener('click', function() {
            showPage(aStudentList, this.innerHTML);
            removeActiveState();
            this.className = "active";
        });
    }

    // append pagination to bottom of page
    var page = document.getElementById('page');
    page.appendChild(pageLinkContainer);

}

// Search Function for searching through students to display
function searchList(inputValue) {
    removeStudents();
    removePagination();
    removeActiveState();
    if (document.querySelector('.message')) {
        document.querySelector('.message').remove();
    }
    var matchedList = [];
    for (var i = 0; i < studentList.length; i++) {
        var name = studentList[i].querySelector('h3').innerHTML;
        var email = studentList[i].querySelector('.email').innerHTML;
        if (name.includes(inputValue) || email.includes(inputValue)) {
            matchedList.push(studentList[i]);
        }
    }
    if (matchedList.length === 0) {
        var pageHeader = document.getElementById('page-header');
        var message = document.createElement('p');
        pageHeader.style.position = "relative";
        message.className = "message";
        message.style.display = "block";
        message.style.position = "absolute";
        message.style.top = "70px";
        message.style.fontSize = "1.2rem";
        message.style.color = "#4ba6c3";
        message.innerHTML = 'no students found';
        pageHeader.appendChild(message);
    }
    if (matchedList.length > 10) {
        appendPageLinks(matchedList);
    }
    showPage(matchedList, 1);
}

/* -+-+-+----------------------+-+-+-
Helper Functions
-+-+-+----------------------+-+-+- */

// add search box to page
function addSearchBox(searchBox) {
    var pageHeader = document.getElementById('page-header');
    pageHeader.appendChild(searchBox);
}

// create search box
function searchBoxCreater() {
    var searchContainer = document.createElement('div');
    searchContainer.className = "student-search";
    var searchInput = document.createElement('input');
    searchInput.placeholder = "Search for students...";
    var searchButton = document.createElement('button');
    searchButton.innerHTML = "Search";
    searchButton.addEventListener('click', function() {
        searchList(searchInput.value);
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    return searchContainer;
}

// hide students
function removeStudents() {
    for (var i = 0; i < studentList.length; i++) {
        studentList[i].style.display = "none";
    }
}

// remove pagination from dom
function removePagination() {
    if (document.querySelector('.pagination')) {
        var pagination = document.querySelector('.pagination');
        pagination.remove();
    }
}

// remove active class from pagination link
function removeActiveState() {
    var elements = document.getElementsByClassName('active');
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = '';
    }

}
