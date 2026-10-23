// (function () {
//   'use strict';

//   var SHEET_URL =
//     'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

//   var TELEGRAM_LINK = 'https://t.me/northlume';

//   var modal = document.getElementById('modal');
//   var form = document.getElementById('reg-form');
//   var formView = document.getElementById('form-view');
//   var thanksView = document.getElementById('thanks-view');
//   var submitBtn = document.getElementById('submit-btn');
//   var formErr = document.getElementById('form-err');
//   var termsCheckbox = document.getElementById('terms');

//   if (
//     !modal ||
//     !form ||
//     !formView ||
//     !thanksView ||
//     !submitBtn ||
//     !formErr ||
//     !termsCheckbox
//   ) {
//     console.error('Required form elements are missing.');
//     return;
//   }

//   var lastFocus = null;

//   // Open modal
//   function openModal() {
//     lastFocus = document.activeElement;

//     modal.classList.add('open');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.classList.add('no-scroll');

//     var firstInput = form.querySelector('input');

//     if (firstInput && !formView.hidden) {
//       firstInput.focus();
//     }
//   }

//   // Close modal
//   function closeModal() {
//     modal.classList.remove('open');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.classList.remove('no-scroll');

//     if (lastFocus) {
//       lastFocus.focus();
//     }
//   }

//   document.querySelectorAll('[data-open-modal]').forEach(function (button) {
//     button.addEventListener('click', openModal);
//   });

//   document.querySelectorAll('[data-close-modal]').forEach(function (button) {
//     button.addEventListener('click', closeModal);
//   });

//   modal.addEventListener('click', function (event) {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });

//   document.addEventListener('keydown', function (event) {
//     if (
//       event.key === 'Escape' &&
//       modal.classList.contains('open')
//     ) {
//       closeModal();
//     }
//   });

//   // Validation rules
//   var rules = {
//     name: function (value) {
//       return value.length >= 2
//         ? ''
//         : 'Please enter your name.';
//     },

//     phone: function (value) {
//       var digits = value.replace(/\D/g, '');

//       return digits.length >= 7 && digits.length <= 15
//         ? ''
//         : 'Enter a valid phone number.';
//     },

//     email: function (value) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
//         ? ''
//         : 'Enter a valid email address.';
//     }
//   };

//   function validateField(input) {
//     var rule = rules[input.name];

//     if (!rule) return true;

//     var message = rule(input.value.trim());
//     input.classList.toggle('invalid', !!message);

//     var errorElement = input.parentNode.querySelector('.err');

//     if (errorElement) {
//       errorElement.textContent = message;
//     }

//     return !message;
//   }

//   function validateTerms() {
//     var errorElement = form.querySelector('.temrs_conten .err');

//     if (!termsCheckbox.checked) {
//       if (errorElement) {
//         errorElement.textContent =
//           'Please accept the Terms & Conditions.';
//         errorElement.style.display = 'block';
//       }

//       return false;
//     }

//     if (errorElement) {
//       errorElement.textContent = '';
//       errorElement.style.display = '';
//     }

//     return true;
//   }

//   var fields = form.querySelectorAll(
//     'input[name="name"], input[name="phone"], input[name="email"]'
//   );

//   fields.forEach(function (input) {
//     input.addEventListener('input', function () {
//       if (input.classList.contains('invalid')) {
//         validateField(input);
//       }
//     });
//   });

//   termsCheckbox.addEventListener('change', validateTerms);

//   // Submit form
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     formErr.textContent = '';

//     var valid = true;

//     fields.forEach(function (input) {
//       if (!validateField(input)) {
//         valid = false;
//       }
//     });

//     if (!validateTerms()) {
//       valid = false;
//     }

//     if (!valid) return;

//     if (
//       !SHEET_URL ||
//       SHEET_URL.indexOf('https://') !== 0 ||
//       SHEET_URL.indexOf('/exec') === -1
//     ) {
//       formErr.textContent =
//         'Google Sheets connection is not configured.';
//       return;
//     }

//     // Data sent to Google Apps Script
//     var data = new URLSearchParams();

//     data.append('name', form.elements.namedItem('name').value.trim());
//     data.append('phone', form.elements.namedItem('phone').value.trim());
//     data.append('email', form.elements.namedItem('email').value.trim());
//     data.append('page', window.location.href);
//     data.append(
//       'terms',
//       termsCheckbox.checked ? 'Accepted' : 'Not accepted'
//     );
//     data.append('telegramLink', TELEGRAM_LINK);

//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';

//     fetch(SHEET_URL, {
//       method: 'POST',
//       mode: 'no-cors',
//       body: data
//     })
//       .then(function () {
//         /*
//          * no-cors cannot confirm whether the row
//          * was actually saved in Google Sheets.
//          */
//         form.reset();

//         fields.forEach(function (input) {
//           input.classList.remove('invalid');
//         });

//         form.querySelectorAll('.err').forEach(function (error) {
//           error.textContent = '';
//         });

//         formView.hidden = true;
//         thanksView.hidden = false;

