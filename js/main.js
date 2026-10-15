// (function () {
//   'use strict';

//   var SHEET_URL = 'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

//   var modal = document.getElementById('modal');
//   var form = document.getElementById('reg-form');
//   var formView = document.getElementById('form-view');
//   var thanksView = document.getElementById('thanks-view');
//   var submitBtn = document.getElementById('submit-btn');
//   var formErr = document.getElementById('form-err');
//   var lastFocus = null;

//   function openModal() {
//     lastFocus = document.activeElement;
//     modal.classList.add('open');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.classList.add('no-scroll');
//     var first = form.querySelector('input');
//     if (first && !formView.hidden) setTimeout(function () { first.focus(); }, 150);
//   }

//   function closeModal() {
//     modal.classList.remove('open');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.classList.remove('no-scroll');
//     if (lastFocus) lastFocus.focus();
//   }

//   document.querySelectorAll('[data-open-modal]').forEach(function (b) {
//     b.addEventListener('click', openModal);
//   });
//   document.querySelectorAll('[data-close-modal]').forEach(function (b) {
//     b.addEventListener('click', closeModal);
//   });
//   modal.addEventListener('click', function (e) {
//     if (e.target === modal) closeModal();
//   });
//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
//   });

//   // Validation
//   var rules = {
//     name: function (v) { return v.length >= 2 ? '' : 'Please enter your name'; },
//     phone: function (v) {
//       var d = v.replace(/\D/g, '');
//       return d.length >= 7 && d.length <= 15 ? '' : 'Enter a valid phone number';
//     },
//     email: function (v) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email';
//     }
//   };

//   function validateField(input) {
//     var msg = rules[input.name](input.value.trim());
//     input.classList.toggle('invalid', !!msg);
//     input.parentNode.querySelector('.err').textContent = msg;
//     return !msg;
//   }

//   form.querySelectorAll('input').forEach(function (i) {
//     i.addEventListener('input', function () {
//       if (i.classList.contains('invalid')) validateField(i);
//     });
//   });

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     formErr.textContent = '';

//     var ok = true;
//     form.querySelectorAll('input').forEach(function (i) {
//       if (!validateField(i)) ok = false;
//     });
//     if (!ok) return;

//     var data = new URLSearchParams();
//     data.append('name', form.name.value.trim());
//     data.append('phone', form.phone.value.trim());
//     data.append('email', form.email.value.trim());
//     data.append('page', location.href);

//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';

//     function done() {
//       formView.hidden = true;
//       thanksView.hidden = false;
//       form.reset();
//     }

//     if (SHEET_URL.indexOf('PASTE_') === 0) {
//       console.warn('SHEET_URL set nahi hai - data Google Sheet me save nahi hua.');
//       return done();
//     }

//     fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: data })
//       .then(done)
//       .catch(function () {
//         formErr.textContent = 'Something went wrong. Please try again.';
//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       });
//   });
  

  
// var termsCheckbox = document.getElementById('terms');

// function validateTerms() {
//   var msg = termsCheckbox.checked
//     ? ''
//     : 'Please accept the Terms & Conditions';

//   termsCheckbox.setCustomValidity(msg);

//   var errorElement = termsCheckbox
//     .parentNode.querySelector('.err');

//   if (errorElement) {
//     errorElement.textContent = msg;
//   }

//   return termsCheckbox.checked;
// }

// termsCheckbox.addEventListener('change', validateTerms);

// })();



// (function () {
//   'use strict';

//   // Google Apps Script Web App URL
//   var SHEET_URL = 'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

//   var modal = document.getElementById('modal');
//   var form = document.getElementById('reg-form');
//   var formView = document.getElementById('form-view');
//   var thanksView = document.getElementById('thanks-view');
//   var submitBtn = document.getElementById('submit-btn');
//   var formErr = document.getElementById('form-err');
//   var termsCheckbox = document.getElementById('terms');
//   var lastFocus = null;

//   if (!modal || !form || !formView || !thanksView ||
//       !submitBtn || !formErr || !termsCheckbox) {
//     console.error('Required form elements are missing.');
//     return;
//   }

