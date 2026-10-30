const ENDPOINT = "https://script.google.com/macros/s/AKfycbxh6Zz4WKtSNrck0sEbBap-r0HTAX8Be00c7-h3nMx7JFBFVlN6TNa2jtfgKV0fwoqs/exec";

const form = document.querySelector("#comment-form");
const status = document.querySelector("#status");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.disabled = true;
  status.textContent = "Sending...";

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      // text/plain avoids a CORS preflight, which Apps Script can't answer
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const out = await res.json();
    status.textContent = out.ok ? "Black badge claimed!" : "Something went wrong.";
    if (out.ok) form.reset();
  } catch {
    status.textContent = "Something went wrong.";
  } finally {
    button.disabled = false;
  }
});