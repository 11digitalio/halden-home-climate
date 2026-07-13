"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const PHONE = "(480) 555-0148";
const TEL = "tel:+14805550148";

type IconName = "air" | "rings" | "home" | "repair" | "replace" | "care" | "quality" | "arrow" | "phone" | "check";

function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    air: <><path d="M3 8h11c3 0 3-4 0-4" /><path d="M3 12h16c3 0 3 4 0 4" /><path d="M3 16h8" /></>,
    rings: <><circle cx="12" cy="12" r="7" /><path d="M12 8v5l3 2" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>,
    home: <><path d="m3 11 9-7 9 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M9 20v-6h6v6" /></>,
    repair: <><path d="M6 18 18 6" /><path d="m15 4 5 5" /><path d="m4 15 5 5" /><path d="M8 5.5A5 5 0 0 0 5.5 8" /></>,
    replace: <><path d="M7 7h10v10H7z" /><path d="M4 9V5h4M20 15v4h-4" /><path d="m4 5 3 3M20 19l-3-3" /></>,
    care: <><path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z" /><path d="M8 12h2l1-2 2 5 1-3h2" /></>,
    quality: <><path d="M12 3c3 4 7 6.5 7 11a7 7 0 0 1-14 0c0-4.5 4-7 7-11Z" /><path d="M8.5 15c2-1.5 5-1.5 7 0" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    phone: <path d="M7.6 3.8 5.3 5.2c-.9.6-1.2 1.7-.8 2.7 2.1 5.3 6.3 9.5 11.6 11.6 1 .4 2.1.1 2.7-.8l1.4-2.3-4.8-3-1.6 1.6c-2.1-1.1-3.8-2.8-4.9-4.9l1.6-1.6-2.9-4.7Z" />,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...common}>{paths[name]}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <svg className="monogram" viewBox="0 0 42 42" role="img" aria-label="Halden monogram"><path d="M8 6v30M34 6v30M8 21h26" /><path className="logo-air" d="M5 26c7-8 17-9 32-8" /></svg>;
  }
  return (
    <svg className="wordmark" viewBox="0 0 230 50" role="img" aria-label="Halden Home Climate">
      <g className="mark"><path d="M4 5v34M32 5v34M4 22h28" /><path className="logo-air" d="M1 27c9-9 20-10 34-9" /></g>
      <text x="48" y="27">HALDEN</text><text className="descriptor" x="49" y="43">HOME CLIMATE</text>
    </svg>
  );
}

const symptoms = [
  { label: "The air is warm", category: "Cooling diagnostic", copy: "Warm air can point to airflow, electrical, refrigerant, or equipment issues. A focused diagnostic visit is the right first step.", cta: "Book a cooling visit" },
  { label: "The system is noisy", category: "System evaluation", copy: "New rattles, grinding, or buzzing are worth checking early. We’ll isolate the source and explain whether it needs attention now.", cta: "Schedule an evaluation" },
  { label: "The energy bill jumped", category: "Performance check", copy: "A sudden change may come from controls, airflow, wear, or the building envelope. We’ll check the system before recommending a fix.", cta: "Book a performance check" },
  { label: "I’m planning a replacement", category: "Replacement consultation", copy: "We’ll assess the home, talk through comfort priorities, and compare practical system options without steering you toward the highest price.", cta: "Plan my replacement" },
];

const faqs = [
  ["Do you offer same-day appointments?", "When the schedule allows, yes. We hold capacity for time-sensitive cooling problems and will always give you the clearest available arrival window before you book."],
  ["What happens during a diagnostic visit?", "A technician listens to what changed, inspects the relevant system components, tests performance, and shares clear written options before any repair begins."],
  ["How do I know whether to repair or replace?", "We compare system age, repair history, comfort, efficiency, and the cost of the current repair. You’ll see the tradeoffs in plain language and make the final call."],
  ["Do you work on heat pumps?", "Yes. We diagnose, maintain, and replace residential heat pumps, including high-efficiency and variable-speed systems common in Valley homes."],
  ["Which areas do you serve?", "We serve Phoenix, Scottsdale, Paradise Valley, Tempe, Mesa, Chandler, Gilbert, and nearby East Valley communities."],
  ["Can I schedule maintenance before summer?", "Yes. Early spring is an ideal time for a cooling tune-up, though maintenance can be scheduled any time your system needs a careful check."],
];

