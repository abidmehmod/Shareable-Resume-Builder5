//get refrences to form  display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareablelinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downLoadPdfButton = document.getElementById('download-pdf');
//handle form submistion
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // collect input value
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experince').value;
    var skills = document.getElementById('skills').value;
    //save form data in localstorage with the username as a key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // saving data locally
    // generate the resume daynmicaly
    var resumehtml = "\n    <h2><b>editable Resume</b></h2>\n    <h3>Personal information</h3>\n    <p><b>name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>name:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>name:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n    \n    <h3>education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>experince</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n    <h3>skill</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
    // Display the generate resume
    resumeDisplayElement.innerHTML = resumehtml;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "? username=").concat(encodeURIComponent(username));
    // display the shareable link
    shareablelinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// handle pdf download
downLoadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as pdf
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experince').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
