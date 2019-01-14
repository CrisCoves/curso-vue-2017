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
                    id: 'age',
                    text: 'Alter'
                },

            ]"
            :tableBody="[
                {
                    firstname: 'Cristina',
                    lastname: 'Coves Mora',
                    age: 25
                },
                {
                    firstname: 'Vicente',
                    lastname: 'XYZ',
                    age: 10
                },
                {
                    firstname: 'Thomas',
                    lastname: 'ABC',
                    age: 28
                },
                {
                    firstname: 'Simon',
                    lastname: 'Koch',
                    age: 24
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
