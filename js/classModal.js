class YurgenModals {
  constructor(options) {
    let defaultOptions = {
      hashOpen: true,
      exitEsc: true,
      atributeOpen: 'data-modal-open',
      atributeClose: 'data-modal-close',
      beforeOpen: () => {},
      afterOpen: () => {},
      beforeClose: () => {},
      afterClose: () => {},
    }

    this.options = Object.assign(defaultOptions, options);
    this.btnsOpen = [...document.querySelectorAll(`[${this.options.atributeOpen}]`)];
    this.btnsClose = [...document.querySelectorAll(`[${this.options.atributeClose}]`)];

    this.events();
  }

  events() {
    this.btnsOpen.forEach(item => {
      item.addEventListener('click',(e) => {
        e.preventDefault();
        this.modalOpen(item.getAttribute(this.options.atributeOpen));
      })
    })

    this.btnsClose.forEach(item => {
      item.addEventListener('click',() => {
        if(this.activeModal && this.activeModal == item.closest('.modal__window')){
          this.modalClose();
        }
      })
    })

    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        this.openToHash();
      } else {
        this.modalClose();
      }
    })

    window.addEventListener('load', () => {
      if (window.location.hash) {
        this.openToHash();
      }
    })

    document.addEventListener('click', (e) => {
      if(this.activeModal && this.missClick(e.target)){
        this.modalClose();
      }
    })
  }

  missClick(target){
    let condOne = !target.closest('.modal__content');
    let condTwo = !target.closest(`[${this.options.atributeOpen}]`);

    if( condOne && condTwo){
      return true
    }

    return false
  }

  modalOpen(selector) {
    // event before open
    this.options.beforeOpen(this);
    // =====================
    if(this.activeModal){
      this.modalClose();
    }

    this.activeModal = document.getElementById(`${selector}`);
    this.activeSelector = selector;

    this.activeModal.classList.add('modal_open');
    this.activeModal.scrollTop = 0;

    this.activeModal.setAttribute('aria-hidden',"false");

    this.getHash();
    this.setHash();

    // event after open
    this.options.afterOpen(this);
    // =====================
  }

  modalClose(task) {
    // event before close
    this.options.beforeClose(this);
    // =============================

    this.activeModal.classList.remove('modal_open');
    this.activeModal.setAttribute('aria-hidden',"true");

    this.activeModal = null;
    this.activeSelector = null;

    switch (task) {
      case 'editing':
        break;
      default :
        this.removeHash();
    }

    // event after close
    this.options.afterClose(this);
    // =============================
  }

  getHash() {
    this.hash = '#' + this.activeSelector;
  }

  setHash() {
    history.pushState('', '', this.hash);
  }

  removeHash() {
    history.pushState('', '', window.location.href.split('#')[0])
  }

  openToHash() {
    const selector = window.location.hash.replace('#', '');
    const isModal = document.getElementById(selector);
    const btn = document.querySelector(`[${this.options.atributeOpen}="${selector}"]`);

    if(isModal && btn) {
      this.modalOpen(selector)
    } else {
      if(this.activeModal){
        this.modalClose('editing');
      }
    }
  }

  modalLogging(message) {
    console.log(`${message}`);
  }
}