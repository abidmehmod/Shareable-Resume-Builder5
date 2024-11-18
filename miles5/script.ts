//get refrences to form  display area

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement

const shareablelinkContainer = document.getElementById('shareable-link-container') as HTMLFormElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const  downLoadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//handle form submistion
 form.addEventListener('submit' ,(event: Event)=>{
    event.preventDefault(); // prevent page reload

    // collect input value
    const username = (document.getElementById('username') as HTMLInputElement).value
    const name = (document.getElementById('name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value
    const experience = (document.getElementById('experince') as HTMLTextAreaElement).value
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value

    //save form data in localstorage with the username as a key

    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username,JSON.stringify(resumeData)); // saving data locally

    // generate the resume daynmicaly
    const resumehtml = `
    <h2><b>editable Resume</b></h2>
    <h3>Personal information</h3>
    <p><b>name:</b><span contenteditable="true">${name}</span></p>
    <p><b>name:</b><span contenteditable="true">${email}</span></p>
    <p><b>name:</b><span contenteditable="true">${phone}</span></p>
    
    <h3>education</h3>
    <p contenteditable="true">${education}</p>

    <h3>experince</h3>
    <p contenteditable="true">${experience}</p>

    <h3>skill</h3>
    <p contenteditable="true">${skills}</p>
    `;

    // Display the generate resume

   resumeDisplayElement.innerHTML = resumehtml;

   // Generate a shareable URL with the username only
   const shareableURL =
   `${window.location.origin}? username=${encodeURIComponent(username)}`;

   // display the shareable link
   shareablelinkContainer.style.display = 'block';
   shareableLinkElement.href = shareableURL;
   shareableLinkElement.textContent = shareableURL;

    
});

 // handle pdf download

 downLoadPdfButton.addEventListener('click',()=>{
 window.print();// This will open the print dialog and allow the user to save as pdf
 
 })
 // Prefill the form based on the username in the URL

 window.addEventListener('DOMContentLoaded',()=>{
    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get('username');

    if(username){
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);

        if(savedResumeData){
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username')as HTMLInputElement).value = username;

            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;

            (document.getElementById('email')as HTMLInputElement).value = resumeData.email;

            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;

            (document.getElementById('education') as HTMLInputElement).value = resumeData.education;

            (document.getElementById('experince') as HTMLInputElement ).value = resumeData.experience;

            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;


        }
    }
});