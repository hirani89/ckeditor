CKEDITOR.plugins.add('accordionList', {
    requires: 'widget,collapsibleItem',
    icons: 'accordionlist',
    hidpi: true,
    init: function (editor) {
        editor.widgets.add('accordionList', {
            button: 'Insert a new Accordion List',
            template: '<div class="accordion accordion-default" id="unknown" aria-multiselectable="true"></div>',
            editables: {
                content: {
                    selector: 'div.accordion',
                    allowedContent: 'div(!collaps*,card*,collapse)[*];h4(!collap*,card*)[*];a(!collap*,card*,collapsed,pull-right*)[*];p;br;ul;ol;li;strong;em;u;table[*];tbody;theader;tr;td;th;hr;a;a(*)[*];span(*)[*];img(*)[*]'
                }
            },
            allowedContent: 'div(!accordion*)[*];',
            requiredContent: 'div(accordion)',
            upcast: function (element) {
                return element.name == 'div' && element.hasClass('accordion');
            },
            init: function () {
                var idPrefix = 'accordion-';

                this.setData('accordionId', idPrefix + (new Date()).getTime());

                var editable = this.editables.content;
                var editorForElement = editable.editor;

                editable.enterMode = 2;
                editorForElement.setActiveEnterMode(CKEDITOR.ENTER_BR, CKEDITOR.ENTER_BR);

                //prevent entering any data via keyboard, since we only want nested widgets in here
                editable.on('keydown', function (event) {
                    console.log("down",event);
                    if(event.data.$.target.id.indexOf(idPrefix) == 0){
                        event.data.$.preventDefault();
                        event.data.$.stopPropagation();
                    }
                });
            },
            data: function () {
                //called whenever the data is updated
                var accordionElement = this.element;

                if(accordionElement.getAttribute('id') == 'unknown'){
                    accordionElement.setAttribute('id', this.data.accordionId);
                }
            },
        });
    },
    onLoad: function () {
        CKEDITOR.addCss(
            '.accordion::before {font-size:10px;color:#000;content: "Collapsible Container"} ' +
            '.accordion {padding: 8px;background: #eee;border-radius: 8px;border: 1px solid #ddd;box-shadow: 0 1px 1px #fff inset, 0 -1px 0px #ccc inset;}' +
            '.accordion-list-items {padding: 0 8px;box-shadow: 0 1px 1px #ddd inset;border: 1px solid #cccccc;border-radius: 5px;background: #fff;}' +
            '.accordion-list-items::before {font-size:14px;color:#ccc;content: "Insert collapsible items here"; position:relative;} '
        );
    }
});
