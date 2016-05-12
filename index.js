function DOMtoString(root, config) {

    var json = mapDOM(root, true);
    var arr = JSON.parse(json);

    return arr;

    function mapDOM(element, json) {
        var treeObject = {};

        if (typeof element === "string") {
            if (window.DOMParser) {
                parser = new DOMParser();
                docNode = parser.parseFromString(element, "text/html");
                console.log(docNode)
            }
            element = docNode.firstChild;
        }

        treeHTML(element, treeObject);

        return (json) ? JSON.stringify(treeObject) : treeObject;
    }

    function treeHTML(element, object) {
        object["nodeName"] = element.nodeName;
        object["tagName"] = element.tagName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["children"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {//文本节点
                        object["children"].push(nodeList[i].nodeValue);
                    } else {
                        object["children"].push({});
                        treeHTML(nodeList[i], object["children"][object["children"].length - 1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attr"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attr"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
}


console.log(DOMtoString(dom_string))
