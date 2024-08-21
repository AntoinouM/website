<script setup>

    onMounted(async() => {
        const files = await getAssets('Resort');
        handleImages(files, 'Resort').then((val) => console.log(val))
    });

    function handleImages(imagesNames, dir) {
        return new Promise((resolve, reject) => {
            const listOfPromises = [];

            for (let i in imagesNames) {
                let imageName = imagesNames[i];
                
                listOfPromises.push(
                    handleImage(imageName, dir).then((val) =>
                        console.log(val)
                    )
                )
            }


            Promise.all(listOfPromises)
                .then(() => resolve(`All resources have been loaded (${imagesNames.length} images`))
                .catch((e) => reject(`${e}`));
        })
    }

    function handleImage(imageName, dir) {
        return new Promise((resolve, reject) => {
            const imageInfos = {
                key: imageName.substring(0, imageName.indexOf('.')),
                src: `/${dir}/${imageName}`,
            }

            const image = new Image();

            image.onload = () => {resolve(`Image ${imageInfos.key} loaded.`)};
            image.onerror = () => {reject(`Impossible to load image ${imageInfos.key} from (${imageInfos.src}).`)};

            image.src = imageInfos.src;
        
        })
    }
   
</script>

<template>
    <div>
        <div>
            <section 
                ref="section1"
                class="section section1"
            >

            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    .section {
        height: 100vh;
        max-width: 100%;
        padding: 1rem 4rem;
        box-sizing: border-box;
        color: $black;

        @include breakpoint-max-width(s) {
            height: fit-content;
        }
    }

    .section1 {
        background-color: $egg-white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom -10em center;  

        /* fix background for parallax*/
        background-attachment: fixed;
    }

</style>
