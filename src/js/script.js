window.addEventListener('DOMContentLoaded', () => {

    function hamburger() {
        const trigger = document.querySelector('.menu__btn');
        const menu = document.querySelector('.menu__list');
        const close = document.querySelector('.menu__close');
        const overlay = document.querySelector('.overlay');
        const menuElement = document.querySelectorAll('.menu__item');

        function closeMenu() {
            menu.style.display = 'none';
            menu.classList.remove('animate__fadeIn');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        trigger.addEventListener('click', function() {
            menu.style.display = 'block';
            menu.classList.add('animate__animated', 'animate__fadeIn');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        menuElement.forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
            });
        });

        overlay.addEventListener('click', () => {
            closeMenu();
        });

        close.addEventListener('click', function() {
            closeMenu();
        });

    }



    function collapse() {
        const trigger = document.querySelectorAll('.trigger');
        const blocks = document.querySelectorAll('.trigger-text');

        blocks.forEach(item => {
            
            item.style.display = 'none';
        });

        trigger.forEach(item => {
            item.addEventListener('click', function(e) {
                if (!this.classList.contains('active')) {
                    this.classList.add('active');
                    item.nextElementSibling.style.display = "block";
                    item.nextElementSibling.classList.remove('animate__fadeOutUp');
                    item.nextElementSibling.classList.add('animate__animated', 'animate__fadeInDown');
                } else {
                    this.classList.remove('active');
                    // alert(1);
                    item.nextElementSibling.classList.remove('animate__fadeInDown');
                    item.nextElementSibling.classList.add('animate__fadeOutUp');
                    setTimeout(() => {
                        item.nextElementSibling.style.display = 'none';
                    }, 800);
                }
            });
        });
    }

    hamburger();
    collapse();

});