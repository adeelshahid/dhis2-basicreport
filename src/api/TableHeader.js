export var TableHeader;

TableHeader = function(config) {
    var t = this;

    t.id = config.id;
    t.elementId = Ext.data.IdGenerator.get('uuid').generate();
    t.name = config.name;
    t.objectName = config.objectName;

    if (Ext.isNumeric(config.level)) {
        t.level = parseInt(config.level);
    }

    t.cls = 'pivot-dim td-sortable pointer';

    // transient
    t.html;
};

TableHeader.prototype.generateHtml = function() {
    this.html = '<td';
    this.html += this.elementId ? (' id="' + this.elementId + '"') : '';
    this.html += this.cls ? (' class="' + this.cls + '"') : '';
    this.html += this.style ? (' style="' + this.style + '"') : '';
    this.html += '>' + this.name + '</td>';

    return this.html;
};
