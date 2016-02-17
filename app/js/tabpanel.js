(function(){
  // Round up all the tabs ;)
  var tab = document.querySelectorAll('[role="tab"]');
  
  // Add event listeners to all tab elements
  for (var i=0;i<tab.length;i++) {
    tab[i].addEventListener('click', tabClickEventHandler);
    tab[i].addEventListener('keydown', tabKeyDownEventHandler);
  }
  
  // Handle all click events on tabs
  function tabClickEventHandler (event) {
    event.preventDefault();
    console.log('Clickety');
    
    generalEventActions(event);
  };
  
  // Handle all keydown events on tabs
  function tabKeyDownEventHandler (event) {
    console.log('Keydown');
    
    var keyCode = event.keyCode;
    var arrowKey = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

    switch (keyCode) {
        case arrowKey.left:
        case arrowKey.up:
            direction = 'prev';
            break;
        case arrowKey.right:
        case arrowKey.down:
            direction = 'next';
            break;
    }
    
    generalEventActions(event);
  };
  
  // Actions and functions that need to be taken regardless of input method
  function generalEventActions (event) {
    var tab = event.currentTarget;
    var parent = getParentTabInterface(tab);
    
    // Remove aria-selected from all tabs
    resetTabActiveState(parent);
    
    // Add aria-selected to current tab
    setTabActiveState(tab);
    
    // Hide all tab panels
    resetTabPanelActiveState(parent);
    
    // Show currently selected tab panel
    setTabPanelActiveState(tab);
  }
  
  // Reset active state on tabs
  function resetTabActiveState (tabInterface) {
    var tabs = tabInterface.querySelectorAll('[role="tab"]');
    
    for (var i=0;i<tabs.length;i++) {
      tabs[i].removeAttribute('aria-selected');
    }
  }
  
  // Select selected tab (that's a crappy description, but hey)
  function setTabActiveState (tab) {
    tab.setAttribute('aria-selected', 'true');
  }
  
  function resetTabPanelActiveState(tabInterface) {
    var tabPanels = tabInterface.querySelectorAll('[role="tabpanel"]');
    
    for (var i=0;i<tabPanels.length;i++) {
      tabPanels[i].setAttribute('hidden', 'hidden');
    }
  }
  
  function setTabPanelActiveState(tab) {
    var controls = tab.getAttribute('aria-controls').replace('#', '');
    var target = document.getElementById(controls);
    
    target.removeAttribute('hidden');
  }
  
  // Crappy way to get the parent that has a data-role of tabinterface
  function getParentTabInterface(element) {
    parent = element.parentNode;
    correctParent = false;
    
    while (correctParent === false && parent != null && parent != undefined) {
      parent = parent.parentNode;
      correctParent = parent.getAttribute('data-role') === 'tabinterface';
    }
    
    return parent;
  }
})();