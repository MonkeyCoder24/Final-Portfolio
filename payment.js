/*
  Emmanuel Webs — Client Payment System

  Keep your public Stripe Payment Links here.
  Never place Stripe secret API keys in front-end JavaScript.
*/

const PAYMENT_LINKS = {
  // Full-package checkout links
  landing: "https://buy.stripe.com/5kQ5kEbSL2IYgR99VZ4Ja06",
  starter: "https://buy.stripe.com/8x2eVe6yr4R66cv8RV4Ja01",
  business: "https://buy.stripe.com/8x2eVebSL5Va58r1pt4Ja03",
  premium: "https://buy.stripe.com/3cI9AU5ungzO30jc474Ja00",
  redesign: "https://buy.stripe.com/28E3cwcWP5VadEXc474Ja04",
  maintenance: "https://buy.stripe.com/28EdRae0T4R6eJ19VZ4Ja05",

  // Add separate Stripe links here when you create them.
  // These are for project-specific amounts, not full package prices.
  deposit: "",
  balance: "",
  invoice: ""
};

// Replace with the email address you actively monitor for client requests.
const BUSINESS_EMAIL = "hello@Emmanuelwebs.com";

const EMAIL_SUBJECTS = {
  deposit: "Request Project Deposit Payment Link",
  balance: "Request Final Balance Payment Link",
  invoice: "Request Custom Invoice Payment Link"
};

function isValidStripeLink(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "buy.stripe.com" ||
        url.hostname === "checkout.stripe.com")
    );
  } catch {
    return false;
  }
}

function makeEmailRequest(subject) {
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// Configure every package and client-payment button once.
document.querySelectorAll("[data-payment]").forEach((button) => {
  const paymentType = button.dataset.payment;
  const paymentUrl = PAYMENT_LINKS[paymentType];

  if (paymentUrl && isValidStripeLink(paymentUrl)) {
    button.href = paymentUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    return;
  }

  if (Object.prototype.hasOwnProperty.call(EMAIL_SUBJECTS, paymentType)) {
    button.href = makeEmailRequest(EMAIL_SUBJECTS[paymentType]);
    return;
  }

  // Prevent an unconfigured package button from jumping to the top of the page.
  button.removeAttribute("href");
  button.setAttribute("aria-disabled", "true");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.alert("This payment link is not configured yet. Please contact Emanuel Webs.");
  });
});

// Helpful reminders while testing locally.
["deposit", "balance", "invoice"].forEach((type) => {
  if (!PAYMENT_LINKS[type]) {
    console.info(`Emanuel Webs: ${type} payment link is not set; the button will open an email request.`);
  }
});
