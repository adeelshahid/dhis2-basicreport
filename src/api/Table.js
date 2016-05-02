import isString from 'd2-utilizr/lib/isString';
import isNumber from 'd2-utilizr/lib/isNumber';
import isEmpty from 'd2-utilizr/lib/isEmpty';

import {OrganisationUnitTableCell} from './TableCell.OrganisationUnit';
import {PeriodTableCell} from './TableCell.Period';
import {TableColumn} from './TableColumn';

export var Table;

Table = function(config) {
    var t = this;

    t.klass = Table;

    t.tableHeaders = config.tableHeaders;
    t.tableRows = config.tableRows;
    t.cls = config.cls;

    t.sorting = {
        id: 'pe',
        direction: 'ASC'
    };

    // static
    t.sortId = 'sortId';

    // transient
    t.cellIdRowMap;

    t.lastSorting = {
        id: 'pe',
        direction: 'ASC'
    };

    t.html;

    t.update;
};

Table.prototype.getCellIdRowMap = function() {
    if (this.cellIdRowMap) {
        return this.cellIdRowMap;
    }

    this.cellIdRowMap = {};

    for (var i = 0, row; i < this.tableRows.length; i++) {
        row = this.tableRows[i];

        for (var key in row.cellMap) {
            if (row.cellMap.hasOwnProperty(key)) {
                this.cellIdRowMap[row.cellMap[key].id] = row;
            }
        }
    }

    return this.cellIdRowMap;
};

Table.prototype.getSortDirection = function(id) {
    if (id === this.lastSorting.id) {
        return this.lastSorting.direction === 'ASC' ? 'DESC' : 'ASC';
    }

    return 'ASC';
};

Table.prototype.sortData = function() {
    var t = this;

    var sorting = t.sorting;

    t.tableRows.sort(function(a, b) {
        a = a.getCellById(sorting.id)[t.sortId];
        b = b.getCellById(sorting.id)[t.sortId];

        // string
        if (isString(a) && isString(b)) {
            a = a.toLowerCase();
            b = b.toLowerCase();

            if (sorting.direction === 'DESC') {
                return a < b ? 1 : (a > b ? -1 : 0);
            }
            else {
                return a < b ? -1 : (a > b ? 1 : 0);
            }
        }

        // number
        else if (isNumber(a) && isNumber(b)) {
            return sorting.direction === 'DESC' ? b - a : a - b;
        }

        else if (isEmpty(a)) {
            return sorting.emptyFirst ? -1 : 1;
        }

        else if (isEmpty(b)) {
            return sorting.emptyFirst ? 1 : -1;
        }

        return -1;
    });
};

Table.prototype.addOptionsCls = function(config) {

    // display density
    this.cls += ' displaydensity-' + (config.displayDensity || 'NORMAL').toLowerCase();

    // font size
    this.cls += ' fontsize-' + (config.fontSize || 'NORMAL').toLowerCase();

    return this.cls;
};

Table.prototype.getHtml = function() {
    var html = '<table class="pivot ' + this.cls + '">';

    html += '<tr>';

    for (var i = 0; i < this.tableHeaders.length; i++) {
        html += this.tableHeaders[i].getHtml();
    }

    html += '</tr>';

    for (var j = 0, row; j < this.tableRows.length; j++) {
        row = this.tableRows[j];
        html += '<tr>';

        for (var k = 0, th; k < this.tableHeaders.length; k++) {
            th = this.tableHeaders[k];
            html += row.getCellById(th.id).getHtml();
        }

        html += '</tr>';
    }

    html += '</table>';

    return this.html = html;
};

Table.prototype.getTableCellsByInstance = function(type) {
    var cells = [];

    for (var i = 0, row; i < this.tableRows.length; i++) {
        row = this.tableRows[i].cellMap;

        for (var key in row) {
            if (row.hasOwnProperty(key) && row[key] instanceof type) {
                cells.push(row[key]);
            }
        }
    }

    return cells;
};

Table.prototype.addHeaderClickListeners = function() {
    var t = this;

    for (var i = 0, th, el; i < t.tableHeaders.length; i++) {
        th = t.tableHeaders[i];
        el = Ext.get(th.elementId);
        el.tableHeaderId = th.id;

        el.on('click', function() {
            t.sorting.id = this.tableHeaderId;
            t.sorting.direction = t.getSortDirection(this.tableHeaderId);

            t.sortData();
            t.update();

            t.lastSorting.id = t.sorting.id;
            t.lastSorting.direction = t.sorting.direction;
        });
    }
};

Table.prototype.getTableColumns = function() {
    var t = this;

    var columns = [];

    var column;
    var cells;

    t.tableHeaders.forEach(function(header) {
        column = new TableColumn();
        cells = [];

        column.index = header.index;
        column.addTableHeader(header);

        t.tableRows.forEach(function(row) {
            cells.push(row.getCellById(header.id));
        });

        column.addTableCells(cells);

        columns.push(column);
    });

    console.log("columns", columns);
    return columns;
};

// dep 1
Table.prototype.getRowByCellId = function(cellId) {
    return this.getCellIdRowMap()[cellId];
};

// dep 2
Table.prototype.addOuClickListeners = function() {
    var t = this,
        cells = this.getTableCellsByInstance(OrganisationUnitTableCell);

    for (var i = 0, cell, el; i < cells.length; i++) {
        cell = cells[i];

        if (cell.isEmpty) {
            continue;
        }

        el = Ext.get(cell.elementId);
        el.cell = cell;
        el.row = t.getRowByCellId(cell.id);

        el.on('click', function(event) {
            this.cell.showContextMenu(this.row, function(items) {
                return t.klass.tableManager.getContextMenu(items);
            });
        });
    }
};

Table.prototype.addPeClickListeners = function(layout, tableFn) {
    var t = this,
        cells = this.getTableCellsByInstance(PeriodTableCell);

    for (var i = 0, cell, el; i < cells.length; i++) {
        cell = cells[i];

        if (cell.isEmpty) {
            continue;
        }

        el = Ext.get(cell.elementId);
        el.cell = cell;
        el.row = t.getRowByCellId(cell.id);

        el.on('click', function(event) {
            this.cell.showContextMenu(function(items) {
                return t.klass.tableManager.getContextMenu(items);
            });
        });
    }
};


Table.prototype.reduce = function() {
    var columns = this.getTableColumns();
};
