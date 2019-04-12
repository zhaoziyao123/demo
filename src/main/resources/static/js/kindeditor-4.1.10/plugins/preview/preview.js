/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin("preview", function (K) {
    var self = this, name = "preview", undefined;
    self.clickToolbar(name, function () {
        var lang = self.lang(name + "."),
            html = "<div style="
        padding:10
        px
        20
        px;
        ">" +
        "<iframe class="
        ke - textarea
        " frameborder="
        0
        " style="
        width:708
        px;
        height:400
        px;
        "></iframe>" +
        "</div>",
            dialog = self.createDialog({
                name: name,
                width: 750,
                title: self.lang(name),
                body: html
            }),
            iframe = K("iframe", dialog.div),
            doc = K.iframeDoc(iframe);
        doc.open();
        doc.write(self.fullHtml());
        doc.close();
        K(doc.body).css("background-color", "#FFF");
        iframe[0].contentWindow.focus();
    });
});
