document.addEventListener('DOMContentLoaded', () => {
  console.log("AETHERIS HUD: Synchronizing mainframe controls...");

  // ==========================================
  // SYSTEM STATE
  // ==========================================
  let audioEnabled = false;
  
  // Active Tech Zone Selection
  let activeZone = 'nexus';

  // Zone specific database (Codename, stats, descriptions, and events)
  const zoneData = {
    nexus: {
      codename: "CODENAME // AE-NEXUS",
      status: "TELEMETRY // SYNCED",
      badge: "AI OVERCLOCK",
      themeColor: 0x00f0ff, // Neon Cyan
      stats: {
        stat1: { name: "COGNITIVE INDEX", val: "150 IQ", pct: "+25%", fill: 75 },
        stat2: { name: "DATA BANDWIDTH", val: "100 GB/s", pct: "+50%", fill: 80 },
        stat3: { name: "ACTIVE REGISTERS", val: "4,800 +", pct: "+12%", fill: 60 },
        stat4: { name: "PRIZE POOL", val: "45,000 CR", pct: "MAX", fill: 90 }
      },
      events: [
        { name: "Neural Network CTF", desc: "Train adversary networks to exploit neural model weights.", cost: "1,500 CR Entry" },
        { name: "Semantic Synthesis Sprint", desc: "Build real-time AI translators in 3 hours flat.", cost: "800 CR Entry" },
        { name: "NLP Jailbreak Challenge", desc: "Jailbreak standard security alignments on mainframes.", cost: "Free Entry" }
      ]
    },
    robotics: {
      codename: "CODENAME // AE-ROBOTICS",
      status: "TELEMETRY // ENGAGED",
      badge: "KINETIC LOAD",
      themeColor: 0xff0055, // Neon Magenta
      stats: {
        stat1: { name: "TORQUE CAPACITOR", val: "650 Nm", pct: "+45%", fill: 65 },
        stat2: { name: "REFLEX LATENCY", val: "1.4 ms", pct: "-85%", fill: 90 },
        stat3: { name: "PNEUMATIC POWER", val: "400 kPa", pct: "+20%", fill: 70 },
        stat4: { name: "PRIZE POOL", val: "55,000 CR", pct: "MAX", fill: 95 }
      },
      events: [
        { name: "Humanoid Cage Match", desc: "Humanoid bot vs bot cage showdown. Physical destruction allowed.", cost: "2,000 CR Entry" },
        { name: "Autonomous Maze Navigation", desc: "Drones map and escape non-line-of-sight concrete mazes.", cost: "1,000 CR Entry" },
        { name: "Bio-Battery Calibration", desc: "Overclock kinetic servomotors drawing from bloodstream data.", cost: "500 CR Entry" }
      ]
    },
    quantum: {
      codename: "CODENAME // AE-QUANTUM",
      status: "TELEMETRY // SECURED",
      badge: "DECK CIPHER",
      themeColor: 0xffaa00, // Solar Amber
      stats: {
        stat1: { name: "QUBIT COHERENCE", val: "99.98 %", pct: "STABLE", fill: 99 },
        stat2: { name: "CRYPTO DECRYPTION", val: "4.8 PFLOPS", pct: "+200%", fill: 85 },
        stat3: { name: "FIREWALL PORTS", val: "10,240", pct: "ACTIVE", fill: 75 },
        stat4: { name: "PRIZE POOL", val: "38,000 CR", pct: "NORM", fill: 75 }
      },
      events: [
        { name: "Mainframe Capture-The-Flag", desc: "Infiltrate simulated post-quantum server nodes.", cost: "1,200 CR Entry" },
        { name: "Zero-Knowledge Audit", desc: "Audit and verify zero-knowledge smart contracts for leaks.", cost: "Free Entry" },
        { name: "Shor's Algorithm Race", desc: "Decrypt legacy RSA channels using quantum hardware compilers.", cost: "1,500 CR Entry" }
      ]
    },
    bio: {
      codename: "CODENAME // AE-BIOGEN",
      status: "TELEMETRY // STABILIZED",
      badge: "NANO SYNAPSE",
      themeColor: 0x00ff66, // Acid Green
      stats: {
        stat1: { name: "BIO-CELL CHARGE", val: "98.5 %", pct: "BOOSTED", fill: 98 },
        stat2: { name: "NANOSHIELD RATE", val: "450 kJ/m²", pct: "+30%", fill: 70 },
        stat3: { name: "CELLULAR SYNC", val: "2.4 GHz", pct: "+15%", fill: 80 },
        stat4: { name: "PRIZE POOL", val: "50,000 CR", pct: "MAX", fill: 88 }
      },
      events: [
        { name: "DNA Storage Decoder", desc: "Translate digital video files written directly inside living cells.", cost: "1,000 CR Entry" },
        { name: "Dermal Armor Synthesis", desc: "Grow graphene-engineered skin patches to absorb shock.", cost: "1,500 CR Entry" },
        { name: "Subdermal Biosensor Sync", desc: "Hack sub-dermal sensors to output real-time heart metrics.", cost: "Free Entry" }
      ]
    }
  };

  // ==========================================
  // AUDIO INTERACTIVE CONTROLS
  // ==========================================
  const audioToggleBtn = document.getElementById('audio-control');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');
  
  const hoverSound = document.getElementById('snd-hover');
  const clickSound = document.getElementById('snd-click');
  const bootSound = document.getElementById('snd-boot');

  // Set lower default volumes for pleasant experience
  if (hoverSound) hoverSound.volume = 0.06;
  if (clickSound) clickSound.volume = 0.12;
  if (bootSound) bootSound.volume = 0.2;

  const playSound = (audioElement) => {
    if (audioEnabled && audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(err => console.log('Audio playback blocked: ', err));
    }
  };

  // Toggle button click listener
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        playSound(bootSound);
        appendConsoleLog('SYSTEM AUDIO PROTOCOLS INITIALIZED', 'success');
      } else {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
      }
    });
  }

  // Hover triggers for interactive elements
  const addAudioTriggers = (elements) => {
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => playSound(hoverSound));
      element.addEventListener('click', () => playSound(clickSound));
    });
  };

  const setupAudioTriggers = () => {
    const interactives = document.querySelectorAll('.btn, .tab-btn, .option-row, .faq-question, .nav-links a, input, select');
    addAudioTriggers(interactives);
  };
  setupAudioTriggers();

  // ==========================================
  // NAVIGATION ACTIONS
  // ==========================================
  const mainNav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainNav.classList.add('shrunk');
    } else {
      mainNav.classList.remove('shrunk');
    }
  });

  // Mobile menu slide toggles
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ==========================================
  // DYNAMIC HERO TERMINAL LOGS
  // ==========================================
  const heroTermBody = document.getElementById('hero-term-body');
  const bootLogs = [
    { text: "ESTABLISHING CORE PORTAL LINK...", type: "info" },
    { text: "DOWNLOADING TECH DISTRICT MAPS...", type: "info" },
    { text: "PORT SECURITY VERIFICATION: APPROVED", type: "success" },
    { text: "WEBGL ENGINE SYNC ENGAGED", type: "info" },
    { text: "MAINFRAME TEMP: NOMINAL 37.1 C", type: "success" },
    { text: "WARNING: QUANTUM FREQUENCY GLITCH DETECTED [D7]", type: "warn" },
    { text: "RESOLVED INCOMING DATA GLITCH", type: "success" },
    { text: "AETHERIS CORE ALIGNMENT: 100% SECURE", type: "success" },
    { text: "INITIALIZING HOLOGRAM TICKET COMPILER...", type: "info" }
  ];

  let termLogIndex = 0;
  setInterval(() => {
    if (heroTermBody) {
      const log = bootLogs[termLogIndex];
      const line = document.createElement('div');
      line.className = `terminal-line ${log.type === 'success' ? 'success' : log.type === 'warn' ? 'warn' : ''}`;
      line.textContent = `> ${log.text}`;
      heroTermBody.appendChild(line);
      heroTermBody.scrollTop = heroTermBody.scrollHeight;
      
      termLogIndex = (termLogIndex + 1) % bootLogs.length;

      if (heroTermBody.children.length > 15) {
        heroTermBody.removeChild(heroTermBody.children[0]);
      }
    }
  }, 4000);

  // ==========================================
  // COUNTDOWN TIMER
  // ==========================================
  const targetDate = new Date("2026-11-12T09:00:00").getTime();
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById('days').textContent = "00";
      document.getElementById('hours').textContent = "00";
      document.getElementById('minutes').textContent = "00";
      document.getElementById('seconds').textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  };
  
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // TELEMETRY MONITOR WAVEFORM (CANVAS DRAW)
  // ==========================================
  const canvas = document.getElementById('telemetry-canvas');
  const timestampEl = document.getElementById('current-timestamp');
  
  const diagTemp = document.getElementById('diag-temp');
  const diagFreq = document.getElementById('diag-freq');
  const diagDraw = document.getElementById('diag-draw');
  const consoleLogEl = document.getElementById('diag-console-log');

  const appendConsoleLog = (message, type = 'info') => {
    if (!consoleLogEl) return;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logLine = document.createElement('div');
    logLine.className = `console-line ${type}`;
    logLine.innerHTML = `[${timestamp}] [${type.toUpperCase()}] > ${message}`;
    
    consoleLogEl.appendChild(logLine);
    consoleLogEl.scrollTop = consoleLogEl.scrollHeight;

    if (consoleLogEl.children.length > 50) {
      consoleLogEl.removeChild(consoleLogEl.children[0]);
    }
  };

  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let offset = 0;
    const drawOscilloscope = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerY = canvas.height / 2;

      // Draw primary waveform line
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let i = 0; i < canvas.width; i++) {
        // Compound sine waves with simulated high frequency noise
        const y = centerY + 
                  Math.sin(i * 0.015 + offset) * 24 + 
                  Math.sin(i * 0.04 + offset * 1.8) * 8 +
                  (Math.random() - 0.5) * 2;
        ctx.lineTo(i, y);
      }
      ctx.stroke();
      
      // Draw secondary overdrive magenta line
      ctx.strokeStyle = 'rgba(255, 0, 85, 0.2)';
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i < canvas.width; i++) {
        const y = centerY + 
                  Math.sin(i * 0.01 - offset * 0.4) * 35 + 
                  Math.cos(i * 0.025 + offset) * 10;
        ctx.lineTo(i, y);
      }
      ctx.stroke();

      offset += 0.05;
      requestAnimationFrame(drawOscilloscope);
    };
    
    drawOscilloscope();
  }

  // Update timestamps and metrics dynamically
  setInterval(() => {
    const now = new Date();
    if (timestampEl) {
      timestampEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }

    if (diagTemp) {
      const temp = (36.4 + Math.random() * 0.8).toFixed(1);
      diagTemp.textContent = `${temp}°C`;
    }
    if (diagFreq) {
      const freq = (99.0 + Math.random() * 0.9).toFixed(2);
      diagFreq.textContent = `${freq}%`;
    }
    if (diagDraw) {
      const load = (4.0 + Math.random() * 0.6).toFixed(1);
      diagDraw.textContent = `${load} W`;
    }
  }, 1000);

  const sysEvents = [
    { text: "Aetheris core temperature nominal", type: "success" },
    { text: "Matrix data buffer sync validation complete", type: "success" },
    { text: "Mainframe power cells distributing thermal load", type: "info" },
    { text: "Decryption ports active: firewall auto-defending", type: "info" },
    { text: "Warning: High network flow on AI cognitive dome", type: "warn" },
    { text: "Mainframe security sandbox scan: 0 logs anomalies", type: "success" },
    { text: "Holographic interface sync stabilized", type: "success" }
  ];

  setInterval(() => {
    const event = sysEvents[Math.floor(Math.random() * sysEvents.length)];
    appendConsoleLog(event.text, event.type);
  }, 5000);

  appendConsoleLog('AETHERIS CORESYNC MONITOR INITIALIZED', 'success');
  appendConsoleLog('MAIN FIREWALL: v4.11 SECURITY SIGNATURE SET', 'info');
  appendConsoleLog('WEBGL MATRIX LINK DETECTED: CORE SHIFT ENABLED', 'success');

  // ==========================================
  // INITIALIZE THREE.JS WEBGL MAINFRAME ENGINE
  // ==========================================
  const threeCanvas = document.getElementById('three-canvas');
  let scene, camera, renderer, coreGroup, coreMesh, particleSystem, particleGeometry;
  
  // Variables to hold current animations/positions for LERPing
  let scrollPercent = 0;
  const currentPos = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1, rotSpeed: 0.005 };
  const targetPos = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1, rotSpeed: 0.005 };
  
  // Geometry parameters mapping
  const coreGeometries = {
    nexus: new THREE.TorusKnotGeometry(4.5, 1.4, 120, 16),
    robotics: new THREE.IcosahedronGeometry(4.8, 1),
    quantum: new THREE.TorusGeometry(4.2, 1.8, 16, 80),
    bio: new THREE.OctahedronGeometry(4.8, 2)
  };

  const initThree = () => {
    if (!threeCanvas) return;

    scene = new THREE.Scene();
    
    // Perspective Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Center Core Group
    coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Procedural Core Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    coreMesh = new THREE.Mesh(coreGeometries.nexus, wireframeMaterial);
    coreGroup.add(coreMesh);

    // 2. Procedural Surrounding Particle Cloud
    const particleCount = 1800;
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color(0x00f0ff);
    const colorMagenta = new THREE.Color(0xff0055);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spherical distribution with shell layers
      const r = 8.5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i+2] = r * Math.cos(phi);
      
      // Cyber colors: Randomly distribute Cyan/Magenta points
      const mixColor = Math.random() > 0.45 ? colorCyan : colorMagenta;
      colors[i] = mixColor.r;
      colors[i+1] = mixColor.g;
      colors[i+2] = mixColor.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    coreGroup.add(particleSystem);

    // Lights (not strictly required for MeshBasicMaterial, but added for future overlays)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Start WebGL render cycle
    animateThree();
    
    // Initial resize sync
    syncThreeLayout();
  };

  // Sync positions to screen resolution layout
  const syncThreeLayout = () => {
    if (!renderer) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Recalculate target position based on layout shifts
    updateScrollTargets();
  };

  window.addEventListener('resize', syncThreeLayout);

  // Core Render Loop
  const animateThree = () => {
    requestAnimationFrame(animateThree);

    // Rotate core mesh & particles independently
    coreMesh.rotation.y += targetPos.rotSpeed;
    coreMesh.rotation.x += targetPos.rotSpeed * 0.5;
    
    particleSystem.rotation.y -= targetPos.rotSpeed * 0.4;
    particleSystem.rotation.x -= targetPos.rotSpeed * 0.1;

    // smooth camera/position LERP coordinates
    currentPos.x += (targetPos.x - currentPos.x) * 0.06;
    currentPos.y += (targetPos.y - currentPos.y) * 0.06;
    currentPos.z += (targetPos.z - currentPos.z) * 0.06;
    
    currentPos.scale += (targetPos.scale - currentPos.scale) * 0.06;
    currentPos.rotSpeed += (targetPos.rotSpeed - currentPos.rotSpeed) * 0.06;

    coreGroup.position.set(currentPos.x, currentPos.y, currentPos.z);
    coreGroup.scale.set(currentPos.scale, currentPos.scale, currentPos.scale);
    
    // Extra mouse-follow displacement (subtle attractor)
    if (window.innerWidth > 992) {
      coreGroup.rotation.y += (mouseX * 0.2 - coreGroup.rotation.y) * 0.02;
      coreGroup.rotation.x += (mouseY * 0.2 - coreGroup.rotation.x) * 0.02;
    }

    renderer.render(scene, camera);
  };

  // Mouse tracker for grid attractions
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    // Normalise coordinates between -1 and 1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Calculate 3D Core position targets based on document scroll percentage
  const updateScrollTargets = () => {
    if (!coreGroup) return;

    const isMobile = window.innerWidth <= 992;
    
    // Calculate page scroll depth (0 to 1)
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    // Scrollytelling segments (5 sections total: Hero, Zones, Timeline, Telemetry, Ticket)
    if (scrollPercent <= 0.22) {
      // 1. HERO SECTION: Center/Right showcase
      targetPos.x = isMobile ? 0 : 5.0;
      targetPos.y = isMobile ? -3.0 : 0;
      targetPos.z = 0;
      targetPos.scale = isMobile ? 0.95 : 1.25;
      targetPos.rotSpeed = 0.005;
      camera.position.z = 24;
    } 
    else if (scrollPercent > 0.22 && scrollPercent <= 0.48) {
      // 2. TECH ZONES SECTION: shifts to far right, scales down
      targetPos.x = isMobile ? 0 : 6.8;
      targetPos.y = isMobile ? -5.5 : 0.5;
      targetPos.z = -2;
      targetPos.scale = isMobile ? 0.65 : 0.95;
      targetPos.rotSpeed = 0.008;
      camera.position.z = 22;
    } 
    else if (scrollPercent > 0.48 && scrollPercent <= 0.72) {
      // 3. EVENT TIMELINE: moves to left side to showcase schematic SVG on the right
      targetPos.x = isMobile ? 0 : -6.5;
      targetPos.y = isMobile ? -4.5 : 0;
      targetPos.z = 0;
      targetPos.scale = isMobile ? 0.75 : 1.1;
      targetPos.rotSpeed = 0.012; // Spins faster during chronology
      camera.position.z = 24;
    } 
    else if (scrollPercent > 0.72 && scrollPercent <= 0.88) {
      // 4. TELEMETRY MONITOR: moves far back, centers
      targetPos.x = 0;
      targetPos.y = 0;
      targetPos.z = -12;
      targetPos.scale = 0.7;
      targetPos.rotSpeed = 0.003; // Slow sync
      camera.position.z = 26;
    } 
    else {
      // 5. TICKET PASS GENERATOR: floats in background as subtle cosmic field
      targetPos.x = isMobile ? 0 : -8.0;
      targetPos.y = isMobile ? 6.0 : 2.5;
      targetPos.z = -5;
      targetPos.scale = 0.9;
      targetPos.rotSpeed = 0.004;
      camera.position.z = 25;
    }
  };

  window.addEventListener('scroll', updateScrollTargets);

  // Initialize ThreeJS
  initThree();

  // ==========================================
  // TECH ZONES INTERACTION & MORPHING
  // ==========================================
  const configTitle = document.getElementById('config-card-title');
  const zoneCodenameEl = document.getElementById('zone-codename');
  const zoneStatusEl = document.getElementById('zone-status');
  const zoneBadgeEl = document.getElementById('zone-badge');
  const optionsContainer = document.getElementById('config-options-container');

  // Interactive Stats elements
  const valStat1 = document.getElementById('val-stat1');
  const chgStat1 = document.getElementById('chg-stat1');
  const barStat1 = document.getElementById('bar-stat1');
  const lblStat1 = document.getElementById('lbl-stat1');

  const valStat2 = document.getElementById('val-stat2');
  const chgStat2 = document.getElementById('chg-stat2');
  const barStat2 = document.getElementById('bar-stat2');
  const lblStat2 = document.getElementById('lbl-stat2');

  const valStat3 = document.getElementById('val-stat3');
  const chgStat3 = document.getElementById('chg-stat3');
  const barStat3 = document.getElementById('bar-stat3');
  const lblStat3 = document.getElementById('lbl-stat3');

  const valStat4 = document.getElementById('val-stat4');
  const chgStat4 = document.getElementById('chg-stat4');
  const barStat4 = document.getElementById('bar-stat4');
  const lblStat4 = document.getElementById('lbl-stat4');

  // Setup tab trigger listeners
  const zones = ['nexus', 'robotics', 'quantum', 'bio'];
  zones.forEach(zone => {
    const button = document.getElementById(`tab-${zone}`);
    if (button) {
      button.addEventListener('click', () => {
        document.querySelectorAll('.augment-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        activeZone = zone;
        loadZoneSpecs();
      });
    }
  });

  // Dynamically load specifications for selected Tech Zone
  const loadZoneSpecs = () => {
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    const data = zoneData[activeZone];
    
    // Update Header Card Text
    const formattedTitle = activeZone === 'nexus' ? "AI & COGNITIVE NEXUS" : 
                            activeZone === 'robotics' ? "ROBOTICS & MECHATRONICS" : 
                            activeZone === 'quantum' ? "QUANTUM CRYPTOGRAPHY" : "SYNTHETIC BIO-GENETICS";
    
    configTitle.innerHTML = `${formattedTitle} <span class="mono text-muted" id="port-status">ACTIVE</span>`;
    
    // Update Codename specs
    zoneCodenameEl.textContent = data.codename;
    zoneStatusEl.textContent = data.status;
    zoneBadgeEl.textContent = data.badge;

    // Toggle badge coloring classes
    zoneBadgeEl.className = 'status-badge';
    if (activeZone === 'nexus') zoneBadgeEl.style.borderColor = 'var(--cyan)';
    else if (activeZone === 'robotics') zoneBadgeEl.className = 'status-badge magenta-glow';
    else if (activeZone === 'quantum') zoneBadgeEl.style.borderColor = '#ffaa00';
    else if (activeZone === 'bio') zoneBadgeEl.style.borderColor = 'var(--green)';

    // Update Stats Display
    updateStatField(lblStat1, valStat1, chgStat1, barStat1, data.stats.stat1);
    updateStatField(lblStat2, valStat2, chgStat2, barStat2, data.stats.stat2);
    updateStatField(lblStat3, valStat3, chgStat3, barStat3, data.stats.stat3);
    updateStatField(lblStat4, valStat4, chgStat4, barStat4, data.stats.stat4);

    // Create Event Rows
    data.events.forEach(evt => {
      const eventRow = document.createElement('div');
      eventRow.className = 'option-row';
      
      eventRow.innerHTML = `
        <div class="option-info">
          <span class="option-name">${evt.name}</span>
          <span class="option-cost mono" style="color: rgba(255, 255, 255, 0.4);">${evt.desc}</span>
        </div>
        <div class="mono cyan-glow" style="font-size: 11px; font-weight:600; white-space: nowrap;">${evt.cost}</div>
      `;
      
      // Audio feedbacks
      eventRow.addEventListener('mouseenter', () => playSound(hoverSound));
      eventRow.addEventListener('click', () => {
        playSound(clickSound);
        appendConsoleLog(`TECH EVENT INTRUSION SYNCED: ${evt.name.toUpperCase()}`, 'success');
      });
      
      optionsContainer.appendChild(eventRow);
    });

    // Morph WebGL ThreeJS geometry and colors
    morphThreeCore(activeZone, data.themeColor);
  };

  // Helper to update performance card values
  const updateStatField = (lbl, val, chg, bar, stat) => {
    if (!lbl) return;
    lbl.textContent = stat.name;
    val.textContent = stat.val;
    chg.textContent = stat.pct;
    
    // Custom colors on delta changes
    if (stat.pct.includes('+') || stat.pct === 'MAX' || stat.pct === 'STABLE') {
      chg.className = 'stat-change green-glow';
    } else if (stat.pct.includes('-')) {
      chg.className = 'stat-change magenta-glow';
    } else {
      chg.className = 'stat-change';
    }

    bar.style.width = `${stat.fill}%`;
    
    // Set bar gradient coloring based on zone
    if (activeZone === 'nexus') {
      bar.style.background = 'linear-gradient(90deg, var(--cyan), var(--green))';
    } else if (activeZone === 'robotics') {
      bar.style.background = 'linear-gradient(90deg, var(--magenta), #ff00ff)';
    } else if (activeZone === 'quantum') {
      bar.style.background = 'linear-gradient(90deg, #ffaa00, #ff5500)';
    } else {
      bar.style.background = 'linear-gradient(90deg, var(--green), var(--cyan))';
    }
  };

  // WebGL mesh morphing trigger
  const morphThreeCore = (zoneKey, targetHexColor) => {
    if (!coreMesh || !particleGeometry) return;

    // Discard old geometry cleanly to prevent GPU leaks
    // Apply smooth mesh transition by scaling down, swap, and scaling back up
    targetPos.scale = 0.1;
    
    setTimeout(() => {
      coreMesh.geometry = coreGeometries[zoneKey];
      coreMesh.material.color.setHex(targetHexColor);
      
      // Update particle colors
      const attr = particleGeometry.attributes.color;
      const primaryColor = new THREE.Color(targetHexColor);
      const secondaryColor = zoneKey === 'nexus' ? new THREE.Color(0xff0055) : new THREE.Color(0x00f0ff);
      
      for (let i = 0; i < attr.count; i++) {
        const mix = Math.random() > 0.4 ? primaryColor : secondaryColor;
        attr.setXYZ(i, mix.r, mix.g, mix.b);
      }
      attr.needsUpdate = true;
      
      // Restore core scale
      updateScrollTargets();
      appendConsoleLog(`WebGL CORE MORPHED: GATEWAY -> ${zoneKey.toUpperCase()}`, 'success');
    }, 150);
  };

  // Load baseline on setup
  loadZoneSpecs();

  // ==========================================
  // BLUEPRINTS SCHEMATICS SCROLLYTELLING
  // ==========================================
  const scrollSteps = document.querySelectorAll('.scroll-step');
  
  const parts = {
    'step-01': document.getElementById('part-neural'),
    'step-02': [document.getElementById('part-optics'), document.getElementById('part-optics-line')],
    'step-03': document.getElementById('part-kinetic'),
    'step-04': document.getElementById('part-armor')
  };

  const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        const stepId = entry.target.id;
        
        scrollSteps.forEach(step => step.classList.remove('active'));
        entry.target.classList.add('active');

        if (audioEnabled) playSound(hoverSound);

        // Highlight custom schematic SVG elements
        Object.keys(parts).forEach(key => {
          const els = Array.isArray(parts[key]) ? parts[key] : [parts[key]];
          els.forEach(el => {
            if (el) {
              if (key === stepId) {
                if (key === 'step-02') el.classList.add('active-optics');
                else el.classList.add('active');
              } else {
                el.classList.remove('active', 'active-optics');
              }
            }
          });
        });

        // Trigger dynamic particle speed acceleration during scroll targets
        if (stepId === 'step-01') targetPos.rotSpeed = 0.005;
        else if (stepId === 'step-02') targetPos.rotSpeed = 0.008;
        else if (stepId === 'step-03') targetPos.rotSpeed = 0.012;
        else if (stepId === 'step-04') targetPos.rotSpeed = 0.018;

        appendConsoleLog(`CHRONOLOGY TELEMETRY FOCUS: ${stepId.toUpperCase()}`, 'info');
      }
    });
  }, {
    threshold: [0.15, 0.3, 0.45, 0.6],
    rootMargin: "-25% 0px -25% 0px"
  });

  scrollSteps.forEach(step => {
    stepsObserver.observe(step);
  });

  // ==========================================
  // HOLOGRAM TICKET COMPILER (3D INTERACTION)
  // ==========================================
  const ticketCard = document.getElementById('interactive-ticket');
  const ticketGlare = document.getElementById('ticket-glare');
  const compileBtn = document.getElementById('btn-compile-ticket');
  
  const formName = document.getElementById('ticket-user-name');
  const formDomain = document.getElementById('ticket-domain');
  const formTier = document.getElementById('ticket-tier');

  const dispName = document.getElementById('tick-name-display');
  const dispDomain = document.getElementById('tick-domain-display');
  const dispTierBadge = document.getElementById('badge-ticket-tier');

  // Input bindings
  if (formName) {
    formName.addEventListener('input', (e) => {
      const val = e.target.value.toUpperCase();
      dispName.textContent = val.trim() !== "" ? val : "GUEST_SEC_99";
    });
  }

  if (formDomain) {
    formDomain.addEventListener('change', (e) => {
      dispDomain.textContent = e.target.value;
      
      // Synergise ticket styling glows to gate domain selection
      const gateColors = {
        'AI NEXUS': 'var(--cyan)',
        'ROBOTICS CORE': 'var(--magenta)',
        'QUANTUM CRYPTO': '#ffaa00',
        'BIO-GENETICS': 'var(--green)'
      };
      dispDomain.style.color = gateColors[e.target.value] || 'var(--cyan)';
    });
  }

  if (formTier) {
    formTier.addEventListener('change', (e) => {
      const tierVal = e.target.value;
      dispTierBadge.textContent = tierVal;
      
      // Update Card authorization tier modifiers
      ticketCard.className = 'ticket-card';
      if (tierVal === 'VIP CORE') {
        ticketCard.classList.add('vip');
      } else if (tierVal === 'HACKER ELITE') {
        ticketCard.classList.add('hacker');
      }
    });
  }

  // Tilt calculations on Mouse Move over Card
  if (ticketCard) {
    const handleTicketTilt = (e) => {
      const rect = ticketCard.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside element
      const y = e.clientY - rect.top;  // y coordinate inside element
      
      // Calculate rotation bounds mapping
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Rotate bounds: max 25 degrees
      const rotX = ((centerY - y) / centerY) * 20;
      const rotY = ((x - centerX) / centerX) * 20;
      
      ticketCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Glare reflection mapping
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      ticketGlare.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`;
    };
    
    const resetTicketTilt = () => {
      ticketCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      ticketGlare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)';
    };

    ticketCard.addEventListener('mousemove', handleTicketTilt);
    ticketCard.addEventListener('mouseleave', resetTicketTilt);
  }

  // Compile Ticket compilation action
  if (compileBtn) {
    compileBtn.addEventListener('click', () => {
      if (!formName.value || formName.value.trim() === "") {
        formName.focus();
        appendConsoleLog('TICKET COMPILE ABORTED: MISSING SUBJECT NAME', 'warn');
        alert("ACCESS VERIFICATION FAILED\n\nPlease enter a secure subject codename.");
        return;
      }

      playSound(clickSound);
      
      const prevText = compileBtn.textContent;
      compileBtn.textContent = "COMPILING SECURITY...";
      compileBtn.disabled = true;
      
      appendConsoleLog('TICKET CODE GENERATION COMMENCED', 'info');
      appendConsoleLog('SYNAPSE PROTOCOL: ALLOCATING GATE ACCESS TIERS...', 'info');

      // Animate compilation scanning bar on the card
      const ticketInner = document.querySelector('.ticket-inner');
      ticketInner.style.opacity = '0.35';
      ticketCard.style.borderColor = 'rgba(255,255,255,0.4)';
      
      setTimeout(() => {
        appendConsoleLog('SECURE CRYPTO SIGNATURE WRITTEN TO MAINFRAME', 'success');
        
        setTimeout(() => {
          ticketInner.style.opacity = '1';
          ticketCard.style.borderColor = '';
          compileBtn.textContent = "PASS COMPILED";
          
          const holderName = formName.value.toUpperCase();
          const authorizedGate = formDomain.value;
          const authTier = formTier.value;
          
          appendConsoleLog(`TICKET IMMUTABLY SYNAPSED FOR SUBJECT: ${holderName}`, 'success');
          alert(`AETHERIS PASS COMPILED\n\nSubject Codename: ${holderName}\nAssigned Gate: ${authorizedGate}\nAccess Authorization: ${authTier}\n\nSecurity key successfully written to Aetheris database.`);
          
          setTimeout(() => {
            compileBtn.textContent = prevText;
            compileBtn.disabled = false;
          }, 3000);
        }, 1000);
      }, 1200);
    });
  }

  // ==========================================
  // FAQ ACCORDIONS OVERRIDES
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');
    
    if (questionBtn && answerEl) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(faq => {
          faq.classList.remove('active');
          faq.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answerEl.style.maxHeight = `${answerEl.scrollHeight}px`;
        }
      });
    }
  });

  // ==========================================
  // NEWSLETTER & FOOTER ACTIONS
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playSound(clickSound);
      
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const val = emailInput.value.toUpperCase();
      
      appendConsoleLog(`DISPATCH CHANNEL SYNCED FOR: ${val}`, 'success');
      alert(`MAINFRAME DISPATCH ESTABLISHED\n\nDispatches synchronized for security client: ${val}\nVerify secure ports.`);
      
      emailInput.value = '';
    });
  }
});