//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       })
//       .catch(function (error) {
//         console.error('Registration request failed:', error);

//         formErr.textContent =
//           'Unable to submit. Please try again.';

//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       });
//   });
// })();



// (function () {
//   'use strict';

//   var SHEET_URL =
//     'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

//   var TELEGRAM_LINK = 'https://t.me/northlume';

//   var AUTO_OPEN_DELAY = 3000; // popup auto-opens 3 sec after page load
//   var REDIRECT_DELAY = 3000; // redirect to Telegram 3 sec after thank-you shows

//   var modal = document.getElementById('modal');
//   var form = document.getElementById('reg-form');
//   var formView = document.getElementById('form-view');
//   var thanksView = document.getElementById('thanks-view');
//   var submitBtn = document.getElementById('submit-btn');
//   var formErr = document.getElementById('form-err');
//   var termsCheckbox = document.getElementById('terms');

//   if (
//     !modal ||
//     !form ||
//     !formView ||
//     !thanksView ||
//     !submitBtn ||
//     !formErr ||
//     !termsCheckbox
//   ) {
//     console.error('Required form elements are missing.');
//     return;
//   }

//   var lastFocus = null;
//   var autoOpenTimer = null;
//   var redirectTimer = null;

//   // Open modal
//   function openModal() {
//     // If user opened it manually, cancel the pending auto-open
//     clearTimeout(autoOpenTimer);

//     lastFocus = document.activeElement;

//     modal.classList.add('open');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.classList.add('no-scroll');

//     var firstInput = form.querySelector('input');

//     if (firstInput && !formView.hidden) {
//       firstInput.focus();
//     }
//   }

//   // Close modal
//   function closeModal() {
//     modal.classList.remove('open');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.classList.remove('no-scroll');

//     if (lastFocus) {
//       lastFocus.focus();
//     }
//   }

//   document.querySelectorAll('[data-open-modal]').forEach(function (button) {
//     button.addEventListener('click', openModal);
//   });

//   document.querySelectorAll('[data-close-modal]').forEach(function (button) {
//     button.addEventListener('click', closeModal);
//   });

//   modal.addEventListener('click', function (event) {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });

//   document.addEventListener('keydown', function (event) {
//     if (
//       event.key === 'Escape' &&
//       modal.classList.contains('open')
//     ) {
//       closeModal();
//     }
//   });

//   // Auto-open popup after 3 seconds (only if not already open)
//   autoOpenTimer = setTimeout(function () {
//     if (!modal.classList.contains('open')) {
//       openModal();
//     }
//   }, AUTO_OPEN_DELAY);

//   // Validation rules
//   var rules = {
//     name: function (value) {
//       return value.length >= 2
//         ? ''
//         : 'Please enter your name.';
//     },

//     phone: function (value) {
//       var digits = value.replace(/\D/g, '');

//       return digits.length >= 7 && digits.length <= 15
//         ? ''
//         : 'Enter a valid phone number.';
//     },

//     email: function (value) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
//         ? ''
//         : 'Enter a valid email address.';
//     }
//   };

//   function validateField(input) {
//     var rule = rules[input.name];

//     if (!rule) return true;

//     var message = rule(input.value.trim());
//     input.classList.toggle('invalid', !!message);

//     var errorElement = input.parentNode.querySelector('.err');

//     if (errorElement) {
//       errorElement.textContent = message;
//     }

//     return !message;
//   }

//   function validateTerms() {
//     var errorElement = form.querySelector('.temrs_conten .err');

//     if (!termsCheckbox.checked) {
//       if (errorElement) {
//         errorElement.textContent =
//           'Please accept the Terms & Conditions.';
//         errorElement.style.display = 'block';
//       }

//       return false;
//     }

//     if (errorElement) {
//       errorElement.textContent = '';
//       errorElement.style.display = '';
//     }

//     return true;
//   }

//   var fields = form.querySelectorAll(
//     'input[name="name"], input[name="phone"], input[name="email"]'
//   );

//   fields.forEach(function (input) {
//     input.addEventListener('input', function () {
//       if (input.classList.contains('invalid')) {
//         validateField(input);
//       }
//     });
//   });

//   termsCheckbox.addEventListener('change', validateTerms);

//   // Show thank-you view, then redirect to Telegram after 3 sec
//   function showThanksAndRedirect() {
//     form.reset();

//     fields.forEach(function (input) {
//       input.classList.remove('invalid');
//     });

//     form.querySelectorAll('.err').forEach(function (error) {
//       error.textContent = '';
//     });

//     formView.hidden = true;
//     thanksView.hidden = false;

//     submitBtn.disabled = false;
//     submitBtn.textContent = 'Register Now';

//     // Make sure thank-you is visible even if modal was closed meanwhile
//     if (!modal.classList.contains('open')) {
//       openModal();
//     }

//     // Optional: Meta Pixel lead event
//     if (typeof fbq === 'function') {
//       fbq('track', 'Lead');
//     }

//     clearTimeout(redirectTimer);
//     redirectTimer = setTimeout(function () {
//       window.location.href = TELEGRAM_LINK;
//     }, REDIRECT_DELAY);
//   }

