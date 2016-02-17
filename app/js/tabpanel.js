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
        keyDownAction(event, 'prev');
        break;
      case arrowKey.right:
      case arrowKey.down:
        keyDownAction(event, 'next');
        break;
    }
  };
  
  function keyDownAction (event, direction) {
    // Prevent default action if an arrow key was pressed
    event.preventDefault();
    
    // Get the correct tab to activate
    var tab = getSibling(event, direction);
    
    generalEventActions(event, tab);
  }
  
  // Actions and functions that need to be taken regardless of input method
  function generalEventActions (event, tab) {
    // Create a tab variable if it isn't given
    if (!tab) {
      var tab = event.currentTarget;
    }
    var parent = getParentTabInterface(tab);
    
    // Remove aria-selected from all tabs
    resetTabActiveState(parent);
    
    // Add aria-selected to current tab
    setTabActiveState(tab);
    
    // Hide all tab panels
    resetTabPanelActiveState(parent);
    
    // Show currently selected tab panel
    setTabPanelActiveState(tab);
    
    // Set focus to current tab
    tab.focus();
  };
  
  // Reset active state on tabs
  function resetTabActiveState (tabInterface) {
    var tabs = tabInterface.querySelectorAll('[role="tab"]');
    
    for (var i=0;i<tabs.length;i++) {
      tabs[i].setAttribute('tabindex', '-1');
      tabs[i].removeAttribute('aria-selected');
    };
  };
  
  // Select selected tab (that's a crappy description, but hey)
  function setTabActiveState (tab) {
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', 'true');
  };
  
  function resetTabPanelActiveState(tabInterface) {
    var tabPanels = tabInterface.querySelectorAll('[role="tabpanel"]');
    
    for (var i=0;i<tabPanels.length;i++) {
      tabPanels[i].removeAttribute('tabindex');
      tabPanels[i].setAttribute('hidden', 'hidden');
    };
  };
  
  function setTabPanelActiveState(tab) {
    var controls = tab.getAttribute('aria-controls').replace('#', '');
    var target = document.getElementById(controls);
    
    target.removeAttribute('hidden');
    target.setAttribute('tabindex', '0')
  };
  
  // Crappy way to get the parent that has a data-role of tabinterface
  function getParentTabInterface(element) {
    var parent = element.parentNode;
    correctParent = false;
    
    while (correctParent === false && parent != null && parent != undefined) {
      parent = parent.parentNode;
      correctParent = parent.getAttribute('data-role') === 'tabinterface';
    };
    
    return parent;
  };
  
  function getSibling (event, direction) {
    var tab = event.currentTarget;
    var parent = tab.parentNode;
    var sibling = null;
    
    // nodeType === 1 is a element_node
    switch (direction) {
      case 'next':
        sibling = parent.nextSibling;
        
        while (sibling.nodeType != 1) {
          sibling = sibling.nextSibling;
        }

        break;
      case 'prev':
        sibling = parent.previousSibling;
        
        while (sibling.nodeType != 1) {
          sibling = sibling.previousSibling;
        }

        break;
    };
    
    return sibling.querySelector('[role="tab"]');
  };
})();