window.addEventListener('DOMContentLoaded', () => {

    function collapse() {
        const trigger = document.querySelectorAll('.trigger');
        const blocks = document.querySelectorAll('.trigger-text');

        blocks.forEach(item => {
            
            item.style.display = 'none';
        });

        trigger.forEach(item => {
            item.addEventListener('click', function() {
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

    collapse();
});