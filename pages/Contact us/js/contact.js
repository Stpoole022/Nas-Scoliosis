/* NA Scoliosis Foundation: Contact Us page behaviour
   1. Mobile navigation toggle
   2. Contact form validation and submission

   SUBMISSION: the site has no form backend yet, so by default the form opens the visitor's
   email app with their message ready to send. This never claims a message was sent.
   To send messages directly, create a free form endpoint (for example Formspree or Web3Forms)
   and paste its URL into FORM_ENDPOINT below. A success message is then shown only when the
   service confirms it received the message. */

(function () {
  "use strict";

  var FOUNDATION_EMAIL = "nascoli.foundation@gmail.com";
  var FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/your-form-id"

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Form ---------- */
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var statusBox = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) {
      if (!v) return "Please tell us your full name.";
      if (v.length < 2) return "Your name needs at least 2 characters.";
      return "";
    },
    email: function (v) {
      if (!v) return "Please enter your email address so we can reply.";
      if (!EMAIL_PATTERN.test(v)) return "That email address doesn't look right. It should look like name@example.com.";
      return "";
    },
    topic: function (v) {
      return v ? "" : "Please choose the reason for contacting us.";
    },
    message: function (v) {
      if (!v) return "Please write a message so we know how to help.";
      if (v.length < 10) return "Please write a little more (at least 10 characters).";
      return "";
    }
  };

  function fieldWrap(input) { return input.closest(".field"); }

  function showError(input, message) {
    var wrap = fieldWrap(input);
    var out = document.getElementById(input.id + "-error");
    if (message) {
      wrap.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
    } else {
      wrap.classList.remove("invalid");
      input.removeAttribute("aria-invalid");
    }
    out.textContent = message;
  }

  function validateField(input) {
    var message = rules[input.name](input.value.trim());
    showError(input, message);
    return !message;
  }

  var inputs = Object.keys(rules).map(function (name) { return form.elements[name]; });

  inputs.forEach(function (input) {
    input.addEventListener("blur", function () { if (input.value !== "" || input.dataset.touched) validateField(input); input.dataset.touched = "1"; });
    input.addEventListener("input", function () { if (fieldWrap(input).classList.contains("invalid")) validateField(input); });
  });

  function setStatus(kind, html) {
    statusBox.className = "status " + kind;
    statusBox.innerHTML = html;
    statusBox.focus();
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function values() {
    return {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      topic: form.elements.topic.value,
      message: form.elements.message.value.trim()
    };
  }

  function submitToEndpoint(data) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusBox.className = "status";
    statusBox.textContent = "";

    return fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, topic: data.topic, message: data.message, _subject: "Website enquiry: " + data.topic })
    }).then(function (res) {
      if (!res.ok) throw new Error("Request failed with status " + res.status);
      form.reset();
      setStatus("success", "<p><strong>Thank you, " + escapeHtml(data.name) + ".</strong></p><p>Your message has been sent to the NA Scoliosis Foundation.</p>");
    }).catch(function () {
      setStatus("problem", "<p><strong>Your message could not be sent.</strong></p><p>Please try again, or email us directly at <a href=\"mailto:" + FOUNDATION_EMAIL + "\">" + FOUNDATION_EMAIL + "</a> or message us on WhatsApp.</p>");
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    });
  }

  function openEmailDraft(data) {
    var subject = "Website enquiry: " + data.topic;
    var body = "Name: " + data.name + "\nEmail: " + data.email + "\nReason: " + data.topic + "\n\n" + data.message;
    var url = "mailto:" + FOUNDATION_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    setStatus("info",
      "<p><strong>Almost there, " + escapeHtml(data.name) + ".</strong></p>" +
      "<p>Your email app should now open with your message ready. Press <em>Send</em> there to deliver it. Your message has not been sent until you do.</p>" +
      "<p>If nothing opened, <a href=\"" + url + "\">click here to open the draft</a>, or email <a href=\"mailto:" + FOUNDATION_EMAIL + "\">" + FOUNDATION_EMAIL + "</a> directly.</p>");

    window.location.href = url;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var firstInvalid = null;
    inputs.forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      statusBox.className = "status";
      statusBox.textContent = "";
      firstInvalid.focus();
      return;
    }

    // Spam trap: a filled hidden field means a bot. Pretend success, send nothing.
    if (form.elements.website.value) {
      form.reset();
      return;
    }

    var data = values();
    if (FORM_ENDPOINT) {
      submitToEndpoint(data);
    } else {
      openEmailDraft(data);
    }
  });
})();
