/**
 * *******************************************************************
 * HELPERS: helper functions I use in the solutions
 * *******************************************************************
 */

// Sort helper
function sortFn(a, b) {
    if (a.value < b.value) {
        return -1;
    }

    if (a.value > b.value) {
        return 1;
    }

    return 0;
}

// Sort the list
function sortList(list, direction) {
    var sorted = list.sort(sortFn);

    if (direction === -1) {
        list.reverse();
    }

    return sorted;
}

// Event triggered on heading anchor click (which will trigger the sort)
function onHeadigClick(that, cellIndex) {
    return function() {
        that.sortColumn(this, cellIndex);

        return false;
    };
}

// Create anchor for each th
function createAnchor(html, index) {
    var a = document.createElement('a');
    a.href = '#';
    a.innerHTML = html;
    a.onclick = onHeadigClick(this, index);

    return a;
}

/**
 * *******************************************************************
 * TASKS: from here are the real task solutions
 * *******************************************************************
 */

/**
 * Solution for task A. Generate a table with dymanic headers based on the data
 * @param {string} id the id the table will have
 * @param {array} data json data
 *
 * @return {HTMLElement} resulting table
 */
function DynamicTable(tableId, data) {
    var headings = data.reduce(function(result, item) {
        var item_headings = Object.keys(item);

        item_headings.forEach(function(heading) {
            if (result.indexOf(heading) === -1) {
                result.push(heading);
            }
        });

        return result;
    }, []);

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var thead_tr = document.createElement('tr');

    headings.forEach(function(heading) {
        var cell = document.createElement('th');
        cell.innerHTML = heading;

        thead_tr.appendChild(cell);
    });

    data.forEach(function(item) {
        var tbody_tr = document.createElement('tr');

        headings.forEach(function(heading) {
            var cell = document.createElement('td');
            cell.innerHTML = item[heading] || '';

            tbody_tr.appendChild(cell);
        });

        tbody.appendChild(tbody_tr);
    });

    thead.appendChild(thead_tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.id = tableId;

    return table;
}

/**
 * Solution for task B. reate a new instance of sortableTable tied to a table
 * @param {string} id table id
 */
function SortableTable(id) {
    this.table = document.getElementById(id);
    this.lastSortedTh = null;

    if (this.table && this.table.nodeName === 'TABLE') {
        var headings = this.table.tHead.rows[0].cells;

        Object.assign([], headings).forEach(
            function(heading, index) {
                if (heading.className.match(/ascendent_sort|descendent_sort/)) {
                    this.lastSortedTh = heading;
                }
            }.bind(this),
        );

        this.setTableSortable();
    }
}

SortableTable.prototype.setTableSortable = function() {
    var headings = this.table.tHead.rows[0].cells;

    Object.assign([], headings).forEach(
        function(heading, index) {
            var sortAnchor = createAnchor.bind(this);
            var html = heading.innerHTML;
            heading.innerHTML = '';
            heading.appendChild(sortAnchor(html, index));
        }.bind(this),
    );
};

SortableTable.prototype.sortColumn = function(el, cellIndex) {
    var tBody = this.table.tBodies[0];
    var rows = this.table.rows;
    var th = el.parentNode;
    var list = [];

    Object.assign([], rows).forEach(function(row, index) {
        if (index > 0) {
            var cell = row.cells[cellIndex];
            var content = cell.textContent || cell.innerText;

            list.push({
                value: content,
                row: row,
            });
        }
    });

    var hasAscendentClassName = th.className.match('ascendent_sort');
    var hasDescendentClassName = th.className.match('descendent_sort');

    list = sortList(list, hasAscendentClassName ? -1 : 1);

    if (hasAscendentClassName) {
        th.className = th.className.replace(/ascendent_sort/, 'descendent_sort');
    } else {
        if (hasDescendentClassName) {
            th.className = th.className.replace(/descendent_sort/, 'ascendent_sort');
        } else {
            th.className += 'ascendent_sort';
        }
    }

    if (this.lastSortedTh && th !== this.lastSortedTh) {
        this.lastSortedTh.className = this.lastSortedTh.className.replace(
            /descendent_sort|ascendent_sort/g,
            '',
        );
    }

    this.lastSortedTh = th;

    list.forEach(function(item, index) {
        tBody.appendChild(item.row);
    });
};
