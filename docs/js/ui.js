/* UI wiring: three-pane trainer (instructions · editor · output). */
(() => {

const $  = s => document.querySelector(s);
const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
const esc = s => String(s == null ? "" : s).replace(/[&<>]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));

const STORE = "javaclasses.v1";
let state = { idx: 0, code: {}, done: {}, hintsShown: {} };

function load() {
  try { Object.assign(state, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) {}
  state.code = state.code || {}; state.done = state.done || {}; state.hintsShown = state.hintsShown || {};
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }

const ex = () => EXERCISES[state.idx];
const keyFor = (x, f) => x.id + "::" + f;
function codeOf(x, f) {
  const k = keyFor(x, f.name);
  return (state.code[k] !== undefined) ? state.code[k] : f.code;
}

/* ------------------------------------------------------------- editor */
let cm = null, activeFile = null;

function initEditor() {
  cm = CodeMirror.fromTextArea($("#code"), {
    mode: "text/x-java", theme: "material-darker", lineNumbers: true,
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    autoCloseBrackets: true, matchBrackets: true, lineWrapping: false
  });
  cm.on("change", () => {
    const x = ex(), f = x.files.find(f => f.name === activeFile);
    if (!f || f.readonly) return;
    state.code[keyFor(x, f.name)] = cm.getValue();
    save();
    flash("saved locally");
  });
}
let flashTimer = null;
function flash(msg) {
  const n = $("#autosave"); n.textContent = "saving…";
  clearTimeout(flashTimer); flashTimer = setTimeout(() => { n.textContent = msg; }, 350);
}

function openFile(name) {
  const x = ex(), f = x.files.find(f => f.name === name);
  if (!f) return;
  activeFile = name;
  cm.setValue(codeOf(x, f));
  cm.setOption("readOnly", !!f.readonly);
  $("#robanner").hidden = !f.readonly;
  cm.refresh();
  renderTabs();
}

function renderTabs() {
  const t = $("#tabs"); t.innerHTML = "";
  for (const f of ex().files) {
    const b = el("button", "tab" + (f.name === activeFile ? " active" : ""),
      esc(f.name) + (f.readonly ? '<span class="lock">🔒</span>' : ""));
    b.onclick = () => openFile(f.name);
    t.appendChild(b);
  }
}

/* ------------------------------------------------------- instructions */
function renderInstructions() {
  const x = ex(), b = $("#instructions");
  b.innerHTML = "";
  b.appendChild(el("div", "eyebrow", esc(x.section) + (x.capstone ? " · Capstone" : "")));
  b.appendChild(el("h1", null, esc(x.title)));
  b.appendChild(el("p", "goal", esc(x.goal)));
  if (x.concept) b.appendChild(el("div", "concept", x.concept));

  b.appendChild(el("h2", "sub", "Your task"));
  const ol = el("ol", "steps");
  x.steps.forEach(s => ol.appendChild(el("li", null, s)));
  b.appendChild(ol);

  if (x.note) b.appendChild(el("div", "note", x.note));

  // hints, revealed one at a time
  const hbox = el("div", "hintbox");
  const shown = state.hintsShown[x.id] || 0;
  for (let i = 0; i < shown && i < x.hints.length; i++)
    hbox.appendChild(el("div", "hint", "<b>Hint " + (i + 1) + ".</b> " + x.hints[i]));
  if (shown < x.hints.length) {
    const more = el("button", "linkbtn", shown === 0 ? "Show a hint" : "Show another hint");
    more.onclick = () => { state.hintsShown[x.id] = shown + 1; save(); renderInstructions(); };
    hbox.appendChild(more);
  }
  b.appendChild(hbox);

  // solution, only after a genuine attempt (predict-mode exercises have none)
  const editable = x.files.filter(f => !f.readonly);
  const attempted = editable.some(f => state.code[keyFor(x, f.name)] !== undefined);
  if (editable.length) {
  const sol = el("details", "solution");
  sol.appendChild(el("summary", null, "Show the solution"));
  if (!attempted) {
    sol.appendChild(el("div", null,
      '<p class="empty" style="padding:12px 13px">Have a go first — edit the code and press ' +
      '<b>Check answer</b>. The solution unlocks once you have written something.</p>'));
  } else {
    for (const f of x.files.filter(f => !f.readonly)) {
      sol.appendChild(el("div", null, '<div style="padding:8px 13px 0;font-family:var(--mono);font-size:12px;color:var(--muted)">' + esc(f.name) + "</div>"));
      const pre = el("pre", "console");
      pre.style.background = "#0f1729";
      pre.textContent = SOLUTIONS[x.id] && SOLUTIONS[x.id][f.name] ? SOLUTIONS[x.id][f.name] : "(not available)";
      sol.appendChild(pre);
    }
  }
  b.appendChild(sol);
  }

  if (x.explain) {
    const d = el("details", "solution");
    d.appendChild(el("summary", null, "Why it prints that"));
    const wrap = el("div", null, "");
    wrap.style.padding = "4px 13px 12px";
    x.explain.forEach(p => wrap.appendChild(el("p", null, p)));
    d.appendChild(wrap);
    b.appendChild(d);
  }
}

/* -------------------------------------------------------------- output */
let outTab = "console", last = null;

function setOut(tab) {
  outTab = tab;
  document.querySelectorAll(".otab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  renderOut();
}

function consoleHTML() {
  const x = ex();
  if (x.mode === "predict") {
    const saved = state.code[keyFor(x, "__prediction")] || "";
    return '<div style="padding:16px">' +
      '<p style="margin:0 0 10px;font-size:13.5px;color:var(--muted)">Type the exact output you expect, then press <b>Check answer</b>.</p>' +
      '<textarea class="predict" id="predict" placeholder="START&#10;A: built ...">' + esc(saved) + "</textarea></div>";
  }
  if (!last) return '<pre class="console"><span class="sys">Press Run to compile and execute your code.</span></pre>';
  if (last.fatal) return '<pre class="console"><span class="err">Internal error: ' + esc(last.fatal) + "</span></pre>";
  if (!last.compiled)
    return '<pre class="console"><span class="err">' + esc(last.diagnostics || "Compilation failed.") + "</span></pre>";
  let body = esc(last.stdout || "");
  if (last.runError) body += '\n<span class="err">' + esc(last.runError) + "</span>";
  if (!last.stdout && !last.runError) body = '<span class="sys">(compiled, no output)</span>';
  return '<pre class="console">' + body + "</pre>";
}

function expectedHTML() {
  const x = ex();
  if (!x.expected) return '<div class="body"><p class="empty">This exercise has no fixed expected output.</p></div>';
  let h = '<div style="padding:16px">';
  if (x.expectedNote) h += '<div class="note" style="margin:0 0 14px">' + x.expectedNote + "</div>";
  if (last && last.compiled && x.mode !== "predict") {
    const d = Engine.diffOutput(last.stdout, x.expected);
    h += '<div class="banner ' + (d.match ? "ok" : "bad") + '"><b>' +
         (d.match ? "Output matches exactly." : "Output does not match yet.") + "</b>" +
         (d.match ? "Every line is identical to the expected output."
                  : "The differing lines are highlighted below.") + "</div>";
    h += '<div class="diff">';
    d.rows.forEach(r => {
      h += '<div class="row ' + (r.ok ? "" : "bad") + '"><div class="n">' + r.line + "</div><div>";
      if (r.ok) h += esc(r.expected === undefined ? "" : r.expected);
      else {
        h += '<div class="want"><span class="lbl">want</span>' + esc(r.expected === undefined ? "(nothing)" : r.expected) + "</div>";
        h += '<div class="got"><span class="lbl">got</span>' + esc(r.actual === undefined ? "(nothing)" : r.actual) + "</div>";
      }
      h += "</div></div>";
    });
    h += "</div>";
  } else {
    h += '<pre class="console" style="border-radius:8px">' + esc(x.expected) + "</pre>";
  }
  return h + "</div>";
}

function checksHTML() {
  const x = ex();
  if (!last) return '<div class="body"><p class="empty">Press <b>Check answer</b> to grade your code.</p></div>';
  if (!last.compiled)
    return '<div class="body"><div class="banner bad"><b>It does not compile yet.</b>Fix the compiler errors in the Console tab first — the checks cannot run until the code builds.</div></div>';

  const total = last.checks.length + (x.expected ? 1 : 0);
  const outOk = !x.expected || Engine.diffOutput(last.stdout, x.expected).match;
  const passed = last.checks.filter(c => c.pass).length + (x.expected && outOk ? 1 : 0);
  const all = passed === total;

  let h = '<div class="body">';
  h += '<div class="banner ' + (all ? "ok" : "bad") + '"><b>' +
       (all ? "All checks passed — exercise complete." : passed + " of " + total + " checks passed.") + "</b>" +
       (all ? "Move on with the ›  button." : "Each failure below says exactly what to change.") + "</div>";

  h += '<ul class="checks">';
  if (x.expected) {
    h += '<li class="' + (outOk ? "pass" : "fail") + '"><span class="mark">' + (outOk ? "✓" : "✕") + "</span><div><div>Program output matches exactly</div>" +
         '<div class="detail">' + (outOk ? "Every line matches." : "See the Expected tab for a line-by-line diff.") + "</div></div></li>";
  }
  last.checks.forEach(c => {
    h += '<li class="' + (c.pass ? "pass" : "fail") + '"><span class="mark">' + (c.pass ? "✓" : "✕") + "</span><div><div>" +
         esc(c.label) + (c.source ? '<span class="tagsrc">source</span>' : "") + "</div>" +
         '<div class="detail">' + c.detail + "</div></div></li>";
  });
  h += "</ul></div>";
  return h;
}

function renderOut() {
  const b = $("#outbody");
  b.innerHTML = outTab === "console" ? consoleHTML()
              : outTab === "expected" ? expectedHTML()
              : checksHTML();
  const pred = $("#predict");
  if (pred) pred.oninput = () => { state.code[keyFor(ex(), "__prediction")] = pred.value; save(); };
}

/* --------------------------------------------------------------- actions */
function busy(on, msg) {
  $("#run").disabled = on; $("#check").disabled = on;
  $("#status").innerHTML = on ? '<span class="spinner"></span>' + esc(msg || "Working…") : "";
}

function currentFiles() {
  const x = ex(), out = {};
  for (const f of x.files) {
    out[f.name] = (f.name === activeFile && !f.readonly) ? cm.getValue() : codeOf(x, f);
  }
  return out;
}

async function doRun(grade) {
  const x = ex();

  if (x.mode === "predict" && grade) {
    busy(true, "Running…");
    try {
      const res = await Engine.submit(x, currentFiles());
      last = res;
      const guess = state.code[keyFor(x, "__prediction")] || "";
      const d = Engine.diffOutput(guess, res.stdout);
      last.predictMatch = d.match;
      if (d.match) { state.done[x.id] = true; save(); }
      renderProgress();
      $("#outbody").innerHTML =
        '<div class="body"><div class="banner ' + (d.match ? "ok" : "bad") + '"><b>' +
        (d.match ? "Your prediction was exactly right." : "Not quite — compare the two below.") + "</b>" +
        (d.match ? "You traced constructor chaining, the static counter and aliasing correctly."
                 : "Read the differences, then look at “Why it prints that”.") +
        "</div><h2 class=\"sub\">Your prediction vs the real output</h2><div class=\"diff\">" +
        d.rows.map(r => '<div class="row ' + (r.ok ? "" : "bad") + '"><div class="n">' + r.line + "</div><div>" +
          (r.ok ? esc(r.expected || "")
                : '<div class="want"><span class="lbl">actual</span>' + esc(r.expected === undefined ? "(nothing)" : r.expected) + "</div>" +
                  '<div class="got"><span class="lbl">yours</span>' + esc(r.actual === undefined ? "(nothing)" : r.actual) + "</div>") +
          "</div></div>").join("") + "</div></div>";
      document.querySelectorAll(".otab").forEach(t => t.classList.remove("active"));
    } finally { busy(false); }
    return;
  }

  busy(true, grade ? "Compiling and checking…" : "Compiling and running…");
  try {
    last = await Engine.submit(x, currentFiles());
    if (grade) {
      const outOk = !x.expected || Engine.diffOutput(last.stdout, x.expected).match;
      const all = last.compiled && outOk && last.checks.every(c => c.pass);
      state.done[x.id] = all; save();
      renderProgress();
      setOut(last.compiled ? "checks" : "console");
      const dot = $("#checkdot");
      dot.className = "dot " + (all ? "ok" : "bad");
    } else {
      setOut("console");
    }
  } catch (e) {
    last = { compiled: false, diagnostics: "Engine error: " + Engine.describe(e), checks: [] };
    setOut("console");
  } finally { busy(false); }
}

/* --------------------------------------------------------------- chrome */
function renderProgress() {
  const done = EXERCISES.filter(x => state.done[x.id]).length;
  $("#progtext").textContent = done + " / " + EXERCISES.length;
  $("#progbar").style.width = (done / EXERCISES.length * 100) + "%";
  renderPicker();
}

function renderPicker() {
  const p = $("#picker");
  const cur = state.idx;
  p.innerHTML = "";
  EXERCISES.forEach((x, i) => {
    const o = el("option", null, (state.done[x.id] ? "✓ " : "") + x.section + " — " + x.title);
    o.value = i;
    p.appendChild(o);
  });
  p.value = cur;
  $("#prev").disabled = cur === 0;
  $("#next").disabled = cur === EXERCISES.length - 1;
}

function go(i) {
  state.idx = Math.max(0, Math.min(EXERCISES.length - 1, i));
  save();
  last = null;
  $("#checkdot").className = "dot";
  renderInstructions();
  const first = ex().files.find(f => !f.readonly) || ex().files[0];
  openFile(first.name);
  setOut(ex().mode === "predict" ? "console" : "console");
  renderProgress();
}

/* ----------------------------------------------------------------- boot */
async function main() {
  load();
  initEditor();

  $("#picker").onchange = e => go(+e.target.value);
  $("#prev").onclick = () => go(state.idx - 1);
  $("#next").onclick = () => go(state.idx + 1);
  $("#run").onclick = () => doRun(false);
  $("#check").onclick = () => doRun(true);
  $("#reset").onclick = () => {
    const x = ex();
    if (!confirm("Discard your code for this exercise and restore the starter?")) return;
    x.files.forEach(f => delete state.code[keyFor(x, f.name)]);
    save(); go(state.idx);
  };
  $("#hintbtn").onclick = () => {
    const x = ex();
    state.hintsShown[x.id] = Math.min((state.hintsShown[x.id] || 0) + 1, x.hints.length);
    save(); renderInstructions();
    $("#instructions").scrollTop = $("#instructions").scrollHeight;
  };
  document.querySelectorAll(".otab").forEach(t => t.onclick = () => setOut(t.dataset.tab));
  window.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); doRun(true); }
  });

  go(state.idx);

  try {
    await Engine.boot(msg => { $("#bootmsg").textContent = msg; });
    $("#boot").hidden = true;
    $("#app").hidden = false;
    cm.refresh();
  } catch (e) {
    const b = $("#boot");
    b.classList.add("failed");
    b.querySelector(".card").innerHTML =
      "<h2>The Java toolchain could not start</h2>" +
      "<p>" + esc(Engine.describe(e)) + "</p>" +
      '<p class="note">This needs a modern browser with WebAssembly, and the page must be served over ' +
      "http(s) — opening the file directly from disk will not work. Try reloading; if it persists, " +
      "the course text and all solutions are still readable in the repository.</p>";
  }
}

document.addEventListener("DOMContentLoaded", main);
})();
