const ENDPOINT = "YOUR_EXEC_URL";

document.querySelector("#comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.querySelector("#status");
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },  // avoids the CORS preflight Apps Script can't answer
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const out = await res.json();
    status.textContent = out.ok ? "Posted!" : "Something went wrong.";
    if (out.ok) form.reset();
  } catch {
    status.textContent = "Something went wrong.";
  }
});