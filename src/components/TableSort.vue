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
    import compareValues from '../js/compareValues';

    export default {
        name: 'TableSort',
        props: {
            // props = Properties
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
            // data = Variables
            return {
                rows: this.tableBody,
                activeColumn: '',
                activeOrder: '',
            }
        },
        methods: {
            toggleSort: function (column) {
                const order = this.activeOrder === 'asc' && column === this.activeColumn ? 'desc' : 'asc';

                this.rows.sort(compareValues(column, order));

                this.activeOrder = order;
                this.activeColumn = column;
            },
        },
        created: function() {
            this.toggleSort(this.tableHead[0].id);
        }
    }
</script>
