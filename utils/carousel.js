// define carousel for resort
const carousel = {
    slides: {
        slide1: {
            id: 0,
            path: '/Resort/ARLV3156.webp',
            title: 'top-view-one',
            description: 'Ideally located in the middle of rice-fields, our resort is a true oasis.',
        },
        slide2: {
            id: 1,
            path: '/Resort/ASOV8980.webp',
            title: 'pool-view',
            description: 'Relax yourself in our salted water swimming-pool surrounded by luxurious nature.',
        },
        slide3: {
            id: 2,
            path: '/Resort/DMXT3518.webp',
            title: 'top-view-close',
            description: 'Wake-up every morning to a breath-taking view of tropical vegetation.',
        },
        slide4: {
            id: 3,
            path: '/Resort/EFHR5767.webp',
            title: 'Agung',
            description: 'Admire from our resort the almighty presence of Mt. Agung: The mountain of Gods.',
        },
        slide5: {
            id: 4,
            path: '/Resort/ETHG2031.webp',
            title: 'rooftop',
            description: 'Meditate on our roof-top terrasse with nothing but calming nature as neighbor.',
        },
        slide6: {
            id: 5,
            path: '/Resort/FWEK3111.webp',
            title: 'pool-view-two',
            description: 'Experience a true Balinese experience far away from the agitation among local people.',
        },
    },
    settings: {
        itemsToShow: 2.5,
        wrapAround: true,
        snapAlign: 'center',
        transition: 600,
    }
}


export {
    carousel as
    default
}