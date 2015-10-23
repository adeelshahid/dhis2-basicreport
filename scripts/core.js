Ext.onReady( function() {

	// ext config
	Ext.Ajax.method = 'GET';

    Ext.isIE = (/trident/.test(Ext.userAgent));

    Ext.isIE11 = Ext.isIE && (/rv:11.0/.test(Ext.userAgent));

    Ext.util.CSS.createStyleSheet = function(cssText, id) {
        var ss,
            head = document.getElementsByTagName("head")[0],
            styleEl = document.createElement("style");

        styleEl.setAttribute("type", "text/css");

        if (id) {
           styleEl.setAttribute("id", id);
        }

        if (Ext.isIE && !Ext.isIE11) {
           head.appendChild(styleEl);
           ss = styleEl.styleSheet;
           ss.cssText = cssText;
        }
        else {
            try {
                styleEl.appendChild(document.createTextNode(cssText));
            }
            catch(e) {
               styleEl.cssText = cssText;
            }
            head.appendChild(styleEl);
            ss = styleEl.styleSheet ? styleEl.styleSheet : (styleEl.sheet || document.styleSheets[document.styleSheets.length-1]);
        }
        this.cacheStyleSheet(ss);
        return ss;
    };

	// namespace
	BR = {};
	var NS = BR;

	NS.instances = [];
	NS.i18n = {};
	NS.isDebug = false;
	NS.isSessionStorage = ('sessionStorage' in window && window['sessionStorage'] !== null);

	NS.getCore = function(init, appConfig) {
        var conf = {},
            api = {},
            support = {},
            service = {},
            web = {},
            app = {},
            webAlert,
            dimConf;

        appConfig = appConfig || {};

        // alert
        webAlert = function() {};

        // app
        app.getViewportWidth = function() {};
        app.getViewportHeight = function() {};
        app.getCenterRegionWidth = function() {};
        app.getCenterRegionHeight = function() {};

		// conf
		(function() {
			conf.finals = {
				dimension: {
					data: {
						value: 'data',
						name: NS.i18n.data || 'Data',
						dimensionName: 'dx',
						objectName: 'dx'
					},
					category: {
						name: NS.i18n.assigned_categories || 'Assigned categories',
						dimensionName: 'co',
						objectName: 'co',
					},
					indicator: {
						value: 'indicator',
						name: NS.i18n.indicators || 'Indicators',
						dimensionName: 'dx',
						objectName: 'in'
					},
					dataElement: {
						value: 'dataElement',
						name: NS.i18n.data_elements || 'Data elements',
						dimensionName: 'dx',
						objectName: 'de'
					},
					operand: {
						value: 'operand',
						name: 'Operand',
						dimensionName: 'dx',
						objectName: 'dc'
					},
					dataSet: {
						value: 'dataSet',
						name: NS.i18n.data_sets || 'Data sets',
						dimensionName: 'dx',
						objectName: 'ds'
					},
					eventDataItem: {
						value: 'eventDataItem',
						name: NS.i18n.event_data_items || 'Event data items',
						dimensionName: 'dx',
						objectName: 'di'
					},
					programIndicator: {
						value: 'programIndicator',
						name: NS.i18n.program_indicators || 'Program indicators',
						dimensionName: 'dx',
						objectName: 'pi'
					},
					period: {
						value: 'period',
						name: NS.i18n.periods || 'Periods',
						dimensionName: 'pe',
						objectName: 'pe'
					},
					fixedPeriod: {
						value: 'periods'
					},
					relativePeriod: {
						value: 'relativePeriods'
					},
					organisationUnit: {
						value: 'organisationUnits',
						name: NS.i18n.organisation_units || 'Organisation units',
						dimensionName: 'ou',
						objectName: 'ou'
					},
					dimension: {
						value: 'dimension'
						//objectName: 'di'
					},
					value: {
						value: 'value'
					}
				},
				root: {
					id: 'root'
				}
			};

			dimConf = conf.finals.dimension;

			dimConf.objectNameMap = {};
			dimConf.objectNameMap[dimConf.data.objectName] = dimConf.data;
			dimConf.objectNameMap[dimConf.indicator.objectName] = dimConf.indicator;
			dimConf.objectNameMap[dimConf.dataElement.objectName] = dimConf.dataElement;
			dimConf.objectNameMap[dimConf.operand.objectName] = dimConf.operand;
			dimConf.objectNameMap[dimConf.dataSet.objectName] = dimConf.dataSet;
			dimConf.objectNameMap[dimConf.category.objectName] = dimConf.category;
			dimConf.objectNameMap[dimConf.period.objectName] = dimConf.period;
			dimConf.objectNameMap[dimConf.organisationUnit.objectName] = dimConf.organisationUnit;
			dimConf.objectNameMap[dimConf.dimension.objectName] = dimConf.dimension;

			conf.period = {
				periodTypes: [
					{id: 'Daily', name: NS.i18n.daily},
					{id: 'Weekly', name: NS.i18n.weekly},
					{id: 'Monthly', name: NS.i18n.monthly},
					{id: 'BiMonthly', name: NS.i18n.bimonthly},
					{id: 'Quarterly', name: NS.i18n.quarterly},
					{id: 'SixMonthly', name: NS.i18n.sixmonthly},
					{id: 'SixMonthlyApril', name: NS.i18n.sixmonthly_april},
					{id: 'Yearly', name: NS.i18n.yearly},
					{id: 'FinancialOct', name: NS.i18n.financial_oct},
					{id: 'FinancialJuly', name: NS.i18n.financial_july},
					{id: 'FinancialApril', name: NS.i18n.financial_april}
				],
                relativePeriods: []
			};

            conf.valueType = {
            	numericTypes: ['NUMBER','UNIT_INTERVAL','PERCENTAGE','INTEGER','INTEGER_POSITIVE','INTEGER_NEGATIVE','INTEGER_ZERO_OR_POSITIVE'],
            	textTypes: ['TEXT','LONG_TEXT','LETTER','PHONE_NUMBER','EMAIL'],
            	booleanTypes: ['BOOLEAN','TRUE_ONLY'],
            	dateTypes: ['DATE','DATETIME'],
            	aggregateTypes: ['NUMBER','UNIT_INTERVAL','PERCENTAGE','INTEGER','INTEGER_POSITIVE','INTEGER_NEGATIVE','INTEGER_ZERO_OR_POSITIVE','BOOLEAN','TRUE_ONLY']
            };

			conf.layout = {
				west_width: 424,
				west_fieldset_width: 418,
				west_width_padding: 2,
				west_fill: 2,
				west_fill_accordion_indicator: 81,
				west_fill_accordion_dataelement: 81,
				west_fill_accordion_dataset: 56,
                west_fill_accordion_eventdataitem: 81,
                west_fill_accordion_programindicator: 81,
				west_fill_accordion_period: 310,
				west_fill_accordion_organisationunit: 58,
                west_fill_accordion_group: 31,
				west_maxheight_accordion_indicator: 400,
				west_maxheight_accordion_dataelement: 400,
				west_maxheight_accordion_dataset: 400,
				west_maxheight_accordion_period: 513,
				west_maxheight_accordion_organisationunit: 900,
				west_maxheight_accordion_group: 340,
				west_maxheight_accordion_options: 449,
				//west_scrollbarheight_accordion_indicator: 300,
				west_scrollbarheight_accordion_indicator: 543,
				west_scrollbarheight_accordion_dataelement: 300,
				west_scrollbarheight_accordion_dataset: 300,
				//west_scrollbarheight_accordion_period: 450,
				west_scrollbarheight_accordion_period: 543,
				//west_scrollbarheight_accordion_organisationunit: 450,
				west_scrollbarheight_accordion_organisationunit: 543,
				west_scrollbarheight_accordion_group: 300,
				east_tbar_height: 31,
				east_gridcolumn_height: 30,
				form_label_width: 55,
				window_favorite_ypos: 100,
				window_confirm_width: 250,
				window_share_width: 500,
				grid_favorite_width: 420,
				grid_row_height: 27,
				treepanel_minheight: 135,
				treepanel_maxheight: 400,
				treepanel_fill_default: 310,
				treepanel_toolbar_menu_width_group: 140,
				treepanel_toolbar_menu_width_level: 120,
				multiselect_minheight: 100,
				multiselect_maxheight: 250,
				multiselect_fill_default: 345,
				multiselect_fill_reportingrates: 315
			};

			conf.report = {
				digitGroupSeparator: {
					'COMMA': ',',
					'SPACE': '&nbsp;'
				},
				displayDensity: {
                    'XCOMPACT': '2px',
					'COMPACT': '4px',
					'NORMAL': '6px',
					'COMFORTABLE': '8px',
                    'XCOMFORTABLE': '10px'
				},
				fontSize: {
					'XSMALL': '9px',
					'SMALL': '10px',
					'NORMAL': '11px',
					'LARGE': '12px',
					'XLARGE': '14px'
				}
			};

            conf.url = {
                analysisFields: [
                    '*',
                    'program[id,name]',
                    'programStage[id,name]',
                    'columns[dimension,filter,items[id,' + init.namePropertyUrl + ']]',
                    'rows[dimension,filter,items[id,' + init.namePropertyUrl + ']]',
                    'filters[dimension,filter,items[id,' + init.namePropertyUrl + ']]',
                    '!lastUpdated',
                    '!href',
                    '!created',
                    '!publicAccess',
                    '!rewindRelativePeriods',
                    '!userOrganisationUnit',
                    '!userOrganisationUnitChildren',
                    '!userOrganisationUnitGrandChildren',
                    '!externalAccess',
                    '!access',
                    '!relativePeriods',
                    '!columnDimensions',
                    '!rowDimensions',
                    '!filterDimensions',
                    '!user',
                    '!organisationUnitGroups',
                    '!itemOrganisationUnitGroups',
                    '!userGroupAccesses',
                    '!indicators',
                    '!dataElements',
                    '!dataElementOperands',
                    '!dataElementGroups',
                    '!dataSets',
                    '!periods',
                    '!organisationUnitLevels',
                    '!organisationUnits'
                ]
            };
		}());

		// api
		(function() {

            // layout

			api.layout = {};

			api.layout.Record = function(config) {
				var config = Ext.clone(config);

				// id: string

				return function() {
					if (!Ext.isObject(config)) {
						console.log('Record: config is not an object: ' + config);
						return;
					}

					if (!Ext.isString(config.id)) {
						console.log('api.layout.Record: id is not text: ' + config);
						return;
					}

					return config;
				}();
			};

			api.layout.Dimension = function(config) {
				var config = Ext.clone(config);

				// dimension: string

				// items: [Record]

				return function() {
					if (!Ext.isObject(config)) {
						console.log('Dimension: config is not an object: ' + config);
						return;
					}

					if (!Ext.isString(config.dimension)) {
						console.log('Dimension: name is not a string: ' + config);
						return;
					}

					if (config.dimension !== conf.finals.dimension.category.objectName) {
						var records = [];

						if (!Ext.isArray(config.items)) {
							//console.log('Dimension: items is not an array: ' + config);
							return;
						}

						for (var i = 0; i < config.items.length; i++) {
							records.push(api.layout.Record(config.items[i]));
						}

						config.items = Ext.Array.clean(records);

						if (!config.items.length) {
							//console.log('Dimension: has no valid items: ' + config);
							return;
						}
					}

					return config;
				}();
			};

			api.layout.Layout = function(config, applyConfig, forceApplyConfig) {
                config = Ext.apply(config, applyConfig);

				var layout = {},
					getValidatedDimensionArray,
					validateSpecialCases;

				// columns: [Dimension]

				// rows: [Dimension]

				// filters: [Dimension]

                // showDataDescription: boolean (false)

                // showHierarchy: boolean (false)

                // hideEmptyRows: boolean (false)

				// displayDensity: string ('NORMAL') - 'COMPACT', 'NORMAL', 'COMFORTABLE'

				// fontSize: string ('NORMAL') - 'SMALL', 'NORMAL', 'LARGE'

				// digitGroupSeparator: string ('SPACE') - 'NONE', 'COMMA', 'SPACE'

				// legendSet: object

				// parentGraphMap: object

				// sorting: transient object

                // userOrgUnit: string

                // relativePeriodDate: string

				getValidatedDimensionArray = function(dimensionArray) {
					var dimensionArray = Ext.clone(dimensionArray);

					if (!(dimensionArray && Ext.isArray(dimensionArray) && dimensionArray.length)) {
						return;
					}

					for (var i = 0; i < dimensionArray.length; i++) {
						dimensionArray[i] = api.layout.Dimension(dimensionArray[i]);
					}

					dimensionArray = Ext.Array.clean(dimensionArray);

					return dimensionArray.length ? dimensionArray : null;
				};

				validateSpecialCases = function() {
					var dimConf = conf.finals.dimension,
						dimensions,
						objectNameDimensionMap = {};

					if (!layout) {
						return;
					}

					dimensions = Ext.Array.clean([].concat(layout.columns || [], layout.rows || [], layout.filters || []));

					for (var i = 0; i < dimensions.length; i++) {
						objectNameDimensionMap[dimensions[i].dimension] = dimensions[i];
					}

					// dc and in
					if (objectNameDimensionMap[dimConf.operand.objectName] && objectNameDimensionMap[dimConf.indicator.objectName]) {
						webAlert('Indicators and detailed data elements cannot be specified together');
						return;
					}

					// dc and de
					if (objectNameDimensionMap[dimConf.operand.objectName] && objectNameDimensionMap[dimConf.dataElement.objectName]) {
						webAlert('Detailed data elements and totals cannot be specified together');
						return;
					}

					// dc and ds
					if (objectNameDimensionMap[dimConf.operand.objectName] && objectNameDimensionMap[dimConf.dataSet.objectName]) {
						webAlert('Data sets and detailed data elements cannot be specified together');
						return;
					}

					// dc and co
					if (objectNameDimensionMap[dimConf.operand.objectName] && objectNameDimensionMap[dimConf.category.objectName]) {
						webAlert('Assigned categories and detailed data elements cannot be specified together');
						return;
					}

                    // in and aggregation type
                    if (objectNameDimensionMap[dimConf.indicator.objectName] && config.aggregationType !== 'DEFAULT') {
                        webAlert('Indicators and aggregation types cannot be specified together', true);
                        return;
                    }

					return true;
				};

				return function() {
					var dimensionNames = [],
						dimConf = conf.finals.dimension;

					// config must be an object
					if (!(config && Ext.isObject(config))) {
						console.log('Layout: config is not an object (' + init.el + ')');
						return;
					}

                    config.columns = getValidatedDimensionArray(config.columns);
                    config.rows = getValidatedDimensionArray(config.rows);

					// at least one dimension specified as column or row
					if (!config.columns) {
						webAlert('Specify at least one column dimension');
						return;
					}

					// get object names
					for (var i = 0, dims = Ext.Array.clean([].concat(config.columns || [], config.rows || [], config.filters || [])); i < dims.length; i++) {

						// Object names
						if (api.layout.Dimension(dims[i])) {
							dimensionNames.push(dims[i].dimension);
						}
					}

					// at least one period
					if (!Ext.Array.contains(dimensionNames, dimConf.period.objectName)) {
						webAlert('Select at least one period item');
						return;
					}

					// favorite
					if (config.id) {
						layout.id = config.id;
					}

					if (config.name) {
						layout.name = config.name;
					}

					// layout
					layout.columns = config.columns;
                    layout.rows = config.rows;

					layout.showDataDescription = Ext.isBoolean(config.showDataDescription) ? config.showDataDescription : false;
					layout.hideEmptyRows = Ext.isBoolean(config.hideEmptyRows) ? config.hideEmptyRows : false;

					layout.showHierarchy = Ext.isBoolean(config.showHierarchy) ? config.showHierarchy : false;

					layout.displayDensity = Ext.isString(config.displayDensity) && !Ext.isEmpty(config.displayDensity) ? config.displayDensity : 'NORMAL';
					layout.fontSize = Ext.isString(config.fontSize) && !Ext.isEmpty(config.fontSize) ? config.fontSize : 'NORMAL';
					layout.digitGroupSeparator = Ext.isString(config.digitGroupSeparator) && !Ext.isEmpty(config.digitGroupSeparator) ? config.digitGroupSeparator : 'SPACE';
					layout.legendSet = Ext.isObject(config.legendSet) && Ext.isString(config.legendSet.id) ? config.legendSet : null;

					layout.parentGraphMap = Ext.isObject(config.parentGraphMap) ? config.parentGraphMap : null;

					layout.sorting = Ext.isObject(config.sorting) && Ext.isDefined(config.sorting.id) && Ext.isString(config.sorting.direction) ? config.sorting : null;

                    if (Ext.Array.from(config.userOrgUnit).length) {
                        layout.userOrgUnit = Ext.Array.from(config.userOrgUnit);
                    }

                    if (support.prototype.date.getYYYYMMDD(config.relativePeriodDate)) {
                        layout.relativePeriodDate = support.prototype.date.getYYYYMMDD(config.relativePeriodDate);
                    }

                    if (Ext.isArray(config.dataDimensionItems) && config.dataDimensionItems.length) {
                        layout.dataDimensionItems = config.dataDimensionItems;
                    }

                    // validate
					if (!validateSpecialCases()) {
						return;
					}

                    return Ext.apply(layout, forceApplyConfig);
				}();
			};

            // data

			api.data = {};

            // Response
            (function() {
                var R = api.data.Response = function(config) {
                    var r = this;

                    r.headers = config.headers;
                    r.metaData = config.metaData;
                    r.rows = config.rows;

                    r.idCombinationIndex = {
                        'dx': 0,
                        'pe': 1,
                        'ou': 2
                    };

                    // initialized transient properties
                    r.nameHeaderMap = {};

                    // uninitialized transient properties
                    r.idValueMap = {};
                    r.idCombinations = [];

                    // header index
                    (function() {
                        for (var i = 0; i < r.headers.length; i++) {
                            r.headers[i].index = i;
                        }
                    })();

                    // nameHeaderMap
                    (function() {
                        r.nameHeaderMap = {};

                        for (var i = 0; i < r.headers.length; i++) {
                            r.nameHeaderMap[r.headers[i].name] = r.headers[i];
                        }
                    })();
                };

                R.prototype.getHeaderByName = function(name) {
                    return this.nameHeaderMap[name];
                };

                R.prototype.getHeaderIndexByName = function(name) {
                    return this.nameHeaderMap[name].index;
                };

                R.prototype.getNameById = function(ouId) {
                    return this.metaData.names[ouId];
                };

                R.prototype.getIdByIdComb = function(idComb, dataType) {
                    return idComb.split('-')[this.idCombinationIndex[dataType]];
                };

                R.prototype.getNameByIdComb = function(idComb, dataType) {
                    return this.getNameById(this.getIdByIdComb(idComb, dataType));
                };

                R.prototype.getLevelById = function(ouId) {
                    return Ext.Array.clean((this.metaData.ouHierarchy[ouId] || '').split('/') || []).length + 1;
                };

                R.prototype.getMaxLevel = function() {
                    var ouh = this.metaData.ouHierarchy,
                        anLevels = [];

                    for (var i in ouh) {
                        if (ouh.hasOwnProperty(i)) {
                            anLevels.push(this.getLevelById(i));
                        }
                    }

                    return Ext.Array.max(anLevels);
                };

                R.prototype.getMinLevel = function() {
                    var ouh = this.metaData.ouHierarchy,
                        anLevels = [];

                    for (var i in ouh) {
                        if (ouh.hasOwnProperty(i)) {
                            anLevels.push(this.getLevelById(i));
                        }
                    }

                    return Ext.Array.min(anLevels);
                };

                R.prototype.getUniqueNumericItemsInArray = function(array) {
                    var a = [];

                    if (!Ext.isArray(array)) {
                        return 0;
                    }

                    for (var i = 0; i < array.length; i++) {
                        if (Ext.isNumeric(array[i])) {
                            a.push(array[i]);
                        }
                    }

                    return Ext.Array.unique(a);
                };

                R.prototype.getParentNameByIdAndLevel = function(ouId, level) {
                    var parentGraphIdArray = this.getParentGraphIdArray(ouId),
                        nLevel = level.level;

                    return this.getNameById(parentGraphIdArray[nLevel - 1]);
                };

                R.prototype.getParentNameByIdCombAndLevel = function(idComb, level) {
                    var ouId = idComb.split('-')[this.idCombinationIndex['ou']];

                    return this.getParentNameByIdAndLevel(ouId, level);
                };

                R.prototype.getParentGraphIdArray = function(ouId, level) {
                    var ids = Ext.Array.clean((this.metaData.ouHierarchy[ouId] || '').split('/') || []);

                    if (Ext.isNumber(level) && level > 0) {
                        ids = ids.slice(level - 1);
                    }

                    return ids;
                };

                R.prototype.getParentGraphNameArray = function(ouId, level) {
                    var parentGraphIdArray = this.getParentGraphIdArray(ouId),
                        parentGraphNameArray = [],
                        i = (Ext.isNumber(level) && level > 0) ? (level - 1) : 0;

                    for (; i < parentGraphIdArray.length; i++) {
                        parentGraphNameArray[i] = this.getNameById(parentGraphIdArray[i]);
                    }

                    return parentGraphNameArray;
                };

                R.prototype.getPeGroupNameByPeId = function(peId) {
                    var peName = this.getNameById(peId),
                        a = peName.split(' '),
                        uniqueNumerics = this.getUniqueNumericItemsInArray(a),
                        monthMap = {
                            'Apr': 'April',
                            'Jul': 'July',
                            'Oct': 'October'
                        };

                    if (a.length === 1) {
                        return a[0].slice(0,4);
                    }

                    return (uniqueNumerics.length === 1) ? uniqueNumerics[0] : ('Financial ' + monthMap[a[0]]);
                };

                R.prototype.generateIdValueMap = function() {
                    var dxIndex = this.getHeaderIndexByName('dx'),
                        peIndex = this.getHeaderIndexByName('pe'),
                        ouIndex = this.getHeaderIndexByName('ou'),
                        valueIndex = this.getHeaderIndexByName('value');

                    for (var i = 0, row, key; i < this.rows.length; i++) {
                        row = this.rows[i];
                        key = row[dxIndex] + '-' + row[peIndex] + '-' + row[ouIndex];

                        this.idValueMap[key] = row[valueIndex];
                    }

                    return this.idValueMap;
                };

                R.prototype.getValueByIdComb = function(idComb) {
                    return this.idValueMap[idComb];
                };

                R.prototype.getValueByIdParams = function(dxId, peId, ouId) {
                    return this.idValueMap[dxId + '-' + peId + '-' + ouId];
                };

                R.prototype.getValueByDxIdAndIdComb = function(dxId, idComb) {
                    var pe = this.getIdByIdComb(idComb, 'pe');
                    var ou = this.getIdByIdComb(idComb, 'ou');

                    return this.getValueByIdComb(dxId + '-' + this.getIdByIdComb(idComb, 'pe') + '-' + this.getIdByIdComb(idComb, 'ou'));
                };

                R.prototype.generateIdCombinations = function(aDxResIds, aPeResIds, aOuResIds) {
                    for (var i = 0, dx, a; i < aDxResIds.length; i++) {
                        a = [];
                        dx = aDxResIds[i];

                        for (var j = 0, pe; j < aPeResIds.length; j++) {
                            pe = aPeResIds[j];

                            for (var k = 0, ou; k < aOuResIds.length; k++) {
                                ou = aOuResIds[k];

                                a[this.idCombinationIndex['dx']] = dx;
                                a[this.idCombinationIndex['pe']] = pe;
                                a[this.idCombinationIndex['ou']] = ou;

                                this.idCombinations.push(a.join('-'));
                            }
                        }
                    }

                    return this.idCombinations;
                };

                R.prototype.getNumeratorTotal = function(idComb, dataObject) {
                    var d = dataObject;

                    if (d.isIndicator) {
                        var numeratorIds = d.getNumeratorIds(),
                            strippedNumerator = Ext.clone(d.getStrippedNumerator()),
                            value;

                        for (var k = 0, id, value; k < numeratorIds.length; k++) {
                            id = numeratorIds[k];
                            value = this.getValueByDxIdAndIdComb(id, idComb);

                            strippedNumerator = strippedNumerator.replace(id, value);
                        }

                        value = eval(strippedNumerator);
                        value = Ext.isNumeric(value) ? value : undefined;

                        return value;
                    }
                    else if (d.isDataElement) {
                        return this.getValueByIdComb(idComb);
                    }
                };

                R.prototype.getDenominatorTotal = function(idComb, dataObject) {
                    var d = dataObject;

                    if (d.isIndicator) {
                        var denominatorIds = d.getDenominatorIds(),
                            strippedDenominator = Ext.clone(d.getStrippedDenominator()),
                            value;

                        for (var k = 0, id, value; k < denominatorIds.length; k++) {
                            id = denominatorIds[k];
                            value = this.getValueByDxIdAndIdComb(id, idComb);

                            strippedDenominator = strippedDenominator.replace(id, value);
                        }

                        value = eval(strippedDenominator);
                        value = Ext.isNumeric(value) ? value : undefined;

                        return value;
                    }
                    else if (d.isDataElement) {
                        return 1;
                    }
                };

                R.prototype.isHideRow = function(dataObject, layout, numeratorTotal, denominatorTotal) {
                    if (layout.hideEmptyRows) {
                        if (dataObject.isIndicator && !numeratorTotal && !denominatorTotal) {
                            return true;
                        }

                        if (dataObject.isDataElement && !numeratorTotal) {
                            return true;
                        }
                    }

                    return false;
                }
            })();

            // Data object
            (function() {
                var D = api.data.DataObject = function(config, dataType) {
                    var d = this,
                        indicator = {
                            id: 'indicator',
                            objectName: 'in',
                            name: NS.i18n.indicator,
                            sortId: 1,
                            isIndicator: true
                        },
                        dataElement = {
                            id: 'dataElement',
                            objectName: 'de',
                            name: NS.i18n.data_element,
                            sortId: 2,
                            isDataElement: true
                        },
                        map = {
                            'indicator': indicator,
                            'dataElement': dataElement
                        };

                    // constructor
                    d.dataType = dataType;
                    d.id = config.id;
                    d.name = config.name || '';
                    d.displayName = config.displayName || '';
                    d.displayShortName = config.displayShortName || '';
                    d.groups = config.indicatorGroups || config.dataElementGroups || [];

                    d.numerator = config.numerator;
                    d.numeratorDescription = config.numeratorDescription;
                    d.denominator = config.denominator;
                    d.denominatorDescription = config.denominatorDescription;
                    d.description = config.description || '';
                    d.annualized = config.annualized;

                    d.type = config.indicatorType ? config.indicatorType.name : (config.aggregationType ? config.aggregationType : '');

                    d.legendSet = config.legendSet || null;

                    // transient
                    d.objectName = map[dataType].objectName;
                    d.dataTypeDisplayName = map[dataType].name;
                    d.dataTypeSortId = map[dataType].sortId;
                    d.isIndicator = !!map[dataType].isIndicator;
                    d.isDataElement = !!map[dataType].isDataElement;

                    d.group = d.groups[0] || {};
                    d.groupName = d.group.name || '';

                    d.typeName = d.type + (config.annualized ? ' (annualized)' : '');

                    d.defaultBgColor = '#fff';
                    d.defaultLegendSet = {
                        name: 'Default percentage legend set',
                        legends: [
                            {name: 'Bad', startValue: 0, endValue: 50, color: '#ff0000'},
                            {name: 'Medium', startValue: 50, endValue: 80, color: '#ffff00'},
                            {name: 'Good', startValue: 80, endValue: 100, color: '#00bf00'},
                            {name: 'Too high', startValue: 100, endValue: 1000000000, color: '#f5f5f5'}
                        ]
                    };

                    // uninitialized
                    d.strippedNumerator;
                    d.strippedDenominator;

                    d.numeratorIds;
                    d.denominatorIds;

                    // support
                    d.stripFormula = function(formula) {
                        return (formula || '').replace(/#/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\(|\)/g, "");
                    };

                    d.getIdsFromFormula = function(formula) {
                        var s = (formula || '').replace(/#/g, '').replace(/\(|\)/g, ""),
                            a1 = s.split('{'),
                            a2 = [],
                            ids = [],
                            regexp = /^[a-z0-9]+$/i;

                        for (var i = 0, item; i < a1.length; i++) {
                            item = a1[i];

                            a2 = a2.concat(item.split('}'));
                        }

                        for (var j = 0, item; j < a2.length; j++) {
                            item = a2[j];

                            if ((item.length === 11 && regexp.test(item)) || (item.length === 23 && item.indexOf('.') !== -1 && regexp.test(item.replace('.', '')))) {
                                ids.push(item);
                            }
                        }

                        return ids;
                    }
                };

                // base

                D.prototype.getStrippedNumerator = function() {
                    if (this.strippedNumerator) {
                        return this.strippedNumerator;
                    }

                    return this.strippedNumerator = this.stripFormula(this.numerator);
                };

                D.prototype.getStrippedDenominator = function() {
                    if (this.strippedDenominator) {
                        return this.strippedDenominator;
                    }

                    return this.strippedDenominator = this.stripFormula(this.denominator);
                };

                D.prototype.getNumeratorIds = function() {
                    if (this.numeratorIds) {
                        return this.numeratorIds;
                    }

                    return this.numeratorIds = this.getIdsFromFormula(this.numerator);
                };

                D.prototype.getDenominatorIds = function() {
                    if (this.denominatorIds) {
                        return this.denominatorIds;
                    }

                    return this.denominatorIds = this.getIdsFromFormula(this.denominator);
                };

                // dynamic

                D.prototype.getBgColorByValue = function(value) {
                    var set = this.legendSet || (this.isIndicator ? this.defaultLegendSet : null);

                    if (!set) {
                        return this.defaultBgColor;
                    }

                    for (var i = 0, legend; i < set.legends.length; i++) {
                        legend = set.legends[i];

                        if (value > legend.startValue && value <= legend.endValue) {
                            return legend.color;
                        }
                    }

                    return this.defaultBgColor;
                };
            })();

            // Period
            (function() {
                var P = api.data.Period = function(config) {
                    var p = this;

                    p.id = '' + config.id;
                    p.name = config.name;

                    // transient
                    p.year = p.id.slice(0, 4);
                    p.offset = parseInt(p.year) - (new Date()).getFullYear();
                    p.generator = init.periodGenerator;

                    // uninitialized
                    p.sortId;

                    p.typeSortId;
                    p.typeName;

                    p.displayName;

                    p.getContextMenuItemsConfig;
                };

                P.prototype.getPrefixedNumber = function(number) {
                    return parseInt(number) < 10 ? '0' + number : number;
                };

                P.prototype.getNameByIdAndType = function(type, id, year) {
                    year = year || this.year;

                    var offset = parseInt(year) - (new Date()).getFullYear(),
                        periods = init.periodGenerator.generateReversedPeriods(type, offset);

                    for (var i = 0; i < periods.length; i++) {
                        if (periods[i].iso === id) {
                            return periods[i].name;
                        }
                    }
                };

                P.prototype.getItemifiedPeriods = function(periods) {
                    var items = [];

                    for (var i = 0; i < periods.length; i++) {
                        items.push({
                            id: periods[i].iso,
                            name: periods[i].name
                        });
                    }

                    return items;
                };

                // dep 1

                P.prototype.getItemsByTypeByYear = function(type) {
                    if (type === 'FinancialOct') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, 2));
                    }
                    else if (type === 'FinancialJuly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, 2));
                    }
                    else if (type === 'FinancialApril') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, 2));
                    }
                    else if (type === 'Yearly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, 1));
                    }
                    else if (type === 'SixMonthlyApril') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'SixMonthly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'Quarterly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'BiMonthly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'Monthly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'Weekly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }
                    else if (type === 'Daily') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset));
                    }

                    return [];
                };

                P.prototype.getItemsByTypeByMonth = function(type) {
                    var monthStr = this.id.slice(4, 6),
                        month = parseInt(monthStr);

                    if (type === 'FinancialOct') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, month < 10 ? 1 : 2));
                    }
                    else if (type === 'FinancialJuly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, month < 7 ? 1 : 2));
                    }
                    else if (type === 'FinancialApril') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, month < 4 ? 1 : 2));
                    }
                    else if (type === 'Yearly') {
                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - 5).slice(0, 1));
                    }
                    else if (type === 'SixMonthlyApril') {
                        var offset = (month < 4) ? -1 : 0,
                            index = (month < 4 || month > 9) ? 1 : 2;

                        return this.getItemifiedPeriods(this.generator.generateReversedPeriods(type, this.offset - offset).slice(0, index));
                    }
                    else if (type === 'SixMonthly') {
                        var startIndex = (month <= 6) ? 0 : 1,
                            endIndex = startIndex + 1;

                        return this.getItemifiedPeriods(this.generator.generatePeriods(type, this.offset).slice(startIndex, endIndex));
                    }
                    else if (type === 'Quarterly') {
                        var startIndex = (month <= 3) ? 0 : (month <= 6 ? 1 : (month <= 9 ? 2 : 3))
                            endIndex = startIndex + 1;

                        return this.getItemifiedPeriods(this.generator.generatePeriods(type, this.offset).slice(startIndex, endIndex));
                    }
                    else if (type === 'BiMonthly') {
                        var startIndex = (month <= 2) ? 0 : (month <= 4 ? 1 : (month <= 6 ? 2 : (month <= 8 ? 3 : (month <= 10 ? 4 : 5))))
                            endIndex = startIndex + 1;

                        return this.getItemifiedPeriods(this.generator.generatePeriods(type, this.offset).slice(startIndex, endIndex));
                    }
                    else if (type === 'Monthly') {
                        return this.getItemifiedPeriods(this.generator.generatePeriods(type, this.offset).slice(month - 1, month));
                    }
                    else if (type === 'Weekly') {
                        var allWeeks = this.generator.generatePeriods(type, this.offset),
                            weeks = [];

                        for (var i = 0, sd, ed; i < allWeeks.length; i++) {
                            sd = allWeeks[i].startDate;
                            ed = allWeeks[i].endDate;

                            if (sd.substring(5, 7) === monthStr || ed.substring(5, 7) === monthStr) {
                                weeks.push(allWeeks[i]);
                            }
                        }

                        return this.getItemifiedPeriods(weeks);
                    }
                    else if (type === 'Daily') {
                        var allDays = this.generator.generatePeriods(type, this.offset),
                            days = [];

                        for (var i = 0, m; i < allDays.length; i++) {
                            m = allDays[i].iso;

                            if (m.substring(4, 6) === monthStr) {
                                days.push(allDays[i]);
                            }
                        }

                        return this.getItemifiedPeriods(days);
                    }

                    return [];
                };

                P.prototype.createAllMonthIdsInYear = function(year) {
                    var ids = '';

                    for (var i = 1; i <= 12; i++) {
                        ids += (ids.length ? ';' : '') + year + this.getPrefixedNumber(i);
                    }

                    return ids;
                };

                P.prototype.generateDisplayProperties = function() {
                    var p = this,
                        id = this.id,
                        months = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'.split('|'),
                        offset = parseInt(p.year) - (new Date()).getFullYear(),
                        generator = init.periodGenerator;

                    //tmp
                    this.getContextMenuItemsConfig = function() {};

                    if (Ext.isNumeric(id)) {

                        // yearly
                        if (id.length === 4) {
                            this.sortId = id + '0000';
                            this.typeSortId = '08';
                            this.typeName = 'Yearly';
                            this.displayName = this.name;

                            this.getContextMenuItemsConfig = function() {
                                var items = [];

                                // drill up
                                items.push({
                                    isSubtitle: true,
                                    text: 'Drill up'
                                });

                                // financial october
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('FinancialOct'),
                                        text: 'Show parent <span class="name">financial Octobers</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // financial july
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('FinancialJuly'),
                                        text: 'Show parent <span class="name">financial Julys</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // financial april
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('FinancialApril'),
                                        text: 'Show parent <span class="name">financial Aprils</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // same level
                                items.push({
                                    isSubtitle: true,
                                    text: 'Yearly'
                                });

                                items.push({
                                    items: p.getItemsByTypeByYear('Yearly'),
                                    text: 'Show <span class="name">' + p.displayName + '</span> only',
                                    iconCls: 'ns-menu-item-float'
                                });

                                // drill down
                                items.push({
                                    isSubtitle: true,
                                    text: 'Drill down'
                                });

                                // six-monthly april
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('SixMonthlyApril'),
                                        text: 'Show <span class="name">six-month Aprils</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // six-monthly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('SixMonthly'),
                                        text: 'Show <span class="name">six-months</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // quarterly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('Quarterly'),
                                        text: 'Show <span class="name">quarters</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // bi-monthly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('BiMonthly'),
                                        text: 'Show <span class="name">bi-months</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // monthly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('Monthly'),
                                        text: 'Show <span class="name">months</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // weekly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('Weekly'),
                                        text: 'Show <span class="name">weeks</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // daily
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByYear('Daily'),
                                        text: 'Show <span class="name">days</span> in <span class="name">' + p.displayName + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                return items;
                            };

                            return;
                        }

                        // monthly
                        if (id.length === 6) {
                            this.sortId = this.year + '00' + id.slice(4,6);
                            this.typeSortId = '03';
                            this.typeName = 'Monthly';
                            this.displayName = this.name.split(' ')[0];

                            this.getContextMenuItemsConfig = function() {
                                var month = parseInt(id.slice(4, 6)),
                                    items = [];

                                // drill up
                                items.push({
                                    isSubtitle: true,
                                    text: 'Drill up'
                                });

                                // financial october
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('FinancialOct'),
                                        text: 'Show parent <span class="name">financial October</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // financial july
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('FinancialJuly'),
                                        text: 'Show parent <span class="name">financial July</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // financial april
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('FinancialApril'),
                                        text: 'Show parent <span class="name">financial April</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // yearly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('Yearly'),
                                        text: 'Show parent <span class="name">year</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // six-monthly april
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('SixMonthlyApril'),
                                        text: 'Show parent <span class="name">six-month April</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // six-monthly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('SixMonthly'),
                                        text: 'Show parent <span class="name">six-month</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // quarterly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('Quarterly'),
                                        text: 'Show parent <span class="name">quarter</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // bi-monthly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('BiMonthly'),
                                        text: 'Show parent <span class="name">bi-month</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // same level
                                items.push({
                                    isSubtitle: true,
                                    text: 'Monthly'
                                });

                                items.push({
                                    items: p.getItemsByTypeByMonth('Monthly'),
                                    text: 'Show <span class="name">' + p.name + '</span> only',
                                    iconCls: 'ns-menu-item-float'
                                });

                                //items.push({
                                    //id: p.createAllMonthIdsInYear(p.year),
                                    //name: p.year,
                                    //text: 'Show all <span class="name">months</span> in <span class="name">' + p.year + '</span>',
                                    //iconCls: 'ns-menu-item-float'
                                //});

                                // drill down
                                items.push({
                                    isSubtitle: true,
                                    text: 'Drill down'
                                });

                                // weekly
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('Weekly'),
                                        text: 'Show all <span class="name">weeks</span> in <span class="name">' + p.name + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                // daily
                                (function() {
                                    items.push({
                                        items: p.getItemsByTypeByMonth('Daily'),
                                        text: 'Show all <span class="name">days</span> in <span class="name">' + p.name + '</span>',
                                        iconCls: 'ns-menu-item-float'
                                    });
                                })();

                                return items;
                            };

                            //return;
                        }

                        // daily
                        if (id.length === 8) {
                            this.sortId = id;
                            this.typeSortId = '01';
                            this.typeName = 'Daily';
                            this.displayName = months[(new Date(this.name)).getMonth()] + ' ' + parseInt(this.name.split('-')[2]);
                            //return;
                        }
                    }

                    // weekly
                    if (id.indexOf('W') !== -1) {
                        this.sortId = function() {
                            var a = id.split('W');
                            return a[0] + (a[1].length === 1 ? '000' : '00') + a[1];
                        }();
                        this.typeSortId = '02';
                        this.typeName = 'Weekly';
                        this.displayName = 'Week ' + id.split('W')[1];
                        //return;
                    }

                    // bi-monthly
                    if (id.indexOf('B') !== -1) {
                        this.sortId = id.slice(0, 4) + '00' + id.slice(4,6);
                        this.typeSortId = '04';
                        this.typeName = 'Bi-monthly';
                        this.displayName = Ext.String.trim(this.name.split(this.year)[0]);
                        //return;
                    }

                    // quarterly
                    if (id.indexOf('Q') !== -1) {
                        this.sortId = function() {
                            var a = id.split('Q');
                            return a[0] + (a[1].length === 1 ? '000' : '00') + a[1];
                        }();
                        this.typeSortId = '05';
                        this.typeName = 'Quarterly';
                        this.displayName = Ext.String.trim(this.name.split(this.year)[0]);
                        //return;
                    }

                    // six-monthly
                    if (id.indexOf('S') !== -1 && id.length === 6) {
                        this.sortId = function() {
                            var a = id.split('S');
                            return a[0] + (a[1].length === 1 ? '000' : '00') + a[1];
                        }();
                        this.typeSortId = '06';
                        this.typeName = 'Six-monthly';
                        this.displayName = Ext.String.trim(this.name.split(this.year)[0]);
                        //return;
                    }

                    // six-monthly april
                    if (id.indexOf('AprilS') !== -1) {
                        this.sortId = function() {
                            var a = id.split('AprilS');
                            return a[0] + (a[1].length === 1 ? '000' : '00') + a[1];
                        }();
                        this.typeSortId = '07';
                        this.typeName = 'Six-monthly April';
                        this.displayName = Ext.String.trim(this.name.split(this.year)[0]);
                        //return;
                    }

                    // financial april
                    if (id.indexOf('April') !== -1 && id.indexOf('S') === -1) {
                        this.sortId = id.slice(0, 4) + '0001';
                        this.typeSortId = '09';
                        this.typeName = 'Financial April';
                        this.displayName = this.name;
                        //return;
                    }

                    // financial july
                    if (id.indexOf('July') !== -1) {
                        this.sortId = id.slice(0, 4) + '0002';
                        this.typeSortId = '10';
                        this.typeName = 'Financial July';
                        this.displayName = this.name;
                        //return;
                    }

                    // financial october
                    if (id.indexOf('Oct') !== -1) {
                        this.sortId = id.slice(0, 4) + '0003';
                        this.typeSortId = '11';
                        this.typeName = 'Financial October';
                        this.displayName = this.name;
                        //return;
                    }
                };
            })();

            // Organisation unit
            (function() {
                var O = api.data.OrganisationUnit = function(config) {
                    var o = this;

                    // constructor
                    o.id = config.id;
                    o.name = config.name;
                    o.level = config.level;
                    o.metaData = config.metaData;

                    // transient
                    o.parentGraph = o.metaData.ouHierarchy[o.id];

                    // uninitialized
                    o.parentIdArray;

                    o.parentNameArray;

                    // support
                    o.getValidLevel = function(level) {
                        return (Ext.isNumber(level) && level > 0) ? level : 1;
                    };
                };

                // base

                O.prototype.getParentIdArray = function() {
                    if (this.parentIdArray) {
                        return this.parentIdArray;
                    }

                    return this.parentIdArray = Ext.Array.clean(this.parentGraph.split('/'));
                };

                O.prototype.getParentNameArray = function() {
                    if (this.parentNameArray) {
                        return this.parentNameArray;
                    }

                    return this.parentNameArray = Ext.Array.clean((this.metaData.ouNameHierarchy[this.name] || '').split('/'));
                };

                O.prototype.getParentGraphById = function(id) {
                    return this.parentGraph.split(id)[0];
                };

                // dep 1

                O.prototype.getParentIdByLevel = function(level) {
                    var parentIdArray = this.getParentIdArray(),
                        i = this.getValidLevel(level) - 1;

                    return parentIdArray[i];
                };

                O.prototype.getParentIdArrayByLevels = function(startLevel, endLevel) {
                    var parentIdArray = this.getParentIdArray(),
                        i = this.getValidLevel(startLevel) - 1;

                    return parentIdArray.slice(i, endLevel || parentIdArray.length);
                };

                O.prototype.getParentNameByLevel = function(level) {
                    var parentNameArray = this.getParentNameArray(),
                        i = this.getValidLevel(level) - 1;

                    return parentNameArray[i];
                };

                O.prototype.getParentNameArrayByLevels = function(startLevel, endLevel) {
                    var parentNameArray = this.getParentNameArray(),
                        i = this.getValidLevel(startLevel) - 1;

                    return parentNameArray.slice(i, endLevel || parentNameArray.length);
                };

                O.prototype.getParentGraphMapById = function(id) {
                    var map = {};
                    map[id] = this.getParentGraphById(id);

                    return map;
                };

                // dep 2

                O.prototype.getSortIdByLevel = function(level) {
                    return this.getParentNameArrayByLevels(level).join('');
                };

                // dep 3

                O.prototype.getContextMenuItemsConfig = function(level) {
                    var items = [],
                        levels = init.organisationUnitLevels,
                        ouId = this.getParentIdByLevel(level) || this.id,
                        ouName = this.getParentNameByLevel(level) || this.name,
                        levelName = levels[level - 1].name,
                        pOuId,
                        pOuName,
                        gpOuId,
                        gpOuName,
                        pLevelName,
                        cLevelName;

                    if (level > 1) {
                        pOuId = this.getParentIdByLevel(level - 1) || this.id;
                        pOuName = this.getParentNameByLevel(level - 1) || this.name;
                        pLevelName = levels[level - 2].name;

                        // up
                        items.push({
                            isSubtitle: true,
                            text: 'Drill up to ' + pLevelName + ' level'
                        });

                        if (level === 2) {

                            // show root
                            items.push({
                                id: pOuId,
                                text: 'Show <span class="name">' + pOuName + '</span>',
                                iconCls: 'ns-menu-item-float'
                            });
                        }
                        else {

                            // show parent only
                            items.push({
                                id: pOuId,
                                text: 'Show <span class="name">' + pOuName + '</span> only',
                                iconCls: 'ns-menu-item-float',
                                parentGraphMap: this.getParentGraphMapById(pOuId)
                            });

                            if (level > 3) {
                                gpOuId = this.getParentIdByLevel(level - 2) || this.id;
                                gpOuName = this.getParentNameByLevel(level - 2) || this.name;

                                items.push({
                                    id: gpOuId + ';LEVEL-' + (level - 1),
                                    text: 'Show all <span class="name">' + pLevelName + '</span> units in <span class="name">' + gpOuName + '</span>',
                                    iconCls: 'ns-menu-item-float',
                                    parentGraphMap: this.getParentGraphMapById(gpOuId)
                                });
                            }

                            items.push({
                                id: 'LEVEL-' + (level - 1),
                                text: 'Show all <span class="name">' + pLevelName + '</span> units',
                                iconCls: 'ns-menu-item-float'
                            });
                        }

                        // expand
                        items.push({
                            isSubtitle: true,
                            text: levelName + ' level'
                        });

                        items.push({
                            id: ouId,
                            text: 'Show <span class="name">' + ouName + '</span> only',
                            iconCls: 'ns-menu-item-expand',
                            parentGraphMap: this.getParentGraphMapById(ouId)
                        });

                        if (level > 2) {
                            items.push({
                                id: pOuId + ';LEVEL-' + level,
                                text: 'Show all <span class="name">' + levelName + '</span> units in <span class="name">' + pOuName + '</span>',
                                iconCls: 'ns-menu-item-expand',
                                parentGraphMap: this.getParentGraphMapById(pOuId)
                            });
                        }

                        items.push({
                            id: 'LEVEL-' + level,
                            text: 'Show all <span class="name">' + levelName + '</span> units',
                            iconCls: 'ns-menu-item-expand'
                        });
                    }

                    if (level < levels.length) {
                        cLevelName = levels[level].name;

                        // down
                        items.push({
                            isSubtitle: true,
                            text: 'Drill down to <span class="name">' + cLevelName + '</span> level'
                        });

                        items.push({
                            id: ouId + ';LEVEL-' + (level + 1),
                            text: 'Show all <span class="name">' + cLevelName + '</span> units in <span class="name">' + ouName + '</span>',
                            iconCls: 'ns-menu-item-drill',
                            parentGraphMap: this.getParentGraphMapById(ouId)
                        });

                        if (level > 1) {
                            items.push({
                                id: 'LEVEL-' + (level + 1),
                                text: 'Show all <span class="name">' + cLevelName + '</span> units',
                                iconCls: 'ns-menu-item-drill'
                            });
                        }
                    }

                    return items;
                };
            })();

            // Table header
            (function() {
                var H = api.data.TableHeader = function(config) {
                    var h = this;

                    h.id = config.id;
                    h.elementId = Ext.data.IdGenerator.get('uuid').generate();
                    h.name = config.name;
                    h.objectName = config.objectName;

                    if (Ext.isNumeric(config.level)) {
                        h.level = parseInt(config.level);
                    }

                    h.cls = 'pivot-dim td-sortable pointer';

                    // transient
                    h.html;
                };

                H.prototype.generateHtml = function() {
                    this.html = '<td';
                    this.html += this.elementId ? (' id="' + this.elementId + '"') : '';
                    this.html += this.cls ? (' class="' + this.cls + '"') : '';
                    this.html += this.style ? (' style="' + this.style + '"') : '';
                    this.html += '>' + this.name + '</td>';

                    return this.html;
                };
            })();

            // Table row
            (function() {
                var R = api.data.TableRow = function(config) {
                    var r = this;

                    r.dataObject = config.dataObject;
                    r.period = config.period;
                    r.organisationUnit = config.organisationUnit;

                    // transient

                    r.cellMap = {};
                };

                // base

                R.prototype.addCell = function(thId, cell) {
                    this.cellMap[thId] = cell;
                };

                R.prototype.getCellById = function(thId) {
                    return this.cellMap[thId];
                };
            })();

            // Table cell
            (function() {
                var C = api.data.TableCell = function(config) {
                    var c = this,
                        id = Ext.data.IdGenerator.get('uuid').generate();

                    c.id = id;
                    c.elementId = id;
                    c.name = config.name;
                    c.sortId = config.sortId;
                    c.cls = config.cls;
                    c.style = config.style;
                    c.isEmpty = !!config.isEmpty;

                    // auto
                    if (c.isEmpty) {
                        c.name = '';
                        c.sortId = '';
                        c.cls = 'empty';
                        c.style = '';
                    }

                    // transient
                    c.html;
                };

                C.prototype.generateHtml = function() {
                    if (this.html) {
                        return this.html;
                    }

                    this.html = '<td';
                    this.html += this.elementId ? (' id="' + this.elementId + '"') : '';
                    this.html += this.cls ? (' class="' + this.cls + '"') : '';
                    this.html += this.style ? (' style="' + this.style + '"') : '';
                    this.html += '>' + this.name + '</td>';

                    return this.html;
                };

                // Pe table cell
                C.Pe = function(config) {
                    var c = this,
                        s = new C(config);

                    Ext.apply(this, s);

                    this.period = config.period;
                };

                C.Pe.prototype.showContextMenu = function(layout, row, tableFn, menuFn) {
                    var c = this,
                        itemsConfig = this.period.getContextMenuItemsConfig(),
                        items = [];

                    if (!itemsConfig || !itemsConfig.length) {
                        return;
                    }

                    for (var i = 0, conf; i < itemsConfig.length; i++) {
                        conf = itemsConfig[i];

                        items.push(conf.isSubtitle ? {
                            xtype: 'label',
                            html: conf.text,
                            style: conf.style
                        } : {
                            text: conf.text,
                            iconCls: conf.iconCls,
                            peReqItems: conf.items,
                            handler: function() {
console.log(this.peReqItems);
                                // pe
                                layout.rows[0] = {
                                    dimension: 'pe',
                                    items: this.peReqItems
                                };

                                tableFn(layout, true);
                            }
                        });
                    }

                    menu = menuFn({
                        items: items
                    });

                    menu.showAt(function() {
                        var el = Ext.get(c.elementId),
                            height = el.getHeight(),
                            width = el.getWidth(),
                            xy = el.getXY();

                        xy[0] += width - (height / 2);
                        xy[1] += height - (height / 2);

                        return xy;
                    }());
                };

                // Ou table cell
                C.Ou = function(config) {
                    var c = this,
                        s = new C(config);

                    Ext.apply(this, s);

                    this.level = config.level;
                    this.organisationUnit = config.organisationUnit;
                };

                C.Ou.prototype.showContextMenu = function(layout, row, tableFn, menuFn) {
                    var c = this,
                        itemsConfig = this.organisationUnit.getContextMenuItemsConfig(this.level),
                        items = [];

                    for (var i = 0, conf; i < itemsConfig.length; i++) {
                        conf = itemsConfig[i];

                        items.push(conf.isSubtitle ? {
                            xtype: 'label',
                            html: conf.text,
                            style: conf.style
                        } : {
                            text: conf.text,
                            iconCls: conf.iconCls,
                            dxReqId: row.dataObject.id,
                            dxReqName: row.dataObject.name,
                            dxObjectName: row.dataObject.objectName,
                            peReqId: row.period.id,
                            peReqName: row.period.name,
                            ouReqId: conf.id,
                            parentGraphMap: conf.parentGraphMap,
                            handler: function() {
                                layout.columns = [];
                                layout.rows = [];

                                // dx
                                layout.columns.push({
                                    dimension: 'dx',
                                    items: [{
                                        id: this.dxReqId,
                                        name: this.dxReqName,
                                        objectName: this.dxObjectName
                                    }]
                                });

                                // pe
                                layout.rows.push({
                                    dimension: 'pe',
                                    items: [{
                                        id: this.peReqId,
                                        name: this.peReqName
                                    }]
                                })

                                // ou
                                layout.rows.push({
                                    dimension: 'ou',
                                    items: [{id: this.ouReqId}]
                                });

                                layout.dataDimensionItems = function() {
                                    var obj = {};

                                    obj[row.dataObject.dataType] = {
                                        id: row.dataObject.id
                                    };

                                    return [obj];
                                }();

                                layout.parentGraphMap = this.parentGraphMap;

                                tableFn(layout, true);
                            }
                        });
                    }

                    menu = menuFn({
                        items: items
                    });

                    menu.showAt(function() {
                        var el = Ext.get(c.elementId),
                            height = el.getHeight(),
                            width = el.getWidth(),
                            xy = el.getXY();

                        xy[0] += width - (height / 2);
                        xy[1] += height - (height / 2);

                        return xy;
                    }());
                };
            })();

            // Table
            (function() {
                var T = api.data.Table = function(config) {
                    var t = this;

                    t.tableHeaders = config.tableHeaders;
                    t.tableRows = config.tableRows;
                    t.cls = config.cls;

                    t.sorting = {
                        id: 'pe',
                        direction: 'ASC'
                    };

                    // transient
                    t.cellIdRowMap;

                    t.lastSorting = {
                        id: 'pe',
                        direction: 'ASC'
                    };

                    t.html;

                    t.update;
                };

                // base

                T.prototype.getCellIdRowMap = function() {
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

                T.prototype.getSortDirection = function(id) {
                    if (id === this.lastSorting.id) {
                        return this.lastSorting.direction === 'ASC' ? 'DESC' : 'ASC';
                    }

                    return 'ASC';
                };

                T.prototype.sortData = function() {
                    var sorting = this.sorting;

                    this.tableRows.sort( function(a, b) {
                        a = a.getCellById(sorting.id)['sortId'];
                        b = b.getCellById(sorting.id)['sortId'];

                        // string
                        if (Ext.isString(a) && Ext.isString(b)) {
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
                        else if (Ext.isNumber(a) && Ext.isNumber(b)) {
                            return sorting.direction === 'DESC' ? b - a : a - b;
                        }

                        else if (Ext.isEmpty(a)) {
                            return sorting.emptyFirst ? -1 : 1;
                        }

                        else if (Ext.isEmpty(b)) {
                            return sorting.emptyFirst ? 1 : -1;
                        }

                        return -1;
                    });
                };

                T.prototype.addOptionsCls = function(config) {

                    // display density
                    this.cls += ' displaydensity-' + (config.displayDensity || 'NORMAL').toLowerCase();

                    // font size
                    this.cls += ' fontsize-' + (config.fontSize || 'NORMAL').toLowerCase();

                    return this.cls;
                };

                T.prototype.generateHtml = function() {
                    var html = '<table class="pivot ' + this.cls + '">';

                    html += '<tr>';

                    for (var i = 0; i < this.tableHeaders.length; i++) {
                        html += this.tableHeaders[i].generateHtml();
                    }

                    html += '</tr>';

                    for (var j = 0, row; j < this.tableRows.length; j++) {
                        row = this.tableRows[j];
                        html += '<tr>';

                        for (var k = 0, th; k < this.tableHeaders.length; k++) {
                            th = this.tableHeaders[k];
                            html += row.getCellById(th.id).generateHtml();
                        }

                        html += '</tr>';
                    }

                    html += '</table>';

                    return this.html = html;
                };

                T.prototype.getContextMenu = function(config) {
                    config = config || {};

                    config.shadow = false;
                    config.showSeparator = false;
                    config.baseCls = 'ns-floatmenu';

                    return Ext.create('Ext.menu.Menu', config);
                };

                T.prototype.getTableCellsByInstance = function(type) {
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

                T.prototype.addHeaderClickListeners = function() {
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

                // dep 1
                T.prototype.getRowByCellId = function(cellId) {
                    return this.getCellIdRowMap()[cellId];
                };

                // dep 2
                T.prototype.addOuClickListeners = function(layout, tableFn) {
                    var t = this,
                        cells = this.getTableCellsByInstance(api.data.TableCell.Ou);

                    for (var i = 0, cell, el; i < cells.length; i++) {
                        cell = cells[i];

                        if (cell.isEmpty) {
                            continue;
                        }

                        el = Ext.get(cell.elementId);
                        el.cell = cell;
                        el.row = t.getRowByCellId(cell.id);

                        el.on('click', function(event) {
                            this.cell.showContextMenu(layout, this.row, tableFn, t.getContextMenu);
                        });
                    }
                };

                T.prototype.addPeClickListeners = function(layout, tableFn) {
                    var t = this,
                        cells = this.getTableCellsByInstance(api.data.TableCell.Pe);

                    for (var i = 0, cell, el; i < cells.length; i++) {
                        cell = cells[i];

                        if (cell.isEmpty) {
                            continue;
                        }

                        el = Ext.get(cell.elementId);
                        el.cell = cell;
                        el.row = t.getRowByCellId(cell.id);

                        el.on('click', function(event) {
                            this.cell.showContextMenu(layout, this.row, tableFn, t.getContextMenu);
                        });
                    }
                };
            })();
        })();

		// support
		(function() {

			// prototype
			support.prototype = {};

				// array
			support.prototype.array = {};

			support.prototype.array.getLength = function(array, suppressWarning) {
				if (!Ext.isArray(array)) {
					if (!suppressWarning) {
						console.log('support.prototype.array.getLength: not an array');
					}

					return null;
				}

				return array.length;
			};

			support.prototype.array.sort = function(array, direction, key, emptyFirst) {
				// supports [number], [string], [{key: number}], [{key: string}], [[string]], [[number]]

				if (!support.prototype.array.getLength(array)) {
					return;
				}

				key = !!key || Ext.isNumber(key) ? key : 'name';

				array.sort( function(a, b) {

					// if object, get the property values
					if (Ext.isObject(a) && Ext.isObject(b)) {
						a = a[key];
						b = b[key];
					}

					// if array, get from the right index
					if (Ext.isArray(a) && Ext.isArray(b)) {
						a = a[key];
						b = b[key];
					}

					// string
					if (Ext.isString(a) && Ext.isString(b)) {
						a = a.toLowerCase();
						b = b.toLowerCase();

						if (direction === 'DESC') {
							return a < b ? 1 : (a > b ? -1 : 0);
						}
						else {
							return a < b ? -1 : (a > b ? 1 : 0);
						}
					}

					// number
					else if (Ext.isNumber(a) && Ext.isNumber(b)) {
						return direction === 'DESC' ? b - a : a - b;
					}

                    else if (a === undefined || a === null) {
                        return emptyFirst ? -1 : 1;
                    }

                    else if (b === undefined || b === null) {
                        return emptyFirst ? 1 : -1;
                    }

					return -1;
				});

				return array;
			};

            support.prototype.array.addObjectProperty = function(array, key, value) {
                if (Ext.isArray(array)) {
                    for (var i = 0; i < array.length; i++) {
                        array[i][key] = value;
                    }
                }

                return array;
            };

				// object
			support.prototype.object = {};

			support.prototype.object.getLength = function(object, suppressWarning) {
				if (!Ext.isObject(object)) {
					if (!suppressWarning) {
						console.log('support.prototype.object.getLength: not an object');
					}

					return null;
				}

				var size = 0;

				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						size++;
					}
				}

				return size;
			};

			support.prototype.object.hasObject = function(object, property, value) {
				if (!support.prototype.object.getLength(object)) {
					return null;
				}

				for (var key in object) {
					var record = object[key];

					if (object.hasOwnProperty(key) && record[property] === value) {
						return true;
					}
				}

				return null;
			};

				// str
			support.prototype.str = {};

			support.prototype.str.replaceAll = function(str, find, replace) {
				return str.replace(new RegExp(find, 'g'), replace);
			};

			support.prototype.str.toggleDirection = function(direction) {
				return direction === 'DESC' ? 'ASC' : 'DESC';
			};

				// number
			support.prototype.number = {};

			support.prototype.number.getNumberOfDecimals = function(number) {
				var str = new String(number);
				return (str.indexOf('.') > -1) ? (str.length - str.indexOf('.') - 1) : 0;
			};

			support.prototype.number.roundIf = function(number, precision) {
				number = parseFloat(number);
				precision = parseFloat(precision);

				if (Ext.isNumber(number) && Ext.isNumber(precision)) {
					var numberOfDecimals = support.prototype.number.getNumberOfDecimals(number);
					return numberOfDecimals > precision ? Ext.Number.toFixed(number, precision) : number;
				}

				return number;
			};

			support.prototype.number.prettyPrint = function(number, separator) {
				separator = separator || 'space';

				if (separator === 'none') {
					return number;
				}

				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, conf.report.digitGroupSeparator[separator]);
			};

                // date
            support.prototype.date = {};

            support.prototype.date.getYYYYMMDD = function(param) {
                if (!Ext.isString(param)) {
                    if (!(Object.prototype.toString.call(param) === '[object Date]' && param.toString() !== 'Invalid date')) {
                        return null;
                    }
                }

                var date = new Date(param),
                    month = '' + (1 + date.getMonth()),
                    day = '' + date.getDate();

                month = month.length === 1 ? '0' + month : month;
                day = day.length === 1 ? '0' + day : day;

                return date.getFullYear() + '-' + month + '-' + day;
            };

			// color
			support.color = {};

			support.color.hexToRgb = function(hex) {
				var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
					result;

				hex = hex.replace(shorthandRegex, function(m, r, g, b) {
					return r + r + g + g + b + b;
				});

				result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : null;
			};

            // connection
            support.connection = {};

            support.connection.ajax = function(requestConfig, authConfig) {
                if (authConfig.crossDomain && Ext.isString(authConfig.username) && Ext.isString(authConfig.password)) {
                    requestConfig.headers = Ext.isObject(authConfig.headers) ? authConfig.headers : {};
                    requestConfig.headers['Authorization'] = 'Basic ' + btoa(authConfig.username + ':' + authConfig.password);
                }

                Ext.Ajax.request(requestConfig);
            };
		}());

		// service
		(function() {

			// layout
			service.layout = {};

			service.layout.cleanDimensionArray = function(dimensionArray) {
				if (!support.prototype.array.getLength(dimensionArray)) {
					return null;
				}

				var array = [];

				for (var i = 0; i < dimensionArray.length; i++) {
					array.push(api.layout.Dimension(dimensionArray[i]));
				}

				array = Ext.Array.clean(array);

				return array.length ? array : null;
			};

			service.layout.sortDimensionArray = function(dimensionArray, key) {
				if (!support.prototype.array.getLength(dimensionArray, true)) {
					return null;
				}

				// Clean dimension array
				dimensionArray = service.layout.cleanDimensionArray(dimensionArray);

				if (!dimensionArray) {
					console.log('service.layout.sortDimensionArray: no valid dimensions');
					return null;
				}

				key = key || 'dimensionName';

				// Dimension order
				Ext.Array.sort(dimensionArray, function(a,b) {
					if (a[key] < b[key]) {
						return -1;
					}
					if (a[key] > b[key]) {
						return 1;
					}
					return 0;
				});

				// Sort object items, ids
				for (var i = 0, items; i < dimensionArray.length; i++) {
					support.prototype.array.sort(dimensionArray[i].items, 'ASC', 'id');

					if (support.prototype.array.getLength(dimensionArray[i].ids)) {
						support.prototype.array.sort(dimensionArray[i].ids);
					}
				}

				return dimensionArray;
			};

			service.layout.getObjectNameDimensionMapFromDimensionArray = function(dimensionArray) {
				var map = {};

				if (!support.prototype.array.getLength(dimensionArray)) {
					return null;
				}

				for (var i = 0, dimension; i < dimensionArray.length; i++) {
					dimension = api.layout.Dimension(dimensionArray[i]);

					if (dimension) {
						map[dimension.dimension] = dimension;
					}
				}

				return support.prototype.object.getLength(map) ? map : null;
			};

			service.layout.getObjectNameDimensionItemsMapFromDimensionArray = function(dimensionArray) {
				var map = {};

				if (!support.prototype.array.getLength(dimensionArray)) {
					return null;
				}

				for (var i = 0, dimension; i < dimensionArray.length; i++) {
					dimension = api.layout.Dimension(dimensionArray[i]);

					if (dimension) {
						map[dimension.dimension] = dimension.items;
					}
				}

				return support.prototype.object.getLength(map) ? map : null;
			};

			service.layout.getItemName = function(layout, response, id, isHtml) {
				var metaData = response.metaData,
					name = '';

				if (service.layout.isHierarchy(layout, response, id)) {
					var a = Ext.Array.clean(metaData.ouHierarchy[id].split('/'));
					a.shift();

					for (var i = 0; i < a.length; i++) {
						name += (isHtml ? '<span class="text-weak">' : '') + metaData.names[a[i]] + (isHtml ? '</span>' : '') + ' / ';
					}
				}

				name += metaData.names[id];

				return name;
			};

			service.layout.getExtendedLayout = function(layout) {
				var layout = Ext.clone(layout),
					xLayout;

				xLayout = {
					columns: [],
					rows: [],
					filters: [],

					columnObjectNames: [],
					columnDimensionNames: [],
					rowObjectNames: [],
					rowDimensionNames: [],

					// axis
					axisDimensions: [],
					axisObjectNames: [],
					axisDimensionNames: [],

						// for param string
					sortedAxisDimensionNames: [],

					// Filter
					filterDimensions: [],
					filterObjectNames: [],
					filterDimensionNames: [],

						// for param string
					sortedFilterDimensions: [],

					// all
					dimensions: [],
					objectNames: [],
					dimensionNames: [],

					// oject name maps
					objectNameDimensionsMap: {},
					objectNameItemsMap: {},
					objectNameIdsMap: {},

					// dimension name maps
					dimensionNameDimensionsMap: {},
					dimensionNameItemsMap: {},
					dimensionNameIdsMap: {},

						// for param string
					dimensionNameSortedIdsMap: {},

					// sort table by column
					//sortableIdObjects: []

                    dimensionNameAxisMap: {}
				};

				Ext.applyIf(xLayout, layout);

				// columns, rows, filters
				if (layout.columns) {
					for (var i = 0, dim, items, xDim; i < layout.columns.length; i++) {
						dim = layout.columns[i];
						items = dim.items;
						xDim = {};

						xDim.dimension = dim.dimension;
						xDim.objectName = dim.dimension;
						xDim.dimensionName = dimConf.objectNameMap[dim.dimension].dimensionName;

						if (items) {
							xDim.items = items;
							xDim.ids = [];

							for (var j = 0; j < items.length; j++) {
								xDim.ids.push(items[j].id);
							}
						}

						xLayout.columns.push(xDim);

						xLayout.columnObjectNames.push(xDim.objectName);
						xLayout.columnDimensionNames.push(xDim.dimensionName);

						xLayout.axisDimensions.push(xDim);
						xLayout.axisObjectNames.push(xDim.objectName);
						xLayout.axisDimensionNames.push(dimConf.objectNameMap[xDim.objectName].dimensionName);

						xLayout.objectNameDimensionsMap[xDim.objectName] = xDim;
						xLayout.objectNameItemsMap[xDim.objectName] = xDim.items;
						xLayout.objectNameIdsMap[xDim.objectName] = xDim.ids;

                        xLayout.dimensionNameAxisMap[xDim.dimensionName] = xLayout.columns;
					}
				}

				if (layout.rows) {
					for (var i = 0, dim, items, xDim; i < layout.rows.length; i++) {
						dim = Ext.clone(layout.rows[i]);
						items = dim.items;
						xDim = {};

						xDim.dimension = dim.dimension;
						xDim.objectName = dim.dimension;
						xDim.dimensionName = dimConf.objectNameMap[dim.dimension].dimensionName;

						if (items) {
							xDim.items = items;
							xDim.ids = [];

							for (var j = 0; j < items.length; j++) {
								xDim.ids.push(items[j].id);
							}
						}

						xLayout.rows.push(xDim);

						xLayout.rowObjectNames.push(xDim.objectName);
						xLayout.rowDimensionNames.push(xDim.dimensionName);

						xLayout.axisDimensions.push(xDim);
						xLayout.axisObjectNames.push(xDim.objectName);
						xLayout.axisDimensionNames.push(dimConf.objectNameMap[xDim.objectName].dimensionName);

						xLayout.objectNameDimensionsMap[xDim.objectName] = xDim;
						xLayout.objectNameItemsMap[xDim.objectName] = xDim.items;
						xLayout.objectNameIdsMap[xDim.objectName] = xDim.ids;

                        xLayout.dimensionNameAxisMap[xDim.dimensionName] = xLayout.rows;
					}
				}

				if (layout.filters) {
					for (var i = 0, dim, items, xDim; i < layout.filters.length; i++) {
						dim = layout.filters[i];
						items = dim.items;
						xDim = {};

						xDim.dimension = dim.dimension;
						xDim.objectName = dim.dimension;
						xDim.dimensionName = dimConf.objectNameMap[dim.dimension].dimensionName;

						if (items) {
							xDim.items = items;
							xDim.ids = [];

							for (var j = 0; j < items.length; j++) {
								xDim.ids.push(items[j].id);
							}
						}

						xLayout.filters.push(xDim);

						xLayout.filterDimensions.push(xDim);
						xLayout.filterObjectNames.push(xDim.objectName);
						xLayout.filterDimensionNames.push(dimConf.objectNameMap[xDim.objectName].dimensionName);

						xLayout.objectNameDimensionsMap[xDim.objectName] = xDim;
						xLayout.objectNameItemsMap[xDim.objectName] = xDim.items;
						xLayout.objectNameIdsMap[xDim.objectName] = xDim.ids;

                        xLayout.dimensionNameAxisMap[xDim.dimensionName] = xLayout.filters;
					}
				}

				// legend set
				xLayout.legendSet = layout.legendSet ? init.idLegendSetMap[layout.legendSet.id] : null;

				if (layout.legendSet) {
					xLayout.legendSet = init.idLegendSetMap[layout.legendSet.id];
					support.prototype.array.sort(xLayout.legendSet.legends, 'ASC', 'startValue');
				}

				// unique dimension names
				xLayout.axisDimensionNames = Ext.Array.unique(xLayout.axisDimensionNames);
				xLayout.filterDimensionNames = Ext.Array.unique(xLayout.filterDimensionNames);

				xLayout.columnDimensionNames = Ext.Array.unique(xLayout.columnDimensionNames);
				xLayout.rowDimensionNames = Ext.Array.unique(xLayout.rowDimensionNames);
				xLayout.filterDimensionNames = Ext.Array.unique(xLayout.filterDimensionNames);

					// for param string
				xLayout.sortedAxisDimensionNames = Ext.clone(xLayout.axisDimensionNames).sort();
				xLayout.sortedFilterDimensions = service.layout.sortDimensionArray(Ext.clone(xLayout.filterDimensions));

				// all
				xLayout.dimensions = [].concat(xLayout.axisDimensions, xLayout.filterDimensions);
				xLayout.objectNames = [].concat(xLayout.axisObjectNames, xLayout.filterObjectNames);
				xLayout.dimensionNames = [].concat(xLayout.axisDimensionNames, xLayout.filterDimensionNames);

				// dimension name maps
				for (var i = 0, dimName; i < xLayout.dimensionNames.length; i++) {
					dimName = xLayout.dimensionNames[i];

					xLayout.dimensionNameDimensionsMap[dimName] = [];
					xLayout.dimensionNameItemsMap[dimName] = [];
					xLayout.dimensionNameIdsMap[dimName] = [];
				}

				for (var i = 0, xDim; i < xLayout.dimensions.length; i++) {
					xDim = xLayout.dimensions[i];

					xLayout.dimensionNameDimensionsMap[xDim.dimensionName].push(xDim);
					xLayout.dimensionNameItemsMap[xDim.dimensionName] = xLayout.dimensionNameItemsMap[xDim.dimensionName].concat(xDim.items);
					xLayout.dimensionNameIdsMap[xDim.dimensionName] = xLayout.dimensionNameIdsMap[xDim.dimensionName].concat(xDim.ids);
				}

					// for param string
				for (var key in xLayout.dimensionNameIdsMap) {
					if (xLayout.dimensionNameIdsMap.hasOwnProperty(key)) {
						xLayout.dimensionNameSortedIdsMap[key] = Ext.clone(xLayout.dimensionNameIdsMap[key]).sort();
					}
				}

				// Uuid
				xLayout.tableUuid = init.el + '_' + Ext.data.IdGenerator.get('uuid').generate();

				return xLayout;
			};

			service.layout.getSyncronizedXLayout = function(xLayout, response) {
				var removeDimensionFromXLayout,
					dimensions = Ext.Array.clean([].concat(xLayout.columns || [], xLayout.rows || [], xLayout.filters || [])),
                    xOuDimension = xLayout.objectNameDimensionsMap[dimConf.organisationUnit.objectName],
                    isUserOrgunit = xOuDimension && Ext.Array.contains(xOuDimension.ids, 'USER_ORGUNIT'),
                    isUserOrgunitChildren = xOuDimension && Ext.Array.contains(xOuDimension.ids, 'USER_ORGUNIT_CHILDREN'),
                    isUserOrgunitGrandChildren = xOuDimension && Ext.Array.contains(xOuDimension.ids, 'USER_ORGUNIT_GRANDCHILDREN'),
                    isLevel = function() {
                        if (xOuDimension && Ext.isArray(xOuDimension.ids)) {
                            for (var i = 0; i < xOuDimension.ids.length; i++) {
                                if (xOuDimension.ids[i].substr(0,5) === 'LEVEL') {
                                    return true;
                                }
                            }
                        }

                        return false;
                    }(),
                    isGroup = function() {
                        if (xOuDimension && Ext.isArray(xOuDimension.ids)) {
                            for (var i = 0; i < xOuDimension.ids.length; i++) {
                                if (xOuDimension.ids[i].substr(0,8) === 'OU_GROUP') {
                                    return true;
                                }
                            }
                        }

                        return false;
                    }(),
                    co = dimConf.category.objectName,
                    ou = dimConf.organisationUnit.objectName,
                    headerNames = function() {
                        var headerNames = [];

                        for (var i = 0; i < response.headers.length; i++) {
                            headerNames.push(response.headers[i].name);
                        }

                        return headerNames;
                    }(),
                    layout;

				removeDimensionFromXLayout = function(objectName) {
					var getUpdatedAxis;

					getUpdatedAxis = function(axis) {
						var dimension;
						axis = Ext.clone(axis);

						for (var i = 0; i < axis.length; i++) {
							if (axis[i].dimension === objectName) {
								dimension = axis[i];
							}
						}

						if (dimension) {
							Ext.Array.remove(axis, dimension);
						}

						return axis;
					};

					if (xLayout.columns) {
						xLayout.columns = getUpdatedAxis(xLayout.columns);
					}
					if (xLayout.rows) {
						xLayout.rows = getUpdatedAxis(xLayout.rows);
					}
					if (xLayout.filters) {
						xLayout.filters = getUpdatedAxis(xLayout.filters);
					}
				};

                // set items from init/metaData/xLayout
                for (var i = 0, dim, metaDataDim, items; i < dimensions.length; i++) {
                    dim = dimensions[i];
                    dim.items = [];
                    metaDataDim = response.metaData[dim.objectName];

                    if (Ext.isArray(metaDataDim) && metaDataDim.length) {
                        var ids = Ext.clone(response.metaData[dim.dimensionName]);
                        for (var j = 0; j < ids.length; j++) {
                            dim.items.push({
                                id: ids[j],
                                name: response.metaData.names[ids[j]]
                            });
                        }
                    }
                    else {
                        dim.items = Ext.clone(xLayout.objectNameItemsMap[dim.objectName]);
                    }
                }

                // add missing names
                dimensions = Ext.Array.clean([].concat(xLayout.columns || [], xLayout.rows || [], xLayout.filters || []));

                for (var i = 0, idNameMap = response.metaData.names, dimItems; i < dimensions.length; i++) {
                    dimItems = dimensions[i].items;

                    if (Ext.isArray(dimItems) && dimItems.length) {
                        for (var j = 0, item; j < dimItems.length; j++) {
                            item = dimItems[j];

                            if (Ext.isObject(item) && Ext.isString(idNameMap[item.id]) && !Ext.isString(item.name)) {
                                item.name = idNameMap[item.id] || '';
                            }
                        }
                    }
                }

                // remove dimensions from layout that do not exist in response
                for (var i = 0, dimensionName; i < xLayout.axisDimensionNames.length; i++) {
                    dimensionName = xLayout.axisDimensionNames[i];
                    if (!Ext.Array.contains(headerNames, dimensionName)) {
                        removeDimensionFromXLayout(dimensionName);
                    }
                }

                // Add ou hierarchy dimensions
                //if (xOuDimension && xLayout.showHierarchy) {
                    //addOuHierarchyDimensions();
                //}

                // Re-layout
                layout = api.layout.Layout(xLayout);

                if (layout) {
                    return service.layout.getExtendedLayout(layout);
                }

                return null;
			};

			service.layout.getExtendedAxis = function(xLayout, type) {
				var dimensionNames,
					spanType,
					aDimensions = [],
					nAxisWidth = 1,
					nAxisHeight,
					aaUniqueFloorIds,
					aUniqueFloorWidth = [],
					aAccFloorWidth = [],
					aFloorSpan = [],
					aaGuiFloorIds = [],
					aaAllFloorIds = [],
					aCondoId = [],
					aaAllFloorObjects = [],
					uuidObjectMap = {};

				if (type === 'col') {
					dimensionNames = Ext.clone(xLayout.columnDimensionNames);
					spanType = 'colSpan';
				}
				else if (type === 'row') {
					dimensionNames = Ext.clone(xLayout.rowDimensionNames);
					spanType = 'rowSpan';
				}

				if (!(Ext.isArray(dimensionNames) && dimensionNames.length)) {
					return;
				}
	//dimensionNames = ['pe', 'ou'];

				// aDimensions: array of dimension objects with dimensionName property
				for (var i = 0; i < dimensionNames.length; i++) {
					aDimensions.push({
						dimensionName: dimensionNames[i]
					});
				}
	//aDimensions = [{
		//dimensionName: 'pe'
	//}]

				// aaUniqueFloorIds: array of arrays with unique ids for each dimension floor
				aaUniqueFloorIds = function() {
					var a = [];

					for (var i = 0; i < aDimensions.length; i++) {
						a.push(xLayout.dimensionNameIdsMap[aDimensions[i].dimensionName]);
					}

					return a;
				}();
	//aaUniqueFloorIds	= [ [de-id1, de-id2, de-id3],
	//					    [pe-id1],
	//					    [ou-id1, ou-id2, ou-id3, ou-id4] ]

				// nAxisHeight
				nAxisHeight = aaUniqueFloorIds.length;
	//nAxisHeight = 3


				// aUniqueFloorWidth, nAxisWidth, aAccFloorWidth
				for (var i = 0, nUniqueFloorWidth; i < nAxisHeight; i++) {
					nUniqueFloorWidth = aaUniqueFloorIds[i].length;

					aUniqueFloorWidth.push(nUniqueFloorWidth);
					nAxisWidth = nAxisWidth * nUniqueFloorWidth;
					aAccFloorWidth.push(nAxisWidth);
				}
	//aUniqueFloorWidth	= [3, 1, 4]
	//nAxisWidth		= 12 (3 * 1 * 4)
	//aAccFloorWidth	= [3, 3, 12]

				// aFloorSpan
				for (var i = 0; i < nAxisHeight; i++) {
					if (aUniqueFloorWidth[i] === 1) {
						if (i === 0) { // if top floor, set maximum span
							aFloorSpan.push(nAxisWidth);
						}
						else {
							if (xLayout.hideEmptyRows && type === 'row') {
								aFloorSpan.push(nAxisWidth / aAccFloorWidth[i]);
							}
							else { //if just one item and not top level, use same span as top level
								aFloorSpan.push(aFloorSpan[0]);
							}
						}
					}
					else {
						aFloorSpan.push(nAxisWidth / aAccFloorWidth[i]);
					}
				}
	//aFloorSpan = [4, 12, 1]


				// aaGuiFloorIds
				aaGuiFloorIds.push(aaUniqueFloorIds[0]);

				if (nAxisHeight.length > 1) {
					for (var i = 1, a, n; i < nAxisHeight; i++) {
						a = [];
						n = aUniqueFloorWidth[i] === 1 ? aUniqueFloorWidth[0] : aAccFloorWidth[i-1];

						for (var j = 0; j < n; j++) {
							a = a.concat(aaUniqueFloorIds[i]);
						}

						aaGuiFloorIds.push(a);
					}
				}
	//aaGuiFloorIds	= [ [d1, d2, d3], (3)
	//					[p1, p2, p3, p4, p5, p1, p2, p3, p4, p5, p1, p2, p3, p4, p5], (15)
	//					[o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2...] (30)
	//		  	  	  ]

				// aaAllFloorIds
				for (var i = 0, aAllFloorIds, aUniqueFloorIds, span, factor; i < nAxisHeight; i++) {
					aAllFloorIds = [];
					aUniqueFloorIds = aaUniqueFloorIds[i];
					span = aFloorSpan[i];
					factor = nAxisWidth / (span * aUniqueFloorIds.length);

					for (var j = 0; j < factor; j++) {
						for (var k = 0; k < aUniqueFloorIds.length; k++) {
							for (var l = 0; l < span; l++) {
								aAllFloorIds.push(aUniqueFloorIds[k]);
							}
						}
					}

					aaAllFloorIds.push(aAllFloorIds);
				}
	//aaAllFloorIds	= [ [d1, d1, d1, d1, d1, d1, d1, d1, d1, d1, d2, d2, d2, d2, d2, d2, d2, d2, d2, d2, d3, d3, d3, d3, d3, d3, d3, d3, d3, d3], (30)
	//					[p1, p2, p3, p4, p5, p1, p2, p3, p4, p5, p1, p2, p3, p4, p5, p1, p2, p3, p4, p5, p1, p2, p3, p4, p5, p1, p2, p3, p4, p5], (30)
	//					[o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2, o1, o2] (30)
	//		  	  	  ]

				// aCondoId
				for (var i = 0, id; i < nAxisWidth; i++) {
					id = '';

					for (var j = 0; j < nAxisHeight; j++) {
						id += aaAllFloorIds[j][i];
					}

					if (id) {
						aCondoId.push(id);
					}
				}
	//aCondoId = [ id11+id21+id31, id12+id22+id32, ... ]


				// allObjects
				for (var i = 0, allFloor; i < aaAllFloorIds.length; i++) {
					allFloor = [];

					for (var j = 0, obj; j < aaAllFloorIds[i].length; j++) {
						obj = {
							id: aaAllFloorIds[i][j],
							uuid: Ext.data.IdGenerator.get('uuid').generate(),
							dim: i,
							axis: type
						};

						// leaf?
						if (i === aaAllFloorIds.length - 1) {
							obj.leaf = true;
						}

						allFloor.push(obj);
					}

					aaAllFloorObjects.push(allFloor);
				}

				// add span and children
				for (var i = 0, aAboveFloorObjects, doorIds, uniqueDoorIds; i < aaAllFloorObjects.length; i++) {
                    doorIds = [];

					for (var j = 0, obj, doorCount = 0, oldestObj; j < aaAllFloorObjects[i].length; j++) {

						obj = aaAllFloorObjects[i][j];
                        doorIds.push(obj.id);

						if (doorCount === 0) {

							// span
							obj[spanType] = aFloorSpan[i];

							// children
                            if (obj.leaf) {
                                obj.children = 0;
                            }

							// first sibling
							obj.oldest = true;

							// root?
							if (i === 0) {
								obj.root = true;
							}

							// tmp oldest uuid
							oldestObj = obj;
						}

						obj.oldestSibling = oldestObj;

						if (++doorCount === aFloorSpan[i]) {
							doorCount = 0;
						}
					}

                    // set above floor door children to number of unique door ids on this floor
                    if (i > 0) {
                        aAboveFloorObjects = aaAllFloorObjects[i-1];
                        uniqueDoorIds = Ext.Array.unique(doorIds);

                        for (var j = 0; j < aAboveFloorObjects.length; j++) {
                            aAboveFloorObjects[j].children = uniqueDoorIds.length;
                        }
                    }
				}

				// add parents if more than 1 floor
				if (nAxisHeight > 1) {
					for (var i = 1, aAllFloor; i < nAxisHeight; i++) {
						aAllFloor = aaAllFloorObjects[i];

						//for (var j = 0, obj, doorCount = 0, span = aFloorSpan[i - 1], parentObj = aaAllFloorObjects[i - 1][0]; j < aAllFloor.length; j++) {
						for (var j = 0, doorCount = 0, span = aFloorSpan[i - 1]; j < aAllFloor.length; j++) {
							aAllFloor[j].parent = aaAllFloorObjects[i - 1][j];

							//doorCount++;

							//if (doorCount === span) {
								//parentObj = aaAllFloorObjects[i - 1][j + 1];
								//doorCount = 0;
							//}
						}
					}
				}

				// add uuids array to leaves
				if (aaAllFloorObjects.length) {

					// set span to second lowest span number: if aFloorSpan == [15,3,15,1], set span to 3
					var nSpan = nAxisHeight > 1 ? support.prototype.array.sort(Ext.clone(aFloorSpan))[1] : nAxisWidth,
						aAllFloorObjectsLast = aaAllFloorObjects[aaAllFloorObjects.length - 1];

					for (var i = 0, leaf, parentUuids, obj, leafUuids = []; i < aAllFloorObjectsLast.length; i++) {
						leaf = aAllFloorObjectsLast[i];
						leafUuids.push(leaf.uuid);
						parentUuids = [];
						obj = leaf;

						// get the uuid of the oldest sibling
						while (obj.parent) {
							obj = obj.parent;
							parentUuids.push(obj.oldestSibling.uuid);
						}

						// add parent uuids to leaf
						leaf.uuids = Ext.clone(parentUuids);

						// add uuid for all leaves
						if (leafUuids.length === nSpan) {
							for (var j = (i - nSpan) + 1, leaf; j <= i; j++) {
								leaf = aAllFloorObjectsLast[j];
								leaf.uuids = leaf.uuids.concat(leafUuids);
							}

							leafUuids = [];
						}
					}
				}

				// populate uuidObject map
				for (var i = 0; i < aaAllFloorObjects.length; i++) {
					for (var j = 0, object; j < aaAllFloorObjects[i].length; j++) {
						object = aaAllFloorObjects[i][j];

						uuidObjectMap[object.uuid] = object;
					}
				}

				return {
					type: type,
					items: aDimensions,
					xItems: {
						unique: aaUniqueFloorIds,
						gui: aaGuiFloorIds,
						all: aaAllFloorIds
					},
					objects: {
						all: aaAllFloorObjects
					},
					ids: aCondoId,
					span: aFloorSpan,
					dims: nAxisHeight,
					size: nAxisWidth,
					uuidObjectMap: uuidObjectMap
				};
			};

			service.layout.isHierarchy = function(layout, response, id) {
				return layout.showHierarchy && Ext.isObject(response.metaData.ouHierarchy) && response.metaData.ouHierarchy.hasOwnProperty(id);
			};

			service.layout.layout2plugin = function(layout, el) {
				var layout = Ext.clone(layout),
					dimensions = Ext.Array.clean([].concat(layout.columns || [], layout.rows || [], layout.filters || []));

				layout.url = init.contextPath;

				if (el) {
					layout.el = el;
				}

				if (Ext.isString(layout.id)) {
					return {id: layout.id};
				}

				for (var i = 0, dimension, item; i < dimensions.length; i++) {
					dimension = dimensions[i];

					delete dimension.id;
					delete dimension.ids;
					delete dimension.type;
					delete dimension.dimensionName;
					delete dimension.objectName;

					for (var j = 0, item; j < dimension.items.length; j++) {
						item = dimension.items[j];

						delete item.name;
						delete item.code;
						delete item.created;
						delete item.lastUpdated;
						delete item.value;
					}
				}

				if (layout.showRowTotals) {
					delete layout.showRowTotals;
				}

                if (layout.showColTotals) {
					delete layout.showColTotals;
				}

				if (layout.showColSubTotals) {
					delete layout.showColSubTotals;
				}

				if (layout.showRowSubTotals) {
					delete layout.showRowSubTotals;
				}

				if (layout.showDimensionLabels) {
					delete layout.showDimensionLabels;
				}

				if (!layout.hideEmptyRows) {
					delete layout.hideEmptyRows;
				}

				if (!layout.showHierarchy) {
					delete layout.showHierarchy;
				}

				if (layout.displayDensity === 'NORMAL') {
					delete layout.displayDensity;
				}

				if (layout.fontSize === 'NORMAL') {
					delete layout.fontSize;
				}

				if (layout.digitGroupSeparator === 'SPACE') {
					delete layout.digitGroupSeparator;
				}

				if (!layout.legendSet) {
					delete layout.legendSet;
				}

				if (!layout.sorting) {
					delete layout.sorting;
				}

				if (layout.aggregationType === 'DEFAULT') {
					delete layout.aggregationType;
				}

				if (layout.dataApprovalLevel && layout.dataApprovalLevel.id === 'DEFAULT') {
					delete layout.dataApprovalLevel;
				}

				delete layout.parentGraphMap;
				delete layout.reportingPeriod;
				delete layout.organisationUnit;
				delete layout.parentOrganisationUnit;
				delete layout.regression;
				delete layout.cumulative;
				delete layout.sortOrder;
				delete layout.topLimit;

				return layout;
			};

			// response
			service.response = {};

			service.response.getExtendedResponse = function(xLayout, response) {
				var ids = [];

				response = Ext.clone(response);

				response.nameHeaderMap = {};
				response.idValueMap = {};

				// extend headers
				(function() {

					// extend headers: index, ids, size
					for (var i = 0, header; i < response.headers.length; i++) {
						header = response.headers[i];

						// index
						header.index = i;

						if (header.meta) {

							// ids
							header.ids = Ext.clone(xLayout.dimensionNameIdsMap[header.name]) || [];

							// size
							header.size = header.ids.length;

							// collect ids, used by extendMetaData
							ids = ids.concat(header.ids);
						}
					}

					// nameHeaderMap (headerName: header)
					for (var i = 0, header; i < response.headers.length; i++) {
						header = response.headers[i];

						response.nameHeaderMap[header.name] = header;
					}
				}());

				// create value id map
				(function() {
					var valueHeaderIndex = response.nameHeaderMap[conf.finals.dimension.value.value].index,
						coHeader = response.nameHeaderMap[conf.finals.dimension.category.dimensionName],
						dx = dimConf.data.dimensionName,
						co = dimConf.category.dimensionName,
						axisDimensionNames = xLayout.axisDimensionNames,
						idIndexOrder = [];

					// idIndexOrder
					for (var i = 0; i < axisDimensionNames.length; i++) {
						idIndexOrder.push(response.nameHeaderMap[axisDimensionNames[i]].index);

						// If co exists in response and is not added in layout, add co after dx
						if (coHeader && !Ext.Array.contains(axisDimensionNames, co) && axisDimensionNames[i] === dx) {
							idIndexOrder.push(coHeader.index);
						}
					}

					// idValueMap
					for (var i = 0, row, id; i < response.rows.length; i++) {
						row = response.rows[i];
						id = '';

						for (var j = 0, index; j < idIndexOrder.length; j++) {
							index = idIndexOrder[j];

							//id += response.headers[index].name === co ? '.' : '';
							id += row[index];
						}

						response.idValueMap[id] = row[valueHeaderIndex];
					}
				}());

				return response;
			};

            service.response.addOuHierarchyDimensions = function(response) {
                var headers = response.headers,
                    ouHierarchy = response.metaData.ouHierarchy,
                    rows = response.rows,
                    ouIndex,
                    numLevels = 0,
                    initArray = [],
                    newHeaders = [],
                    a;

                if (!ouHierarchy) {
                    return;
                }

                // get ou index
                for (var i = 0; i < headers.length; i++) {
                    if (headers[i].name === 'ou') {
                        ouIndex = i;
                        break;
                    }
                }

                // get numLevels
                for (var i = 0; i < rows.length; i++) {
                    numLevels = Math.max(numLevels, Ext.Array.clean(ouHierarchy[rows[i][ouIndex]].split('/')).length);
                }

                // init array
                for (var i = 0; i < numLevels; i++) {
                    initArray.push('');
                }

                // extend rows
                for (var i = 0, row, ouArray; i < rows.length; i++) {
                    row = rows[i];
                    ouArray = Ext.applyIf(Ext.Array.clean(ouHierarchy[row[ouIndex]].split('/')), Ext.clone(initArray));

                    Ext.Array.insert(row, ouIndex, ouArray);
                }

                // create new headers
                for (var i = 0; i < numLevels; i++) {
                    newHeaders.push({
                        column: 'Organisation unit',
                        hidden: false,
                        meta: true,
                        name: 'ou',
                        type: 'java.lang.String'
                    });
                }

                Ext.Array.insert(headers, ouIndex, newHeaders);

                return response;
            };

            service.response.getValue = function(str) {
				var n = parseFloat(str);

                if (Ext.isBoolean(str)) {
                    return 1;
                }

                // return string if
                // - parsefloat(string) is not a number
                // - string is just starting with a number
                // - string is a valid date
				//if (!Ext.isNumber(n) || n != str || new Date(str).toString() !== 'Invalid Date') {
				if (!Ext.isNumber(n) || n != str) {
					return 0;
				}

                return n;
			};
        }());

		// web
		(function() {

			// mask
			web.mask = {};

			web.mask.show = function(component, message) {
				if (!Ext.isObject(component)) {
					console.log('support.gui.mask.show: component not an object');
					return null;
				}

				message = message || 'Loading..';

				if (component.mask && component.mask.destroy) {
					component.mask.destroy();
					component.mask = null;
				}

				component.mask = new Ext.create('Ext.LoadMask', component, {
					shadow: false,
					msg: message,
					style: 'box-shadow:0',
					bodyStyle: 'box-shadow:0'
				});

				component.mask.show();
			};

			web.mask.hide = function(component) {
				if (!Ext.isObject(component)) {
					console.log('support.gui.mask.hide: component not an object');
					return null;
				}

				if (component.mask && component.mask.destroy) {
					component.mask.destroy();
					component.mask = null;
				}
			};

			// window
			web.window = web.window || {};

			web.window.setAnchorPosition = function(w, target) {
				var vpw = app.getViewportWidth(),
					targetx = target ? target.getPosition()[0] : 4,
					winw = w.getWidth(),
					y = target ? target.getPosition()[1] + target.getHeight() + 4 : 33;

				if ((targetx + winw) > vpw) {
					w.setPosition((vpw - winw - 2), y);
				}
				else {
					w.setPosition(targetx, y);
				}
			};

			web.window.addHideOnBlurHandler = function(w) {
				var el = Ext.get(Ext.query('.x-mask')[0]);

				el.on('click', function() {
					if (w.hideOnBlur) {
						w.hide();
					}
				});

				w.hasHideOnBlurHandler = true;
			};

			web.window.addDestroyOnBlurHandler = function(w) {
				var maskElements = Ext.query('.x-mask'),
                    el = Ext.get(maskElements[0]);

				el.on('click', function() {
					if (w.destroyOnBlur) {
						w.destroy();
					}
				});

				w.hasDestroyOnBlurHandler = true;
			};

			// message
			web.message = {};

			web.message.alert = function(obj) {
                var config = {},
                    type,
                    window;

                if (!obj || (Ext.isObject(obj) && !obj.message && !obj.responseText)) {
                    return;
                }

                // if response object
                if (Ext.isObject(obj) && obj.responseText && !obj.message) {
                    obj = Ext.decode(obj.responseText);
                }

                // if string
                if (Ext.isString(obj)) {
                    obj = {
                        status: 'ERROR',
                        message: obj
                    };
                }

                // web message
                type = (obj.status || 'INFO').toLowerCase();

				config.title = obj.status;
				config.iconCls = 'ns-window-title-messagebox ' + type;

                // html
                config.html = '';
                config.html += obj.httpStatusCode ? 'Code: ' + obj.httpStatusCode + '<br>' : '';
                config.html += obj.httpStatus ? 'Status: ' + obj.httpStatus + '<br><br>' : '';
                config.html += obj.message + (obj.message.substr(obj.message.length - 1) === '.' ? '' : '.');

                // bodyStyle
                config.bodyStyle = 'padding: 12px; background: #fff; max-width: 600px; max-height: ' + app.getCenterRegionHeight() / 2 + 'px';

                // destroy handler
                config.modal = true;
                config.destroyOnBlur = true;

                // listeners
                config.listeners = {
                    show: function(w) {
                        w.setPosition(w.getPosition()[0], w.getPosition()[1] / 2);

						if (!w.hasDestroyOnBlurHandler) {
							web.window.addDestroyOnBlurHandler(w);
						}
                    }
                };

                window = Ext.create('Ext.window.Window', config);

                window.show();
            };

			// analytics
			web.analytics = {};

			web.analytics.getParamString = function(xLayout, isSorted) {
				var axisDimensionNames = isSorted ? xLayout.sortedAxisDimensionNames : xLayout.axisDimensionNames,
					filterDimensions = isSorted ? xLayout.sortedFilterDimensions : xLayout.filterDimensions,
					dimensionNameIdsMap = isSorted ? xLayout.dimensionNameSortedIdsMap : xLayout.dimensionNameIdsMap,
					paramString = '?',
					addCategoryDimension = false,
					map = xLayout.dimensionNameItemsMap,
					dx = dimConf.indicator.dimensionName,
					co = dimConf.category.dimensionName,
                    aggTypes = ['COUNT', 'SUM', 'STDDEV', 'VARIANCE', 'MIN', 'MAX'],
                    displayProperty = xLayout.displayProperty || init.userAccount.settings.keyAnalysisDisplayProperty || 'name';

				for (var i = 0, dimName, items; i < axisDimensionNames.length; i++) {
					dimName = axisDimensionNames[i];

					paramString += 'dimension=' + dimName;

					items = Ext.clone(dimensionNameIdsMap[dimName]);

					if (dimName === dx) {
						items = Ext.Array.unique(items);
					}

					if (dimName !== co) {
						paramString += ':' + items.join(';');
					}

					if (i < (axisDimensionNames.length - 1)) {
						paramString += '&';
					}
				}

				if (addCategoryDimension) {
					paramString += '&dimension=' + conf.finals.dimension.category.dimensionName;
				}

				if (Ext.isArray(filterDimensions) && filterDimensions.length) {
					for (var i = 0, dim; i < filterDimensions.length; i++) {
						dim = filterDimensions[i];

						paramString += '&filter=' + dim.dimensionName + ':' + dim.ids.join(';');
					}
				}

				if (xLayout.showHierarchy) {
					paramString += '&hierarchyMeta=true';
				}

				// aggregation type
				if (Ext.Array.contains(aggTypes, xLayout.aggregationType)) {
					paramString += '&aggregationType=' + xLayout.aggregationType;
				}

                // display property
                paramString += '&displayProperty=' + displayProperty.toUpperCase();

                // user org unit
                if (Ext.isArray(xLayout.userOrgUnit) && xLayout.userOrgUnit.length) {
                    paramString += '&userOrgUnit=';

                    for (var i = 0; i < xLayout.userOrgUnit.length; i++) {
                        paramString += xLayout.userOrgUnit[i] + (i < xLayout.userOrgUnit.length - 1 ? ';' : '');
                    }
				}

				// data approval level
				if (Ext.isObject(xLayout.dataApprovalLevel) && Ext.isString(xLayout.dataApprovalLevel.id) && xLayout.dataApprovalLevel.id !== 'DEFAULT') {
					paramString += '&approvalLevel=' + xLayout.dataApprovalLevel.id;
				}

                // TODO program
                if (xLayout.program && xLayout.program.id) {
                    paramString += '&program=' + xLayout.program.id;
                }

                // relative period date
                if (xLayout.relativePeriodDate) {
                    paramString += '&relativePeriodDate=' + xLayout.relativePeriodDate;
                }

				return paramString.replace(/#/g, '.');
			};

			web.analytics.validateUrl = function(url) {
				var msg;

                if (Ext.isIE) {
                    msg = 'Too many items selected (url has ' + url.length + ' characters). Internet Explorer accepts maximum 2048 characters.';
                }
                else {
					var len = url.length > 8000 ? '8000' : (url.length > 4000 ? '4000' : '2000');
					msg = 'Too many items selected (url has ' + url.length + ' characters). Please reduce to less than ' + len + ' characters.';
                }

                msg += '\n\n' + 'Hint: A good way to reduce the number of items is to use relative periods and level/group organisation unit selection modes.';

                webAlert(msg, 'warning');
			};

			// pivot
			web.report = {};

			web.report.getHtml = function(layout, fCallback) {
                var data,
                    aInReqIds = [],
                    aInReqItems = [],
                    aDeReqIds = [],
                    aDeReqItems = [],
                    aDsReqIds = [],
                    aDsReqItems = [],
                    aDxReqIds = [],
                    aPeReqIds = [],
                    aOuReqIds = [],
                    oDimNameReqItemArrayMap = {},
                    sInName = 'indicator',
                    sDeName = 'dataElement',
                    sDsName = 'dataSet';

                oDimNameReqItemArrayMap[dimConf.period.dimensionName] = aPeReqIds;
                oDimNameReqItemArrayMap[dimConf.organisationUnit.dimensionName] = aOuReqIds;

                // columns (data)
                (function() {
                    var ddi = layout.dataDimensionItems,
                        dimMap = {};

                    dimMap[sInName] = aInReqIds;
                    dimMap[sDeName] = aDeReqIds;
                    dimMap[sDsName] = aDsReqIds;

                    // add objects to corresponding array
                    if (Ext.isArray(ddi) && ddi.length) {
                        for (var i = 0, obj; i < ddi.length; i++) {
                            obj = ddi[i];

                            for (var j = 0, names = [sInName, sDeName, sDsName]; j < names.length; j++) {
                                name = names[j];

                                if (obj.hasOwnProperty(name) && Ext.isObject(obj[name])) {
                                    dimMap[name].push(obj[name].id);
                                }
                            }
                        }
                    }
                })();

                // rows
                if (Ext.isArray(layout.rows)) {
                    for (var i = 0, dim; i < layout.rows.length; i++) {
                        dim = layout.rows[i];

                        for (var j = 0, item; j < dim.items.length; j++) {
                            item = dim.items[j];

                            oDimNameReqItemArrayMap[dim.dimension].push(item.id);
                        }
                    }
                }

                // meta data
                var nRank = 1,
                    nOuHierarchyOffSet = 0,
                    aDxName = [],
                    aDxShort = [],
                    aNumFormula = [],
                    aNumFormulaItems = [],
                    aNumDescription = [],
                    aDenomFormula = [],
                    aDenomFormulaItems = [],
                    aDenomDescription = [],
                    aTypeName = [],
                    aDxGroupName = [],
                    aDxIsIndicator = [],
                    aDxLegendSet = [],
                    nLgIncr = 0,
                    sDxUniqueId = '',
                    sLookupSubElements = '',
                    sNums = '',
                    sDenoms = '',
                    getIndicators,
                    getDataElements,
                    getDataSets,
                    getData,
                    getTable,
                    idDataObjectMap = {};

                getIndicators = function() {
                    if (!aInReqIds.length) {
                        getDataElements();
                        return;
                    }

                    $.ajax({
                        url: init.contextPath + '/api/indicators.json?paging=false&filter=id:in:[' + aInReqIds.join(',') + ']&fields=id,name,displayName,displayShortName,description,indicatorType,annualized,indicatorGroups[id,name],numerator,numeratorDescription,denominator,denominatorDescription,legendSet[name,legends[name,startValue,endValue,color]]',
                        headers: {'Authorization': 'Basic ' + btoa(appConfig.username + ':' + appConfig.password)}
                    }).done(function(r) {
                        if (r.indicators) {
                            for (var i = 0, obj; i < r.indicators.length; i++) {
                                obj = new api.data.DataObject(r.indicators[i], sInName);

                                idDataObjectMap[obj.id] = obj;
                                aInReqItems.push(obj);
                            }
                        }

                        getDataElements();
                    });
                };

                getDataElements = function() {
                    if (!aDeReqIds.length) {
                        //getDataSets();
                        getData();
                        return;
                    }

                    $.ajax({
                        url: init.contextPath + '/api/dataElements.json?paging=false&filter=id:in:[' + aDeReqIds.join(',') + ']&fields=id,name,displayName,displayShortName,description,aggregationType,dataElementGroups[id,name],numerator,numeratorDescription,denominator,denominatorDescription,legendSet[name,legends[name,startValue,endValue,color]]',
                        headers: {'Authorization': 'Basic ' + btoa(appConfig.username + ':' + appConfig.password)}
                    }).done(function(r) {
                        if (r.dataElements) {
                            for (var i = 0, obj; i < r.dataElements.length; i++) {
                                obj = new api.data.DataObject(r.dataElements[i], sDeName);

                                idDataObjectMap[obj.id] = obj;
                                aDeReqItems.push(obj);
                            }
                        }

                        getData();
                    });
                };

                getDataSets = function() {
                    if (!aDsReqIds.length) {
                        getData();
                        return;
                    }

                    $.ajax({
                        url: init.contextPath + '/api/dataSets.json?paging=false&filter=id:in:[' + aDsReqIds.join(',') + ']&fields=id,name,displayName,displayShortName,valueType,dataSetGroups[name],numerator,numeratorDescription,denominator,denominatorDescription,legendSet[name,legends[name,startValue,endValue,color]]',
                        headers: {'Authorization': 'Basic ' + btoa(appConfig.username + ':' + appConfig.password)}
                    }).done(function(r) {
                        aDsReqItems = r.dataSets;
                        support.prototype.array.addObjectProperty(aDsReqItems, 'type', sDsName);
                        getData();
                    });
                };

                getData = function() {
                    var aDxReqItems = [].concat(aInReqItems || [], aDeReqItems || [], aDsReqItems || []);
                    aDxReqIds = [].concat(aInReqIds || [], aDeReqIds || [], aDsReqIds || []);

                    for (var i = 0, oDxItem; i < aDxReqItems.length; i++) {
                        oDxItem = aDxReqItems[i];
                        sDxUniqueId += (oDxItem.id + ';');
                        aDxIsIndicator[i] = oDxItem.isIndicator ? 1 : 0;
                        aDxName[i] = oDxItem.displayName;
                        aDxShort[i] = oDxItem.displayShortName;
                        aNumFormula[i] = oDxItem.numerator;
                        aNumDescription[i] = oDxItem.numeratorDescription;
                        aDenomFormula[i] = oDxItem.denominator;
                        aDenomDescription[i] = oDxItem.denominatorDescription;
                        aTypeName[i] = oDxItem.indicatorType ? oDxItem.indicatorType.name : ''; //todo
                        aDxGroupName[i] = (oDxItem.indicatorGroups && oDxItem.indicatorGroups.length) ? oDxItem.indicatorGroups[0].name : ''; //todo
                        aDxLegendSet[i] = [];

                        if (oDxItem.legendSet) {
                            for (var p = 0; p < oDxItem.legendSet.legends.length; p++) {
                                var sLegendSet = (oDxItem.legendSet.legends[p].name + ';' + oDxItem.legendSet.legends[p].color + ';' + oDxItem.legendSet.legends[p].startValue + ';' + oDxItem.legendSet.legends[p].endValue);
                                aDxLegendSet[i][nLgIncr] = sLegendSet;
                                nLgIncr += 1;
                            }
                        }

                        if (aNumFormula[i]) {
                            var sNumItems = '';
                            if (aNumFormula[i].indexOf('{') != 0) {
                                var aNumTmpOuter = aNumFormula[i].split('{');
                                for (var p = 1; p < aNumTmpOuter.length; p++)
                                {
                                    var aNumTmpInner = aNumTmpOuter[p].split('}');
                                    // if current UID not already listed in 'known lookup uids'
                                    if (sLookupSubElements.indexOf(aNumTmpInner[0] + ';') < 0) {
                                        sLookupSubElements += (aNumTmpInner[0]+';');
                                        sNumItems += (aNumTmpInner[0]+';');
                                    }
                                }
                            }
                            aNumFormulaItems[i] = sNumItems;
                        }

                        if (aDenomFormula[i]) {
                            var sDenomItems = '';
                            if (aDenomFormula[i].indexOf('{') != 0){
                                var aDenomTmpOuter = aDenomFormula[i].split('{');
                                for (var p = 1; p < aDenomTmpOuter.length; p++) {
                                    var aDenomTmpInner = aDenomTmpOuter[p].split('}');
                                    // if current UID not already listed in 'known lookup uids'
                                    sDenomItems += (aDenomTmpInner[0] + ';');
                                    if (sLookupSubElements.indexOf(aDenomTmpInner[0] + ';') < 0) {
                                        sLookupSubElements += (aDenomTmpInner[0] + ';');
                                    }
                                }
                            }
                            aDenomFormulaItems[i] = sDenomItems;
                        }
                    }

                    // analytics

                    $.ajax({
                        url: init.contextPath + '/api/analytics.json?dimension=pe:' + aPeReqIds.join(';') + '&dimension=dx:' + sLookupSubElements + aDxReqIds.join(';') + '&dimension=ou:' + aOuReqIds.join(';') + '&hierarchyMeta=true&displayProperty=NAME&showHierarchy=true',
                        headers: {'Authorization': 'Basic ' + btoa(appConfig.username + ':' + appConfig.password)}
                    }).done(function(analyticsData) {
                        getTable(analyticsData);
                    });
                };

                getTable = function(analyticsData) {
                    var response = new api.data.Response(analyticsData),
                        aDxResIds = aDxReqIds,
                        aPeResIds = response.metaData.pe,
                        aOuResIds = response.metaData.ou,
                        idCombinations = response.generateIdCombinations(aDxResIds, aPeResIds, aOuResIds),
                        tableHeaders = [],
                        tableRows = [],
                        maxOuLevel = response.getMaxLevel(),
                        minOuLevel = response.getMinLevel(),
                        startOuLevel = layout.showHierarchy ? (maxOuLevel > 1 ? 1 : 0) : minOuLevel - 1;

                    response.generateIdValueMap();

                    // table headers

                    (function() {
                        var index = 0;

                        // ou headers
                        (function() {
                            for (var level; startOuLevel < maxOuLevel; startOuLevel++) {
                                level = Ext.clone(init.organisationUnitLevels[startOuLevel]);
                                level.objectName = 'ou';
                                level.cls = 'pivot-dim';
                                level.index = index++;

                                tableHeaders.push(new api.data.TableHeader(level));
                            }
                        })();

                        // pe headers
                        tableHeaders.push(new api.data.TableHeader({
                            id: 'pe-type',
                            name: 'Period type',
                            objectName: 'pe',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'pe-year',
                            name: 'Year',
                            objectName: 'pe',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'pe',
                            name: 'Period',
                            objectName: 'pe',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        // dx headers
                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx-group',
                            name: 'Data group',
                            objectName: 'dx',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx',
                            name: 'Data',
                            objectName: 'dx',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        if (layout.showDataDescription) {
                            tableHeaders.push(new api.data.TableHeader({
                                id: 'dx-datatype',
                                name: 'Data type',
                                objectName: 'dx',
                                cls: 'pivot-dim'
                            }));
                        }

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx-type',
                            name: 'Type',
                            objectName: 'dx',
                            cls: 'pivot-dim'
                        }));

                        if (layout.showDataDescription) {
                            tableHeaders.push(new api.data.TableHeader({
                                id: 'dx-description',
                                name: 'Description',
                                objectName: 'dx',
                                cls: 'pivot-dim'
                            }));
                        }

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx-numerator',
                            name: 'Numerator',
                            objectName: 'dx',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx-denominator',
                            name: 'Denominator',
                            objectName: 'dx',
                            cls: 'pivot-dim',
                            index: index++
                        }));

                        tableHeaders.push(new api.data.TableHeader({
                            id: 'dx-value',
                            name: 'Value',
                            objectName: 'dx',
                            cls: 'pivot-dim',
                            index: index++
                        }));
                    })();

                    // table rows

                    (function() {

                        for (var i = 0, idComb, dxId, peId, ouId, row, dataObject, allOuSortId, numeratorTotal, denominatorTotal, period, orgUnit, value; i < idCombinations.length; i++) {
                            idComb = idCombinations[i];
                            dxId = response.getIdByIdComb(idComb, 'dx');
                            peId = response.getIdByIdComb(idComb, 'pe');
                            ouId = response.getIdByIdComb(idComb, 'ou');

                            // data object
                            dataObject = idDataObjectMap[dxId];
                            numeratorTotal = response.getNumeratorTotal(idComb, dataObject);
                            denominatorTotal = response.getDenominatorTotal(idComb, dataObject);

                            if (response.isHideRow(dataObject, layout, numeratorTotal, denominatorTotal)) {
                                continue;
                            }

                            // period
                            period = new api.data.Period({
                                id: peId,
                                name: response.getNameById(peId)
                            });

                            period.generateDisplayProperties();

                            // organisation unit
                            orgUnit = new api.data.OrganisationUnit({
                                id: ouId,
                                name: response.getNameById(ouId),
                                level: response.getLevelById(ouId),
                                metaData: response.metaData
                            });

                            allOuSortId = orgUnit.getParentNameByLevel(startOuLevel);

                            // value
                            value = response.getValueByIdComb(idComb);

                            // row
                            row = new api.data.TableRow({
                                dataObject: dataObject,
                                period: period,
                                organisationUnit: orgUnit
                            });

                            // create rows
                            for (var j = 0, th, ouSortId; j < tableHeaders.length; j++) {
                                th = tableHeaders[j];
                                ouSortId = orgUnit.getSortIdByLevel(th.level);

                                // ou
                                if (th.objectName === 'ou') {
                                    row.addCell(th.id, new api.data.TableCell.Ou(th.level > orgUnit.level ? {
                                        isEmpty: true
                                    } : {
                                        name: orgUnit.getParentNameByLevel(th.level),
                                        sortId: ouSortId + period.typeSortId + period.sortId + dataObject.groupName + dataObject.name,
                                        cls: 'pivot-value clickable',
                                        level: th.level,
                                        organisationUnit: orgUnit
                                    }));
                                }

                                // pe
                                else if (th.objectName === 'pe') {
                                    if (th.id === 'pe-type') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: period.typeName,
                                            sortId: period.typeSortId + period.sortId + dataObject.groupName + dataObject.name + allOuSortId,
                                            cls: 'pivot-value td-nobreak'
                                        }));
                                    }

                                    if (th.id === 'pe-year') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: period.year,
                                            sortId: period.year + period.typeSortId + period.sortId + dataObject.groupName + dataObject.name + allOuSortId,
                                            cls: 'pivot-value'
                                        }));
                                    }

                                    else if (th.id === 'pe') {
                                        row.addCell(th.id, new api.data.TableCell.Pe({
                                            name: period.displayName,
                                            sortId: period.typeSortId + period.sortId + dataObject.groupName + dataObject.name + allOuSortId,
                                            cls: 'pivot-value clickable',
                                            period: period
                                        }));
                                    }
                                }

                                // dx
                                else if (th.objectName === 'dx') {

                                    if (th.id === 'dx-group') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: dataObject.groupName,
                                            sortId: dataObject.groupName + dataObject.name + allOuSortId + period.typeSortId + period.sortId,
                                            cls: 'pivot-value'
                                        }));
                                    }
                                    else if (th.id === 'dx') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: dataObject.name,
                                            sortId: dataObject.name + allOuSortId + period.typeSortId + period.sortId,
                                            cls: 'pivot-value'
                                        }));
                                    }
                                    else if (th.id === 'dx-datatype') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: dataObject.dataTypeDisplayName,
                                            sortId: dataObject.dataTypeSortId + dataObject.groupName + dataObject.name + allOuSortId + period.typeSortId + period.sortId,
                                            cls: 'pivot-value'
                                        }));
                                    }
                                    else if (th.id === 'dx-type') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: dataObject.typeName,
                                            sortId: dataObject.typeName + dataObject.groupName + dataObject.name + allOuSortId + period.typeSortId + period.sortId,
                                            cls: 'pivot-value' + (dataObject.type.length === 1 ? ' td-nobreak' : '')
                                        }));
                                    }
                                    else if (th.id === 'dx-description') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: dataObject.description,
                                            sortId: dataObject.description + dataObject.groupName + dataObject.name + allOuSortId + period.typeSortId + period.sortId,
                                            cls: 'pivot-value'
                                        }));
                                    }
                                    else if (th.id === 'dx-numerator') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: Ext.isNumeric(numeratorTotal) ? parseFloat(numeratorTotal) : '',
                                            sortId: Ext.isNumeric(numeratorTotal) ? parseFloat(numeratorTotal) : 0,
                                            cls: 'pivot-value align-right'
                                        }));
                                    }
                                    else if (th.id === 'dx-denominator') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: denominatorTotal || '',
                                            sortId: denominatorTotal || 0,
                                            cls: 'pivot-value align-right' + (dataObject.isDataElement ? ' dataelementdenom' : '')
                                        }));
                                    }
                                    else if (th.id === 'dx-value') {
                                        row.addCell(th.id, new api.data.TableCell({
                                            name: value || '',
                                            sortId: parseFloat(value) || 0,
                                            cls: 'pivot-value align-right',
                                            style: 'background-color:' + dataObject.getBgColorByValue(parseFloat(value))
                                        }));
                                    }
                                }
                            }

                            tableRows.push(row);
                        }
                    })();

                    table = new api.data.Table({
                        tableHeaders: tableHeaders,
                        tableRows: tableRows
                    });

                    table.addOptionsCls(layout);
                    table.sortData();

                    if (fCallback) {
                        fCallback(table);
                    }

                    if (NS.isDebug) {
                        console.log('response', response);
                    }
                };

                getIndicators();
            };
        }());

		// extend init
		(function() {

			// sort and extend dynamic dimensions
			if (Ext.isArray(init.dimensions)) {
				support.prototype.array.sort(init.dimensions);

				for (var i = 0, dim; i < init.dimensions.length; i++) {
					dim = init.dimensions[i];
					dim.dimensionName = dim.id;
					dim.objectName = conf.finals.dimension.dimension.objectName;
					conf.finals.dimension.objectNameMap[dim.id] = dim;
				}
			}

			// sort ouc
			if (init.user && init.user.ouc) {
				support.prototype.array.sort(init.user.ouc);
			}

			// legend set map
			init.idLegendSetMap = {};

			for (var i = 0, set; i < init.legendSets.length; i++) {
				set = init.legendSets[i];
				init.idLegendSetMap[set.id] = set;
			}
		}());

		// alert
		webAlert = web.message.alert;

		return {
            init: init,
            conf: conf,
            api: api,
            support: support,
            service: service,
            web: web,
            app: app,
            webAlert: webAlert
        };
	};
});
