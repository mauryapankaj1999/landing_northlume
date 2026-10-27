// console.log('[DEBUG] main.js v3 loaded');

// (function () {
//   'use strict';

//   var SHEET_URL =
//     'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

//   var TELEGRAM_LINK = 'https://t.me/northlume';

//   var AUTO_OPEN_DELAY = 3000;
//   var THANKYOU_PAGE = 'thankyou.html';

//   var modal = document.getElementById('modal');
//   var form = document.getElementById('reg-form');
//   var formView = document.getElementById('form-view');
//   var thanksView = document.getElementById('thanks-view');
//   var submitBtn = document.getElementById('submit-btn');
//   var formErr = document.getElementById('form-err');
//   var termsCheckbox = document.getElementById('terms');

//   console.log('[DEBUG] elements found:', {
//     modal: !!modal,
//     form: !!form,
//     formView: !!formView,
//     thanksView: !!thanksView,
//     submitBtn: !!submitBtn,
//     formErr: !!formErr,
//     termsCheckbox: !!termsCheckbox
//   });

//   if (
//     !modal ||
//     !form ||
//     !formView ||
//     !thanksView ||
//     !submitBtn ||
//     !formErr ||
//     !termsCheckbox
//   ) {
//     console.error('[DEBUG] Required form elements are missing. Script stopped.');
//     return;
//   }

//   var lastFocus = null;
//   var autoOpenTimer = null;

//   // ---------- Modal ----------
//   function openModal() {
//     console.log('[DEBUG] openModal called');
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

//   function closeModal() {
//     console.log('[DEBUG] closeModal called');
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
//     if (event.key === 'Escape' && modal.classList.contains('open')) {
//       closeModal();
//     }
//   });

//   autoOpenTimer = setTimeout(function () {
//     if (!modal.classList.contains('open')) {
//       console.log('[DEBUG] auto-open popup');
//       openModal();
//     }
//   }, AUTO_OPEN_DELAY);

//   // ---------- Phone helper ----------
//   function normalizePhone(raw) {
//     var digits = String(raw).replace(/\D/g, '');

//     if (digits.length > 10) {
//       if (digits.indexOf('91') === 0) {
//         digits = digits.slice(2);
//       } else if (digits.indexOf('0') === 0) {
//         digits = digits.slice(1);
//       }
//     }

//     var result = digits.slice(0, 10);
//     console.log('[DEBUG] normalizePhone:', raw, '->', result);
//     return result;
//   }

//   // ---------- Validation rules ----------
//   var rules = {
//     name: function (value) {
//       return value.length >= 2 ? '' : 'Please enter your name.';
//     },

//   phone: function (value) {
//   var v = value.trim();
//   console.log('[DEBUG] phone rule check:', v, 'length:', v.length);

//   if (v.length === 0) {
//     return 'Please enter your phone number.';
//   }
//   if (!/^[0-9]+$/.test(v)) {
//     return 'Phone number must contain digits only.';
//   }
//   if (v.length < 10) {
//     return 'Phone number must be exactly 10 digits. You entered ' + v.length + '.';
//   }
//   if (v.length > 10) {
//     return 'Phone number cannot be more than 10 digits.';
//   }
//   return '';
// },

//     email: function (value) {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
//         ? ''
//         : 'Enter a valid email address.';
//     }
//   };

//   function validateField(input) {
//     var rule = rules[input.name];
//     if (!rule) return true;

//     var message = rule(input.value.trim());
//     console.log('[DEBUG] validateField:', input.name, '| message:', message || 'OK');

//     input.classList.toggle('invalid', !!message);
//     input.setAttribute('aria-invalid', message ? 'true' : 'false');

//     var errorElement = input.parentNode.querySelector('.err');
//     if (!errorElement) {
//       console.warn('[DEBUG] .err element not found for', input.name);
//     } else {
//       errorElement.textContent = message;
//     }

//     return !message;
//   }

//   function validateTerms() {
//     var errorElement = form.querySelector('.temrs_conten .err');

//     if (!termsCheckbox.checked) {
//       console.log('[DEBUG] terms NOT checked');
//       if (errorElement) {
//         errorElement.textContent = 'Please accept the Terms & Conditions.';
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

//   var phoneInput = form.querySelector('input[name="phone"]');
//   console.log('[DEBUG] fields count:', fields.length, '| phoneInput found:', !!phoneInput);

//   // ---------- Phone input behaviour ----------
//   if (phoneInput) {
//     phoneInput.setAttribute('type', 'tel');
//     phoneInput.setAttribute('inputmode', 'numeric');
//     phoneInput.removeAttribute('maxlength');
//     phoneInput.removeAttribute('minlength');

//     phoneInput.addEventListener('input', function () {
//       var cleaned = normalizePhone(phoneInput.value);

//       if (phoneInput.value !== cleaned) {
//         phoneInput.value = cleaned;
//       }

