let mobileButtons = document.querySelectorAll(".mobileButton");

mobileButtons.forEach(function (elem) {
    elem.addEventListener("click", function () {
        document.querySelector('.slideNav').classList.toggle('show');
    });
});

let socialChevron = document.querySelector(".chevron");

socialChevron.addEventListener("click", function () {
    document.querySelector(".socialMedia").classList.toggle('slideOut');
    document.querySelector(".right").classList.toggle('hide');
    document.querySelector(".left").classList.toggle('hide');
});


const form = document.getElementById('form');
console.log(form);
const isValidForm = form.validity;

console.log(isValidForm);

for (i = 0; i < form.length; i++) {
    form[i].setAttribute('novalidate', true);
}

// Validate the field
const hasError = function (field) {

    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    // Get validity
    const validity = field.validity;

    // If valid, return null
    if (validity.valid) return;

    // If field is required and empty
    if (validity.valueMissing) return `You've got to fill this out!`;

    // If not the right type
    if (validity.typeMismatch) {

        // Email
        if (field.type === 'email') return `Please put in an email address!`;
    }

    // If pattern doesn't match
    if (validity.patternMismatch) {

        // If pattern info is included, return custom error
        if (field.hasAttribute('title')) return field.getAttribute('title');

        // Otherwise, generic error
        return `Please put in an email address!`;
    }

    // If all else fails, return a generic catchall error
    return `Sorry, for some reason it didn't work. Try again!`;
};

const showError = function (field, error) {

    // Add error class to field
    field.classList.add('error');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.errorMessage#error-for-' + id);
    if (!message) {
        message = document.createElement('div');
        message.className = 'errorMessage';
        message.id = 'error-for-' + id;
        field.parentNode.insertBefore(message, field.nextSibling);
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';
};

// Remove the error message
const removeError = function (field) {

    // Remove error class to field
    field.classList.remove('error');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.errorMessage#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
};

document.addEventListener('blur', function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // Validate the field
    const error = hasError(event.target);
    console.log(error);

    // Otherwise, remove any existing error message
    removeError(event.target);

    // If there's an error, show it
    if (error) {
        showError(event.target, error);
    }
}, true);


