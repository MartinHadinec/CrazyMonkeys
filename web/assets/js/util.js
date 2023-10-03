(() => {

	/**
	 * Vytvoří odsazený seznam odkazů z navigace. Určeno pro použití s panelem().
	 * @return {string} HTML řetězec.
	 */
	const generateNavList = () => {
	  const links = document.querySelectorAll('nav a');
	  let html = '';
  
	  links.forEach((link) => {
		const indent = Math.max(0, link.closest('li').querySelectorAll('li').length - 1);
		const href = link.getAttribute('href');
		const target = link.getAttribute('target');
  
		html += `
		  <a class="link depth-${indent}" 
			 ${target ? `target="${target}"` : ''}
			 ${href ? `href="${href}"` : ''}>
			<span class="indent-${indent}"></span>
			${link.textContent}
		  </a>`;
	  });
  
	  return html;
	};
  
	/**
	 * Přemění element na panel.
	 * @param {object} userConfig Uživatelská konfigurace.
	 */
	const panelize = (userConfig) => {
	  const config = {
		delay: 0,
		hideOnClick: false,
		hideOnEscape: false,
		hideOnSwipe: true,
		resetScroll: false,
		resetForms: false,
		side: null,
		target: null,
		...userConfig,
	  };
  
	  const element = document.querySelector(config.target);
  
	  if (!element) return;
  
	  // Zde pokračuje váš kód pro panelizaci...
  
	};
  
	// Zde pokračuje váš kód pro placeholder a prioritize...
  
  })();
  