//   // Submit form
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     formErr.textContent = '';

//     var valid = true;

//     fields.forEach(function (input) {
//       if (!validateField(input)) {
//         valid = false;
//       }
//     });

//     if (!validateTerms()) {
//       valid = false;
//     }

//     if (!valid) return;

//     if (
//       !SHEET_URL ||
//       SHEET_URL.indexOf('https://') !== 0 ||
//       SHEET_URL.indexOf('/exec') === -1
//     ) {
//       formErr.textContent =
//         'Google Sheets connection is not configured.';
//       return;
//     }

//     // Data sent to Google Apps Script
//     var data = new URLSearchParams();

//     data.append('name', form.elements.namedItem('name').value.trim());
//     data.append('phone', form.elements.namedItem('phone').value.trim());
//     data.append('email', form.elements.namedItem('email').value.trim());
//     data.append('page', window.location.href);
//     data.append(
//       'terms',
//       termsCheckbox.checked ? 'Accepted' : 'Not accepted'
//     );
//     data.append('telegramLink', TELEGRAM_LINK);

//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';

//     fetch(SHEET_URL, {
//       method: 'POST',
//       mode: 'no-cors',
//       body: data
//     })
//       .then(function () {
//         /*
//          * no-cors cannot confirm whether the row
//          * was actually saved in Google Sheets.
//          */
//         showThanksAndRedirect();
//       })
//       .catch(function (error) {
//         console.error('Registration request failed:', error);

//         formErr.textContent =
//           'Unable to submit. Please try again.';

//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       });
//   });
// })();

(function () {
  'use strict';

  var SHEET_URL =
    'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

  var TELEGRAM_LINK = 'https://t.me/northlume';

  var AUTO_OPEN_DELAY = 3000; // popup auto-opens 3 sec after page load
  var THANKYOU_PAGE = 'thankyou.html'; // form submit ke baad yahan jayega

  var modal = document.getElementById('modal');
  var form = document.getElementById('reg-form');
  var formView = document.getElementById('form-view');
  var thanksView = document.getElementById('thanks-view');
  var submitBtn = document.getElementById('submit-btn');
  var formErr = document.getElementById('form-err');
  var termsCheckbox = document.getElementById('terms');

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

  var lastFocus = null;
  var autoOpenTimer = null;

  // Open modal
  function openModal() {
    // If user opened it manually, cancel the pending auto-open
    clearTimeout(autoOpenTimer);

    lastFocus = document.activeElement;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    var firstInput = form.querySelector('input');

    if (firstInput && !formView.hidden) {
      firstInput.focus();
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

  // Auto-open popup after 3 seconds (only if not already open)
  autoOpenTimer = setTimeout(function () {
    if (!modal.classList.contains('open')) {
      openModal();
    }
  }, AUTO_OPEN_DELAY);

  // Validation rules
  var rules = {
    name: function (value) {
      return value.length >= 2
        ? ''
        : 'Please enter your name.';
    },

    phone: function (value) {
      var digits = value.replace(/\D/g, '');

      return digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Enter a valid phone number.';
    },

    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
        ? ''
        : 'Enter a valid email address.';
    }
  };

  function validateField(input) {
    var rule = rules[input.name];

    if (!rule) return true;

    var message = rule(input.value.trim());
    input.classList.toggle('invalid', !!message);

    var errorElement = input.parentNode.querySelector('.err');

    if (errorElement) {
      errorElement.textContent = message;
    }

    return !message;
  }

  function validateTerms() {
    var errorElement = form.querySelector('.temrs_conten .err');

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

  var fields = form.querySelectorAll(
    'input[name="name"], input[name="phone"], input[name="email"]'
  );

  fields.forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });
  });

  termsCheckbox.addEventListener('change', validateTerms);

  // Submit success -> thank-you page pe bhejo
  function goToThankYou() {
    window.location.href = THANKYOU_PAGE;
  }

  // Submit form
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    formErr.textContent = '';

    var valid = true;

    fields.forEach(function (input) {
      if (!validateField(input)) {
        valid = false;
      }
    });

    if (!validateTerms()) {
      valid = false;
    }

    if (!valid) return;

    if (
      !SHEET_URL ||
      SHEET_URL.indexOf('https://') !== 0 ||
      SHEET_URL.indexOf('/exec') === -1
    ) {
      formErr.textContent =
        'Google Sheets connection is not configured.';
      return;
    }

    // Data sent to Google Apps Script
    var data = new URLSearchParams();

    data.append('name', form.elements.namedItem('name').value.trim());
    data.append('phone', form.elements.namedItem('phone').value.trim());
    data.append('email', form.elements.namedItem('email').value.trim());
    data.append('page', window.location.href);
    data.append(
      'terms',
      termsCheckbox.checked ? 'Accepted' : 'Not accepted'
    );
    data.append('telegramLink', TELEGRAM_LINK);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data
    })
      .then(function () {
        /*
         * no-cors cannot confirm whether the row
         * was actually saved in Google Sheets.
         */
        goToThankYou();
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
