class View {
    $ =  {}
    constructor(){
        this.$.menu = document.querySelector('[data-id="menu"]');
        this.$.menuItems = document.querySelector('[data-id="menu-items"]');
        this.$.resetBtn = document.querySelector('[data-id="reset-btn"]');
        this.$.newRoundBtn = document.querySelector('[data-id="new-round-btn"]');
        this.$.square = document.querySelectorAll('[data-id="square"]');
        this.$.modal = document.querySelector('[data-id="modal"]');
        this.$.modalText = document.querySelector('[data-id="modal-text"]');
        this.$.modalBtn = document.querySelector('[data-id="modal-btn"]');
        this.$.turn = document.querySelector('[data-id="turn"]'); 
    }
}