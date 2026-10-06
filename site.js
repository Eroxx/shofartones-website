// Discord invite, in one place. Every [data-discord] link uses it; empty hides them all.
var DISCORD = "";
(function () {
  document.querySelectorAll("[data-discord]").forEach(function (a) {
    if (!DISCORD) { a.hidden = true; return; }
    a.hidden = false; a.href = DISCORD; a.target = "_blank"; a.rel = "noopener";
  });
})();

// Support email, in one place. Every [data-email] element shows it; empty hides them.
var SUPPORT_EMAIL = "";
(function () {
  document.querySelectorAll("[data-email]").forEach(function (row) {
    if (!SUPPORT_EMAIL) { row.hidden = true; return; }
    row.hidden = false;
    var code = row.querySelector("code");
    if (code) code.textContent = SUPPORT_EMAIL;
    var link = row.querySelector("a[data-mailto]");
    if (link) link.href = "mailto:" + SUPPORT_EMAIL + "?subject=Shofar%20Tones";
  });
  document.querySelectorAll("[data-no-email]").forEach(function (el) { el.hidden = !!SUPPORT_EMAIL; });
})();

// "Hear it": one clip at a time, each call's button shows when it's playing.
(function () {
  var audio = new Audio(), current = null;
  function reset() { if (current) { current.classList.remove("on"); current.textContent = "▶ Hear it"; current = null; } }
  audio.addEventListener("ended", reset);
  document.querySelectorAll("[data-clip]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (current === b) { audio.pause(); reset(); return; }
      reset(); audio.src = "audio/" + b.dataset.clip + ".m4a"; audio.play();
      current = b; b.classList.add("on"); b.textContent = "■ Stop";
    });
  });
})();
