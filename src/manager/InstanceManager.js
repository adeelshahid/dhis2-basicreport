import {InstanceManager} from 'd2-analysis';

export {InstanceManager};

InstanceManager.prototype.getReport = function(layout, isFavorite) {
    var t = this;

    if (!layout) {
        layout = t.getLayout();

        if (!layout) {
            return;
        }
    }

    t.uiManager.mask();

    t.setState(layout, isFavorite);

    t.tableManager.getHtml(layout, function(table) {
        t.getFn()(table);
    });
};
