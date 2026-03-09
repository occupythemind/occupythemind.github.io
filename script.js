const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

function sendMail(event) {
  event.preventDefault(); // prevent page reload

  const btn = event.target.querySelector(".btn-fill");
  btn.disabled = true;
  btn.textContent = "Sending...";

  const params = {
    name: event.target.name.value,
    email: event.target.email.value,
    message: event.target.message.value,
    reply_to: event.target.email.value
  };

  emailjs.send("service_nm4y13h", "portfoliomsgtmp_ji9deom", params)
    .then((response) => {
      console.log("SUCCESS:", response);
      btn.textContent = "Message sent ✓";
      btn.style.background = "#4c00b8";

      // Clear form **only on success**
      event.target.reset();

      // Optional: re-enable after a short delay
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Send Message";
        btn.style.background = ""; // restore original style
      }, 3000);

    }, (error) => {
      console.error("FAILED:", error);

      // Restore button so user can retry
      btn.disabled = false;
      btn.textContent = "Send Message";

      // Do NOT clear form, so user can fix/resend
      alert("Message failed to send. Please try again.");
    });
}