function ServiceMap() {
  return (
    <svg className="service-map" viewBox="0 0 620 450" role="img" aria-label="Abstract map showing Halden service coverage across Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, and the East Valley">
      <path className="map-radius" d="M153 236c17-92 82-157 189-169 107-12 194 44 222 140 29 101-32 183-136 208-106 25-232-10-268-103-10-26-12-51-7-76Z" />
      <g className="roads"><path d="M28 198c106-31 179-13 264 34s186 58 301 24" /><path d="M54 355c97-26 180-67 247-129 74-68 129-96 279-117" /><path d="M244 31c23 82 28 157 18 223-11 75-2 124 35 177" /><path d="M419 24c-12 75-7 138 18 188 28 57 31 118 11 211" /><path d="M92 90c82 43 158 59 226 48 92-15 169 2 242 53" /></g>
      <g className="map-points"><circle cx="185" cy="206" r="7" /><circle cx="350" cy="136" r="7" /><circle cx="295" cy="280" r="7" /><circle cx="439" cy="257" r="7" /><circle cx="320" cy="355" r="7" /><circle cx="442" cy="359" r="7" /></g>
      <g className="map-labels"><text x="128" y="188">PHOENIX</text><text x="366" y="126">SCOTTSDALE</text><text x="245" y="271">TEMPE</text><text x="457" y="248">MESA</text><text x="253" y="383">CHANDLER</text><text x="457" y="386">GILBERT</text></g>
      <path className="map-wash" d="M487 175c32 37 43 78 31 124" /><text className="map-east" x="495" y="322">EAST VALLEY</text>
    </svg>
  );
}