//   function openModal() {
//     lastFocus = document.activeElement;
//     modal.classList.add('open');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.classList.add('no-scroll');

//     var first = form.querySelector('input');
//     if (first && !formView.hidden) {
//       setTimeout(function () {
//         first.focus();
//       }, 150);
//     }
//   }

//   function closeModal() {
//     modal.classList.remove('open');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.classList.remove('no-scroll');

//     if (lastFocus) lastFocus.focus();
//   }

//   document.querySelectorAll('[data-open-modal]').forEach(function (button) {
//     button.addEventListener('click', openModal);
//   });

//   document.querySelectorAll('[data-close-modal]').forEach(function (button) {
//     button.addEventListener('click', closeModal);
//   });

//   modal.addEventListener('click', function (event) {
//     if (event.target === modal) closeModal();
//   });

//   document.addEventListener('keydown', function (event) {
//     if (event.key === 'Escape' && modal.classList.contains('open')) {
//       closeModal();
//     }
//   });

//   var rules = {
//     name: function (value) {
//       return value.length >= 2 ? '' : 'Please enter your name';
//     },

//     phone: function (value) {
//       var digits = value.replace(/\D/g, '');
//       return digits.length >= 7 && digits.length <= 15
//         ? ''
//         : 'Enter a valid phone number';
//     },

//     email: function (value) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
//         ? ''
//         : 'Enter a valid email';
//     }
//   };


// function validateTerms() {
//   var errorElement = form.querySelector('.temrs_conten .err');

//   if (!termsCheckbox.checked) {
//     if (errorElement) {
//       errorElement.textContent =
//         'Please accept the Terms & Conditions.';
//       errorElement.style.display = 'block';
//     }

//     return false;
//   }

//   if (errorElement) {
//     errorElement.textContent = '';
//     errorElement.style.display = '';
//   }

//   return true;
// }


//   function validateTerms() {
//     var message = termsCheckbox.checked
//       ? ''
//       : 'Please accept the Terms & Conditions';

//     var error = termsCheckbox.parentNode.querySelector('.err');
//     if (error) error.textContent = message;

//     return termsCheckbox.checked;
//   }

//   form.querySelectorAll('input[name="name"], input[name="phone"], input[name="email"]')
//     .forEach(function (input) {
//       input.addEventListener('input', function () {
//         if (input.classList.contains('invalid')) {
//           validateField(input);
//         }
//       });
//     });

//   termsCheckbox.addEventListener('change', validateTerms);

//   form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     formErr.textContent = '';

//     var valid = true;

//     form.querySelectorAll('input[name="name"], input[name="phone"], input[name="email"]')
//       .forEach(function (input) {
//         if (!validateField(input)) valid = false;
//       });

//     if (!validateTerms()) valid = false;

//     if (!valid) return;

//     if (!SHEET_URL || SHEET_URL.indexOf('/exec') === -1) {
//       formErr.textContent = 'Google Sheets connection is not configured.';
//       return;
//     }

//     var data = new URLSearchParams();
//     data.append('name', form.elements.name.value.trim());
//     data.append('phone', form.elements.phone.value.trim());
//     data.append('email', form.elements.email.value.trim());
//     data.append('page', window.location.href);
//     data.append('terms', termsCheckbox.checked ? 'Accepted' : 'Not accepted');

//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';

//     fetch(SHEET_URL, {
//       method: 'POST',
//       mode: 'no-cors',
//       body: data
//     })
//       .then(function () {
//         // no-cors does not let us verify the server response.
//         formView.hidden = true;
//         thanksView.hidden = false;
//         form.reset();

//         form.querySelectorAll('.err').forEach(function (error) {
//           error.textContent = '';
//         });
//         form.querySelectorAll('.invalid').forEach(function (input) {
//           input.classList.remove('invalid');
//         });

//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       })
//       .catch(function (error) {
//         console.error('Registration request failed:', error);
//         formErr.textContent = 'Unable to submit. Please try again.';
//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       });
//   });
// })();



