"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("locked");

  const C = window.WEDDING_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const opening = $("#openingScreen");
  const openButton = $("#openInvitationButton");
  const music = $("#backgroundMusic");
  const musicButton = $("#musicButton");

  const acceptButton = $("#acceptButton");
  const declineButton = $("#declineButton");
  const acceptFields = $("#acceptFields");
  const form = $("#rsvpForm");
  const status = $("#formStatus");
  const successPopup = $("#successPopup");

  let attendance = "";

  function applyConfig() {
    $$('[data-groom]').forEach(el => el.textContent = C.groom || "Prashanth");
    $$('[data-bride]').forEach(el => el.textContent = C.bride || "Bhavya Sri");

    const wedding = C.wedding || {};
    const lunch = C.lunch || {};

    const weddingTime = $("#weddingTimeText");
    const weddingDate = $("#weddingDateText");
    const churchName = $("#churchNameText");
    const churchAddress = $("#churchAddressText");
    const weddingMap = $("#weddingMapLink");
    const venueMap = $("#venueMapLink");

    if (weddingTime) weddingTime.textContent = wedding.time || "3:00 PM";
    if (weddingDate) weddingDate.textContent = wedding.date || "September 26, 2026";
    if (churchName) churchName.textContent = wedding.church || "Abundant Grace Church";
    if (churchAddress) churchAddress.textContent = wedding.address || "127 Rockingham Rd, Derry, NH 03038";
    if (weddingMap) weddingMap.href = wedding.mapsUrl || "#";
    if (venueMap) venueMap.href = wedding.mapsUrl || "#";

    const lunchTitle = $("#lunchTitleText");
    const lunchTime = $("#lunchTimeText");
    const lunchVenue = $("#lunchVenueText");
    const lunchAddress = $("#lunchAddressText");

    if (lunchTitle) lunchTitle.textContent = lunch.title || "Lunch & Fellowship";
    if (lunchTime) lunchTime.textContent = lunch.time || "Immediately after the wedding ceremony";
    if (lunchVenue) lunchVenue.textContent = lunch.venue || wedding.church || "Abundant Grace Church";
    if (lunchAddress) lunchAddress.textContent = lunch.address || wedding.address || "127 Rockingham Rd, Derry, NH 03038";

    const verse = $("#verseText");
    const verseRef = $("#verseReference");
    const footerDate = $("#footerDate");

    if (verse) verse.textContent = `“${C.bibleVerse || ""}”`;
    if (verseRef) verseRef.textContent = C.bibleReference || "";
    if (footerDate) footerDate.textContent = `${wedding.date || ""} · ${wedding.time || ""}`;
  }

  function initAmbientCanvas() {
    const canvas = $("#ambientCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: Math.min(54, Math.max(26, Math.floor(width / 18))) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 4,
        vx: -0.14 + Math.random() * 0.28,
        vy: 0.08 + Math.random() * 0.34,
        alpha: 0.07 + Math.random() * 0.22
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y -= p.vy;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        glow.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
        glow.addColorStop(0.25, `rgba(128,208,255,${p.alpha * 0.62})`);
        glow.addColorStop(1, "rgba(128,208,255,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();
  }


  function initSitePetals() {
    const wrap = $("#sitePetals");
    if (!wrap) return;
    for (let i = 0; i < 20; i += 1) {
      const petal = document.createElement("span");
      petal.className = "site-petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--dur", `${12 + Math.random() * 10}s`);
      petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
      petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      wrap.appendChild(petal);
    }
  }

  function initOpeningEffects() {
    const petals = $("#openingPetals");
    const trail = $("#sparkleTrail");

    if (petals) {
      for (let i = 0; i < 28; i += 1) {
        const petal = document.createElement("span");
        petal.className = "opening-petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `${-10 - Math.random() * 100}%`;
        petal.style.setProperty("--dur", `${8 + Math.random() * 8}s`);
        petal.style.setProperty("--delay", `${-Math.random() * 12}s`);
        petal.style.setProperty("--drift", `${-95 + Math.random() * 190}px`);
        petals.appendChild(petal);
      }
    }

    window.setInterval(() => {
      if (!trail || !opening || opening.classList.contains("opening-hidden")) return;
      const sparkle = document.createElement("span");
      sparkle.style.setProperty("--sx", `${-65 + Math.random() * 130}px`);
      sparkle.style.setProperty("--sy", `${-35 + Math.random() * 70}px`);
      trail.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 1400);
    }, 120);
  }

  async function openInvitation() {
    opening?.classList.add("opening-hidden");
    document.body.classList.remove("locked");

    try {
      await music.play();
      musicButton?.classList.add("playing");
      const icon = $(".music-icon", musicButton);
      if (icon) icon.textContent = "Ⅱ";
    } catch (error) {
      // Browsers may block audio; invitation still opens normally.
    }
  }

  openButton?.addEventListener("click", openInvitation);

  musicButton?.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.classList.add("playing");
        const icon = $(".music-icon", musicButton);
        if (icon) icon.textContent = "Ⅱ";
      } catch (error) {}
    } else {
      music.pause();
      musicButton.classList.remove("playing");
      const icon = $(".music-icon", musicButton);
      if (icon) icon.textContent = "♪";
    }
  });

  function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.14 });

    $$(".reveal-on-scroll").forEach(el => observer.observe(el));
  }

  function initTilt() {
    $$('[data-tilt]').forEach(card => {
      card.addEventListener("pointermove", event => {
        if (window.innerWidth < 760) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1150px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateZ(8px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  function initParallax() {
    function parallax() {
      $$(".hero-photo,.countdown-photo,.faith-photo,.venue-photo,.rsvp-backdrop,.verse-photo").forEach((el, index) => {
        const section = el.parentElement;
        const rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const shift = (rect.top / window.innerHeight) * (index % 2 ? 24 : 36);
          el.style.transform = `scale(1.1) translate3d(0,${shift}px,0)`;
        }
      });
    }

    window.addEventListener("scroll", parallax, { passive: true });
    parallax();
  }

  function updateCountdown() {
    const target = new Date(C.wedding?.countdownISO || "2026-09-26T15:00:00-04:00").getTime();
    const distance = target - Date.now();

    const values = distance <= 0 ? [0, 0, 0, 0] : [
      Math.floor(distance / 86400000),
      Math.floor((distance % 86400000) / 3600000),
      Math.floor((distance % 3600000) / 60000),
      Math.floor((distance % 60000) / 1000)
    ];

    ["days", "hours", "minutes", "seconds"].forEach((id, index) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(values[index]).padStart(2, "0");
    });
  }

  function setMealDisabled(disabled) {
    if (!acceptFields) return;
    $$("input", acceptFields).forEach(input => {
      input.disabled = disabled;
      if (disabled) input.checked = false;
    });
  }

  function chooseAccept() {
    attendance = "accept";
    acceptButton?.classList.add("active");
    declineButton?.classList.remove("active");
    acceptFields?.classList.remove("hidden");
    setMealDisabled(false);
  }

  function chooseDecline() {
    attendance = "decline";
    declineButton?.classList.add("active");
    acceptButton?.classList.remove("active");
    acceptFields?.classList.add("hidden");
    setMealDisabled(true);
  }

  acceptButton?.addEventListener("click", chooseAccept);
  declineButton?.addEventListener("click", chooseDecline);

  function showSuccess() {
    successPopup?.classList.add("show");
    document.body.classList.add("locked");
  }

  function hideSuccess() {
    successPopup?.classList.remove("show");
    document.body.classList.remove("locked");
  }

  $("#closeSuccessPopup")?.addEventListener("click", hideSuccess);

  async function sendRsvp(record) {
    const email = C.rsvpEmail || "";
    const configured = email.includes("@") && !email.includes("YOUR_EMAIL");

    if (!configured) {
      const saved = JSON.parse(localStorage.getItem("weddingRsvps") || "[]");
      saved.push(record);
      localStorage.setItem("weddingRsvps", JSON.stringify(saved));
      return { local: true };
    }

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `Wedding RSVP: ${record.name}`,
        Name: record.name,
        Phone: record.phone,
        Attendance: record.attendance,
        Meal: record.meal || "Not applicable",
        Blessings: record.message || ""
      })
    });

    if (!response.ok) throw new Error("RSVP send failed");
    return response.json();
  }

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!attendance) {
      status.textContent = "Please choose Joyfully Accept or Regretfully Decline.";
      status.classList.add("error");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

  

    const record = {
      submittedAt: new Date().toISOString(),
      name: $("#guestName").value.trim(),
      attendance: attendance === "accept" ? "Joyfully Accept" : "Regretfully Decline",
      message: $("#blessingMessage").value.trim()
    };

    const submitButton = $("#submitRsvpButton");
    submitButton.disabled = true;
    const oldText = submitButton.firstChild.textContent;
    submitButton.firstChild.textContent = "Sending RSVP ";

    try {
      const result = await sendRsvp(record);
      status.textContent = result.local
        ? "RSVP saved on this device. Add your email in config.js to receive responses."
        : "RSVP sent successfully.";
      status.classList.add("success");
      showSuccess();

      form.reset();
      attendance = "";
      acceptButton.classList.remove("active");
      declineButton.classList.remove("active");
      acceptFields.classList.add("hidden");
      setMealDisabled(true);
    } catch (error) {
      status.textContent = "Could not send RSVP. Please check rsvpEmail in config.js.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.firstChild.textContent = oldText;
    }
  });

  applyConfig();
  initAmbientCanvas();
  initOpeningEffects();
  initSitePetals();
  initScrollReveal();
  initTilt();
  initParallax();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // RSVP starts with no attendance selected and meal preference hidden.
  acceptFields?.classList.add("hidden");
  setMealDisabled(true);
});
