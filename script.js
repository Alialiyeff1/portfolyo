// ====== BURANI REDAKTƏ ET: layihələr və bloq yazıları ======
// link boş ("") qalsa, "Bax" düyməsi göstərilmir.

const projects = [
  {
    title: "Şəxsi veb sayt",
    desc: "HTML, CSS və JavaScript ilə hazırladığım bu portfolio saytı.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: ""
  },
  {
    title: "Layihə adı (Nümünə)",
    desc: "Bura layihənin qısa təsvirini yaz (nümunə).",
    tags: ["React", "MySQL"],
    link: "https://github.com/Alialiyeff1"
  },
  {
    title: "Layihə adı (Nümünə)",
    desc: "Bura layihənin qısa təsvirini yaz (nümunə).",
    tags: ["Java"],
    link: ""
  }
];

const posts = [
  {
    title: "Kibertəhlükəsizliyə ilk addımlarım",
    date: "2026-10-04",
    desc: "Full stack developer kimi niyə təhlükəsizlik sahəsinə keçmək istəyirəm (Sevdiyim sahədir və çox marağım var).",
    link: ""
  },
  {
    title: "Veb təhlükəsizliyi: OWASP Top 10 nədir?",
    date: "2026-10-04",
    desc: "Ən çox rast gəlinən veb zəifliklərinin qısa icmalı (nümunə yazı).",
    link: ""
  }
];


// Yazı efekti
const words = ["Full Stack Developer", "Kibertəhlükəsizlik Yolçusu"];
const typedEl = document.getElementById("typed");
let w = 0, i = 0, deleting = false;
(function tick() {
  const word = words[w];
  typedEl.textContent = word.slice(0, i);
  if (!deleting && i === word.length) { deleting = true; return setTimeout(tick, 1400); }
  if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; }
  i += deleting ? -1 : 1;
  setTimeout(tick, deleting ? 40 : 80);
})();

// Mövzu dəyişmə
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById("theme").addEventListener("click", () => {
  const dark = getComputedStyle(root).getPropertyValue("--bg").trim() === "#0b0f14";
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mətni təhlükəsiz şəkildə HTML-ə çevir
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Layihələr
document.getElementById("projectList").innerHTML = projects.map(p => `
  <article class="card project">
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <div class="chips">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Bax →</a>` : ""}
  </article>`).join("");

// Bloq yazıları
document.getElementById("postList").innerHTML = posts.map(p => {
  const tag = p.link ? "a" : "div";
  const href = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
  return `
  <${tag} class="card post"${href}>
    <time datetime="${esc(p.date)}">${esc(p.date)}</time>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
  </${tag}>`;
}).join("");

document.getElementById("year").textContent = new Date().getFullYear();
