document.write("<link rel="
stylesheet
" href=" / js / easyui1
.5 / themes / icon.css
" type="
text / css
">"
)
document.write("<link rel="
stylesheet
" href=" / js / easyui1
.5 / themes /
default
/easyui.css" type="text/
css
">"
)
document.write("<script type="
text / javascript
" src=" / js / jquery - 2.1
.1.min.js
"></script>"
)
document.write("<script  type="
text / javascript
" src=" / js / easyui1
.5 / jquery.easyui.min.js
"></script>"
)

window.onload = function () {
    selectTree();
}

function gotoJsp(url) {
    return "<iframe scrolling="
    auto
    " frameborder="
    0
    "  src=" + url + " style="
    width:100 %;
    height:100 %;
    "></iframe>";
}

function selectTree() {
    $("#tree1").tree({
        url: "/tree/queryTree",
        onClick: function (node) {
            if (node.url != null) {
                if ($("#centers").tabs("exists", node.text)) {
                    $("#centers").tabs("select", node.text);
                } else {
                    $("#centers").tabs("add", {
                        title: node.text,
                        content: gotoJsp(node.url),
                        closable: true,
                        tools: [{
                            iconCls: "icon-mini-refresh",
                            handler: function () {
                                var pp = $("#centers").tabs("getSelected");
                                var content = pp.panel("options").content;
                                $("#centers").tabs("update", {
                                    tab: pp,
                                    options: content
                                });
                            }
                        }]
                    });
                }
            }
        }
    });
}
