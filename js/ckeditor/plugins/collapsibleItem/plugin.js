function getCollapsibleItem() {
    var collapsibleItem =
        '<div class="card">' +
        '   <div class="card-header" id="heading1">' +
        '       <h4 class="card-title" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">Title Text</h4>' +
        '   </div>' +
        '   <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordionPolicies">' +
        '       <div class="card-body">Body Text</div>' +
        '   </div>' +
        '</div>';
    return collapsibleItem;
}

CKEDITOR.dtd.$editable.a = 1;

CKEDITOR.plugins.add('collapsibleItem', {
    requires: 'widget',
    icons: 'collapsibleitem',
    hidpi: true,
    init: function (editor) {
        editor.widgets.add('collapsibleItem', {
            button: 'Insert Collapsible Item',
            template: getCollapsibleItem(),
            editables: {
                title: {
                    selector: '.card-title',
                    allowedContent: 'span strong em u;*{color}'
                },
                content: {
                    selector: '.card-body',
                    allowedContent: 'p;br;span(*)[*];ul;ol;li;strong;em;u;table(*)[*];tbody;thead;tr;td;th;hr;a;a[*];a(*)[*];img(*)[*];'
                }
            },
            allowedContent: 'div(!collapsible-item*,panel*,collapse)[*];h4(!collapsible-item*,panel*)[*];a(!collapsible-item*,collapsed,panel*)[*];span(!glyphicon*)[*];',
            requiredContent: 'div(collapsible-item);',
            upcast: function (element) {
                return element.name == 'div' && element.hasClass('card');
            },
            init: function () {
                //called when widget instance is created
                var accordionid = "";
                if(editor.elementPath() != null) {
                    var parents = editor.elementPath().elements;
                    for (var i = 0; i < parents.length; i++) {
                        if (parents[i].hasClass('accordion-default')) {
                            accordionid = parents[i].getId();
                            break;
                        }
                    }
                }
                if(accordionid == ""){
                    var parents = this.element.getParents();
                    for(var i = 0 ; i < parents.length ; i++){
                        if(parents[i].hasClass('accordion-default')){
                            accordionid = parents[i].getId();
                            break;
                        }
                    }
                }
                var uniqueIdentifier = [
                    (new Date()).getTime(),
                    Math.floor(Math.random() * (1e6 - 1e5 - 1)) + 1e5
                ].join('_');
                this.setData('accordionId', accordionid);
                this.setData('itemId', 'Collapsible-' + uniqueIdentifier);
            },
            data: function () {
                //called whenever the data is updated
//                this.element.setAttribute('id', this.data.itemId);

                var heading = this.element.find('.card-header').$[0];
                heading.setAttribute('id', 'heading-' + this.data.itemId);

                var itemLink = this.element.find('.collapsible-item-title-link').$[0];
                var itemIconLink = this.element.find('.collapsible-item-title-link-icon').$[0];
                var newLink = '#collapse' + this.data.itemId;
                
                heading.children[0].setAttribute('data-target', '#collapse-' + this.data.itemId);
                heading.children[0].setAttribute('aria-controls', 'collapse-' + this.data.itemId);
                

                if(this.data.accordionId != "") {
                    this.element.find('.collapse').$[0].setAttribute('data-parent', "#" + this.data.accordionId);
                } else {
                    this.element.find('.collapse').$[0].removeAttribute('data-parent');
                }

                this.element.find('.collapse').$[0].setAttribute('id', 'collapse-' + this.data.itemId);
                this.element.find('.collapse').$[0].setAttribute('aria-labelledby', 'heading-' + this.data.itemId);
            },
        });
    },

    onLoad: function () {
        CKEDITOR.addCss(
            '.card-title { display: block; }' +
            '.card::before {font-size:10px;color:#000;content: "Collapsible Element"}' +
            '.card-header {background-color:#f4f8ef;color:#72b73a;text-decoration:none;font-size:20px;} ' +
            '.collapse {display:block;background-color:#ddd;min-height:10px;} ' +
            '.card {padding: 8px;margin: 10px;background: #eee;border-radius: 8px;border: 1px solid #ddd;box-shadow: 0 1px 1px #fff inset, 0 -1px 0px #ccc inset;}' +
            '.card-title, .card-body {box-shadow: 0 1px 1px #ddd inset;border: 1px solid #cccccc;border-radius: 5px;background: #fff;}' +
            '.card-title {margin: 0 0 8px;padding: 5px 8px;}' +
            '.card-body {padding: 0 8px;}'
        );
    }
});
