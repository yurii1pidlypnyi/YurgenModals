let modals = new YurgenModals({
  beforeOpen: ()=>{
    console.log('begin opening...........');
  },
  afterOpen: ()=>{
    console.log('modal window opened');
  },
  beforeClose: () => {
    console.log('begin closing...........');
  },
  afterClose: () => {
    console.log('modal window closed');
  }
});


function bodyLock() {
  let body = document.body;
  scrollPosition = window.pageYOffset;
  body.classList.add('lock')
  body.style.top = `-${scrollPosition}px`;
}

function bodyUnLock() {
  let body = document.body;
  body.classList.remove('lock');
  body.style.removeProperty('top');
  window.scrollTo(0, scrollPosition);
}

function bodyLockToggle() {
  if(document.body.classList.contains('lock')){
    bodyUnLock()
  } else {
    bodyLock()
  }
}