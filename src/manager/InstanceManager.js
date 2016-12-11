import {InstanceManager} from 'd2-analysis';

export {InstanceManager};

InstanceManager.prototype.getReport = function(layout, isFavorite, skipState, forceUiState) {
    var t = this;

    if (!layout) {
        layout = t.getLayout();

        if (!layout) {
            return;
        }
    }

    t.tableManager.mask(layout.el);

    t.setState(layout, isFavorite, skipState, forceUiState);

    t.tableManager.getTable(layout, function(table) {
        t.getFn()(table);
    });
};
