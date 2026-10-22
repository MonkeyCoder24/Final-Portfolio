
/*
  Emmanuel WEBS — CLIENT PAYMENT SYSTEM

  1. Create your payment links in Stripe.
  2. Paste each link into the configuration below.
  3. Save this file and test your buttons.

  Never put Stripe secret API keys in this file.
*/

const PAYMENT_LINKS = {
  landing: "https://buy.stripe.com/5kQ5kEbSL2IYgR99VZ4Ja06", // Paste your Stripe landing page link here
  starter: "https://buy.stripe.com/8x2eVe6yr4R66cv8RV4Ja01", // Paste your Stripe starter package link here
  Business: "https://buy.stripe.com/8x2eVebSL5Va58r1pt4Ja03", // Paste your Stripe standard package link here
  premium: "https://buy.stripe.com/3cI9AU5ungzO30jc474Ja00", // Paste your Stripe premium package link here
  Redesign: "https://buy.stripe.com/28E3cwcWP5VadEXc474Ja04", // Paste your Stripe custom package link here
  Maintenance: "https://buy.stripe.com/28EdRae0T4R6eJ19VZ4Ja05", // Paste your Stripe maintenance package link here
  deposit: "", // Paste your Stripe deposit link here
  balance: "", // Paste your Stripe final-balance link here
  invoice: ""  // Optional: paste a general invoice payment link
};

const BUSINESS_EMAIL = "hello@Emmanuelwebs.com";

// Configure each payment button on payment.html.
document.querySelectorAll("[data-payment]").forEach((button) => {
  const paymentType = button.dataset.payment;
  const paymentUrl = PAYMENT_LINKS[paymentType];

  if (paymentUrl && isValidStripeLink(paymentUrl)) {
    button.href = paymentUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    return;
  }

  // If no payment link is configured, direct the client
  // to request the appropriate payment link by email.
  const subjects = {
    deposit: "Request Project Deposit Payment Link",
    balance: "Request Final Balance Payment Link",
    invoice: "Request Custom Invoice Payment Link"
  };

  button.href =
    "mailto:" +
    BUSINESS_EMAIL +
    "?subject=" +
    encodeURIComponent(
      subjects[paymentType] || "Payment Question"
    );
});

function isValidStripeLink(url) {
  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === "https:" &&
      (
        parsedUrl.hostname === "buy.stripe.com" ||
        parsedUrl.hostname === "checkout.stripe.com"
      )
    );
  } catch {
    return false;
  }
}

// Log a reminder in the browser console if payment links are missing.
Object.entries(PAYMENT_LINKS).forEach(([type, url]) => {
  if (!url) {
    console.info(
      `Emmanuel Webs: Add your Stripe ${type} payment link when ready.`
    );
  }
});


document.querySelectorAll("[data-payment]").forEach((button) => {
  const paymentType = button.dataset.payment;
  const paymentUrl = PAYMENT_LINKS[paymentType];

  if (
    paymentUrl &&
    paymentUrl.startsWith("https://buy.stripe.com/")
  ) {
    button.href = paymentUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else if (paymentType === "invoice" || 
             paymentType === "deposit" ||
             paymentType === "balance") {
    const subjects = {
      invoice: "Request a Website Project Invoice",
      deposit: "Request a Website Project Deposit Link",
      balance: "Request a Website Final Balance Link"
    };

    button.href =
      "mailto:" + BUSINESS_EMAIL +
      "?subject=" +
      encodeURIComponent(subjects[paymentType]);
  } else {
    button.removeAttribute("href");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      alert("This payment link has not been configured yet.");
    });
  }
});
