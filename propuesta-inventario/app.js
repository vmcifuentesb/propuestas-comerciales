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
    
    const COST_PER_SUCURSAL = 200.00;
    const CLOUD_BASE_COST = 150.00;
    const MARKUP_PERCENTAGE = 0.45;
    const CLOUD_MANAGED_COST = CLOUD_BASE_COST * (1 + MARKUP_PERCENTAGE); // 150 * 1.45 = 202.50
    const EXCHANGE_RATE = 7.80; // Q5,850 / $750 = 7.8
    
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
    
    const updateCosts = (sucursales) => {
      valDisplay.textContent = sucursales;
      
      const saasSubtotalA = sucursales * COST_PER_SUCURSAL;
      const totalA = saasSubtotalA; 
      const totalAQtzVal = totalA * EXCHANGE_RATE;
      
      const saasSubtotalB = sucursales * COST_PER_SUCURSAL;
      const totalB = saasSubtotalB + CLOUD_MANAGED_COST;
      const totalBQtzVal = totalB * EXCHANGE_RATE;
      
      subtotalSaasA.textContent = formatUSD(saasSubtotalA);
      totalSaasAVal.textContent = formatUSD(totalA);
      totalSaasAQtz.textContent = formatGTQ(totalAQtzVal);
      
      subtotalSaasB.textContent = formatUSD(saasSubtotalB);
      totalSaasBVal.textContent = formatUSD(totalB);
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