export default function HaldenSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [symptom, setSymptom] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const choosePlan = () => {
    const select = document.getElementById("need") as HTMLSelectElement | null;
    if (select) select.value = "Halden Care";
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();
    if (name.length < 2) next.name = "Please enter your name.";
    if (phone.length !== 10) next.phone = "Enter a 10-digit phone number.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!/^\d{5}$/.test(zip)) next.zip = "Enter a 5-digit ZIP code.";
    if (!data.get("need")) next.need = "Choose what you need help with.";
    setErrors(next);
    if (!Object.keys(next).length) { setSuccess(true); requestAnimationFrame(() => formRef.current?.focus()); }
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner shell">
          <a href="#top" className="brand-link" aria-label="Halden Home Climate home"><Logo /></a>
          <span className="sample-label">Sample concept</span>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#services">Services</a><a href="#why">Why Halden</a><a href="#process">Process</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a>
          </nav>
          <div className="header-actions"><a className="phone-link" href={TEL}><Icon name="phone" size={18} /> {PHONE}</a><a className="button button-small" href="#contact">Book service</a></div>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <nav aria-label="Mobile navigation"><a onClick={closeMenu} href="#services">Services</a><a onClick={closeMenu} href="#why">Why Halden</a><a onClick={closeMenu} href="#process">Process</a><a onClick={closeMenu} href="#reviews">Reviews</a><a onClick={closeMenu} href="#faq">FAQ</a></nav>
          <div className="mobile-menu-actions"><a className="button" onClick={closeMenu} href="#contact">Book service</a><a className="text-link" href={TEL}>Call {PHONE}</a></div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid shell">
            <div className="hero-copy reveal">
              <p className="eyebrow">Heating + cooling for the Valley</p>
              <h1>Comfort, <em>without the</em> runaround.</h1>
              <p className="hero-deck">Same-day heating and cooling service across Phoenix, Scottsdale, and the East Valley, with clear options before any work begins.</p>
              <div className="hero-actions"><a className="button" href="#contact">Book a service visit <Icon name="arrow" size={20} /></a><a className="button-secondary" href={TEL}>Call {PHONE}</a></div>
              <p className="availability"><span /> Appointments available this week</p>
            </div>
            <div className="hero-media reveal">
              <Image unoptimized src="/images/halden-hero.jpg" alt="Technician inspecting an outdoor heat-pump system beside a Phoenix home" width={1536} height={1024} priority sizes="(max-width: 820px) 100vw, 50vw" />
              <div className="hero-note"><span>01</span><p>Careful diagnosis.<br />Clear next steps.</p></div>
            </div>
          </div>
        </section>

        <section className="trust-rail" aria-label="Halden service promises">
          <div className="shell trust-grid">
            <div><Icon name="rings" /><span>Clear, written options</span></div><div><Icon name="home" /><span>Respectful in-home service</span></div><div><Icon name="air" /><span>Built for desert conditions</span></div>
          </div>
        </section>

        <section className="symptom section" aria-labelledby="symptom-title">
          <div className="shell symptom-grid">
            <div className="section-intro reveal"><p className="eyebrow">Start here</p><h2 id="symptom-title">What changed<br />at home?</h2><p>Start with the symptom. We’ll point you toward the right kind of visit.</p></div>
            <div className="symptom-tool reveal">
              <div className="symptom-options" role="tablist" aria-label="Choose a home comfort symptom">
                {symptoms.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={symptom === index} aria-controls="symptom-panel" id={`symptom-${index}`} onClick={() => setSymptom(index)}><span>0{index + 1}</span>{item.label}<Icon name="arrow" size={20} /></button>)}
              </div>
              <div className="recommendation" id="symptom-panel" role="tabpanel" aria-labelledby={`symptom-${symptom}`} key={symptom}>
                <p className="eyebrow">Recommended next step</p><h3>{symptoms[symptom].category}</h3><p>{symptoms[symptom].copy}</p><div><a className="button button-light" href="#contact">{symptoms[symptom].cta}</a><a className="text-link light-link" href={TEL}>Or call {PHONE}</a></div>
              </div>
            </div>
          </div>
        </section>

        <section className="services section" id="services" aria-labelledby="services-title">
          <div className="shell">
            <div className="services-heading reveal"><p className="eyebrow">Residential services</p><h2 id="services-title">Everything your home needs <em>to feel right.</em></h2></div>
            <div className="service-list">
              <article className="service-row service-feature reveal"><div className="service-number">01</div><div className="service-icon"><Icon name="repair" size={34} /></div><div><h3>Same-day AC repair</h3><p>Diagnosis and repair for weak airflow, warm air, unusual noises, short cycling, and systems that stop altogether.</p><a href="#contact">Book a repair <Icon name="arrow" size={18} /></a></div></article>
              <article className="service-row reveal"><div className="service-number">02</div><div className="service-icon"><Icon name="replace" size={34} /></div><div><h3>System replacement</h3><p>Straightforward replacement guidance based on your home, priorities, and budget, not the most expensive equipment on the page.</p><a href="#contact">Plan a replacement <Icon name="arrow" size={18} /></a></div></article>
              <article className="service-row reveal"><div className="service-number">03</div><div className="service-icon"><Icon name="care" size={34} /></div><div><h3>Seasonal maintenance</h3><p>Thorough tune-ups designed to catch wear early and keep the system performing through desert heat.</p><a href="#care">See maintenance options <Icon name="arrow" size={18} /></a></div></article>
              <article className="service-row reveal"><div className="service-number">04</div><div className="service-icon"><Icon name="quality" size={34} /></div><div><h3>Indoor air quality</h3><p>Filtration, humidity, ventilation, and air-quality improvements selected around the way your household actually lives.</p><a href="#contact">Talk through your home <Icon name="arrow" size={18} /></a></div></article>
            </div>
          </div>
        </section>

        <section className="editorial-break reveal" aria-label="A comfortable Phoenix living room">
          <Image unoptimized src="/images/halden-interior.jpg" alt="Sunlit Phoenix living room with a sheer curtain moving gently in the airflow" width={1536} height={1024} sizes="100vw" />
          <div className="editorial-copy"><p>The temperature should be the <em>least interesting</em> thing about your home.</p></div>
        </section>

        <section className="why section" id="why" aria-labelledby="why-title">
          <div className="shell why-grid">
            <div className="why-media reveal"><Image unoptimized src="/images/halden-technical.jpg" alt="Technician using a multimeter to carefully diagnose a residential climate-control system" width={1448} height={1086} sizes="(max-width: 820px) 100vw, 42vw" /><p><span>Methodical by design</span> Every recommendation starts with a careful look at what is actually happening.</p></div>
            <div className="why-content reveal"><p className="eyebrow">Why Halden</p><h2 id="why-title">Good service starts before the wrench.</h2>
              <div className="principle"><span>01</span><div><h3>Know the plan</h3><p>You get clear options and practical explanations before deciding what happens next.</p></div></div>
              <div className="principle"><span>02</span><div><h3>Respect the space</h3><p>Clean work areas, thoughtful scheduling, and communication that doesn’t leave you guessing.</p></div></div>
              <div className="principle"><span>03</span><div><h3>Understand the climate</h3><p>Recommendations shaped around long cooling seasons, extreme heat, and Phoenix-area homes.</p></div></div>
            </div>
          </div>
        </section>

        <section className="process section" id="process" aria-labelledby="process-title">
          <div className="shell"><div className="process-head reveal"><p className="eyebrow">The visit</p><h2 id="process-title">Three steps. <em>No mystery.</em></h2><p>From the first note to the final walkthrough, you’ll always know what comes next.</p></div>
            <ol className="timeline reveal"><li><span>01</span><div><h3>Book</h3><p>Tell us what changed and choose the easiest way to reach you.</p></div></li><li><span>02</span><div><h3>Diagnose</h3><p>A technician evaluates the system and explains what is happening in plain language.</p></div></li><li><span>03</span><div><h3>Decide</h3><p>Review clear options and choose what makes sense for the home and budget.</p></div></li></ol>
          </div>
        </section>

        <section className="care section" id="care" aria-labelledby="care-title">
          <div className="shell care-wrap reveal">
            <div className="care-copy"><p className="eyebrow">Halden Care</p><h2 id="care-title">Comfort works better with a little foresight.</h2><p>Seasonal maintenance, priority scheduling, and a system history that stays organized year after year.</p><button type="button" className="button button-light" onClick={choosePlan}>Explore Halden Care <Icon name="arrow" size={20} /></button></div>
            <div className="care-benefits"><p>Included every year</p><ul><li><Icon name="check" size={20} />Two seasonal visits</li><li><Icon name="check" size={20} />Priority appointment access</li><li><Icon name="check" size={20} />Documented system history</li><li><Icon name="check" size={20} />Member repair savings</li></ul></div>
          </div>
        </section>

        <section className="reviews section" id="reviews" aria-labelledby="reviews-title">
          <div className="shell"><div className="reviews-head reveal"><p className="eyebrow">In their words</p><h2 id="reviews-title">Service people remember <em>for the right reasons.</em></h2></div>
            <div className="review-grid">
              <blockquote className="reveal"><p>“They explained the repair in plain English and had the house cooling before dinner.”</p><footer><span>Marisol A., Chandler</span><small>Sample testimonial</small></footer></blockquote>
              <blockquote className="reveal"><p>“No pressure and no mystery fees. Just clear options and a clean installation.”</p><footer><span>Daniel R., Scottsdale</span><small>Sample testimonial</small></footer></blockquote>
              <blockquote className="reveal"><p>“The whole experience felt organized from the first text through the final walkthrough.”</p><footer><span>Priya S., Tempe</span><small>Sample testimonial</small></footer></blockquote>
            </div>
          </div>
        </section>

        <section className="service-area section" aria-labelledby="area-title">
          <div className="shell area-grid"><div className="area-copy reveal"><p className="eyebrow">Service area</p><h2 id="area-title">Comfort across the Valley.</h2><p>Local context matters. Halden is built around desert homes, long cooling seasons, and the neighborhoods we move through every day.</p><div className="area-list"><span>Phoenix</span><span>Scottsdale</span><span>Paradise Valley</span><span>Tempe</span><span>Mesa</span><span>Chandler</span><span>Gilbert</span><span>East Valley communities</span></div></div><div className="map-wrap reveal"><ServiceMap /></div></div>
        </section>

        <section className="detail-break reveal"><Image unoptimized src="/images/halden-detail.jpg" alt="Linear air vent set into a softly lit plaster wall" width={1672} height={941} sizes="100vw" /><div><span>Quiet systems.</span><span>Thoughtful homes.</span></div></section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="shell faq-grid"><div className="faq-intro reveal"><p className="eyebrow">Common questions</p><h2 id="faq-title">A clear answer is a good place to start.</h2><p>Don’t see what you need? Call us and we’ll help point you in the right direction.</p><a className="text-link" href={TEL}>{PHONE}</a></div>
            <div className="faq-list reveal">{faqs.map(([question, answer], index) => { const open = openFaq === index; return <div className={`faq-item ${open ? "is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={open} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} onClick={() => setOpenFaq(open ? null : index)}><span>{question}</span><i aria-hidden="true" /></button></h3><div className="faq-answer" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`}><div><p>{answer}</p></div></div></div>; })}</div>
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <div className="contact-copy reveal"><p className="eyebrow">Book service</p><h2 id="contact-title">Tell us what your home is doing.</h2><p>Share a few details and we’ll help arrange the right kind of visit. Prefer to talk now?</p><a className="contact-phone" href={TEL}><Icon name="phone" size={24} />{PHONE}</a><div className="contact-note"><span>Appointments available this week</span><p>Phoenix, Scottsdale, and the East Valley</p></div></div>
            <div className="form-card reveal" ref={formRef} tabIndex={-1}>
              {success ? <div className="success-state" role="status"><div className="success-icon"><Icon name="check" size={34} /></div><p className="eyebrow">Request noted</p><h3>Thanks. This is exactly what the next step would feel like.</h3><p>Because Halden is a fictional portfolio concept, no information was transmitted. In a live build, your service team would follow up here.</p><button className="text-link" type="button" onClick={() => setSuccess(false)}>Start another request</button></div> :
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row"><Field label="Name" name="name" placeholder="Your name" error={errors.name} autoComplete="name" /><Field label="Phone" name="phone" placeholder="(480) 555-0123" error={errors.phone} autoComplete="tel" inputMode="tel" /></div>
                <div className="form-row"><Field label="Email" name="email" type="email" placeholder="you@example.com" error={errors.email} autoComplete="email" /><Field label="ZIP code" name="zip" placeholder="85250" error={errors.zip} autoComplete="postal-code" inputMode="numeric" /></div>
                <label className={`field ${errors.need ? "has-error" : ""}`} htmlFor="need"><span>What do you need help with?</span><select id="need" name="need" defaultValue="" aria-describedby={errors.need ? "need-error" : undefined} aria-invalid={!!errors.need}><option value="" disabled>Choose a service</option><option>AC repair</option><option>System replacement</option><option>Seasonal maintenance</option><option>Indoor air quality</option><option>Halden Care</option><option>Not sure yet</option></select>{errors.need && <small id="need-error">{errors.need}</small>}</label>
                <fieldset><legend>Preferred contact method</legend><label><input type="radio" name="contactMethod" value="Phone" defaultChecked /><span>Phone</span></label><label><input type="radio" name="contactMethod" value="Text" /><span>Text</span></label><label><input type="radio" name="contactMethod" value="Email" /><span>Email</span></label></fieldset>
                <label className="field" htmlFor="message"><span>Short message <em>Optional</em></span><textarea id="message" name="message" placeholder="Tell us what changed, when you noticed it, or anything else that may help." rows={4} /></label>
                <button className="button submit-button" type="submit">Request a service visit <Icon name="arrow" size={20} /></button><p className="demo-note">Demonstration form only. No information is submitted or stored.</p>
              </form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><Logo /><p>Clear options, thoughtful service, and a home that feels right again.</p></div><div><p className="footer-label">Explore</p><a href="#services">Services</a><a href="#why">Why Halden</a><a href="#process">Process</a><a href="#faq">FAQ</a></div><div><p className="footer-label">Get in touch</p><a href={TEL}>{PHONE}</a><a href="#contact">Book service</a><span>Phoenix + the East Valley</span></div><div className="footer-concept"><p>Sample concept</p><span>Fictional business created for portfolio demonstration.</span></div></div><div className="shell footer-bottom"><span>© 2026 Halden Home Climate</span><a href="#top">Back to top ↑</a></div></footer>

      <div className="mobile-conversion" aria-label="Quick actions"><a href={TEL}><Icon name="phone" size={20} />Call</a><a href="#contact">Book service</a></div>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, error, autoComplete, inputMode }: { label: string; name: string; type?: string; placeholder: string; error?: string; autoComplete?: string; inputMode?: "tel" | "numeric" }) {
  const errorId = `${name}-error`;
  return <label className={`field ${error ? "has-error" : ""}`} htmlFor={name}><span>{label}</span><input id={name} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} />{error && <small id={errorId}>{error}</small>}</label>;
}
