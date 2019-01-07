<template>
    <main>
        <table-sort
            headline="Das ist die Headline"
            :tableHead="[
                {
                    id: 'firstname',
                    text: 'Vorname'
                },
                {
                    id: 'lastname',
                    text: 'Nachname'
                },
                {
                    id: 'country',
                    text: 'Land'
                },

            ]"
            :tableBody="[
                {
                    firstname: 'Cristina',
                    lastname: 'Coves Mora',
                    country: '🇪🇸'
                },
                {
                    firstname: 'Simon',
                    lastname: 'Koch',
                    country: '🇩🇪'
                }
             ]" />
    </main>
</template>

<script>
    import TableSort from '@/components/TableSort'

    export default {
        name: 'app',
        components: {
            TableSort
        }
    }
</script>