//       if (phoneInput.classList.contains('invalid')) {
//         validateField(phoneInput);
//       }
//     });
//   }

//   // ---------- Live validation ----------
//   fields.forEach(function (input) {
//     input.addEventListener('input', function () {
//       if (input.name !== 'phone' && input.classList.contains('invalid')) {
//         validateField(input);
//       }
//     });

//     input.addEventListener('blur', function () {
//       if (input.value.trim() !== '') {
//         validateField(input);
//       }
//     });
//   });

//   termsCheckbox.addEventListener('change', validateTerms);

//   function goToThankYou() {
//     console.log('[DEBUG] redirecting to', THANKYOU_PAGE);
//     window.location.href = THANKYOU_PAGE;
//   }

//   // ---------- Submit ----------
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log('[DEBUG] submit handler fired');
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

//     console.log(
//       '[DEBUG] final validation result -> valid:',
//       valid,
//       '| phone:',
//       form.elements.namedItem('phone').value
//     );

//     if (!valid) {
//       console.log('[DEBUG] BLOCKED: form invalid, not sending');
//       return;
//     }

//     if (
//       !SHEET_URL ||
//       SHEET_URL.indexOf('https://') !== 0 ||
//       SHEET_URL.indexOf('/exec') === -1
//     ) {
//       console.error('[DEBUG] SHEET_URL invalid');
//       formErr.textContent = 'Google Sheets connection is not configured.';
//       return;
//     }

//     var data = new URLSearchParams();

// var params = new URLSearchParams(window.location.search);

// var utmFields = [
//   "utm_source",
//   "utm_medium",
//   "utm_campaign",
//   "adsetName",
//   "adName",
//   "utm_adgroup",
//   "utm_content",
//   "utm_term"
// ];

// utmFields.forEach(function (key) {
//   data.append(key, params.get(key) || "");
// });
//     data.append('name', form.elements.namedItem('name').value.trim());
//     data.append('phone', form.elements.namedItem('phone').value.trim());
//     data.append('email', form.elements.namedItem('email').value.trim());
//     data.append('page', window.location.href);
//     data.append('terms', termsCheckbox.checked ? 'Accepted' : 'Not accepted');
//     data.append('telegramLink', TELEGRAM_LINK);

//     console.log('[DEBUG] sending data:', data.toString());

//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Submitting...';

//     fetch(SHEET_URL, {
//       method: 'POST',
//       mode: 'no-cors',
//       body: data
//     })
//       .then(function () {
//         console.log('[DEBUG] fetch finished (no-cors, result unknown)');
//         goToThankYou();
//       })
//       .catch(function (error) {
//         console.error('[DEBUG] fetch failed:', error);

//         formErr.textContent = 'Unable to submit. Please try again.';
//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Register Now';
//       });
//   });

//   console.log('[DEBUG] all listeners attached');
// })();


console.log('[DEBUG] main.js v3 loaded');

