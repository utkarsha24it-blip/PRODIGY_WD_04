/**
 * Utkarsha Tarde — Personal Portfolio
 * Single-file React JSX (all components + styles embedded)
 * Aesthetic: Dark editorial, cream/amber accents, geometric minimal
 */

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected into <head>)
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #0d0d0d;
    --surface:  #141414;
    --border:   #2a2a2a;
    --text:     #e8e2d5;
    --muted:    #7a7267;
    --accent:   #c9a84c;
    --accent2:  #e8c97a;
    --white:    #f5f0e8;
    --font-display: 'Playfair Display', serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'DM Mono', monospace;
    --radius:   4px;
    --transition: 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: var(--bg); }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* ── SHARED ── */
  .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

  .section {
    padding: 6rem 0;
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .section-label::after {
    content: '';
    display: block;
    height: 1px;
    width: 40px;
    background: var(--accent);
    opacity: 0.5;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: var(--white);
    line-height: 1.15;
    margin-bottom: 1rem;
  }

  .section-sub {
    color: var(--muted);
    font-size: 1rem;
    max-width: 500px;
    margin-bottom: 3rem;
  }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.8rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    border: none;
  }
  .btn-primary {
    background: var(--accent);
    color: var(--bg);
  }
  .btn-primary:hover { background: var(--accent2); transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  /* ── REVEAL ANIMATION ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     NAVBAR
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.25rem 0;
    transition: background var(--transition), padding var(--transition);
  }
  .navbar.scrolled {
    background: rgba(13,13,13,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    padding: 0.9rem 0;
  }
  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .navbar-logo {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--white);
    text-decoration: none;
    letter-spacing: -0.01em;
  }
  .navbar-logo span { color: var(--accent); }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 2.25rem;
    align-items: center;
  }
  .nav-links a {
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--muted);
    text-decoration: none;
    transition: color var(--transition);
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--accent);
    transition: width var(--transition);
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }

  .nav-cta {
    padding: 0.5rem 1.2rem;
    background: var(--accent);
    color: var(--bg) !important;
    border-radius: var(--radius);
  }
  .nav-cta:hover { background: var(--accent2); }
  .nav-cta::after { display: none !important; }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
    background: none;
    border: none;
  }
  .hamburger span {
    display: block;
    width: 24px; height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: var(--transition);
  }
  .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .nav-links {
      position: fixed;
      top: 0; right: -100%;
      width: 75%;
      height: 100vh;
      background: #111;
      flex-direction: column;
      justify-content: center;
      gap: 2.5rem;
      padding: 2rem;
      transition: right var(--transition);
      border-left: 1px solid var(--border);
    }
    .nav-links.open { right: 0; }
    .nav-links a { font-size: 1.1rem; }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     HOME
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 5rem;
  }

  /* Background grid */
  .home::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.25;
  }

  .home-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .home-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    color: var(--accent);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 0.35rem 0.85rem;
    border-radius: 50px;
    margin-bottom: 1.25rem;
    animation: fadeDown 0.8s ease both;
  }
  .home-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.3; }
  }

  .home-name {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 7vw, 5rem);
    font-weight: 900;
    color: var(--white);
    line-height: 1.0;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    animation: fadeUp 0.9s 0.1s ease both;
  }
  .home-name span { color: var(--accent); }

  .home-title {
    font-size: 1.05rem;
    color: var(--muted);
    margin-bottom: 1.5rem;
    animation: fadeUp 0.9s 0.2s ease both;
  }
  .home-title strong { color: var(--text); font-weight: 500; }

  .home-desc {
    font-size: 0.95rem;
    color: var(--muted);
    line-height: 1.75;
    margin-bottom: 2rem;
    max-width: 460px;
    animation: fadeUp 0.9s 0.3s ease both;
  }

  .home-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fadeUp 0.9s 0.4s ease both;
  }

  .home-tags {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 2.5rem;
    animation: fadeUp 0.9s 0.5s ease both;
  }
  .tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.3rem 0.7rem;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--accent);
    border-radius: 3px;
    letter-spacing: 0.05em;
  }

  /* Profile card */
  .profile-card {
    position: relative;
    animation: fadeLeft 1s 0.3s ease both;
  }
  .profile-card-inner {
    position: relative;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }
  .profile-frame {
    width: 100%;
    aspect-ratio: 4/5;
    background: var(--surface);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
  }

  /* Geometric avatar illustration */
  .profile-frame svg {
    width: 100%;
    height: 100%;
  }

  .profile-deco {
    position: absolute;
    top: -16px; right: -16px;
    width: 80px; height: 80px;
    border: 2px solid var(--accent);
    border-radius: 4px;
    opacity: 0.3;
    z-index: -1;
  }
  .profile-deco2 {
    position: absolute;
    bottom: -16px; left: -16px;
    width: 60px; height: 60px;
    border: 2px solid var(--accent);
    border-radius: 4px;
    opacity: 0.2;
    z-index: -1;
  }

  .profile-stat {
    position: absolute;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    backdrop-filter: blur(8px);
  }
  .profile-stat.s1 { bottom: 24px; left: -24px; }
  .profile-stat.s2 { top: 24px; right: -24px; }
  .stat-num {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-top: 2px;
  }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:none; } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:none; } }

  @media (max-width: 768px) {
    .home-grid { grid-template-columns: 1fr; gap: 3rem; }
    .profile-card { order: -1; }
    .profile-card-inner { max-width: 280px; }
    .profile-stat.s1, .profile-stat.s2 { display: none; }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     ABOUT
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 5rem;
    align-items: start;
  }
  .about-img-wrap {
    position: relative;
  }
  .about-img-box {
    width: 100%;
    aspect-ratio: 3/4;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }
  .about-img-accent {
    position: absolute;
    bottom: -12px; right: -12px;
    width: 55%;
    height: 55%;
    border: 2px solid var(--accent);
    border-radius: 6px;
    opacity: 0.25;
  }

  .about-info-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 1.5rem;
    margin: 2rem 0 2.5rem;
  }
  .about-info-list li {
    font-size: 0.875rem;
    color: var(--muted);
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
  }
  .about-info-list li strong {
    color: var(--text);
    font-weight: 500;
    display: block;
    font-size: 0.8rem;
    margin-bottom: 1px;
  }
  .about-info-list li span { color: var(--muted); }

  .about-text p {
    color: var(--muted);
    font-size: 0.975rem;
    line-height: 1.8;
    margin-bottom: 1.2rem;
  }
  .about-text p em { color: var(--accent); font-style: normal; }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .about-img-box { max-width: 260px; }
    .about-info-list { grid-template-columns: 1fr; }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     SKILLS
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .skills-wrap { position: relative; }

  .skills-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .skill-cat {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.75rem;
    transition: border-color var(--transition), transform var(--transition);
  }
  .skill-cat:hover { border-color: var(--accent); transform: translateY(-4px); }

  .skill-cat-icon {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .skill-cat-title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1.25rem;
  }

  .skill-items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skill-item { }
  .skill-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
  .skill-name { color: var(--text); }
  .skill-pct { color: var(--accent); font-family: var(--font-mono); font-size: 0.72rem; }
  .skill-bar {
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }
  .skill-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    width: 0;
  }
  .skill-fill.animated { }

  .tools-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.5rem;
  }
  .tool-chip {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.35rem 0.8rem;
    background: rgba(201,168,76,0.07);
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--accent);
    border-radius: 50px;
    letter-spacing: 0.04em;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     PROJECTS
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.75rem;
  }

  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color var(--transition), transform var(--transition);
  }
  .project-card:hover { border-color: var(--accent); transform: translateY(-5px); }

  .project-thumb {
    height: 180px;
    background: linear-gradient(135deg, #1a1712 0%, #0f1a0f 50%, #1a120d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .project-thumb::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, var(--surface));
  }

  .project-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }

  .project-tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  .project-tech {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    padding: 0.2rem 0.55rem;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.15);
    color: var(--accent);
    border-radius: 3px;
    letter-spacing: 0.04em;
  }

  .project-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.6rem;
  }
  .project-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .project-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }
  .project-features li {
    font-size: 0.82rem;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .project-features li::before {
    content: '→';
    color: var(--accent);
    font-size: 0.75rem;
  }

  .project-actions { margin-top: auto; display: flex; gap: 0.75rem; }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     EDUCATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .edu-timeline {
    position: relative;
    padding-left: 2rem;
  }
  .edu-timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 8px; bottom: 8px;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), transparent);
  }

  .edu-item {
    position: relative;
    margin-bottom: 2.5rem;
  }
  .edu-item::before {
    content: '';
    position: absolute;
    left: -2.45rem; top: 8px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.2);
  }

  .edu-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem 1.75rem;
    transition: border-color var(--transition);
  }
  .edu-card:hover { border-color: var(--accent); }

  .edu-year {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
  }
  .edu-degree {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.3rem;
  }
  .edu-school {
    font-size: 0.875rem;
    color: var(--muted);
    margin-bottom: 0.75rem;
  }
  .edu-note {
    font-size: 0.82rem;
    color: var(--muted);
    background: rgba(201,168,76,0.06);
    border-left: 2px solid var(--accent);
    padding: 0.5rem 0.75rem;
    border-radius: 0 4px 4px 0;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     CONTACT
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-info-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
  .contact-info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .contact-icon {
    width: 42px; height: 42px;
    border-radius: 8px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .contact-info-text strong {
    display: block;
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    margin-bottom: 2px;
  }
  .contact-info-text span {
    font-size: 0.9rem;
    color: var(--text);
  }

  /* Form */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-label {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    font-family: var(--font-mono);
  }
  .form-control {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.85rem 1rem;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: border-color var(--transition);
    outline: none;
    resize: none;
  }
  .form-control:focus { border-color: var(--accent); }
  .form-control::placeholder { color: var(--muted); }

  .form-success {
    text-align: center;
    padding: 2rem;
    background: rgba(201,168,76,0.06);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 8px;
    font-size: 0.95rem;
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .form-row { grid-template-columns: 1fr; }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━
     FOOTER
  ━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .footer {
    border-top: 1px solid var(--border);
    padding: 2.5rem 0;
  }
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-copy {
    font-size: 0.82rem;
    color: var(--muted);
  }
  .footer-copy span { color: var(--accent); }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-links a {
    font-size: 0.82rem;
    color: var(--muted);
    text-decoration: none;
    transition: color var(--transition);
  }
  .footer-links a:hover { color: var(--accent); }
`;

/* ─────────────────────────────────────────────
   HOOK: Scroll-based reveal animation
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home","About","Skills","Projects","Education","Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">
          <a className="navbar-logo" href="#home">UT<span>.</span></a>
          <ul className={`nav-links${open ? " open" : ""}`}>
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className={l === "Contact" ? "nav-cta" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(l); }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
function Home() {
  return (
    <section className="home section" id="home">
      <div className="container">
        <div className="home-grid">
          {/* Left: text */}
          <div>
            <div className="home-badge">Available for Internship</div>
            <h1 className="home-name">Utkarsha<br/><span>Tarde.</span></h1>
            <p className="home-title">
              <strong>Aspiring Web Developer</strong> &nbsp;|&nbsp; MERN Stack Enthusiast
            </p>
            <p className="home-desc">
              B.Sc IT student passionate about building clean, user-centric web experiences.
              Skilled in HTML, CSS, JavaScript and the MERN stack — always learning, always building.
            </p>
            <div className="home-cta">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior:"smooth"}); }}
              >
                View Projects ↓
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth"}); }}
              >
                Contact Me
              </a>
            </div>
            <div className="home-tags">
              {["HTML","CSS","JavaScript","React","Node.js","MongoDB","Express","Python"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Right: profile card */}
          <div className="profile-card">
            <div className="profile-card-inner">
              <div className="profile-frame">
                {/* Geometric avatar SVG */}
                <svg viewBox="0 0 380 475" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a1512"/>
                      <stop offset="100%" stopColor="#0d1a1a"/>
                    </linearGradient>
                    <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c4956a"/>
                      <stop offset="100%" stopColor="#a87550"/>
                    </linearGradient>
                    <linearGradient id="shirt" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a84c"/>
                      <stop offset="100%" stopColor="#8a6e2a"/>
                    </linearGradient>
                    <radialGradient id="glow" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(201,168,76,0.15)"/>
                      <stop offset="100%" stopColor="transparent"/>
                    </radialGradient>
                  </defs>
                  <rect width="380" height="475" fill="url(#bg-grad)"/>
                  {/* Glow */}
                  <ellipse cx="190" cy="200" rx="160" ry="160" fill="url(#glow)"/>
                  {/* Grid lines */}
                  {[60,120,180,240,300,360].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="475" stroke="rgba(201,168,76,0.06)" strokeWidth="1"/>
                  ))}
                  {[80,160,240,320,400].map(y => (
                    <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="rgba(201,168,76,0.06)" strokeWidth="1"/>
                  ))}
                  {/* Body/shirt */}
                  <ellipse cx="190" cy="480" rx="115" ry="90" fill="url(#shirt)"/>
                  <ellipse cx="190" cy="460" rx="95" ry="60" fill="#b8922e"/>
                  {/* Neck */}
                  <rect x="170" y="295" width="40" height="55" rx="12" fill="url(#skin)"/>
                  {/* Head */}
                  <ellipse cx="190" cy="240" rx="82" ry="95" fill="url(#skin)"/>
                  {/* Hair */}
                  <path d="M112 215 Q108 140 190 130 Q272 140 268 215 Q255 160 190 155 Q125 160 112 215Z" fill="#2a1f0e"/>
                  <path d="M108 220 Q105 195 112 180 Q116 165 125 158 Q112 170 110 195 Q108 210 108 220Z" fill="#2a1f0e"/>
                  <path d="M272 220 Q275 195 268 180 Q264 165 255 158 Q268 170 270 195 Q272 210 272 220Z" fill="#2a1f0e"/>
                  {/* Eyes */}
                  <ellipse cx="163" cy="238" rx="12" ry="13" fill="white"/>
                  <ellipse cx="217" cy="238" rx="12" ry="13" fill="white"/>
                  <ellipse cx="164" cy="240" rx="8" ry="9" fill="#2a1f0e"/>
                  <ellipse cx="218" cy="240" rx="8" ry="9" fill="#2a1f0e"/>
                  <ellipse cx="166" cy="238" rx="3" ry="3" fill="white" opacity="0.7"/>
                  <ellipse cx="220" cy="238" rx="3" ry="3" fill="white" opacity="0.7"/>
                  {/* Eyebrows */}
                  <path d="M151 222 Q163 216 175 220" stroke="#2a1f0e" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M205 220 Q217 216 229 222" stroke="#2a1f0e" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  {/* Nose */}
                  <path d="M190 248 Q184 268 190 275 Q196 268 190 248" stroke="#a07048" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  {/* Smile */}
                  <path d="M172 290 Q190 303 208 290" stroke="#8a5535" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {/* Earrings */}
                  <circle cx="110" cy="255" r="5" fill="var(--accent)" opacity="0.9"/>
                  <circle cx="270" cy="255" r="5" fill="var(--accent)" opacity="0.9"/>
                  {/* Accent line bottom */}
                  <line x1="0" y1="474" x2="380" y2="474" stroke="var(--accent)" strokeWidth="2" opacity="0.4"/>
                  {/* Corner deco */}
                  <rect x="16" y="16" width="24" height="24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5"/>
                  <rect x="340" y="16" width="24" height="24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="profile-deco"/>
              <div className="profile-deco2"/>
              <div className="profile-stat s1">
                <div className="stat-num">2+</div>
                <div className="stat-label">Years Coding</div>
              </div>
              <div className="profile-stat s2">
                <div className="stat-num">5+</div>
                <div className="stat-label">Projects Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const ref = useReveal();
  return (
    <section className="section" id="about" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">Passionate Developer,<br/>Curious Learner</h2>
        </div>
        <div className="about-grid">
          {/* Left image */}
          <div className="about-img-wrap">
            <div className="about-img-box">
              <svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
                <defs>
                  <linearGradient id="ab-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#141410"/>
                    <stop offset="100%" stopColor="#0a120a"/>
                  </linearGradient>
                </defs>
                <rect width="320" height="420" fill="url(#ab-bg)"/>
                {/* Code lines decoration */}
                {[60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((y,i) => (
                  <rect key={y} x={20 + (i%3)*8} y={y} width={40+Math.sin(i)*60} height="2" rx="1" fill="rgba(201,168,76,0.15)"/>
                ))}
                {/* Laptop */}
                <rect x="60" y="160" width="200" height="130" rx="8" fill="#1a1a1a" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5"/>
                <rect x="70" y="168" width="180" height="112" rx="4" fill="#0a0a0a"/>
                {/* Screen content */}
                <text x="80" y="188" fontFamily="monospace" fontSize="9" fill="#c9a84c">{"const utkarsha = {"}</text>
                <text x="88" y="200" fontFamily="monospace" fontSize="9" fill="#e8c97a">{"  role: 'Developer',"}</text>
                <text x="88" y="212" fontFamily="monospace" fontSize="9" fill="#e8c97a">{"  passion: 'MERN',"}</text>
                <text x="88" y="224" fontFamily="monospace" fontSize="9" fill="#e8c97a">{"  learning: true,"}</text>
                <text x="80" y="236" fontFamily="monospace" fontSize="9" fill="#c9a84c">{"}"}</text>
                <rect x="70" y="250" width="180" height="12" rx="2" fill="#1a1a1a"/>
                {/* Cursor blink */}
                <rect x="80" y="252" width="6" height="8" rx="1" fill="var(--accent)" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
                </rect>
                {/* Laptop base */}
                <rect x="40" y="290" width="240" height="12" rx="4" fill="#1a1a1a" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
                {/* Coffee cup */}
                <rect x="230" y="308" width="30" height="35" rx="3" fill="#2a2a2a"/>
                <path d="M260 318 Q272 318 272 330 Q272 342 260 342" stroke="#c9a84c" strokeWidth="2" fill="none"/>
                {/* Steam */}
                <path d="M240 305 Q243 296 240 288" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <animate attributeName="d" values="M240 305 Q243 296 240 288;M241 305 Q244 296 241 288;M240 305 Q243 296 240 288" dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M248 305 Q251 294 248 285" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <animate attributeName="d" values="M248 305 Q251 294 248 285;M249 305 Q252 294 249 285;M248 305 Q251 294 248 285" dur="2.5s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <div className="about-img-accent"/>
          </div>

          {/* Right text */}
          <div className="about-text">
            <p>
              Hi! I'm <em>Utkarsha Tarde</em>, a second-year B.Sc IT student at 
              <em> Pillai College of Arts, Commerce & Science</em>. I'm passionate about 
              crafting web applications that are both functional and visually compelling.
            </p>
            <p>
              My journey into web development started with HTML and CSS, quickly evolving into 
              a love for <em>JavaScript</em> and the MERN stack. I enjoy solving real-world 
              problems through clean, efficient code.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open-source 
              projects, or building side projects to sharpen my skills. I believe learning 
              never stops — and that mindset drives everything I do.
            </p>

            <ul className="about-info-list">
              <li>
                <div>
                  <strong>Degree</strong>
                  <span>B.Sc Information Technology</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Year</strong>
                  <span>Second Year Completed</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>College</strong>
                  <span>Pillai College of Arts, Commerce & Science</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Location</strong>
                  <span>Mumbai, Maharashtra</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Focus</strong>
                  <span>Full-Stack Web Development</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Status</strong>
                  <span>Open to Internships</span>
                </div>
              </li>
            </ul>

            <a href="#contact" className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth"}); }}>
              Get In Touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    icon: "⚡",
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", pct: 80 },
      { name: "HTML & CSS",  pct: 90 },
      { name: "Python",      pct: 65 },
      { name: "Java",        pct: 55 },
    ],
  },
  {
    icon: "⚛️",
    title: "Frameworks & Libraries",
    skills: [
      { name: "React.js",    pct: 75 },
      { name: "Node.js",     pct: 70 },
      { name: "Express.js",  pct: 68 },
    ],
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: [
      { name: "MongoDB",     pct: 70 },
      { name: "SQL / MySQL", pct: 60 },
    ],
  },
];

const TOOLS = ["Git", "GitHub", "VS Code", "Postman", "npm", "Linux"];

function SkillBar({ name, pct }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.style.width = pct + "%"; }, 100);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el.closest(".skill-cat"));
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" ref={ref} style={{ width: 0 }}/>
      </div>
    </div>
  );
}

function Skills() {
  const ref = useReveal();
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-label">Skills</div>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-sub">A constantly growing toolkit — from frontend interfaces to backend APIs and databases.</p>
        </div>
        <div className="skills-categories">
          {SKILL_CATEGORIES.map((cat) => (
            <div className="skill-cat" key={cat.title}>
              <div className="skill-cat-icon">{cat.icon}</div>
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-items">
                {cat.skills.map((s) => <SkillBar key={s.name} {...s}/>)}
              </div>
            </div>
          ))}
          {/* Tools card */}
          <div className="skill-cat">
            <div className="skill-cat-icon">🛠️</div>
            <div className="skill-cat-title">Dev Tools</div>
            <div className="tools-grid">
              {TOOLS.map(t => <span key={t} className="tool-chip">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
const PROJECTS = [
  {
    emoji: "👟",
    title: "Shoe Store — MERN",
    tech: ["MongoDB","Express","React","Node.js","JWT","Redux"],
    desc: "A full-stack e-commerce platform for footwear, built with the MERN stack. Features a modern shopping experience with real-time cart updates and secure authentication.",
    features: [
      "JWT-based user authentication & authorization",
      "Product browsing with filters, search & sorting",
      "Shopping cart with persistent state (Redux)",
      "Admin dashboard for product management",
      "Responsive design — mobile-first approach",
    ],
    github: "https://github.com/utkarsha-tarde",
    demo: "#",
  },
  {
    emoji: "🌐",
    title: "Portfolio Website",
    tech: ["React","CSS","JavaScript"],
    desc: "This very portfolio — a responsive personal website showcasing projects, skills and education. Built with React functional components and smooth animations.",
    features: [
      "Smooth scroll navigation",
      "Animated skill progress bars",
      "Fully responsive (mobile + desktop)",
      "Contact form with validation",
    ],
    github: "https://github.com/utkarsha-tarde",
    demo: "#",
  },
  {
    emoji: "📝",
    title: "Task Manager App",
    tech: ["React","Node.js","MongoDB","Express"],
    desc: "A productivity app that lets users create, organize and track tasks with priority levels and due dates.",
    features: [
      "CRUD operations for tasks",
      "Priority & category tagging",
      "User authentication",
      "Deadline reminders",
    ],
    github: "https://github.com/utkarsha-tarde",
    demo: "#",
  },
];

function Projects() {
  const ref = useReveal();
  return (
    <section className="section" id="projects" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-label">Projects</div>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-sub">Real-world projects that combine clean code with practical problem solving.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.title}>
              <div className="project-thumb">{p.emoji}</div>
              <div className="project-body">
                <div className="project-tech-row">
                  {p.tech.map(t => <span key={t} className="project-tech">{t}</span>)}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <ul className="project-features">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <div className="project-actions">
                  <a href={p.github} className="btn btn-outline" target="_blank" rel="noreferrer">
                    ⤴ GitHub
                  </a>
                  <a href={p.demo} className="btn btn-primary" target="_blank" rel="noreferrer">
                    Live Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────── */
const EDU = [
  {
    year: "2023 — Present",
    degree: "B.Sc Information Technology",
    school: "Pillai College of Arts, Commerce & Science, Mumbai",
    note: "Second Year Completed · Focused on Web Technologies, DBMS & Data Structures",
  },
  {
    year: "2021 — 2023",
    degree: "Higher Secondary Certificate (HSC)",
    school: "Science Stream · Maharashtra State Board",
    note: "Completed with focus on Science & Mathematics",
  },
  {
    year: "2021",
    degree: "Secondary School Certificate (SSC)",
    school: "Maharashtra State Board",
    note: "Completed with Distinction",
  },
];

function Education() {
  const ref = useReveal();
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-label">Education</div>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-sub">Building a strong technical foundation through formal education and continuous self-learning.</p>
        </div>
        <div className="edu-timeline">
          {EDU.map((e) => (
            <div className="edu-item" key={e.degree}>
              <div className="edu-card">
                <div className="edu-year">{e.year}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-note">{e.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section className="section" id="contact" style={{ background:"var(--surface)" }}>
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-sub">Have a project in mind or an internship opportunity? I'd love to hear from you.</p>
        </div>
        <div className="contact-grid">
          {/* Info */}
          <div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-info-text">
                  <strong>Email</strong>
                  <span>utkarsha.tarde@example.com</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">📞</div>
                <div className="contact-info-text">
                  <strong>Phone</strong>
                  <span>+91 98765 43210</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div className="contact-info-text">
                  <strong>Location</strong>
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">💼</div>
                <div className="contact-info-text">
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/utkarsha-tarde</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">🐙</div>
                <div className="contact-info-text">
                  <strong>GitHub</strong>
                  <span>github.com/utkarsha-tarde</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="form-success">
                <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>✓</div>
                <strong>Message Sent!</strong>
                <p style={{ marginTop:"0.5rem", fontSize:"0.875rem", color:"var(--muted)" }}>
                  Thanks for reaching out, {form.name}. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-control" name="name" placeholder="Your name" value={form.name} onChange={handle} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-control" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handle} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-control" name="subject" placeholder="What's this about?" value={form.subject} onChange={handle}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" name="message" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={handle} required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf:"flex-start" }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} <span>Utkarsha Tarde</span> · Designed & Built with ♥
          </p>
          <div className="footer-links">
            <a href="https://github.com/utkarsha-tarde" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/utkarsha-tarde" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:utkarsha.tarde@example.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  // Inject styles into document head
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  return (
    <>
      <Navbar/>
      <main>
        <Home/>
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}
