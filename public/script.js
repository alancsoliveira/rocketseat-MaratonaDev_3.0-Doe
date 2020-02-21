document
    .querySelector('header button.ajudar')
    .addEventListener("click", function() {
        document
            .querySelector('.form')
            .classList.toggle('hide')
            // classList e toggle geram uma funcionalidade que permite adicionar ou ocultar classes

        document
            .querySelector('header emoji.pensiveFace')
            .classList.toggle('hide')
        document
            .querySelector('header emoji.huggingFace')
            .classList.toggle('show')

    })