(function () {
  'use strict';

  var SHEET_URL =
    'https://script.google.com/a/macros/northlume.in/s/AKfycbzPDr0tTUQx9k96vMRKn18V9tQ0ZVnfHSSXg4swIL0ht2sKGWDsd0xmESm4gPDumwQZXA/exec';

  var TELEGRAM_LINK = 'https://t.me/northlume';

  var AUTO_OPEN_DELAY = 3000;

  var modal = document.getElementById('modal');
  var form = document.getElementById('reg-form');
  var formView = document.getElementById('form-view');
  var thanksView = document.getElementById('thanks-view');
  var submitBtn = document.getElementById('submit-btn');
  var formErr = document.getElementById('form-err');
  var termsCheckbox = document.getElementById('terms');

  console.log('[DEBUG] elements found:', {
    modal: !!modal,
    form: !!form,
    formView: !!formView,
    thanksView: !!thanksView,
    submitBtn: !!submitBtn,
    formErr: !!formErr,
    termsCheckbox: !!termsCheckbox
  });

  if (
    !modal ||
    !form ||
    !formView ||
    !thanksView ||
    !submitBtn ||
    !formErr ||
    !termsCheckbox
  ) {
    console.error('[DEBUG] Required form elements are missing. Script stopped.');
    return;
  }

  var lastFocus = null;
  var autoOpenTimer = null;

  // ---------- Modal ----------
  function openModal() {
    console.log('[DEBUG] openModal called');
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

  function closeModal() {
    console.log('[DEBUG] closeModal called');
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
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  autoOpenTimer = setTimeout(function () {
    if (!modal.classList.contains('open')) {
      console.log('[DEBUG] auto-open popup');
      openModal();
    }
  }, AUTO_OPEN_DELAY);

  // ---------- Phone helper ----------
  function normalizePhone(raw) {
    var digits = String(raw).replace(/\D/g, '');

    if (digits.length > 10) {
      if (digits.indexOf('91') === 0) {
        digits = digits.slice(2);
      } else if (digits.indexOf('0') === 0) {
        digits = digits.slice(1);
      }
    }

    var result = digits.slice(0, 10);
    console.log('[DEBUG] normalizePhone:', raw, '->', result);
    return result;
  }

  // ---------- Validation rules ----------
  var rules = {
    name: function (value) {
      return value.length >= 2 ? '' : 'Please enter your name.';
    },

    phone: function (value) {
      var v = value.trim();
      console.log('[DEBUG] phone rule check:', v, 'length:', v.length);

      if (v.length === 0) {
        return 'Please enter your phone number.';
      }
      if (!/^[0-9]+$/.test(v)) {
        return 'Phone number must contain digits only.';
      }
      if (v.length < 10) {
        return 'Phone number must be exactly 10 digits. You entered ' + v.length + '.';
      }
      if (v.length > 10) {
        return 'Phone number cannot be more than 10 digits.';
      }
      return '';
    },

    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
        ? ''
        : 'Enter a valid email address.';
    }
  };

  function validateField(input) {
    var rule = rules[input.name];
    if (!rule) return true;

    var message = rule(input.value.trim());
    console.log('[DEBUG] validateField:', input.name, '| message:', message || 'OK');

    input.classList.toggle('invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    var errorElement = input.parentNode.querySelector('.err');
    if (!errorElement) {
      console.warn('[DEBUG] .err element not found for', input.name);
    } else {
      errorElement.textContent = message;
    }

    return !message;
  }

  function validateTerms() {
    var errorElement = form.querySelector('.temrs_conten .err');

    if (!termsCheckbox.checked) {
      console.log('[DEBUG] terms NOT checked');
      if (errorElement) {
        errorElement.textContent = 'Please accept the Terms & Conditions.';
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

  var phoneInput = form.querySelector('input[name="phone"]');
  console.log('[DEBUG] fields count:', fields.length, '| phoneInput found:', !!phoneInput);

  // ---------- Phone input behaviour ----------
  if (phoneInput) {
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('inputmode', 'numeric');
    phoneInput.removeAttribute('maxlength');
    phoneInput.removeAttribute('minlength');

    phoneInput.addEventListener('input', function () {
      var cleaned = normalizePhone(phoneInput.value);

      if (phoneInput.value !== cleaned) {
        phoneInput.value = cleaned;
      }

      if (phoneInput.classList.contains('invalid')) {
        validateField(phoneInput);
      }
    });
  }

  // ---------- Live validation ----------
  fields.forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.name !== 'phone' && input.classList.contains('invalid')) {
        validateField(input);
      }
    });

    input.addEventListener('blur', function () {
      if (input.value.trim() !== '') {
        validateField(input);
      }
    });
  });

  termsCheckbox.addEventListener('change', validateTerms);

  // ---------- Thank you (no redirect) ----------
  function showThankYou() {
    console.log('[DEBUG] showing thank you view (no redirect)');
    formView.hidden = true;
    thanksView.hidden = false;
  }

  // ---------- Submit ----------
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('[DEBUG] submit handler fired');
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

    console.log(
      '[DEBUG] final validation result -> valid:',
      valid,
      '| phone:',
      form.elements.namedItem('phone').value
    );

    if (!valid) {
      console.log('[DEBUG] BLOCKED: form invalid, not sending');
      return;
    }

    if (
      !SHEET_URL ||
      SHEET_URL.indexOf('https://') !== 0 ||
      SHEET_URL.indexOf('/exec') === -1
    ) {
      console.error('[DEBUG] SHEET_URL invalid');
      formErr.textContent = 'Google Sheets connection is not configured.';
      return;
    }

    var data = new URLSearchParams();

    // UTM / ad tracking fields
    var params = new URLSearchParams(window.location.search);


    console.log(
  "[UTM DEBUG] Current page URL:",
  window.location.href
);

console.log(
  "[UTM DEBUG] Parsed parameters:",
  Object.fromEntries(params.entries())
);
    var utmFields = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'adsetName',
      'adName',
      'utm_adgroup',
      'utm_content',
      'utm_term'
    ];

    utmFields.forEach(function (key) {
      data.append(key, params.get(key) || '');
    });

    data.append('name', form.elements.namedItem('name').value.trim());
    data.append('phone', form.elements.namedItem('phone').value.trim());
    data.append('email', form.elements.namedItem('email').value.trim());
    console.log('[SUBMIT DEBUG] URL being saved:', window.location.href);
    data.append('page', window.location.href);
    data.append('terms', termsCheckbox.checked ? 'Accepted' : 'Not accepted');
    data.append('telegramLink', TELEGRAM_LINK);

    console.log('[DEBUG] sending data:', data.toString());

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data
    })
      .then(function () {
        console.log('[DEBUG] fetch finished (no-cors, result unknown)');
        showThankYou();
      })
      .catch(function (error) {
        console.error('[DEBUG] fetch failed:', error);

        formErr.textContent = 'Unable to submit. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
      });
  });

  console.log('[DEBUG] all listeners attached');
})();