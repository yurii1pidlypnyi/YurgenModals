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