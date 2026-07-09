document.addEventListener('DOMContentLoaded', () => {
  console.log("NEURASYNAPSE HUD: Synchronizing system controls...");

  // ==========================================
  // SYSTEM STATE
  // ==========================================
  let audioEnabled = false;
  
  // Customizer active items selection state
  // key: optionId, value: boolean
  const selectedAugments = {
    'brain-interface': true,
    'memory-buffer': false,
    'deep-dive': false,
    'ocular-hud': false,
    'thermal-scan': false,
    'multi-spectrum': false,
    'carbon-fibers': false,
    'knee-boosters': false,
    'battery-node': false,
    'graphene-plating': false,
    'kinetic-absorber': false,
    'dermal-shield': false
  };

  // Base Stats (Default Subject stats)
  const baseStats = {
    reflex: 100, // ms
    cognitive: 120, // IQ
    sensory: 60, // GHz
    armor: 15 // rating points
  };

  // Augments data
  const augmentsData = {
    neural: {
      title: "NEURAL OPTIMIZATION",
      port: "PORT 01",
      options: [
        { id: 'brain-interface', name: 'Synaptic Bridge Interface', cost: 1500, stats: { reflex: -10, cognitive: 15, sensory: 5, armor: 0 } },
        { id: 'memory-buffer', name: 'L3 Memory Buffer Stack', cost: 2200, stats: { reflex: 0, cognitive: 35, sensory: 15, armor: 0 } },
        { id: 'deep-dive', name: 'Deep-Dive Port Overlay', cost: 1800, stats: { reflex: -5, cognitive: 10, sensory: 25, armor: 2 } }
      ]
    },
    sensory: {
      title: "OPTICAL RETINA IMPLANTS",
      port: "PORT 02",
      options: [
        { id: 'ocular-hud', name: 'Retinal HUD Scanner', cost: 1200, stats: { reflex: -12, cognitive: 5, sensory: 40, armor: 0 } },
        { id: 'thermal-scan', name: 'Infrared Thermal Scan Array', cost: 1600, stats: { reflex: 0, cognitive: 8, sensory: 50, armor: 2 } },
        { id: 'multi-spectrum', name: 'Multi-Spectrum Lens Array', cost: 2000, stats: { reflex: -5, cognitive: 10, sensory: 60, armor: 0 } }
      ]
    },
    kinetic: {
      title: "KINETIC LIMB COMPOSITES",
      port: "PORT 03",
      options: [
        { id: 'carbon-fibers', name: 'Carbon-Fiber Muscle Strands', cost: 2500, stats: { reflex: -30, cognitive: 0, sensory: 0, armor: 15 } },
        { id: 'knee-boosters', name: 'High-Torque Pneumatic Servos', cost: 3200, stats: { reflex: -40, cognitive: 0, sensory: 0, armor: 25 } },
        { id: 'battery-node', name: 'Subdermal Bio-Battery Core', cost: 2800, stats: { reflex: 0, cognitive: 5, sensory: 10, armor: 10 } }
      ]
    },
    dermal: {
      title: "NANO-ARMOR FRAMEWORK",
      port: "PORT 04",
      options: [
        { id: 'graphene-plating', name: 'Subdermal Graphene Plating', cost: 3500, stats: { reflex: 0, cognitive: 0, sensory: 0, armor: 60 } },
        { id: 'kinetic-absorber', name: 'Kinetic Shock Absorber Core', cost: 4200, stats: { reflex: -10, cognitive: 0, sensory: 0, armor: 80 } },
        { id: 'dermal-shield', name: 'Nano-Dermal Shield Diffuser', cost: 3800, stats: { reflex: 0, cognitive: 5, sensory: 12, armor: 50 } }
      ]
    }
  };

  // Current tab in customizer
  let activeTab = 'neural';

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
  if (hoverSound) hoverSound.volume = 0.08;
  if (clickSound) clickSound.volume = 0.15;
  if (bootSound) bootSound.volume = 0.25;

  const playSound = (audioElement) => {
    if (audioEnabled && audioElement) {
      // Reset sound clip start
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
        
        // Play system boot SFX
        playSound(bootSound);
        appendConsoleLog('SYSTEM AUDIO PROTOCOLS INITIALIZED', 'success');
      } else {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
      }
    });
  }

  // Hover triggers for general tech buttons
  const addAudioTriggers = (elements) => {
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => playSound(hoverSound));
      element.addEventListener('click', () => playSound(clickSound));
    });
  };

  // Initial trigger allocation
  const setupAudioTriggers = () => {
    const interactives = document.querySelectorAll('.btn, .tab-btn, .option-row, .faq-question, .nav-links a, input[type="range"]');
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
      
      // Update hamburger lines
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

    // Close menu when link clicked
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
    { text: "ESTABLISHING CORE TRANS-HYPER BRIDGE...", type: "info" },
    { text: "DOWNLOADING COGNITIVE RECONFIG FILESETS...", type: "info" },
    { text: "PORT SECURITY SANITY: OK", type: "success" },
    { text: "DECK FIRMWARE SYNC ENGAGED", type: "info" },
    { text: "THERMAL EMISSION: NORMAL 37.1 C", type: "success" },
    { text: "WARNING: MEMORY CACHE SPAN DEVIATION [A4]", type: "warn" },
    { text: "FLUSHING CACHE BUFFER: DONE", type: "success" },
    { text: "SYNAPSE PORTS STABILIZED ON 60GHZ INDEX", type: "success" },
    { text: "SUBJECT HEURISTIC MATRIX CONNECTED", type: "info" }
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

      // Restrict lines length to prevent DOM memory accumulation
      if (heroTermBody.children.length > 20) {
        heroTermBody.removeChild(heroTermBody.children[0]);
      }
    }
  }, 3500);

  // ==========================================
  // INTERACTIVE AUGMENT LAB (THE CUSTOMIZER)
  // ==========================================
  const configTitle = document.getElementById('config-card-title');
  const portStatus = document.getElementById('port-status');
  const optionsContainer = document.getElementById('config-options-container');

  // Interactive Stats elements
  const valReflex = document.getElementById('val-reflex');
  const chgReflex = document.getElementById('chg-reflex');
  const barReflex = document.getElementById('bar-reflex');

  const valCognitive = document.getElementById('val-cognitive');
  const chgCognitive = document.getElementById('chg-cognitive');
  const barCognitive = document.getElementById('bar-cognitive');

  const valSensory = document.getElementById('val-sensory');
  const chgSensory = document.getElementById('chg-sensory');
  const barSensory = document.getElementById('bar-sensory');

  const valArmor = document.getElementById('val-armor');
  const chgArmor = document.getElementById('chg-armor');
  const barArmor = document.getElementById('bar-armor');

  const totalCostEl = document.getElementById('loadout-total-cost');
  const initiateImplantBtn = document.getElementById('loadout-sync-btn');

  // Setup tab trigger listeners
  const tabs = ['neural', 'sensory', 'kinetic', 'dermal'];
  tabs.forEach(tab => {
    const button = document.getElementById(`tab-${tab}`);
    if (button) {
      button.addEventListener('click', () => {
        // Toggle active button
        document.querySelectorAll('.augment-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        activeTab = tab;
        loadOptionsForTab();
      });
    }
  });

  // Dynamically load options for the selected tab
  const loadOptionsForTab = () => {
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';
    const tabData = augmentsData[activeTab];
    
    // Update Header Card Text
    configTitle.innerHTML = `${tabData.title} <span class="mono text-muted" id="port-status">${tabData.port}</span>`;
    
    // Create elements
    tabData.options.forEach(opt => {
      const isChecked = selectedAugments[opt.id];
      const optionRow = document.createElement('div');
      optionRow.className = `option-row ${isChecked ? 'checked' : ''}`;
      optionRow.id = `row-${opt.id}`;
      
      optionRow.innerHTML = `
        <div class="option-info">
          <span class="option-name">${opt.name}</span>
          <span class="option-cost mono">${opt.cost.toLocaleString()} CR</span>
        </div>
        <div class="checkbox-wrapper"></div>
      `;
      
      // Handle Toggle Click
      optionRow.addEventListener('click', () => {
        selectedAugments[opt.id] = !selectedAugments[opt.id];
        optionRow.classList.toggle('checked');
        playSound(clickSound);
        
        // Update diagnostics calculations
        recalculateProfile();
      });

      // Mouse Hover sound effects
      optionRow.addEventListener('mouseenter', () => playSound(hoverSound));
      
      optionsContainer.appendChild(optionRow);
    });
  };

  // Recalculate full Subject Profile Stats
  const recalculateProfile = () => {
    let finalReflex = baseStats.reflex;
    let finalCognitive = baseStats.cognitive;
    let finalSensory = baseStats.sensory;
    let finalArmor = baseStats.armor;
    let totalCost = 5000; // Base baseline fee

    // Sum changes from active augments
    Object.keys(augmentsData).forEach(tabKey => {
      augmentsData[tabKey].options.forEach(opt => {
        if (selectedAugments[opt.id]) {
          finalReflex += opt.stats.reflex;
          finalCognitive += opt.stats.cognitive;
          finalSensory += opt.stats.sensory;
          finalArmor += opt.stats.armor;
          totalCost += opt.cost;
        }
      });
    });

    // Animate and update UI text
    updateStatDisplay(valReflex, chgReflex, barReflex, finalReflex, baseStats.reflex, ' ms', true);
    updateStatDisplay(valCognitive, chgCognitive, barCognitive, finalCognitive, baseStats.cognitive, ' IQ');
    updateStatDisplay(valSensory, chgSensory, barSensory, finalSensory, baseStats.sensory, ' GHz');
    updateStatDisplay(valArmor, chgArmor, barArmor, finalArmor, baseStats.armor, ' points');

    // Update Cost
    totalCostEl.textContent = `${totalCost.toLocaleString()} CR`;
  };

  // Animate numbers and display changes clearly
  const updateStatDisplay = (valEl, chgEl, barEl, newVal, baseVal, suffix, invertColor = false) => {
    if (!valEl) return;
    
    // Value animate
    valEl.textContent = `${newVal}${suffix}`;
    
    // Calculate percentage change
    const delta = newVal - baseVal;
    let pct = 0;
    if (baseVal > 0) {
      pct = Math.round((delta / baseVal) * 100);
    }
    
    // Handle specific display adjustments
    if (suffix === ' ms') {
      // Lower reflex latency is better
      const deltaMs = baseVal - newVal;
      if (deltaMs > 0) {
        chgEl.textContent = `-${deltaMs} ms`;
        chgEl.className = 'stat-change green-glow';
      } else if (deltaMs === 0) {
        chgEl.textContent = `+0%`;
        chgEl.className = 'stat-change';
      } else {
        chgEl.textContent = `+${Math.abs(deltaMs)} ms`;
        chgEl.className = 'stat-change magenta-glow';
      }
    } else {
      if (pct > 0) {
        chgEl.textContent = `+${pct}%`;
        chgEl.className = 'stat-change green-glow';
      } else if (pct === 0) {
        chgEl.textContent = `+0%`;
        chgEl.className = 'stat-change';
      } else {
        chgEl.textContent = `${pct}%`;
        chgEl.className = 'stat-change magenta-glow';
      }
    }

    // Update progress bars (max bounds mapping)
    let barWidth = 30;
    if (suffix === ' ms') barWidth = Math.max(10, Math.min(100, 140 - newVal)); // lower latency = wider bar
    else if (suffix === ' IQ') barWidth = Math.max(10, Math.min(100, (newVal / 250) * 100));
    else if (suffix === ' GHz') barWidth = Math.max(10, Math.min(100, (newVal / 300) * 100));
    else barWidth = Math.max(10, Math.min(100, (newVal / 200) * 100));

    barEl.style.width = `${barWidth}%`;
  };

  // Initiate Implant Button
  if (initiateImplantBtn) {
    initiateImplantBtn.addEventListener('click', () => {
      playSound(clickSound);
      
      // Perform HUD flashing animation
      initiateImplantBtn.textContent = "SYNAPSE CONNECTING...";
      initiateImplantBtn.disabled = true;
      appendConsoleLog('CYBER CHASSIS PORT SYNC SEQUENCE COMMENCED', 'info');
      
      setTimeout(() => {
        initiateImplantBtn.textContent = "IMPLANT SYNAPSED";
        appendConsoleLog('IMPLANT SEQUENCE COMPLETED: STABLE RECON DETECTED', 'success');
        
        setTimeout(() => {
          initiateImplantBtn.textContent = "INITIATE IMPLANT";
          initiateImplantBtn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  // Load baseline on setup
  loadOptionsForTab();
  recalculateProfile();

  // ==========================================
  // BLUEPRINTS SCHEMATICS SCROLLYTELLING
  // ==========================================
  const scrollSteps = document.querySelectorAll('.scroll-step');
  
  // Named blueprint SVG groups
  const parts = {
    'step-01': document.getElementById('part-neural'),
    'step-02': [document.getElementById('part-optics'), document.getElementById('part-optics-line')],
    'step-03': document.getElementById('part-kinetic'),
    'step-04': document.getElementById('part-armor')
  };

  const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        const stepId = entry.target.id;
        
        // Mark text step active
        scrollSteps.forEach(step => step.classList.remove('active'));
        entry.target.classList.add('active');

        // Play subtle tick sound
        if (audioEnabled) playSound(hoverSound);

        // Highlight SVG parts
        Object.keys(parts).forEach(key => {
          const els = Array.isArray(parts[key]) ? parts[key] : [parts[key]];
          els.forEach(el => {
            if (el) {
              if (key === stepId) {
                if (key === 'step-02') {
                  el.classList.add('active-optics');
                } else {
                  el.classList.add('active');
                }
              } else {
                el.classList.remove('active', 'active-optics');
              }
            }
          });
        });

        appendConsoleLog(`SCHEMATICS SCANNER TARGETED: ${stepId.toUpperCase()}`, 'info');
      }
    });
  }, {
    threshold: [0.2, 0.4, 0.6, 0.8],
    rootMargin: "-20% 0px -20% 0px" // Focus focus trigger on middle area of scrollport
  });

  scrollSteps.forEach(step => {
    stepsObserver.observe(step);
  });

  // ==========================================
  // TELEMETRY MONITOR WAVEFORM (CANVAS DRAW)
  // ==========================================
  const canvas = document.getElementById('telemetry-canvas');
  const timestampEl = document.getElementById('current-timestamp');
  
  // Telemetry monitor numeric components
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

    // Flush lines to avoid DOM leaks
    if (consoleLogEl.children.length > 50) {
      consoleLogEl.removeChild(consoleLogEl.children[0]);
    }
  };

  // Waveform oscilloscope drawing
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Fit canvas scale to container
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
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
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

      // Draw primary waveform line
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      ctx.moveTo(0, centerY);

      for (let i = 0; i < canvas.width; i++) {
        // Compound sine waves with noise to simulate data feeds
        const y = centerY + 
                  Math.sin(i * 0.02 + offset) * 20 + 
                  Math.sin(i * 0.05 + offset * 1.5) * 8 +
                  (Math.random() - 0.5) * 3; // high frequency noise
        ctx.lineTo(i, y);
      }
      ctx.stroke();
      
      // Draw secondary overdrive magenta line
      ctx.strokeStyle = 'rgba(255, 0, 85, 0.25)';
      ctx.shadowColor = 'transparent';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i < canvas.width; i++) {
        const y = centerY + 
                  Math.sin(i * 0.01 - offset * 0.5) * 35 + 
                  Math.cos(i * 0.03 + offset) * 12;
        ctx.lineTo(i, y);
      }
      ctx.stroke();

      offset += 0.08;
      requestAnimationFrame(drawOscilloscope);
    };
    
    // Start canvas loop
    drawOscilloscope();
  }

  // Update timestamps and metrics dynamically
  setInterval(() => {
    const now = new Date();
    if (timestampEl) {
      timestampEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }

    // Dynamic telemetry tweaks
    if (diagTemp) {
      const temp = (36.8 + Math.random() * 0.6).toFixed(1);
      diagTemp.textContent = `${temp}°C`;
    }
    if (diagFreq) {
      const freq = (98.0 + Math.random() * 1.5).toFixed(1);
      diagFreq.textContent = `${freq}%`;
    }
    if (diagDraw) {
      // Sum active draw based on options check
      let activeCount = Object.values(selectedAugments).filter(Boolean).length;
      const baseDraw = 3.2;
      const finalDraw = (baseDraw + activeCount * 0.45 + Math.random() * 0.1).toFixed(1);
      diagDraw.textContent = `${finalDraw} W`;
    }
  }, 1000);

  // Dynamic telemetry log simulation
  const sysEvents = [
    { text: "Core synapse temperature nominal", type: "success" },
    { text: "Sensory array buffer sync verification completed", type: "success" },
    { text: "Heartbeat kinetic cells charging bio-nodes", type: "info" },
    { text: "Thermal emissions shift detected: self-balancing ports active", type: "info" },
    { text: "Warning: High sensory load detected on opt-retina port", type: "warn" },
    { text: "Security sandbox scan: No viral telemetry detected", type: "success" },
    { text: "Reflex synaptic delay stabilized at target rate", type: "success" }
  ];

  setInterval(() => {
    const event = sysEvents[Math.floor(Math.random() * sysEvents.length)];
    appendConsoleLog(event.text, event.type);
  }, 6000);

  // Initialize terminal console log contents
  appendConsoleLog('NEURASYNAPSE SECURE CLIENT INITIALIZED', 'success');
  appendConsoleLog('FIRMWARE: VER v4.01-STABLE ACTIVE', 'info');
  appendConsoleLog('PORT MATRIX DETECTED AND STABILIZED', 'success');

  // ==========================================
  // COST CONFIGURATOR SLIDERS
  // ==========================================
  const slideReflex = document.getElementById('slide-reflex');
  const slideFreq = document.getElementById('slide-freq');
  const slideIntegrity = document.getElementById('slide-integrity');

  const valSlideReflex = document.getElementById('val-slide-reflex');
  const valSlideFreq = document.getElementById('val-slide-freq');
  const valSlideIntegrity = document.getElementById('val-slide-integrity');

  const sumMaintenance = document.getElementById('sum-maintenance');
  const sumPower = document.getElementById('sum-power');
  const sumLatency = document.getElementById('sum-latency');
  const sumTotalCredits = document.getElementById('sum-total-credits');
  const sliderCta = document.getElementById('slider-sync-cta');

  const recalculateSliders = () => {
    if (!slideReflex || !slideFreq || !slideIntegrity) return;

    const reflexVal = parseInt(slideReflex.value);
    const freqVal = parseFloat(slideFreq.value) / 10; // e.g. 24 -> 2.4 GHz
    const integrityVal = parseInt(slideIntegrity.value);

    // Update Slider indicators text
    valSlideReflex.textContent = `${reflexVal}%`;
    valSlideFreq.textContent = `${freqVal.toFixed(1)} GHz`;
    valSlideIntegrity.textContent = `${integrityVal}%`;

    // Perform technical formulas
    // Latency = 10ms baseline / (reflex % factor)
    const latency = (10 / (reflexVal * 0.08)).toFixed(1);
    // Power = base 2W + (freq^2 factor)
    const power = (2.0 + Math.pow(freqVal, 1.8) * 0.6).toFixed(1);
    // Maintenance = base 200 Hrs + integrity factor
    const maintenance = Math.round(200 + (integrityVal * 7.5));
    // Cost = composite formula
    const totalCredits = Math.round((reflexVal * 120) + (freqVal * 2500) + (integrityVal * 180));

    // Update summary panels text
    sumLatency.textContent = `${latency} ms`;
    sumPower.textContent = `${power} W/h`;
    sumMaintenance.textContent = `${maintenance} Hrs`;
    sumTotalCredits.textContent = `${totalCredits.toLocaleString()} CR`;
  };

  // Attach sliders listeners
  [slideReflex, slideFreq, slideIntegrity].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', () => {
        recalculateSliders();
      });
    }
  });

  if (sliderCta) {
    sliderCta.addEventListener('click', () => {
      playSound(clickSound);
      sliderCta.textContent = "TRANSMITTING DATA...";
      sliderCta.disabled = true;
      appendConsoleLog('CONFIG TELEMETRY SUBMISSION COMMENCED', 'info');

      setTimeout(() => {
        sliderCta.textContent = "LOADOUT SYNCHRONIZED";
        appendConsoleLog('SERVER CONFIG MATCH COMPLETED: PORT CONFIGURED', 'success');
        
        setTimeout(() => {
          sliderCta.textContent = "TRANSMIT CONFIG LOADOUT";
          sliderCta.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  // Trigger calculation on setup
  recalculateSliders();

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
        
        // Collapse all items
        faqItems.forEach(faq => {
          faq.classList.remove('active');
          faq.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Toggle active item
        if (!isActive) {
          item.classList.add('active');
          // Smooth transition by tracking scrollHeight
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
      alert(`NEURAL DISPATCH ESTABLISHED\n\nChannel sync established for subject: ${val}\nVerify secure ports.`);
      
      emailInput.value = '';
    });
  }
});
