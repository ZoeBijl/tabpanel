(function(){
  console.log('Tab panels are go!');
  
  
  var tabinterfaces = document.querySelectorAll('[data-role="tabinterface"]');
  
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  
  tabs.forEach(setTabEventHandlers);
  
  function setTabEventHandlers (element, index) {
    tabs[index].addEventListener('click', tabClickEventHandler);
    tabs[index].addEventListener('keydown', tabKeyDownEventHandler);
  };
  
  function tabClickEventHandler (event) {
    console.log('click', this);
    
    // reset active states
    resetTabActiveState(this);
    // set new active state
  };
  
  function tabKeyDownEventHandler (event) {
    console.log('keydown', this);
  };
  
  function resetTabActiveState (tab) {
    var parent = tab.nodeParent;
    console.log(parent);
  }
  
  function setTabActiveState () {
    
  }
})();