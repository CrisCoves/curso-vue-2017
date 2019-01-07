<template>
    <div class="c-tablesort">
        <h1>{{ headline }}</h1>
        <table>
            <tr>
                <th v-for="tableHeadItem in tableHead" @click="toggleSort(tableHeadItem.id)">{{ tableHeadItem.text }}</th>
            </tr>
            <tr v-for="row in rows">
                <td v-for="item in row">{{ item }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableSort',
    props: {
        headline: {
            type: String,
            required: false
        },
        tableHead: {
            type: Array,
            required: true
        },
        tableBody: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {
            rows: this.tableBody
        }
    },
    methods: {
        toggleSort: function (column) {
            this.rows.sort(this.compareValues(column))
        },

        // function for dynamic sorting
        compareValues: function (key, order = 'asc') {
            return function(a, b) {
                if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }

                const varA = (typeof a[key] === 'string') ?
                    a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ?
                    b[key].toUpperCase() : b[key];

                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return (
                    (order == 'desc') ? (comparison * -1) : comparison
                );
            };
        }
    }
}
</script>