(function () {
  'use strict';

  // Google Apps Script Web App URL
  var SHEET_URL =
    'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

  var modal = document.getElementById('modal');
  var form = document.getElementById('reg-form');
  var formView = document.getElementById('form-view');
  var thanksView = document.getElementById('thanks-view');
  var submitBtn = document.getElementById('submit-btn');
  var formErr = document.getElementById('form-err');
  var termsCheckbox = document.getElementById('terms');

  var lastFocus = null;

  // Check required HTML elements
  if (
    !modal ||
    !form ||
    !formView ||
    !thanksView ||
    !submitBtn ||
    !formErr ||
    !termsCheckbox
  ) {
    console.error('Required form elements are missing.');
    return;
  }

  // Open modal
  function openModal() {
    lastFocus = document.activeElement;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    var firstInput = form.querySelector('input');

    if (firstInput && !formView.hidden) {
      setTimeout(function () {
        firstInput.focus();
      }, 150);
    }
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    if (lastFocus) {
      lastFocus.focus();
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (button) {
    button.addEventListener('click', openModal);
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (button) {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      modal.classList.contains('open')
    ) {
      closeModal();
    }
  });

  // Field validation rules
  var rules = {
    name: function (value) {
      return value.length >= 2
        ? ''
        : 'Please enter your name';
    },

    phone: function (value) {
      var digits = value.replace(/\D/g, '');

      return digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Enter a valid phone number';
    },

    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
        ? ''
        : 'Enter a valid email';
    }
  };

  // Validate individual input
  function validateField(input) {
    var rule = rules[input.name];

    if (!rule) {
      return true;
    }

    var message = rule(input.value.trim());

    input.classList.toggle('invalid', !!message);

    var errorElement = input.parentNode.querySelector('.err');

    if (errorElement) {
      errorElement.textContent = message;
    }

    return !message;
  }

  // Find Terms error element using current HTML structure
  function getTermsErrorElement() {
    return (
      form.querySelector('.temrs_conten .err') ||
      form.querySelector('.terms-label .err')
    );
  }

  // Validate Terms & Conditions
  function validateTerms() {
    var errorElement = getTermsErrorElement();

    if (!termsCheckbox.checked) {
      if (errorElement) {
        errorElement.textContent =
          'Please accept the Terms & Conditions.';
        errorElement.style.display = 'block';
      }

      return false;
    }

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = '';
    }

    return true;
  }

  // Clear field errors as user types
  form.querySelectorAll(
    'input[name="name"], input[name="phone"], input[name="email"]'
  ).forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });
  });

  // Clear Terms error when checkbox is checked
  termsCheckbox.addEventListener('change', function () {
    validateTerms();
  });

  // Form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    formErr.textContent = '';

    var valid = true;

    // Validate Name, Phone and Email
    form.querySelectorAll(
      'input[name="name"], input[name="phone"], input[name="email"]'
    ).forEach(function (input) {
      if (!validateField(input)) {
        valid = false;
      }
    });

    // Validate Terms checkbox
    if (!validateTerms()) {
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Validate configured URL
    if (
      !SHEET_URL ||
      SHEET_URL.indexOf('https://') !== 0 ||
      SHEET_URL.indexOf('/exec') === -1
    ) {
      formErr.textContent =
        'Google Sheets connection is not configured.';
      return;
    }

    // Prepare form data
    var data = new URLSearchParams();

    data.append('name', form.elements.name.value.trim());
    data.append('phone', form.elements.phone.value.trim());
    data.append('email', form.elements.email.value.trim());
    data.append('page', window.location.href);
    data.append(
      'terms',
      termsCheckbox.checked ? 'Accepted' : 'Not accepted'
    );

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Submit to Google Apps Script
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data
    })
      .then(function () {
        /*
          no-cors responses are opaque.
          The browser cannot confirm whether the Sheet saved the row.
        */
        formView.hidden = true;
        thanksView.hidden = false;

        form.reset();

        form.querySelectorAll('.err').forEach(function (error) {
          error.textContent = '';
        });

        form.querySelectorAll('.invalid').forEach(function (input) {
          input.classList.remove('invalid');
        });

        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
      })
      .catch(function (error) {
        console.error('Registration request failed:', error);

        formErr.textContent =
          'Unable to submit. Please try again.';

        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
      });
  });
})();
