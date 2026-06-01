document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // DATE INITIALIZATION
  // ==========================================
  const initDate = () => {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      const options = { year: 'numeric', month: 'long' };
      const formattedDate = new Date('2026-06-01T00:00:00').toLocaleDateString('es-ES', options);
      dateEl.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  };
  
  // ==========================================
  // SECTION NAVIGATION (TABS)
  // ==========================================
  const initNavigation = () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        sections.forEach(section => {
          section.classList.remove('active', 'fade-in-up');
          if (section.getAttribute('id') === target) {
            section.classList.add('active');
            void section.offsetWidth;
            section.classList.add('fade-in-up');
          }
        });
      });
    });
  };

  // ==========================================
  // PRINT ACTION
  // ==========================================
  const initPrint = () => {
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  };

  // ==========================================
  // DYNAMIC PRICE CALCULATOR
  // ==========================================
  const initCalculator = () => {
    const slider = document.getElementById('sucursales-range');
    const valDisplay = document.getElementById('sucursales-val');
    
    const subtotalSaasA = document.getElementById('subtotal-saas-a');
    const totalSaasAVal = document.getElementById('total-saas-a-val');
    const totalSaasAQtz = document.getElementById('total-saas-a-qtz');
    
    const subtotalSaasB = document.getElementById('subtotal-saas-b');
    const totalSaasBVal = document.getElementById('total-saas-b-val');
    const totalSaasBQtz = document.getElementById('total-saas-b-qtz');
    
    if (!slider) return;
    
    // Constants from the economic proposal (Attendance System)
    const COST_PER_SEDE = 500.00;
    const CLOUD_FIXED_GTQ = 1689.25; // Q1,165.00 (Base) + Q524.25 (45% markup)
    const EXCHANGE_RATE = 7.80; // Standard corporate exchange rate
    
    const formatUSD = (val) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val) + ' USD';
    };

    const formatGTQ = (val) => {
      return 'Q' + new Intl.NumberFormat('es-GT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val) + ' GTQ';
    };
    
    const updateCosts = (sedes) => {
      valDisplay.textContent = sedes;
      
      // Calculate Option A
      const saasSubtotalA = sedes * COST_PER_SEDE;
      const totalA = saasSubtotalA; 
      const totalAQtzVal = totalA * EXCHANGE_RATE;
      
      // Calculate Option B
      const saasSubtotalB = sedes * COST_PER_SEDE;
      const totalBQtzVal = (saasSubtotalB * EXCHANGE_RATE) + CLOUD_FIXED_GTQ;
      
      // Render Option A
      subtotalSaasA.textContent = formatUSD(saasSubtotalA);
      totalSaasAVal.textContent = formatUSD(totalA);
      totalSaasAQtz.textContent = formatGTQ(totalAQtzVal);
      
      // Render Option B
      subtotalSaasB.textContent = formatUSD(saasSubtotalB);
      // Option B has mixed currency in presentation: e.g. "$5,000.00 USD + Q1,689.25 GTQ"
      totalSaasBVal.innerHTML = `${formatUSD(saasSubtotalB)} <span style="font-size:1.1rem; font-weight:500; color:var(--text-secondary);">+</span> ${formatGTQ(CLOUD_FIXED_GTQ)}`;
      totalSaasBQtz.textContent = formatGTQ(totalBQtzVal);
    };
    
    slider.addEventListener('input', (e) => {
      updateCosts(parseInt(e.target.value, 10));
    });
    
    updateCosts(parseInt(slider.value, 10));
  };
  
  initDate();
  initNavigation();
  initPrint();
  initCalculator();
});
