const portfolio = {};

portfolio.counter = 0;
portfolio.smileyIcon = document.getElementById('smileyIcon');

portfolio.smileyAnimation = () => {
    // listens for slick on smiley face icon
    portfolio.smileyIcon.addEventListener('click', function (event) {
        const mainContent = document.querySelectorAll('.content');
        if (portfolio.counter == 0) {
            // adds animation to the smiley icon on click
            portfolio.smileyIcon.classList.add('flip-vertical-right');
            for (i = 0; i < mainContent.length; i++) {
                // loops through every element in the returned node of elements with class of content and applies new inverted color class to them
                mainContent[i].classList.add('inverseColors');
            }
            // increments counter so that function to stop inverted colours and animation can run below
            portfolio.counter++;
        }
        else {
            portfolio.smileyIcon.classList.remove('flip-vertical-right');
            for (i = 0; i < mainContent.length; i++) {
                mainContent[i].classList.remove('inverseColors');
            }
            portfolio.counter--;
        }

    }, true)
}

portfolio.mobileNav = () => {
    portfolio.mobileButtons = document.querySelectorAll(".mobileButton");

    portfolio.mobileButtons.forEach(function (elem) {
        elem.addEventListener("click", function () {
            // listens for click on elements with class of mobile button and then toggles the slide nav to show the mobile menu directory. Also disables the scroll so slide nav is functional
            document.querySelector('.slideNav').classList.toggle('show');
            document.documentElement.classList.toggle('noScroll');
        });
    });

    portfolio.socialChevron = document.querySelector(".chevron");

    portfolio.socialChevron.addEventListener("click", function () {
        // same function as above is essentially taking place, except for the social media mobile nav to slide out
        document.querySelector(".socialMedia").classList.toggle('slideOut');
        // these are applied to change the direction of the chevron to demonstrate whether to reveal or hide the social icons
        document.querySelector(".right").classList.toggle('hide');
        document.querySelector(".left").classList.toggle('hide');
    });
}

portfolio.errorHandledForm = () => {
    portfolio.form = document.getElementById('form');
    // grabs the form element on the dom, and checks if it's null. If null, meaning user is not on a page with a form on it, then do nothing
    if (portfolio.form == null) return;

    else {
        // otherwise, check if the form has been validated and ensure we can write our own validation rules that overrule the standard html ones
        portfolio.isValidForm = portfolio.form.validity;

        for (i = 0; i < form.length; i++) {
            form[i].setAttribute('novalidate', true);
        }

        // Validate the field
        portfolio.hasError = function (field) {

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

        portfolio.showError = function (field, error) {

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
        portfolio.removeError = function (field) {

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
            if (!event.target.classList.contains('validate')) return;

            // Validate the field
            portfolio.error = portfolio.hasError(event.target);

            // Otherwise, remove any existing error message
            portfolio.removeError(event.target);

            // If there's an error, show it
            if (portfolio.error) {
                portfolio.showError(event.target, portfolio.error);
            }
        }, true);
    }
}

portfolio.init = function(){
    portfolio.smileyAnimation();
    portfolio.mobileNav();
    portfolio.errorHandledForm();
  // Handler when the DOM is fully loaded
};

if ( document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    portfolio.init();
} else {
    document.addEventListener("DOMContentLoaded", portfolio.init());
}